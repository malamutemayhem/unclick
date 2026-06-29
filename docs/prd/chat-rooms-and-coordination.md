# Chat, Rooms and Coordination (Master Build Spec)

**Status:** living document, build in progress
**Supersedes for scope:** extends `docs/prd/chat.md` (the original Chat PRD). That PRD
remains the authority for the single-user transport, crypto, spend-gate, and Seats
Scoreboard detail. This document encapsulates the FULL build discussed with the
operator: solo chat, multi-human shared rooms, Circle-governed permissions, responder
management, crews and routing, the tool-calling (MCP) stage, and the remainder backlog.
**One line:** Make Chat the front door to the whole UnClick system (memory, orchestrator,
connectors, coordination), shared across people via Circle, with multiple AI seats that
can be called in, coordinated, and routed.

This is the consolidated plan. Each numbered Phase ships as its own preview PR.

---

## 0. Status legend

- [DONE] shipped to main
- [FLIGHT] in progress this build
- [NEXT] queued, design locked
- [LATER] templated/plumbed now, deepened in a future build
- [BACKLOG] agreed, not yet scheduled

---

## 1. Vision

Chat is not a side feature. It is the operator-facing front door to everything UnClick
already does: persistent memory, the orchestrator continuity log, the 450+ connector
surface, and multi-agent coordination. A person should be able to open Chat, talk to one
or many AI seats running on their own keys, pull in other people, and have the whole
thing be grounded in their UnClick memory and governed by one clear permission system
(Circle). Cost is always the user's own spend; the platform never bills for a model call.

---

## 2. What is already shipped (this session)

- [DONE] #1631 Connection-aware seat picker + full-height Members sidebar.
- [DONE] #1632 Memory grounding: every seat runs inside the user's UnClick memory
  (identity, standing rules, durable facts, workspace context) via
  `api/lib/chat-memory.ts` constructing the managed Supabase backend with the resolved
  account lane. Best-effort; a memory hiccup returns "" and chat proceeds.
- [DONE] #1634 Chat sessions (threads) CRUD backend: `api/chat-threads.ts` over
  `chat_threads` + `chat_thread_messages`, scoped by the account lane.
- [DONE] #1636 API Models table: `/admin/agents/api` table view (Provider, masked key
  with replace, live OpenRouter balance, Last used, Status, delete) plus
  `api/ai-provider-balance.ts`.
- [REVIEW] #1635 Sessions UI (draft, awaiting operator preview): `ChatSessionList`, new
  session, auto-title, rename, pin, load-on-open. Foundation for the Sessions rail below.

---

## 3. Architecture foundations (what we build on, do not rebuild)

- **Identity and tenancy.** A user is an `auth.users` row (web) and/or one or more
  `api_keys` rows (agents). `resolveAccountLane(authHeader, supabaseUrl, serviceKey)`
  (`api/lib/account-lane.ts`) returns the stable `lane_hash` (falls back to `key_hash`),
  which survives key rotation and consolidates a user's keys into one lane. **`lane_hash`
  is the canonical scoping key for everything durable, including shared rooms.**
- **Isolation.** Service-role plus app-layer filtering. RLS is deny-all defense-in-depth
  on the data tables. Multi-member read access is therefore an app-logic change, not an
  RLS rewrite.
- **Circle (permission authority).** `account_links` (human-to-human invites, email
  handshake, status pending/accepted/declined/cancelled/unlinked) and `link_permissions`
  (bidirectional, mutual-opt-in grants), fully audited in `link_access_audit`, with a
  "stop all sharing" panic switch. Today it grants `shared_memory` and
  `shared_orchestrator`. UI at `/admin/circle` under the Connections nav group. We extend
  Circle; we never build a parallel permission system.
- **Chat tables.** `chat_threads` already has a typed `participants` JSONB roster and
  `kind IN ('human','agent','council')`. A multi-party room is a latent primitive already
  in the schema.
- **Boardroom / Fishbowl.** A proven shared-scroll multi-author room (`mc_fishbowl_*`)
  with @-mention targeting, todos, ideas, voting. We borrow its PATTERNS (shared stream,
  recipient targeting) but keep Chat rooms in the chat tables. Per `AUTOPILOT.md` the
  Boardroom stays the internal coordination surface and is not renamed or merged.
