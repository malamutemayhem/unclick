# Chat subscription seats (PRD)

**Status:** shipped v2 (bridge lane with tools, images, five runtimes), extends `docs/prd/chat.md`
**Surface:** Chat member rail + `/api/chat-bridge` + `@unclick/mcp-server seat-bridge`
**One line:** A chat seat that answers on the user's own consumer plan (Claude Pro/Max, ChatGPT Plus/Pro, Gemini, GitHub Copilot, Cursor) by relaying the turn to the official CLI signed in on the user's machine, never to a provider API.

## Runtimes (v2)

| Runtime | Plan | CLI | Tier |
| --- | --- | --- | --- |
| `claude-code` | Claude Pro / Max | Claude Code CLI (`claude -p`) | full: UnClick tools + images |
| `codex-cli` | ChatGPT Plus / Pro | Codex CLI (`codex exec`) | full: UnClick tools + images |
| `gemini-cli` | Google account free tier / AI Pro / Ultra | Gemini CLI (`gemini -p`) | basic: images, no tools yet |
| `copilot-cli` | Copilot Pro / Pro+ / Business | GitHub Copilot CLI (`copilot -p`) | basic: images, no tools yet |
| `cursor-cli` | Cursor Pro / Ultra | Cursor CLI (`cursor-agent -p`) | basic: images, no tools yet |

The registry lives in `packages/mcp-server/src/seat-bridge-runtimes.ts`; the
website mirrors it (consistency-tested) and the DB constrains runtime by
format only, so adding a runtime is an app change, not a migration.

Every CLI invocation uses flag syntax verified against the vendor's current
docs or source (2026-07): Claude Code print mode with `--append-system-prompt`,
`--mcp-config` + `--strict-mcp-config`, and `--allowedTools` (server-level MCP
rule plus a path-scoped `Read(<workdir>/**)` rule when images attach); Codex
`exec -` with `--json`, `--output-last-message`, repeated `-i` images, and
`-c mcp_servers.*` overrides; Gemini `-p` with stdin context, `--output-format
json` (answer in `.response`), and `@path` image injection; Copilot `-p` with
`-s --no-color --no-ask-user` and `--attachment` (stdin is ignored with `-p`,
so the prompt rides argv); Cursor print mode with `--output-format json`
(answer in `.result`) and a timeout+stdout-salvage guard for its known
headless hangs.

## Tools on subscription turns (v2)

Full-tier turns attach the UnClick MCP server itself as the CLI's tool child:
the bridge spawns the CLI, the CLI spawns `node dist/index.js` (this package)
as a stdio MCP server, and the seat sees the same tool surface as any MCP
client: memory ops plus the advertised connector tools.

The chat's Read/Build toggle rides the job as `tool_mode` and is enforced in
THREE layers:
1. The child MCP server enforces it in-process: `UNCLICK_SEAT_TOOL_MODE` makes
   the CallTool handler run every call through the same read/build classifier
   as the api lane (`tool-mode-policy.ts`, single-sourced; `api/lib/chat-tools.ts`
   imports it). Read mode allows only clearly-read endpoints plus the user's
   own memory ops; Build mode adds non-destructive create/write/generate;
   sends, deletes, payments, merges, deploys, and permission changes are
   refused in both.
2. Claude Code additionally scopes client-side permissions with
   `--allowedTools` (and no filesystem/shell tools are ever allowlisted
   beyond the image workdir).
3. The system preamble states the active policy so the model does not
   flail against refusals.

Secret handling: the UnClick key reaches the tool child via a 0600 config
file in the per-job temp dir (Claude) or codex's `env_vars` name-forwarding
(Codex whitelists MCP child env; full inheritance does not happen). The key
never appears in argv, so it cannot leak through the process list.

## Images (v2)

Up to 3 images (~900KB each) ride the job as base64, validated and capped at
enqueue, written to the per-job temp dir by the worker, handed to each CLI
through its own mechanism, and scrubbed from the job row the moment the job
finishes. The temp dir is deleted after every run.

## Multi-seat bridge (v2)

One process serves any number of seats:

```
npx @unclick/mcp-server seat-bridge \
  --seat claude-sub=claude-code --seat gpt-sub=codex-cli --seat gemini-sub=gemini-cli
```

The single-seat form (`--runtime ... --handle ...`) still works.

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

## Remaining limitations (deliberate)

- Subscription seats answer independently; they do not join the api-lane
  council synthesis. The council fan-out runs inside one serverless request
  with a 25s brief budget; a bridge round trip through a human's machine
  cannot fit that envelope, so folding bridge replies into the synthesis
  needs an async council design first.
- Basic-tier runtimes (gemini/copilot/cursor) have no UnClick tools yet:
  their per-run MCP wiring is config-file based rather than flag based, and
  read/build enforcement there deserves its own verification pass.
- No streaming: the reply lands when the CLI finishes. The claimed state is
  visible in the UI while it runs.

## Follow-ups

1. Async council membership for subscription seats.
2. MCP tool wiring for the basic-tier runtimes.
3. Streaming: bridge posts partial output chunks; UI renders progressively.
