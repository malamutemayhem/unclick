# Chat System Architecture Review and Industry Adoption Plan

Status: living document. Written 2026-07-01 against main at `c526874` (PR #1691) plus the slices shipped alongside this document.

This is the deep review of the UnClick Chat system (AI seats, councils, and human rooms) measured against how mainstream chat platforms (Slack, Microsoft Teams, Discord, Matrix, WhatsApp, IRC) and agent-chat projects (OpenClaw, Hermes Agent, AutoGen, LangGraph, CrewAI) actually work, and the sequenced plan for adopting what is worth adopting. It complements `docs/prd/chat.md` (product requirements) and `docs/prd/chat-rooms-and-coordination.md` (rooms direction); read those for product intent, read this for the engineering delta between UnClick Chat and the industry baseline.

## 1. The current system in one page

Surfaces and files:

| Layer | File | Role |
| --- | --- | --- |
| UI | `src/pages/admin/AdminChat.tsx` | Composer, canvas, seat/human targeting, send flow, room sync loop |
| UI | `src/components/admin/ChatMemberRail.tsx` | AI seats + human members, called-in/standby/working states |
| UI | `src/components/admin/ChatSessionList.tsx` | Sessions rail, My/Shared groups, unread indicators |
| UI | `src/components/admin/chatSync.ts` | Pure sync-loop logic: cursor, merge/dedupe, unread, stall detection |
| API | `api/chat.ts` | The api-lane model endpoint: auth, provider keys, memory grounding, council fan-out, streaming, persistence |
| API | `api/chat-threads.ts` | Threads CRUD, human turns, room membership, read cursors, Context mirroring |
| API | `api/lib/chat-tools.ts` | Seat tool surface (memory + connectors), read/build permission gates |
| API | `api/lib/chat-transport.ts` | Provider transports, private-host refusal |
| API | `api/lib/chat-crypto.ts` | Provider key encryption/decryption |
| DB | `chat_threads`, `chat_thread_messages`, `chat_room_members`, `mc_conversation_log` | Threads, shared message stream, membership + read cursors, Context capture |

Flow summary:

- A message with one AI seat targeted streams through `/api/chat` on the user's own provider key, grounded in UnClick memory, with the constrained tool surface (`search_memory`, `save_memory`, `find_tools`, `tool_info`, `call_tool`) under read or Build mode.
- Two or more called-in seats trigger council mode: the API gathers an independent short brief from every seat (25s timeout each), then the lead seat streams a synthesis with the fan-out evidence in its system prompt. The per-seat run receipt is persisted in the assistant message's metadata.
- A message with no AI seat in a shared room is DB-only: appended to `chat_thread_messages`, never sent to a provider.
- Every turn is mirrored, redacted and best-effort, into `mc_conversation_log` as Context.
- Access control is owner-or-active-member per thread, enforced server-side before any provider call, with Circle handshakes as the authority for adding humans.

Security invariants worth restating because every future slice must preserve them: provider keys are decrypted only in handler scope and never logged or returned; the connector key is validated to the caller's own account lane before use; thread membership is re-checked by the model endpoint itself (never trusted from an earlier request); the internal MCP origin is pinned to known hosts; high-risk connector verbs stay blocked until an approval layer exists.

## 2. How the mainstream platforms work, and what matters here

The mechanisms below are the load-bearing ones. Each is stated with what the platform does and the takeaway for a Supabase + Vercel product of this size.

### 2.1 Delivery (getting a message to the other people in the room)

- Slack holds one WebSocket per client; channel servers own channels via a consistent hash ring and gateway servers fan events down each user's socket.
- Discord's gateway numbers every event with a sequence; a reconnecting client sends its last sequence and the server replays the gap.
- Matrix clients long-poll `GET /sync?since=<token>`; the server returns immediately when there are events, otherwise holds the request. One endpoint carries messages, receipts, and typing.
- WhatsApp is store-and-forward: offline queues drained on reconnect, retry until the device acks.
- Supabase's official guidance for this stack: `postgres_changes` does not scale as well as Broadcast; the recommended pattern is an insert trigger calling `realtime.broadcast_changes(...)` on a private `room:{id}` channel authorized by RLS on `realtime.messages`, with the table as the source of truth and re-fetch-by-cursor to fill gaps.

Takeaway: the table is always the source of truth and the realtime lane is only a fan-out hint. The since-cursor sync loop is a legitimate architecture (Matrix ships it as the primary API), so a visibility-aware incremental poll is the correct v1 for shared rooms, and Broadcast-from-database is the correct v2 when sub-second delivery is wanted. Never build on `postgres_changes` here: the chat tables are RLS deny-all by design, so a browser subscription would deliver nothing anyway.

### 2.2 Identity, ordering, idempotency

- Slack's `ts` is simultaneously the message ID, the ordering key, the thread anchor, and the read-cursor unit. Sends carry a `client_msg_id` UUID for dedup because `chat.postMessage` retries are a known duplicate source.
- Matrix sends are `PUT /send/{txnId}`: the client-chosen transaction ID makes retries idempotent, and local echo reconciles when the canonical event returns.
- Discord snowflakes are time-sortable 64-bit IDs; all pagination is keyset (`before`/`after` an ID), never offset.

Takeaway: every send should carry a client-generated key that the database enforces unique per room, and history reads should paginate by a sortable cursor. UnClick messages are UUID + `created_at`; `created_at` is the ordering key and now also the sync cursor, and `client_msg_id` is enforced by a partial unique index per thread.

### 2.3 Read state

- Slack stores one `last_read` cursor per user per channel; unread = anything newer. There are no per-message receipts.
- Matrix receipts have "up to and including" semantics: one receipt acknowledges everything before it, O(1) per reading session. `m.read.private` clears your own badge without telling others.
- Teams shows read receipts only in small chats, and exposes per-user chat read state rather than per-message receipts.

Takeaway: one `last_read_at` per member per room is the entire industry-standard model at this scale. The column existed from the rooms migration; it is now written by `mark_read` and drives the unread indicator in the sessions rail. Per-message receipt rows are a scaling trap and are not planned.

### 2.4 Ephemeral state (typing, presence, agent activity)

- Discord typing state is a ~10 second TTL cleared implicitly by sending, so a crashed client cannot stay "typing" forever.
- Matrix typing events carry the authoritative full list of typing users, replacing prior state, which eliminates stuck-indicator bugs from missed stop events.
- Slack moved presence from broadcast to subscription (clients subscribe only to visible users) because presence fan-out was their largest scaling cost. Teams keeps presence to coarse enums, not timestamps.

Takeaway: typing and per-seat activity ("thinking", "calling gmail_search") belong on an ephemeral broadcast lane with TTL semantics, never in rows. This is a v2 item that arrives naturally with the Broadcast channel. Presence, if ever built, should be the Supabase Presence CRDT for the open room's roster only.

### 2.5 Message lifecycle (edit, delete, reactions)

- Teams soft-deletes (`deletedDateTime`) and stamps `lastEditedDateTime`; clients reconcile from tombstones.
- Matrix models edits, reactions, and threads as relations to an immutable original event; deletion is redaction (content stripped, skeleton remains).

Takeaway: when edit/delete/reactions arrive, do not mutate or remove rows. Add `edited_at`/`deleted_at` (tombstones) and store reactions as small relation rows keyed to the message ID. Absent today; scheduled below.

### 2.6 Bots and agents as room members

- Teams bots receive a normalized Activity JSON envelope and reply through one API; in channels they only see messages that @mention them.
- Discord bots are first-class gateway clients: the same event stream as humans, rate-limited on send.
- OpenClaw (the open-source personal agent gateway) runs one control-plane process with 22+ channel adapters all implementing one normalized inbound/outbound message interface; agents are sessioned per conversation and isolated per workspace, and unknown senders must pair before the agent will act.
- Hermes Agent (Nous Research; "hermies" colloquially) routes one agent across Telegram, Discord, Slack, WhatsApp, Signal, Email, and CLI with cross-platform conversation continuity keyed on the conversation rather than the transport, searchable session history (FTS + summarization) as recall, and subagent spawning as a first-class action.

Takeaway: UnClick Chat already has the right instincts here: seats are explicit roster members with @handles, mention overrides routing, human-only sends never touch a provider, and Circle handshakes gate humans the way OpenClaw's pairing gates strangers. The structural adoption worth making later is the normalized agent envelope: seats should consume one platform-neutral event shape (room, sender, mentions, reply target) so a future bridge (Telegram in, Boardroom in, MCP sampling seats in) does not touch seat logic.

### 2.7 Multi-agent orchestration (the council)

- AutoGen's GroupChatManager owns the turn: speaker selection is a policy (auto via an LLM pick, round-robin, or a custom callable), one agent speaks at a time, and the chosen message is broadcast so all agents share one transcript. Termination conditions (max turns, text match) are explicit because agent-loop runaway is the #1 practical failure mode.
- LangGraph distinguishes supervisor (a router agent whose only job is delegation) from swarm (direct handoffs); per-node streaming events are how UIs show which agent is working.
- CrewAI is a role-based workflow engine (sequential or manager-led) more than a chat room.
- Practitioner consensus: beyond roughly 8 agents, reliability collapses without hierarchy. UnClick's council cap of 8 seats is already at that boundary.

Takeaway: UnClick's council (independent briefs, then one lead synthesis over a shared transcript) is a sound fan-in shape and honest about what ran, which AutoGen-style roster prompts are not. What the frameworks add that Chat lacks: an explicit per-room turn policy (mention-only / round-robin / selector) instead of the implicit "all called-in seats answer", a max-consecutive-agent-turns circuit breaker before seats can ever talk to each other, and per-seat streamed activity. The persisted council receipt shipped with this document is the audit substrate those features will build on.

## 3. Gap analysis

Legend: SHIPPED = in this change set; PARTIAL = exists with limits; NO = not built.

| Mechanism (source) | Status | Notes |
| --- | --- | --- |
| DB as source of truth, service-role access, membership checks (everyone) | YES | Strongest part of the current design |
| Live delivery to other room members (Slack/Discord/Matrix) | SHIPPED (v1) | Incremental since-cursor poll, 5s, visibility-aware, paused while streaming; Broadcast v2 below |
| Send idempotency via client key (Matrix txnId, Slack client_msg_id) | SHIPPED | `client_msg_id` column + partial unique index per thread; retry reports `deduped` |
| Read cursor + unread indicators (Slack/Matrix "up to" receipts) | SHIPPED | `mark_read` writes `last_read_at`; list returns `my_last_read_at`; rail shows dot |
| Silent-stall surfacing (WhatsApp-style honest delivery state) | SHIPPED | "Stopped without a final answer" notice when a stream settles with no text |
| Council run auditability (LangGraph run events, Crews receipts) | SHIPPED | Per-seat receipt (status, ms, capped brief) persisted in message metadata, rendered as chips |
| Thread `updated_at` on assistant turns | SHIPPED | Ordering and unread now react to AI replies, not only human turns |
| Sub-second fan-out (Supabase Broadcast from database) | NO | v2; trigger + private `room:{id}` channel + RLS on `realtime.messages` |
| Typing indicators / per-seat live activity (Discord TTL, Matrix authoritative list) | NO | Needs the Broadcast lane; never rows |
| Presence (Slack subscription model, Supabase Presence CRDT) | NO | Roster-only, open room only, low priority |
| Message edit/delete/reactions (Teams tombstones, Matrix relations) | NO | Requires tombstone columns + relation rows; do not mutate history |
| Keyset pagination of history (Discord before/after) | PARTIAL | Full read capped at 2000 rows; `after` cursor exists, `before` (backfill) does not |
| Normalized agent envelope + adapters (OpenClaw, Teams Activity) | NO | Structural; unlocks non-web surfaces for seats |
| Per-room turn policy + agent-loop circuit breaker (AutoGen) | NO | Today the policy is implicitly mention-or-all-called-in, one round per human turn (which itself bounds loops) |
| Tool-enabled council fan-out | NO | Briefs are text-only; lead has tools. Known limit, unchanged |
| Approval layer for high-risk connector writes | NO | Build mode still blocks send/delete/pay/merge/deploy; unchanged |
| Image persistence in thread history | NO | v1 limitation, unchanged |
| Cost guard for large councils | NO | 8-seat cap and 25s brief timeout only |

## 4. What shipped with this document

1. Room sync loop: `?action=messages` accepts an `after` cursor; `AdminChat` polls open shared rooms every 5 seconds (skipped while a reply streams or the tab is hidden), merging only genuinely new rows. Dedupe is by row ID and by (role, text) so optimistic local turns and streamed assistant turns never double up. Pure logic lives in `chatSync.ts` with tests.
2. Send idempotency: migration `20260701000000_chat_message_idempotency.sql` adds `client_msg_id` with a partial unique index per thread; `append` accepts the key and reports a retried send as `deduped` instead of duplicating.
3. Read cursors and unread: `mark_read` action stamps `last_read_at`; `list` returns `my_last_read_at`; the sessions rail shows an unread dot for shared rooms that changed after the cursor (never for the open thread or solo threads).
4. Council receipts: each brief is timed; `persistAssistantTurn` stores the compact receipt in `chat_thread_messages.metadata.council`; history rendering shows per-seat chips (contributed with duration, skipped, failed) with the brief text on hover.
5. Stall honesty: when a stream settles with no visible answer and no error, the UI says so instead of leaving an empty canvas.
6. Assistant turns touch the thread's `updated_at`, so list ordering and other members' unread state react to AI replies.
7. Human sender attribution: the composer now signs appended turns with the account's email as `sender_id` (previously every human row said "you"). Another member's turns render left-aligned with their name; the viewer's own turns stay right-aligned. Legacy "you" rows keep the old rendering.

Known v1 limitation, accepted deliberately: the poll's merge dedupes echoed turns by row ID and by (role, text). If two members send byte-identical text while the same text is already on the canvas, the later copy is not appended until the thread is reopened. The precise fix (server-returned row IDs reconciled into local echo, then Broadcast delivery) is roadmap item 1.

## 5. Sequenced roadmap (adopt in this order)

1. Broadcast v2 for delivery and ephemeral state. Insert trigger calling `realtime.broadcast_changes` on private `room:{id}` channels; RLS policy on `realtime.messages` checks room membership by lane. The poll loop remains as the reconnect/gap-fill path (fetch by `after` cursor on channel rejoin), which is exactly the Matrix/Discord resume shape. Typing and per-seat activity ride the same channel as ephemeral events with ~10s TTL semantics.
2. Turn policy and circuit breaker. A room setting: `mention_only` (default), `round_robin`, `selector` (cheap LLM pick of the responding seat). Hard cap on consecutive agent turns without a human turn. This is the AutoGen lesson and becomes mandatory before any seat-replies-to-seat feature.
3. Message lifecycle: `edited_at`/`deleted_at` tombstones, reactions as relation rows, `before` cursor for history backfill. Client reconciles from tombstones; nothing is ever hard-mutated.
4. Tool-enabled council fan-out with per-seat streamed activity, building on the persisted receipt: each seat's tool calls become receipt entries and activity events.
5. Approval layer for high-risk connector actions: action preview, explicit user confirmation, receipt, audit log. Unblocks send/delete/pay/merge/deploy verbs currently refused in Build mode.
6. Normalized agent envelope: define the platform-neutral event shape seats consume and the single reply API, then bridge additional surfaces (Boardroom, MCP sampling seats, external messengers) as adapters.
7. Image persistence in history, per-room Context scopes and retention controls, and a council cost guard (warn at 4+ seats or large attachments).

## 6. Explicit non-adoptions

- Per-message read receipt rows: rejected everywhere at scale; the cursor model covers the product need.
- `postgres_changes` subscriptions for chat: against Supabase's own scaling guidance and incompatible with the deny-all RLS posture.
- Broadcast-style presence for all contacts: Slack abandoned it; if presence ships it is roster-of-open-room only.
- Letting seats see the room without mention gating by default: Teams' mention-gated channel bots are the right default for multi-human rooms.
- One shared mega-prompt pretending to be multiple models: already rejected in PR #1691; councils must actually call the seats or say they did not.

## 7. Sources

Slack engineering (real-time messaging, flannel edge cache), Slack API docs (events, chat.postMessage, conversations.mark); Microsoft Graph chatMessage and Teams bot conversation docs; Discord developer docs (gateway, reference/snowflakes); Matrix client-server spec (sync, receipts, typing modules); IRCv3 extensions (message-ids, echo-message, labeled-response); WhatsApp architecture write-ups (getstream, bytebytego); OpenClaw README and docs; Nous Research Hermes Agent README; AutoGen conversation-pattern docs; langgraph-supervisor and langgraph-swarm; Supabase Realtime docs (broadcast, subscribing to database changes, architecture, benchmarks, pricing).