- **Routing and scoreboard primitives.** `mc_routing_arm_stats`, `armLeaderboard()`
  (`api/lib/eval/router-bandit.ts`), `summarizeTruthRate()` (`api/lib/score-trace.ts`),
  `scoreLiveJobs` (`api/lib/eval/live-score.ts`), and the Seats Scoreboard spec in
  `docs/prd/chat.md` (Phase 4). Every chat turn already stamps `model` + `seat_id`, so
  routing and scoreboard signals populate as a by-product once AIs respond in rooms.

---

## 4. The three chat types

One unified Sessions rail lists them all, grouped Direct vs Shared.

| Type | `kind` | Scope | Participants |
|------|--------|-------|--------------|
| Solo seat chat (today) | `agent` | owner `lane_hash` | you + your AI seats |
| Direct 1:1 | `human` | membership | you + one Circle contact |
| Shared room | `council` | membership | 2 to 4 humans (via Circle) + each person's seats |

Solo chats stay owner-scoped exactly as today. Direct and Shared rooms are
membership-scoped (Section 5). The type is a property of the thread, not a separate
surface.

### 4.1 Human-to-human is a full chat platform (operator)

UnClick supports human-to-human chat even with zero AIs in the room. So a `human` /
`council` room with no active seats must behave like any normal team chat (Teams, Slack,
WhatsApp): the AI layer is additive, never a precondition. We adopt the well-trodden
conventions rather than inventing our own. Treat the absence of an AI as a completely
valid, first-class chat.

Standard conventions adopted (drawn from Teams / Slack):

- v1: rooms and 1:1 DMs, membership with leave/delete (Section 11), `@`-mention people,
  the shared scroll, auto-title + rename + pin, unread counts via a last-read pointer,
  presence (online / away), typing indicator, system events (joined, left, renamed),
  confirm-before-delete.
- Next: message timestamps and grouping by sender, copy / quote-reply, link and image
  unfurling kept minimal (no file upload in v1 per the Chat PRD non-goals), notifications
  with deep-links (ties into the handshake-visibility layer, Section 6).
- Later: reactions / emoji, edit and delete own message (with an edited marker), reply
  threads, per-room mute and notification preferences, search within a room (rolls into
  the Ctrl+K thread search, Section 13), read receipts surfaced for humans only
  (suppressed on agent members per the Chat PRD).

The AI seats, call-in / bench, responder policy, crews, and routing (Sections 7 to 9) all
layer on top of this baseline; remove every AI and what remains is a clean team chat.

---

## 5. Group rooms data model

**Resolved principle (operator):** the conversation is shared, the compute is not.

- **Shared stream.** One set of `chat_thread_messages` rows per room, written once, read
  by every member. There is no per-recipient copy. This is the classic chatroom model:
  one table, membership-scoped reads, everyone sees the same scroll.
- **Membership junction (new).** `chat_room_members(id, thread_id, member_lane_hash,
  role IN ('owner','admin','member'), status IN ('invited','active','left'),
  invited_by_lane_hash, last_read_at, joined_at, created_at)`, unique `(thread_id,
  member_lane_hash)`, RLS deny-all, service-role only, on `supabase_realtime`.
- **Read rule.** A thread is accessible if `thread.api_key_hash == lane` OR an active
  membership row exists for `(thread_id, lane)`. `list` returns owned UNION member
  threads. A non-member can never read a room.
- **Scope key is `lane_hash`** so room membership survives key rotation.

---

## 6. Circle as the permission authority and the handshake

**Resolved principle (operator):** handshake required, with total visibility, no hidden
toggles.

- **Handshake required.** You can only add a human to a room if you have an ACCEPTED
  Circle link with them. `add_member` checks `account_links.status = 'accepted'` for the
  pair. No link means no room together.
- **New permission type.** Add `shared_chat` to `link_permissions.permission` (alongside
  `shared_memory`, `shared_orchestrator`) and to `CIRCLE_PERMISSIONS`, so the toggle lives
  in the Circle permissions submenu with everything else.
- **Loud, zero-hidden visibility (Phase 3).** A pending handshake must be impossible to
  miss: a connect-request badge and banner ("X wants to connect"), a notification, and
  one-tap buttons that deep-link straight to Circle to accept or manage. When something is
  holding up a connection, the system says so in black and white, with the exact link or
  button to resolve it. No setting is ever buried.
