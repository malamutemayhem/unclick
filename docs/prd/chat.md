# Chat (PRD)

**Status:** proposed, phase 1 in progress
**Surface:** new Orchestrator-adjacent surface in the admin app
**One line:** API-only conversations (human-to-human and human-to-AI on the user's own provider key or a local model) that feed the Orchestrator, plus a Seats Scoreboard.

This PRD was produced from two independent design passes (a repo-internal architecture pass and a pattern-adoption plus measurement-science pass), each with an adversarial verify step, then reconciled and checked against the live code. The "Verification log" section at the end records what was confirmed against real files.

## Overview

Chat is a new surface beside the Orchestrator Story / Timeline / Log views. It supports two conversation kinds:

1. Human to Human chat (rooms with participants and realtime delivery).
2. Human to AI Agent chat, where the agent runs ONLY on the user's own provider API key (OpenAI, OpenRouter, Groq, Together, Mistral, Perplexity, Anthropic) OR a Local model (Ollama, LM Studio, vLLM).

Chat is API-only. It is never powered by a platform subscription model and never bills the platform for a model call. Every Chat turn feeds the Orchestrator as a `conversation_turn` continuity event, so Story / Timeline / Log show Chat automatically through the existing Chat filter.

The biggest architectural lever: OpenAI, OpenRouter, Groq, Together, Mistral, Perplexity, and local engines all speak the OpenAI `/v1/chat/completions` shape, so one OpenAI-compatible transport parameterized by base URL plus key source covers nearly everything. Anthropic is the single exception and keeps its own branch.

## Goals and non-goals

Goals:
- A Chat surface with human-to-human rooms and human-to-AI threads.
- AI threads run only on the user's own provider key or a local model; no platform-billed model call ever.
- Chat turns feed the Orchestrator as another context layer.
- Provider and model setup lives in the Seats / API area; the Chat window links to it and to Local model setup. OpenRouter is a first-class option with an easy model dropdown.
- A Seats Scoreboard that ranks agent seats on transparent, weighted, no-ML performance signals.

Non-goals (v1):
- No ML ranking, no comparative seat-vs-seat rating (Elo, Bradley-Terry, TrueSkill), no LLM-as-judge in the public rank. There is no like-for-like comparison to rate today, so any such rating would be fabricated. These are gated on duplicate or bake-off dispatch existing first, and even then a quality term stays a small capped tiebreaker that can never outrank reliability or truth-rate.
- No hosted or platform-key fallback model. The existing server-side Gemini fallback in `AIChatPanel` is intentionally dropped for Chat.
- No subscription or platform-key framing anywhere. All cost is the user's own spend.
- No bulk rename of Fishbowl to Boardroom, and Chat rooms do not merge into the Fishbowl coordination tables. Fishbowl stays the internal delivery alias per `AUTOPILOT.md`; Chat rooms are a separate user-facing room type.
- No voice, no file attachments, no cross-tenant leaderboards.

## Naming

The feature is **Chat**. The coordination room remains **Boardroom** to the user and **Fishbowl** in code and live metadata, unchanged by this work.

## Architecture

### Data model

Three new tables, all `api_key_hash TEXT NOT NULL` scoped, RLS deny-all (the `chat_messages` pattern: `USING(false)` / `WITH CHECK(false)`), service-role only via `/api/memory-admin` and `/api/chat`, and added to `supabase_realtime`. Migration stamp follows the `YYYYMMDDHHMMSS_name.sql` convention (next stamp after `20260604120000_memory_scopes.sql`).

**`chat_threads`** (one row per conversation, home for provider and model selection):
- `id UUID PK DEFAULT gen_random_uuid()`
- `api_key_hash TEXT NOT NULL`
- `kind TEXT NOT NULL CHECK (kind IN ('human','agent'))`
- `title TEXT`
- `created_by TEXT NOT NULL`
- `participants JSONB NOT NULL DEFAULT '[]'::jsonb` (typed member list: `{ type: 'human' | 'agent_seat', id, seat_id? }`)
- `provider TEXT` (agent threads only; null for human)
- `model TEXT`
- `key_source TEXT CHECK (key_source IN ('passport','local','none'))`
- `local_base_url TEXT` (only when `key_source = 'local'`; non-secret config pointer)
- `credential_label TEXT` (which vault row or local engine label)
- `metadata JSONB NOT NULL DEFAULT '{}'::jsonb`
- `created_at`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- Index `(api_key_hash, kind, updated_at DESC)`

No provider key is ever stored on this table. `provider`, `model`, `key_source`, and `local_base_url` are config pointers only.

**`chat_thread_messages`** (unified message stream, identical shape for both kinds, canonical source of truth for the Chat UI):
- `id UUID PK DEFAULT gen_random_uuid()`
- `api_key_hash TEXT NOT NULL`
- `thread_id UUID NOT NULL REFERENCES chat_threads(id) ON DELETE CASCADE`
- `sender_id TEXT NOT NULL`
- `sender_kind TEXT NOT NULL CHECK (sender_kind IN ('human','agent','system'))`
- `seat_id TEXT` (set when `sender_kind = 'agent'`, links the turn to a Seat for Scoreboard attribution)
- `model TEXT` (the model that produced an agent turn, stamped per message)
- `content TEXT NOT NULL`
- `status TEXT NOT NULL DEFAULT 'complete' CHECK (status IN ('streaming','complete','error'))`
- `metadata JSONB NOT NULL DEFAULT '{}'::jsonb`
- `created_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- Index `(api_key_hash, thread_id, created_at)`

**`chat_providers`** (extensibility registry the dropdown and transport both read):
- `id UUID PK DEFAULT gen_random_uuid()`
- `api_key_hash TEXT NOT NULL`
- `slug TEXT NOT NULL` (matches `user_credentials.platform_slug`: openai, openrouter, groq, togetherai, mistral, perplexity, anthropic, local)
- `label TEXT`
- `transport TEXT NOT NULL CHECK (transport IN ('openai_compatible','anthropic'))`
- `base_url TEXT` (null = SDK default; set for openrouter, groq, together, mistral, perplexity, local)
- `key_source TEXT NOT NULL CHECK (key_source IN ('passport','local','none'))`
- `default_model TEXT`
- `enabled BOOLEAN NOT NULL DEFAULT true`
- `sort_order INT NOT NULL DEFAULT 0`
- `created_at`, `updated_at`
- `UNIQUE (api_key_hash, slug, label)`

Why this scales: UI, realtime, Scoreboard, and orchestrator feed all read `chat_thread_messages` by `(api_key_hash, thread_id)`. Adding a channel is a new `kind`; adding a provider is a `chat_providers` row plus a `user_credentials` key, never a schema change. Provider keys live only in the Passport vault (`user_credentials` by `platform_slug`); a `local` row's encrypted blob may hold `{ base_url, optional token, optional model }`, where `base_url` is non-secret but rides the same encrypted blob to avoid a second store. Multiple local engines use the existing `label` column (`ollama`, `lmstudio`, `vllm`).

### Provider abstraction

One transport function, two branches, driven by `chat_providers.transport`. Implemented as a NEW resolver in `api/lib/chat-transport.ts`, separate from the admin `resolveAiChatModel`, so the locked admin-chat union (`google | openai | anthropic`) and its validation sites in `memory-admin.ts` are never widened.

`resolveChatModel({ transport, model, apiKey, baseUrl })`:
- `transport === 'openai_compatible'` maps to `createOpenAI({ apiKey: apiKey || LOCAL_SENTINEL, baseURL: baseUrl || undefined })(model)`. This one branch covers OpenAI (no baseURL), OpenRouter (`https://openrouter.ai/api/v1`), Groq (`https://api.groq.com/openai/v1`), Together (`https://api.together.xyz/v1`), Mistral (`https://api.mistral.ai/v1`), Perplexity (`https://api.perplexity.ai`), and Local (user-supplied base URL).
- `transport === 'anthropic'` maps to `createAnthropic({ apiKey })(model)`. The lone exception.

The empty-key relaxation (`LOCAL_SENTINEL`, since OpenAI-compatible local servers accept any non-empty key string) is scoped STRICTLY to `key_source === 'local'`. A `PROVIDER_BASE_URLS` map (slug to base URL) lives server-side so the server resolves slug to base URL without trusting the client; `chat_providers.base_url` overrides for custom and local engines.

Spend gate: extend `api/lib/ai-provider-inventory.ts` with chat path-id rows for each new provider plus `decideChatProviderCall` and `getChatProviderPathId`. Local chat is `cost_tier: 'free'`, `default_allowed: true` (mirroring `aiSpendGuard.ts` `local/ollama`). Cloud providers are paid and gated; the endpoint sets `allow_paid` true ONLY when a real vault key is present for that provider. Anything uninventoried stays blocked.

The OpenRouter model dropdown reuses the EXISTING `fetchOpenRouterCatalog` / `parseOpenRouterCatalog` in `api/lib/writerlane/writerlane-live-catalog.ts` via a new server action `chat_provider_models`. No new fetcher.

### Transports: API providers vs Local

Two physically separate transport paths, chosen by `chat_threads.key_source`. They share no fetch code. Invariant, asserted and tested: a `key_source = 'local'` thread NEVER drives a server-side fetch with a vault key, and a `key_source = 'passport'` thread NEVER targets a localhost base URL.

**API providers** (`key_source = 'passport'`, server-proxied SSE) in a NEW endpoint `api/chat.ts` (its own file, NOT a case inside `admin_ai_chat`, so it inherits none of the `AI_CHAT_ENABLED` admin gate and is user-key-required by design):
1. `resolveTenant(req)` verifies the Supabase JWT and resolves `tenant.apiKeyHash`; 401 if null.
2. Require the raw `uc_` / `agt_` UnClick api key in the POST body and enforce proof-of-possession with `hashesEqual(sha256hex(rawKey), tenant.apiKeyHash)` (constant-time); 403 plus audit row on mismatch.
3. Read the thread's `provider`, `key_source`, `credential_label` from `chat_threads` (api_key_hash scoped, fetch-owned-row). Fetch the `user_credentials` row by `(api_key_hash, platform_slug = provider, label)` using the service role; `deriveKey(rawKey, salt)` plus `decrypt` server-side to get the provider key.
4. `decideChatProviderCall` fail-closed gate with `allow_paid` from key presence.
5. `resolveChatModel(...)` then `streamText({ model, system, messages, tools, stopWhen: stepCountIs(N), onError })` and `result.pipeUIMessageStreamToResponse(res)`. The browser receives only tokens; the provider key is never in any response, log, or error.
6. On stream completion (or Stop), persist both turns to `chat_thread_messages` and mirror into continuity via `chat_turn_ingest`, touch `updated_at`, write an audit row.

**Crypto must-fix:** the Passport vault uses 100,000 PBKDF2 iterations with separate hex columns (`encryption_iv`, `encryption_tag`, `encrypted_data`, `encryption_salt`), confirmed in `api/credentials.ts` and `api/backstagepass.ts`. The newer `api/lib/crypto-helpers.ts` uses 210,000 iterations and a dot-joined layout that CANNOT decrypt existing vault rows. The Chat decrypt path MUST use the 100k / hex-column scheme. Extract the 100k variant of `sha256hex` / `hashesEqual` / `deriveKey` / `decrypt` from `backstagepass.ts` into `api/lib/chat-crypto.ts`, and extract `resolveTenant` into `api/lib/passport-auth.ts` (it is currently a private function). Do not silently swap iteration counts, and do not reuse `crypto-helpers.ts`.

**Local providers** (`key_source = 'local'`): inference and any local token never leave the machine. Critical correctness point: the deployed app is served over HTTPS, so a browser-direct fetch from that tab to `http://localhost` is fragile under mixed-content and Private Network Access and fails silently for many users. Two transports, in preference order:
1. Preferred (robust): route the localhost call through a local UnClick runner / MCP server process on the user's machine. The browser talks to the local runner (same machine, no mixed-content), the runner proxies to Ollama (11434), LM Studio (1234), or vLLM (8000) over the OpenAI `/v1/chat/completions` shape.
2. Best-effort fallback: browser-direct fetch with a clear setup card (the exact engine config: `OLLAMA_ORIGINS` plus OpenAI-compat mode, LM Studio CORS, vLLM `--allowed-origins`, and the PNA `Access-Control-Allow-Private-Network` note). A blocked fetch shows an honest remediation message rather than failing silently.

Either way, the model dropdown is populated by `GET <base_url>/v1/models` and only the redacted turn text (never the local token) is POSTed to the server ingest for continuity. Nothing auto-connects; the user clicks an explicit detect button.

### Lanes are channels of traffic, not key gates

A seat lane (`local`, `api`, `subscription`) is only the channel the model traffic flows through. It is the LLM source, nothing more. It never decides who you are, whether you are allowed to use Chat, or whether a turn can be saved. This is a hard rule, learned from the Crews regression where deliberation reached for the plaintext platform key to authenticate its own save call, failed on the session channel, and surfaced as a misleading "not configured / set your API key" error. Chat must not reproduce that.

The rule, stated plainly:

1. **Tenant identity comes from the authenticated session, not a key in hand.** The tenant (`api_key_hash`) is already established on every authenticated path. All Chat persistence and Orchestrator continuity run off that tenancy plus the service role. They never require the plaintext UnClick platform key to write a row.
2. **The plaintext platform key has exactly one job.** In the `api` lane it derives the decryption key for the user's OWN provider key (proof-of-possession then decrypt), so the upstream model call can be made. It is never a gate on running, persisting, deliberating, or reading history. If it is absent, only the upstream call on a paid provider is affected, nothing else.
3. **A provider key is the channel, not a platform gate.** The `api` lane needs the user's OpenRouter/OpenAI/etc. key because that key IS the traffic channel for that lane. That is not key-chasing; it is the source the user chose. Local needs no key; subscription needs no key.
4. **The subscription / council lane follows the same rule.** When Chat routes a council through Crews / MCP sampling, it persists via the established tenancy and deliberates on whatever model the client brings (subscription, api, or local). It must never reach for the platform key to save a run. This is the exact decouple that fixes "the system kept thinking it was API based."
5. **Error copy names the channel, never a missing platform key.** If a lane cannot run, the message says which channel needs attention (a paid provider with no saved key, a local engine not detected, a client without sampling). It never tells a user in an authenticated session to "set" or "get" an UnClick key, because there is no such key to chase.

This is a constraint on every future Chat surface, spend gate, and council wiring, not a one-off.

### Tenant-lane stability (forward-compat with the account-lane fix)

Two unrelated things both got called "lane," so pin the terms down before they collide:

- A **seat lane** (`local`, `api`, `subscription`) is the model traffic channel, described above. It says where a turn's compute came from.
- A **tenant lane** is where an account's data is filed. The platform is moving tenancy off a raw `api_key_hash` and onto a stable per-account `lane_hash` (a hidden id that survives key rotation), because scoping directly on `api_key_hash` strands data when a key is rotated or an account holds more than one key (see `docs/incidents/2026-06-21-tenant-lane-split.md` and the `account_lane_hash` / `consolidate_account_lanes` migrations).

These are independent: a seat lane never decides tenancy, and `lane_hash` never decides compute source.

Chat tables (`chat_threads`, `chat_thread_messages`) and the vault lookup in `api/chat.ts` scope by `api_key_hash` today, which matches the current codebase and is correct until the account-lane fix ships. The moment it does, Chat MUST adopt `lane_hash` for those tables and the vault read, with a backfill, or Chat conversations inherit the exact rotation-stranding bug that fix removes. This is the same "identity is not a key in hand" rule as the seat-lane principle above, applied to tenancy: do not key durable Chat data to a rotatable secret once a stable account lane exists. Track this as a hard dependency on that fix, not an optional follow-up.

### Human-to-human realtime

A `chat_threads.kind = 'human'` thread shares the `chat_thread_messages` stream with `sender_kind = 'human'` and a typed `participants` roster. No model call is ever involved. `chat_thread_messages` is on `supabase_realtime`, but the browser cannot read it directly (RLS deny-all): the Chat window subscribes to the realtime channel filtered by `thread_id` for sub-second fan-out, then on each event calls a service-role-fronted read action `chat_thread_read` (`.eq('api_key_hash', hash)` plus `.eq('thread_id', id)`) for the authoritative row. Sends go through `chat_thread_send`, which validates participant membership, inserts, and mirrors the human turn into `chat_messages` for continuity. Presence and typing ride `metadata` plus a lightweight heartbeat reusing the `channel_status` pattern, and the typing indicator for agents is driven by the real run lifecycle (thinking, calling tools, drafting), not a fake bubble. A lightweight last-read pointer drives unread counts; read affordances are suppressed on agent members.

## Orchestrator integration

Reuse the existing `conversation_turn` pipeline end to end; add only a provenance tag and an anti-crowd cap. Exact edits:

- Mirror every Chat turn (agent or human, API or local) into `chat_messages` via a thin new action `chat_turn_ingest` in `api/memory-admin.ts`, reusing the `admin_conversation_turn_ingest` shape: `redactSensitive(content)` (exported from `api/lib/orchestrator-context.ts`), `status = 'completed'`, `metadata.ingest_source = 'chat'`, `metadata.chat_kind`, `metadata.thread_id`. `role` maps from `sender_kind`: human to 'user', agent to 'assistant', system to 'system' (satisfies the `chat_messages` role CHECK). `chat_thread_messages` stays canonical; `chat_messages` is the redacted, capped continuity mirror.
- `orchestrator_context_read` already pulls `chat_messages` and `conversationTurnToEvent` (`api/lib/orchestrator-context.ts`) maps it to `source_kind: 'conversation_turn'`, so mirrored Chat turns flow into Story / Timeline / Log with the existing Chat filter chip and zero converter changes.
- One load-bearing read-path edit for provenance: the `chat_messages` select in `orchestrator_context_read` currently drops `metadata`. Add `metadata` to that select; add an optional `ingest_source` field to `OrchestratorConversationTurnRow`; carry it through the `directChatTurns` map; in `conversationTurnToEvent` append a tag derived from `metadata.ingest_source` (`chat` vs `subscription`). `source_kind` stays `conversation_turn` so the builder, filters, and the AdminOrchestrator Chat chip keep working unchanged.
- Anti-crowd cap: before the final `.slice(0, smallerLimit)` in `orchestrator_context_read`, cap chat-origin turns to a share of `smallerLimit` so a chatty thread cannot crowd other continuity sources in the compact view.

## Security model and must-fixes

Fail-closed throughout, service_role only, tenant-scoped by `api_key_hash`, no provider key ever reaches the browser.

1. Keys stay write-only in Passport. Provider keys live only in `user_credentials` (AES-256-GCM, PBKDF2 from the raw UnClick api key). Decryption happens server-side in `api/chat.ts` within one invocation; the plaintext key is used only for the upstream `streamText` call and is never written to a response body, log line, error message, chat content, or the browser bundle. Reading keys back to the client for display is the classic BYOK mistake and is forbidden.
2. Proof-of-possession: `api/chat.ts` uses the backstagepass model (`resolveTenant` JWT plus constant-time `hashesEqual`), which is stronger than the `credentials.ts` GET. Do NOT model the browser-facing endpoint on the `credentials.ts` GET.
3. Tenant isolation: every new table is RLS deny-all; every query `.eq('api_key_hash', hash)`; credential and thread rows are filtered by `api_key_hash` AND row id (fetch-owned-row).
4. Fail-closed spend: `api/chat.ts` does not inherit `AI_CHAT_ENABLED`; it is user-key-required by design. `decideChatProviderCall` blocks paid or unknown providers unless a real vault key is present; Local is inventoried free; uninventoried paths stay blocked. Spend guardrails are not polish: the prominent Stop control (saves the partial turn), explicit `@`-mention agent invocation, the live cost meter, and a bounded step count all prevent a runaway loop from spending real money on the user's key.
5. Local vs API separation: the two fetch paths share no code; the local token never leaves the machine; the localhost call terminates in the local runner, not the served HTTPS tab.
6. Crypto scheme must-fix: use the 100k / hex-column vault scheme for decrypt, not the 210k `crypto-helpers.ts` layout.
7. Scoreboard tenant must-fix: change `ROUTING_SCOPE = 'global'` (`api/lib/eval/eval-truth-rate.ts`) to the caller's real `api_key_hash` so `mc_routing_arm_stats` is tenant-isolated; start fresh per tenant with a live `scoreLiveJobs` recompute fallback so the Proof axis is never blank during re-keying (no backfill).
8. Public Scoreboard plus public repo means the rank will be probed. Document that all signals are server-observed and self-reported "done" lowers rank via truth-rate; keep the Local trust badge honest that inference is local but tool calls may still reach the internet.
9. Content hygiene and style: `redactSensitive` runs on every continuity mirror; prompt-injection from chat content cannot escalate because mirrored content is data, not instructions; no em dashes anywhere in new code, comments, migrations, or prompts; match the existing ascii-box section comment style.

## In-chat capabilities (adopt now vs later)

Scoped from the pattern-adoption pass and trimmed by its scope reviewer. Adopt-now lands across phases 1 to 3; later items are explicitly deferred.

Adopt now:
- Slash command menu: a composer overlay where each item maps to an existing first-party tool or `unclick_call` endpoint. Seed set: `/model`, `/seat`, `/memory`, `/save`, `/context`, `/summarize`, `/trace`. Primary value is discoverability.
- Retry / regenerate on an assistant message, with an explicit "spends another call on your key" note; pairs with retry-on-a-different-model via the in-thread switcher.
- Copy and quote-reply on every message.
- Streaming with a prominent Stop that cancels the provider call and saves the partial turn to the Log. Treated as REQUIRED (a spend guardrail). Render plain text immediately, buffer incomplete markdown, defer code blocks to the closing fence, and do not assume uniform chunk sizes.
- In-thread model switcher with OpenRouter first-class; the model used is stamped on each assistant message for Scoreboard attribution and deep-links to Seats / API for key setup.
- Thread lifecycle: New / Continue / Reset / Archive, with a distillation pass to Memory before any clear (never deletes the saved narrative).
- Rolling running-summary compaction with a verbatim recency tail, pruning verbose connector JSON first, run on the user's key; auto-compact threshold from the bound model's context length, plus manual Compact and a pinned-message flag excluded from roll-off.
- Live usage / token-and-cost meter on the user's key (`tokencount_estimate` live, provider usage fields reconcile).
- Structured distilled handoff: a typed object to `save_fact` / `save_identity` and `save_conversation_turn` / `save_session`; raw turns stay only in Chat.
- Unified model picker resolving to `{ provider, baseUrl, model, credentialRef }`, gated by Passport credential presence, keys write-only.
- OpenRouter as a searchable, filterable catalog dropdown (price including free, context, modality) via the connector pattern with `stampMeta` freshness.
- Resilience: typed two-lane errors plus a single clean-429 `Retry-After` retry; auth and context errors surface actionable messages and do NOT retry. No auto-advancing fallback chain in v1.
- Honest, original API-vs-Local privacy-posture labels and a Local/Private trust badge with an honest data-path disclosure.
- Bring-your-own local endpoint with prefilled defaults (Ollama 11434, LM Studio 1234/v1, vLLM 8000/v1) and an explicit detect button; nothing auto-connects.
- Tool-call gating and a Passport-scoped capability allowlist for local agents, confirm-before-execute on write, spend, or send.
- Unified participant model (human and agent_seat members carry a type, agents reference `seat_id`); Chat rooms stay a distinct room type separate from Fishbowl.
- Explicit agent invocation via `@`-mention only; one mention is one agent turn; sequential single-agent turns in multi-party rooms (the mention is the v1 speaker-selection function).
- Agent presence from the existing heartbeat (`last_seen`, `current_status`, `next_checkin`; awaiting-key, rate-limited); typing from the real run lifecycle; a lightweight last-read pointer for unread counts; agent join on assignment with a visible system event and a configurable context boundary.

Deferred to v2 (with reason):
- Global Cmd+K command palette (overlaps the slash menu; needs app-wide indexing).
- Thread branch / fork (highest context-management cost; edit and retry cover the immediate need).
- Edit user turn and resubmit (continuity-rewrite path that can silently lose history; ship after the supersede plumbing is proven by retry).
- Thinking / trace toggle (per-provider reasoning-trace plumbing; couples a UX toggle to scoring before either is stable).
- Suggestion / follow-up chips (canned or spends the user key; ship a static example-prompt empty state instead).
- Per-turn cost / latency / token receipt card (needs reconciled provider usage and a price table; the live meter covers v1).
- Auto-advancing model or provider failover chain (silently re-routes to a model the user did not pick; undercuts transparency).

## The Seats Scoreboard

A new Seats sub-tab ranking agent seats on a transparent, weighted, no-ML v1 formula. Every weight and every reason string is shown in the UI. Score by canonical `agent_id` only; never the blind any-profile-to-any-seat fallback in `mapProfilesToSeats`, and fold fuzzy matches only with a visible matched label.

```
SeatScore = BaseScore x PenaltyGate
```

- `BaseScore` is a weighted mean over the rate families that have data, each scored with a Wilson lower bound (so a 1-of-1 seat cannot top a 40-of-45 seat) and a `MIN_EVENTS` provisional treatment below threshold. Families are excluded and the weights renormalized when missing, never scored as 0. Families and sources:
  - Proof / truth-rate (heaviest): `verified / (verified + false_green)` from `mc_routing_arm_stats` by `arm = assigned_to_agent_id`, or live via `scoreLiveJobs` grouped by assignee. Keep `false_green` (honesty) separate from `stale` (reliability) so going quiet is not scored as lying. Reuse `armLeaderboard()` (`api/lib/eval/router-bandit.ts`) and `summarizeTruthRate()` (`api/lib/score-trace.ts`).
  - Reliability: stale, reopen, rollback, user-corrected rates from `mc_fishbowl_todos` over the window.
  - Recency / liveness: from `mc_fishbowl_profiles`. Until an append-only check-in ledger exists, fold heartbeat into recency and say so in the UI rather than weighting a heartbeat-reliability signal that has no historical data. Reuse `freshnessPenalty` and `missedCheckInPenalty` after extracting them from `AdminAgentsSeatUtils.ts` (currently unexported, frontend-only) into a shared module the server can import.
- `PenaltyGate` is a multiplicative gate for hard failures only (for example blocked routing policy), kept few and individually justified, sanity-checked against real data so a recovering seat is not over-punished by stacked gates.
- Time decay: 7-day half-life over a 30-day window, per-tenant tunable, auto-widen the window when fleet volume is low. Deterministic public tie-break and a visible per-signal breakdown so every rank is explainable from server-observed signals.

Operator inputs (routing policy avoid or blocked, load over threshold, issue text) surface as badges and filters, not folded into earned merit.

Endpoint: a new admin-gated, service_role, `api_key_hash`-scoped `api/seat-scoreboard.ts` mirroring `eval-truth-rate.ts` auth. `Number()`-coerce numerics (Supabase returns them as strings). Filter `user_agent_hint === 'admin-ui'` so dashboard polling does not inflate liveness.

v2 upgrade path (gated, never overrides reliability or truth-rate): once duplicate or bake-off dispatch exists, a comparative rating (Bradley-Terry or Elo) can rank like-for-like outcomes, and a calibrated, sampled, pointwise-default LLM-as-judge can contribute a small capped quality tiebreaker after validation against a human gold set.

## Phased delivery

### Phase 1: Agent-to-human Chat, provider transport, orchestrator feed
- `supabase/migrations/2026MMDD000000_chat_threads.sql`: create the three tables (RLS deny-all, service-role grants, realtime).
- `api/lib/passport-auth.ts`: extract `resolveTenant` (JWT to apiKeyHash) from `backstagepass.ts` into a shared module.
- `api/lib/chat-crypto.ts`: extract the 100k-iteration `sha256hex` / `hashesEqual` / `deriveKey` / `decrypt` from `backstagepass.ts`.
- `api/lib/chat-transport.ts`: `resolveChatModel` (single `openai_compatible` baseURL branch plus `anthropic` branch, local empty-key sentinel, `PROVIDER_BASE_URLS` map).
- `api/chat.ts`: new fail-closed endpoint (`resolveTenant` plus `hashesEqual` proof-of-possession, vault decrypt, `decideChatProviderCall`, `streamText` plus `pipeUIMessageStreamToResponse`, post-stream persist plus `chat_turn_ingest`).
- `api/lib/ai-provider-inventory.ts`: add chat path ids plus `decideChatProviderCall` / `getChatProviderPathId` (local free, cloud paid plus `allow_paid` on key) WITHOUT widening the admin-chat union.
- `api/memory-admin.ts`: add `chat_thread_create`, `chat_thread_read`, `chat_thread_send`, `chat_turn_ingest`; add `metadata` to the `chat_messages` select in `orchestrator_context_read`; thread `ingest_source` through `directChatTurns`; add the per-source cap before the final slice.
- `api/lib/orchestrator-context.ts`: optional `ingest_source` on `OrchestratorConversationTurnRow`; tag in `conversationTurnToEvent`.
- `src/pages/admin/AdminChat.tsx`, `src/components/admin/chatTransportConfig.ts`: Chat page (single agent thread, provider/model dropdown reading `chat_providers`, OpenRouter included, slash menu, retry, copy/quote, streaming with Stop, live meter), streaming client modeled on `AIChatPanel.tsx`, links to Seats / API and Local setup.
- `src/App.tsx`, `src/pages/admin/AdminShell.tsx`: eager import plus nested `path="chat"` route plus a Chat nav item under Orchestrator (match the existing eager-import convention; no React.lazy).
- `api/chat.test.ts`, `api/memory-admin.test.ts`: colocated tests.

### Phase 2: Human-to-human realtime
- `api/memory-admin.ts`: `chat_thread_send` participant-membership validation; `chat_thread_read` authoritative reads; human-turn mirror into `chat_messages` (`metadata.chat_kind = 'human'`).
- `src/components/admin/useChatRealtime.ts`, `src/components/admin/ChatThreadList.tsx`, `src/pages/admin/AdminChat.tsx`: per-thread realtime subscription, thread list, participant roster, composer, `@`-mention picker (humans and agent seats), presence and typing.
- Open identity decision must be resolved first (see Open decisions).

### Phase 3: Seats / API setup, OpenRouter dropdown, Local setup
- `api/memory-admin.ts`: `chat_provider_models` action wiring `fetchOpenRouterCatalog` / `parseOpenRouterCatalog`.
- `api/backstagepass.ts`: add a Local probe (`GET <base_url>/v1/models`) and cloud provider connection-test probes.
- `packages/mcp-server/src/connector-setup.ts`: add a `local` row and an optional `base_url` field.
- `src/pages/admin/AdminAgentsApi.tsx`, `src/pages/admin/AdminAgentsLocal.tsx`, `src/components/admin/chatTransportConfig.ts`: clean API compute page (OpenRouter-first provider section, searchable catalog dropdown) and Local setup page (prefilled defaults, explicit detect, runner-preferred plus browser-direct fallback, exact CORS/PNA copy, fail-soft message). New routes `/admin/agents/api` and `/admin/agents/local`. Chat window links here.

### Phase 4: Seats Scoreboard
- `api/seat-scoreboard.ts`: new service_role, `api_key_hash`-scoped endpoint computing `SeatScore` (Wilson families, penalty gate, decay) reusing `scoreLiveJobs` / `summarizeTruthRate` / `armLeaderboard` and the extracted `freshnessPenalty` / `missedCheckInPenalty`.
- `api/lib/eval/eval-truth-rate.ts`: change `ROUTING_SCOPE` to the caller's `api_key_hash` with a live-recompute fallback.
- `src/pages/admin/AdminScoreboard.tsx`, `src/pages/admin/AdminAgentsSeatUtils.ts`, `src/App.tsx`, `src/pages/admin/AdminShell.tsx`: Scoreboard sub-tab under Seats; render every weight and reason string; operator inputs as badges.
- `api/seat-scoreboard.test.ts`: pure-function scoring tests.

## Testing plan

- `api/` tests run from root vitest. MCP package tests run from `packages/mcp-server` per `CLAUDE.md`.
- `api/chat.test.ts`: proof-of-possession (403 on hash mismatch), vault decrypt round-trip with the 100k scheme, transport selection (openai_compatible vs anthropic), local empty-key sentinel scoped to local only, fail-closed spend (cloud blocked without key), and the invariant that a local thread never triggers a server fetch with a vault key.
- Orchestrator regression: the `metadata` select plus `ingest_source` tag does not change `source_kind` for existing tether turns; the per-source cap leaves non-chat sources intact.
- `api/memory-admin.test.ts`: `chat_thread_create/read/send` tenant scoping and participant-membership validation; `chat_turn_ingest` role mapping and redaction.
- `api/seat-scoreboard.test.ts`: pure scoring (Wilson, missing-family renormalize, penalty gate, numeric coercion, admin-ui filtering, canonical agent_id) and the `ROUTING_SCOPE` tenant-isolation fix.
- No-network discipline: pure-function imports, no live calls; OpenRouter catalog and Local probe calls stay timeout-guarded and never log keys.

## Open decisions

1. Human-to-human identity model (resolve before Phase 2). Every table is `api_key_hash` scoped, so two participants in one room either share one tenant account (clean under current isolation) or live in different accounts (needs a new cross-tenant channel design). Phase 1 (agent-to-human) does not depend on this. Recommendation to confirm with the operator at Phase 2: ship intra-tenant first (operator and the account's seats and collaborators on one key), treat cross-account DM as a separate later feature.
2. Whether to also migrate `backstagepass.ts` and `credentials.ts` onto the shared crypto module in the same PR. Recommendation: extract and use in `api/chat.ts` now; migrate the others separately (own risk surface).
3. Local transport reach: how far to invest in the runner-preferred path versus best-effort browser-direct. Recommendation: ship both with honest labeling; never claim a path the environment blocks.
4. Realtime vs poll for human rooms if Supabase Realtime quota or read-amplification becomes a concern under load.

## Verification log

Confirmed against the live code during planning:
- `resolveTenant` (`api/backstagepass.ts`) verifies the Supabase JWT via `/auth/v1/user`, rejects `uc_`/`agt_` keys, returns `{ userId, email, apiKeyHash }`; it is a private function (extraction required).
- Vault crypto is 100k PBKDF2 with hex columns (`backstagepass.ts`, `credentials.ts`); `crypto-helpers.ts` is 210k with a different layout (cannot decrypt vault rows).
- `redactSensitive` is exported from `api/lib/orchestrator-context.ts`.
- AI SDK deps present: `@ai-sdk/openai ^3.0.53`, `@ai-sdk/anthropic ^3.0.71`, `ai ^6.0.168` (no new dependency for the transport).
- The `chat_messages` migration confirms the RLS deny-all plus realtime-publication pattern to copy; latest migration stamp is `20260604120000_memory_scopes.sql`.
- `conversation_turn` is already an orchestrator `source_kind`, and the AdminOrchestrator Timeline already exposes a Chat filter, so the continuity feed needs only a provenance tag and a cap.
- Corrected during review: `AdminBenchmarks` / `AdminTruthRate` live at `src/pages/admin/`; `armLeaderboard` is under `api/lib/eval/router-bandit.ts`; `summarizeTruthRate` is in `api/lib/score-trace.ts`; `scoreLiveJobs` is in `api/lib/eval/live-score.ts`; `freshnessPenalty` / `missedCheckInPenalty` are unexported in `AdminAgentsSeatUtils.ts` and need extraction.
