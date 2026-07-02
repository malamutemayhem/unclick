# Chat subscription seats (PRD)

**Status:** shipped v1 (bridge lane), extends `docs/prd/chat.md`
**Surface:** Chat member rail + `/api/chat-bridge` + `@unclick/mcp-server seat-bridge`
**One line:** A chat seat that answers on the user's own consumer plan (Claude Pro/Max, ChatGPT Plus/Pro) by relaying the turn to the official CLI signed in on the user's machine, never to a provider API.

## The honest constraint this design is built around

There is NO API for consumer subscriptions. Anthropic does not expose Claude
Pro/Max over an API, and OpenAI does not expose ChatGPT Plus/Pro over an API.
The only ways to "call" a subscription are:

1. **Official agent CLIs, signed in with the subscription.** Claude Code
   (`claude -p`, headless print mode) runs on a Claude Pro/Max login and draws
   from that plan's usage pool. The Codex CLI (`codex exec`) runs on a
   "Sign in with ChatGPT" login. Both are official, documented, headless-capable
   tools from the providers themselves.
2. **Scraping the claude.ai / chatgpt.com private web endpoints.** This
   violates both providers' terms of use, breaks every few weeks, and risks
   the user's account. UnClick will never do this, and no future iteration of
   this lane should either.

So the subscription lane is a RELAY, not a provider transport: the turn is
queued server-side, and a small worker on the user's machine (where the CLI
is signed in) claims it, runs the CLI, and posts the reply back.

## Architecture

```
Browser (AdminChat)                Vercel (/api/chat-bridge)             User's machine
-------------------                -------------------------            --------------------------
1. enqueue turn ------------------> insert chat_bridge_jobs
                                    (memory block + transcript
                                     composed server-side)
2. poll job status <--------------- job row                    <-------- 3. seat-bridge worker polls,
                                                                            claims job, heartbeats
                                                               ---------> 4. runs `claude -p` or
                                                                            `codex exec` headless
5. reply appears <----------------- 6. complete: job done,     <-------- 5. posts reply
   (also persisted to the             turn persisted with
    thread by the server)             seat_lane='subscription'
```

Pieces:

- **Migration `20260702000000_chat_bridge_seats.sql`**: `chat_bridge_seats`
  (registered bridges, `last_seen_at` presence) and `chat_bridge_jobs`
  (queued turns). RLS deny-all, service-role only, `api_key_hash` scoped,
  matching the chat_threads pattern.
- **`api/chat-bridge.ts`**: `enqueue` (browser), `poll` (bridge heartbeat +
  claim), `complete` (bridge posts reply; server persists the assistant turn),
  `status` (browser), `seats` (presence for the member rail). Auth on every op
  via `resolveAccountLane`; room access re-checked with
  `resolveThreadPersistenceLane` (extracted to `api/lib/chat-room-access.ts`);
  memory grounding via `fetchMemoryBlock`, mirroring the api lane.
- **`@unclick/mcp-server seat-bridge`** (`packages/mcp-server/src/seat-bridge.ts`):
  the local worker. `npx @unclick/mcp-server seat-bridge --runtime claude-code
  --handle claude-sub` with `UNCLICK_API_KEY` set. Spawns the CLI headless:
  - `claude -p --output-format json --append-system-prompt <system>` with the
    prompt on stdin; the answer is the JSON `result` field.
  - `codex exec --skip-git-repo-check --json --output-last-message <tmpfile> -`
    with the prompt on stdin; the answer is the last-message file, with a JSONL
    fallback parser for schema drift.
- **UI**: the Add-seat picker gains a Subscription section (no API key
  required); subscription seats show bridge online/offline presence from the
  heartbeat, and an offline seat shows the exact command to start its bridge.
  Turns route through the queue and the reply lands in the same thread.

## Lane rules honored (from docs/prd/chat.md)

- A seat lane is the traffic channel, never an auth gate. The subscription
  lane needs NO provider key and NO platform key; persistence rides the
  authenticated session tenancy, same as every other lane.
- `api/chat.ts` still rejects `lane != "api"`; `decideChatProviderCall` still
  blocks the subscription lane from the api endpoint. The bridge endpoint
  makes no provider call at all, so there is no spend gate to consult and no
  platform-billed call possible.
- The lane is stamped on every persisted row (`seat_lane = 'subscription'`),
  never inferred.

## Security posture

- No provider credential, OAuth token, or CLI session material ever leaves
  the user's machine. The bridge sends prompt text and receives reply text.
- The bridge authenticates like any other worker (uc_/agt_ key or session);
  every row and every claim is lane-scoped; CORS pinned to unclick.world.
- Job payloads and error strings pass `redactSensitive` before the continuity
  mirror, matching the api lane.
- Pending jobs expire after 15 minutes so a bridge that comes online later
  never replays a dead room.

## Plan, terms, and expectations (user-facing honesty)

- Turns consume the user's OWN plan usage (Claude Pro/Max or ChatGPT
  Plus/Pro limits apply). Heavy council use can hit plan rate limits; that
  surfaces as a CLI error in the thread, not a silent stall.
- The seat only answers while the user's machine is on and the bridge is
  running. Presence in the member rail makes this visible instead of magical.
- This is for the account owner's own use on their own login, consistent
  with provider terms for personal subscriptions. It is not a way to resell
  or pool subscription access, and shared-room members do not gain their own
  subscription seats through someone else's bridge.

## v1 limitations (deliberate)

- Text-only turns: image attachments do not ride to subscription seats.
- No UnClick connector tool calls inside the subscription turn (the CLI is
  told to just answer). A future iteration can hand the CLI the UnClick MCP
  server so subscription seats get tools + memory natively.
- Subscription seats answer independently; they do not join the api-lane
  council synthesis. Mixed sends work: api seats council, subscription seats
  reply solo in the same thread.
- One bridge process per seat handle. Multiple seats need multiple processes
  (or future: one process serving multiple handles).

## Follow-ups

1. Council membership for subscription seats (fold bridge replies into the
   synthesis evidence block).
2. Connector/tool access by connecting the UnClick MCP server inside the CLI
   run (gets `find_tools` / `call_tool` parity with api seats).
3. Streaming: bridge posts partial output chunks; UI renders progressively.
4. A Gemini CLI runtime if demand shows up (same relay shape).