- **Structured API signal.** When `add_member` is blocked for lack of a link, the endpoint
  returns `{ error: 'no_circle_link', needs_handshake: true, circle_url: '/admin/circle' }`
  so the UI can surface the handshake prompt loudly rather than failing quietly.
- **Roles.** Room-level role (owner/admin/member: who can rename, add, remove) lives on
  the membership row. The human-to-human RELATIONSHIP is always governed by Circle, and
  any permission affordance in chat deep-links back to the Circle permissions submenu.

**Resolved (security review, group-room foundation):** An accepted Circle link is the
sufficient gate to add a human to a room (the handshake). `shared_chat` is reserved as a
future opt-out control (allow/deny room invites from a contact), defaulting to allowed; it
is not an additional precondition, to honor the no-hidden-toggles rule. Existing
pre-migration links have no `shared_chat` row and need no backfill because membership does
not gate on it.

---

## 7. Responder management (the "pin in" model)

**Resolved principle (operator):** pin in the AIs that should answer; one-click call-in or
bench; do not @-tag every message.

- **Active vs benched.** Each AI seat in a room carries an `active` flag (stored on the
  participant roster entry). Active means it answers without an @-mention. A single click
  toggles a seat in (called in) or out (benched).
- **`responder_policy` (thread metadata):** `mention | round_table | routed | crew`.
  - `mention` (0 active): manual @-mention only. Fully controlled, no surprise spend.
  - 1 active seat: it answers each human turn (classic assistant).
  - 2+ active seats: behavior is the policy (`round_table`, `routed`, or `crew`, see
    Sections 8 and 9).
- **@-mention always overrides** to force a specific seat for one turn, regardless of
  policy. One mention is one agent turn (the v1 speaker-selection rule from the Chat PRD),
  so spend stays bounded.

---

## 8. Crews coordination (2+ active AIs)

When more than one AI is called in and the policy is `crew`, turns are coordinated rather
than everyone replying at once.

- **Reuse the existing Crews/council deliberation path** (`kind='council'` routes through
  Crews / MCP sampling per `docs/prd/chat.md`). We plumb the room into that entrypoint
  rather than writing a new deliberation engine.
- **Coordination, not cacophony.** A coordinator selects who answers (or runs a short
  round-table), aggregates, and posts the result into the shared stream with each
  contributing seat attributed. `@`-mention still overrides to a single voice.
- **Bounded spend.** Step count is capped; the prominent Stop control cancels and saves
  the partial turn (a spend guardrail carried over from the Chat PRD). Each contributing
  seat runs on its own owner's key (Section 10).

The exact Crews entrypoint is being mapped against the live code; the plumbing lands on
the real seam, not a new surface.

---

## 9. Routing and Scoreboard (plumb now, deepen later)

**Operator intent:** template and plumb routing + scoreboarding now because coordination
balance matters; explore the depth (who is best for what) in a later build.

- **Routing selector module (LATER depth, plumbed now).** A small selector that, for a
  `routed` policy, picks the best-suited active seat for a turn. v1 is simple (highest
  scoreboard signal for the room, or round-robin) with a clean extension point for smarter
  task-aware routing. It plumbs into the existing `mc_routing_arm_stats` / `armLeaderboard`
  primitives; an "arm" maps to a seat (`agent_id`).
- **Outcome recording.** Because every chat turn already stamps `model` + `seat_id`, a seat
  outcome from a chat turn can be recorded into the routing stats with minimal new surface.
  Wire the record-outcome call at turn completion (success / quality / honesty signals),
  keeping honesty (false-green) separate from reliability (stale) per the Chat PRD.
- **Seats Scoreboard (LATER UI).** The transparent, weighted, no-ML formula
  (`SeatScore = BaseScore x PenaltyGate`, Wilson lower bounds, time decay) is fully specced
  in `docs/prd/chat.md` Phase 4. We surface a read-only scoreboard panel from the signals
  the rooms generate; the smart routing UX builds on top.
- **Operator controls** (avoid / blocked / load) surface as badges and filters, never
  folded into earned merit.

---

## 10. Compute and spend model

- **Each member's seats run on that member's own provider key.** If you @-mention or call
  in your seat, you pay; another member's seat runs on their key. No shared billing, no
  surprise spend.
- **Memory grounding per seat.** A seat grounds on its owner's UnClick memory by default.
  If two members have an active Circle `shared_memory` grant, a seat may ground on the
  shared context too (reusing the existing Circle memory gate). This is the natural tie-in
  to `shared_memory` and needs no new consent mechanism.
- **Cross-invocation is a future Circle permission.** Letting member A spend member B's key
  by invoking B's seat would be a new `shared_compute` Circle permission, default off.
  [BACKLOG], explicitly out of v1 to avoid surprise spend.
- **Lanes are channels, not gates** (Chat PRD hard rule). Tenant identity comes from the
  authenticated session, never a key in hand. The plaintext provider key has exactly one
  job: decrypt the user's own provider key for the upstream call. Error copy names the
  channel that needs attention, never a missing UnClick key.

---

## 11. Sessions UX

- **In-page collapsible rail**, left of the chat, not a new top-level nav item (the admin
  left nav is already dense). Matches the existing sidebar collapse pattern; persists
  open/closed in localStorage. A double-drawer is avoided unless the rail proves cramped.
- **Two groupings, mirroring the left-nav HUMAN / AGENTS division (operator):**
  - **My Sessions** (default): just me and my agents. Solo `agent` chats and any room
    where I am the only human. Owner-scoped exactly as today.
  - **Shared Sessions**: any session that has another human connected (a `human` or
    `council` room with 2+ humans). Appears only once a second human is in the room.
  - Auto-titled on first message, rename pen, pin, load on open. Builds directly on #1635.
- **Per-room header** shows the roster (humans + seats), call-in / bench toggles, the
  responder policy, and any pending-handshake banner.

### Shared-session lifecycle (MS Teams style, common pattern)

A shared session needs leave vs delete semantics so it is clear who removes what:

- **Leave** (any member): removes yourself only. Backend `remove_member` sets your
  membership `status='left'`; the room and its history stay for everyone else, and you
  drop out of the read scope. This is the everyday action.
- **Delete** (owner / admin only): removes the room for everyone. Backend `delete` cascades
  `chat_thread_messages` and `chat_room_members`. Guarded so a plain member cannot nuke a
  shared room; a member only ever leaves.
- **Last human out**: if the owner leaves, ownership transfers to the next admin/member (or
  the room is archived if none remains), mirroring how Teams/Slack hand off or retire an
  empty room. Confirm-before-delete on the destructive path.
- **Visibility**: deleting or leaving is surfaced in the shared scroll as a system event so
  members are not silently dropped, consistent with the loud-visibility rule in Section 6.

---

## 12. Stage 2: Tool-calling, MCP, and connectors

The gap the operator hit live: a seat reads memory but cannot act (no Dropbox, no
connectors). Build the general tool surface so individual connectors light up for free;
do not one-off plumb Dropbox.

- **Tool-calling for seats** [NEXT after rooms]: the chat already has the multi-step loop
  (`stopWhen: stepCountIs(N)`); enable tools on the turn.
- **The "+" composer** [NEXT]: a Claude-style attach control below the composer to add
  tools/Apps/MCPs to a turn. Discoverability-first (also the slash-command menu from the
  Chat PRD: `/model`, `/seat`, `/memory`, `/save`, `/context`, `/summarize`, `/trace`).
- **UnClick-native tools first** [NEXT]: memory search/save and discovery
  (`unclick_search` / `unclick_browse` / `unclick_call`) work with what the server already
  holds. Easy, high-impact, immediately useful.
- **Third-party connectors** [LATER]: the real engineering is the zero-knowledge auth wall.
  A web session (JWT) cannot decrypt the user's BackstagePass connector keys; only the
  agent runtime (raw `uc_` key) can. Solving the session-to-connector auth path is what
  makes "Dropbox via chat" work, and it generalizes to all 450+ connectors at once.
- **Custom MCP management** [BACKLOG]: add-your-own-MCP in the Apps section, surfaced in
  chat via the "+" composer (the operator's "hyperlinks in chat like Claude does it").
- **Tool-call gating** [NEXT with tools]: a Passport-scoped capability allowlist,
  confirm-before-execute on any write, spend, or send.

---

## 13. Remainder backlog (agreed, from this thread and the Chat PRD adopt-now list)

- [NEXT] Thread-title search in the Ctrl+K AdminSearchBar (add a "thread" source; open the
  thread on select).
- [NEXT] Auto-compaction: rolling running-summary with a verbatim recency tail, prune
  verbose connector JSON first, auto-threshold from the bound model context length, plus a
  manual Compact and a pinned-message flag excluded from roll-off. Runs on the user's key.
- [NEXT] Session to memory to orchestrator deposit: a typed distilled handoff to
  `save_fact` / `save_identity` and `save_session`, and every chat turn mirrored into
  orchestrator continuity (`chat_turn_ingest`) so Story / Timeline / Log show chat.
- [LATER] Retry / regenerate on an assistant message (with "spends another call" note),
  pairs with retry-on-a-different-model via the in-thread switcher.
- [LATER] Copy and quote-reply on every message.
- [LATER] Streaming Stop that cancels and saves the partial turn (required spend guardrail).
- [LATER] Live usage / token-and-cost meter on the user's key.
- [LATER] In-thread model switcher, OpenRouter first-class, model stamped per turn.
- [LATER] Local models (Ollama, LM Studio, vLLM) via the runner-preferred path with a
  browser-direct fallback and honest CORS/PNA setup copy; explicit detect, nothing
  auto-connects.
- [LATER] Presence and typing from the real run lifecycle; last-read pointer for unread
  counts.
- [BACKLOG, v2 in Chat PRD] Global Cmd+K palette beyond thread search, thread branch/fork,
  edit-user-turn-and-resubmit, thinking/trace toggle, suggestion chips, per-turn cost
  receipt card, auto-advancing model failover (explicitly rejected for transparency).

---

## 14. Phased delivery (PR sequence and status)

- [FLIGHT] PR 1: Room data model + Circle-gated membership (backend). `chat_room_members`
  migration, `shared_chat` added to Circle, membership-scoped reads, `add_member` /
  `remove_member` / `members` actions, handshake gate with the `needs_handshake` signal,
  tests. Security-reviewed before merge (cross-tenant reads).
- [NEXT] PR 2: Sessions rail UI (Direct / Shared grouping), building on #1635.
- [NEXT] PR 3: Handshake visibility layer (badge, banner, notification, deep-links). No
  hidden toggles.
- [NEXT] PR 4: Responder management (call-in / bench toggle, `responder_policy`, routing
  selector v1 fed by scoreboard signals, with the smart-routing extension point).
- [NEXT] PR 5: Crews coordination for 2+ active AIs + multi-human realtime (per-room
  subscription, roster, presence, unread counts).
- [LATER] PR 6: Seats Scoreboard panel (read-only, from existing signals).
- [NEXT] Stage 2 track: tool-calling + "+" composer + UnClick-native tools (Section 12),
  runs in parallel with rooms once the foundation is in.

---

## 15. Resolved decisions (operator calls)

- Group chat focus over one-off Dropbox: build the general MCP/tool surface; connectors
  light up for free.
- Shared conversation stream in the DB; per-member own-key compute (each pays for their
  own agents).
- Handshake required (accepted Circle link) with maximum visibility and zero hidden
  permission toggles.
- Pin-in / bench responder model with one-click toggles; do not @-tag every message.
- Crews + routing coordinate 2+ active AIs; routing and scoreboard plumbed now, depth
  explored later.
- Sessions rail is an in-page collapsible panel, not a new top-level nav item.

---

## 16. Open / to-explore

- Routing depth: task-aware "who is best for what" selection beyond the v1 heuristic.
- Scoreboard UX: how much to surface and how operators tune weights.
- Connector auth wall: the session-to-connector key path for third-party tool execution.
- Cross-account `shared_compute` (let a member invoke another member's seat): if and how.
- Realtime vs poll for busy rooms if Supabase realtime read-amplification becomes a concern.

---

## 17. Non-overlap notes

- Circle: extend (`shared_chat`), do not fork. All human-to-human permission lives there.
- Boardroom / Fishbowl: borrow patterns, keep separate tables; do not rename or merge.
- Routing / scoreboard: reuse `mc_routing_arm_stats`, `armLeaderboard`, the Chat PRD Seats
  Scoreboard formula; do not invent a parallel ranking.
- Chat transport, crypto, spend gate: governed by `docs/prd/chat.md`; reuse the 100k
  hex-column vault scheme and the fail-closed `decideChatProviderCall`.
- Style: no em dashes anywhere in code, comments, migrations, or prompts.
