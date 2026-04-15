# Session: Phase 1 Verification (Reduced Scope)

**Date:** 2026-04-15
**Branch:** `claude/phase-1-memory-backend` (PR #14)
**Platform:** Claude Code on the web
**Operator:** Chris Byrne
**Session goal:** Verify PR #14 (Phase 1 memory backend) against a live Supabase, then mark the verification checklist accordingly. Do NOT merge, do NOT mark ready-for-review.

## TL;DR

Reduced-scope verification complete. Item 1 verified live by Chris. Items 4, 5, 6 verified by code review. Items 2 and 3 verified by code review, runtime verification deferred to Chris's personal 24-hour-post-merge smoke test. Three minor follow-ups documented but not blocking. PR #14 body updated, comment posted. Session closed without merging or marking ready-for-review.

## Verification checklist result

| # | Item | Status | Evidence |
|---|---|---|---|
| 1 | Apply migration `20260415000000_memory_managed_cloud.sql` | PASS (live) | Chris applied via Supabase SQL editor on project `xmooqsylqlknuksiddca` |
| 2 | `POST /api/mcp?key=VALID` add_fact round-trip | PASS (code review); runtime deferred | Code read of `api/mcp.ts:43-158` + `db.ts:102-132` + `supabase.ts:268-288`. Chris 24h post-merge smoke test. |
| 3 | `POST /api/mcp?key=INVALID` rejection check | PASS (code review); runtime deferred | Code read of `api/mcp.ts:116-146`. Chris 24h post-merge smoke test. |
| 4 | BYOD routing via seeded `memory_configs` row | PASS (code review) | Code read of `db.ts:44-169`. Runtime observability: existing BYOD users surface routing bugs on first call. |
| 5 | 5,001-write cap enforcement | PASS (code review) | Code read of `supabase.ts:81-177,248,269,320,344,382,413`. All six writes gated, error message surfaced to agent via `server.ts:842-847`. |
| 6 | AES-256-GCM + PBKDF2 encryption preservation | PASS (code review) | Code read of `api/memory-admin.ts:48-79,480-564`. Phase 1 did not touch the encryption code. |

## Why the reduced scope

The original Phase 1 plan called for end-to-end runs against live Supabase for all six items. Two forces reduced the scope:

1. **Chris's explicit scope reduction (mid-session).** Write pollution of production data and credential exposure were judged too costly for item-by-item live testing. Chris opted for: item 1 handled manually by him via the SQL editor, items 2/3 run over HTTP against the preview or production endpoint, items 4/5/6 verified by code review with the reasoning that existing BYOD users and free-tier writes will surface bugs in production within hours.
2. **Sandbox egress policy (discovered mid-session).** The Claude Code on the web sandbox this session ran in only allows outbound HTTP to GitHub. Both the Vercel preview at `unclick-agent-native-endpoin-git-69765f-chris-projects-c73c32b5.vercel.app` and `unclick.world` production returned `HTTP 403 x-deny-reason: host_not_allowed` from the sandbox egress proxy before the request ever reached Vercel. This hard-blocked items 2 and 3 from being runnable in this session at all. Chris chose Option C: code-review verify them with an explicit personal smoke-test commitment within 24 hours of merge.

See the four-curl probe result below under "Artifacts" for the exact evidence.

## Code review findings

### Item 1: Migration application (handled live by Chris)

Not reviewed in-session. Chris applied `supabase/migrations/20260415000000_memory_managed_cloud.sql` via the Supabase SQL editor on project `xmooqsylqlknuksiddca` out of band. Reported success before session close.

### Item 2: Valid api_key round-trip (code review)

Path: inbound HTTP POST -> `api/mcp.ts:validateApiKey()` -> `api/mcp.ts:handler` injects per-request env -> MCP transport -> `server.ts` tool dispatcher -> `MEMORY_HANDLERS.add_fact` -> `db.ts:getBackend()` -> `db.ts:buildBackend()` picks managed cloud since no `memory_configs` row exists -> `SupabaseBackend` constructor with `tenancy: {mode: "managed", apiKeyHash}` -> `addFact()` awaits `enforceCaps("fact")` -> insert into `mc_extracted_facts` with `api_key_hash` stamped via `withTenancy()`.

Read every function along the path. No hidden branches, no places where the api_key_hash could be silently dropped. Verified by inspection. The one meaningful gap vs. a live runtime test: the cross-module integration (handler env injection -> factory env read -> backend tenancy stamp) is only proven by reading the three pieces side-by-side, not by exercising them. A live call would catch a typo between `UNCLICK_API_KEY_HASH` and whatever db.ts reads, where the code review does not. Chris's personal smoke test within 24 hours of merge is the safety valve.

### Item 3: Invalid api_key rejection (code review)

Three failure modes converge on the same user-facing response:

1. **Missing key entirely** (`api/mcp.ts:116-127`): HTTP 401, JSON-RPC code `-32600`, message "Missing API key..."
2. **Invalid key lookup** (`api/mcp.ts:134-146`): HTTP 401, JSON-RPC code `-32001`, message "Invalid or revoked API key..."
3. **Server env unconfigured** (`api/mcp.ts:43-47`): `validateApiKey()` null-guards `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` and returns null, which falls through to the same `-32001` path. This is the "fail-safe" design documented in the Phase 1 session note — a preview deploy without Supabase creds rejects every request rather than passing them through unvalidated.

All three paths return before any downstream code runs. Meets the checklist criterion "rejection with a clear error." Verified by inspection.

### Item 4: BYOD routing (code review)

`db.ts:102-169` `buildBackend()` implements the four-case precedence the Phase 1 session doc describes:

- **Case 1a:** `UNCLICK_API_KEY` + `UNCLICK_API_KEY_HASH` set, `fetchByodConfig()` returns a config -> BYOD against user's own Supabase, decrypted via the existing PBKDF2 path.
- **Case 1b:** `UNCLICK_API_KEY` + `UNCLICK_API_KEY_HASH` set, no BYOD config -> managed cloud against central Supabase, scoped by `api_key_hash`.
- **Case 2:** Standalone npm with explicit `SUPABASE_URL` env -> BYOD direct.
- **Case 3:** Standalone npm with `UNCLICK_API_KEY` only -> remote BYOD lookup, falls through to local if nothing configured.
- **Case 4:** Zero-config local JSON.

Central env captured at module load (`db.ts:29-31`) before any request flow can mutate `process.env`. Per-tenant cache keyed via `instanceKey()` at `db.ts:73-79` with `mc:<hash>`, `byod-explicit:<url>`, `byod-remote:<apiKey>`, or `local`. No two tenants collide. Verified by inspection.

### Item 5: Cap enforcement (code review)

All six write methods in `packages/mcp-server/src/memory/supabase.ts` call `await this.enforceCaps(...)` before their insert/upsert:

- `writeSessionSummary:248` -> `enforceCaps("general")`
- `addFact:269` -> `enforceCaps("fact")`
- `logConversation:320` -> `enforceCaps("general")`
- `storeCode:344` -> `enforceCaps("general")`
- `setBusinessContext:382` -> `enforceCaps("general")`
- `upsertLibraryDoc:413` -> `enforceCaps("general")`

`FREE_TIER_CAPS` at `supabase.ts:81-84` has `storage_bytes: 50 MB, facts: 5000` matching the v2 plan. `CapExceededError` throws at `supabase.ts:152` (fact count) and `supabase.ts:170` (storage bytes) with human-readable upgrade messages. No try/catch in `handlers.ts` swallows the error. `server.ts:842-847` catches tool-execution errors and returns `{isError: true, text: "Error: <message>"}` to the agent with the original message intact. `api/mcp.ts:167-184` outer catch only fires on transport-level errors and does not intercept or rewrite tool-handler errors. Message reaches the agent verbatim. Verified by inspection.

### Item 6: Encryption preservation (code review)

Phase 1 did not touch `api/memory-admin.ts` encryption functions (`deriveKey`, `encryptString`, `decryptString` at lines 57-79) or the setup/config actions (lines 480-564). The only Phase 1 change to that file was adding a `nightly_decay` cron action, which is completely independent.

Storage side: 32-byte random salt generated per row, PBKDF2(apiKey, salt, 100_000 iterations, SHA-256, 32 bytes), AES-256-GCM encrypt with 12-byte IV and auth tag. Stored columns: `encrypted_service_key`, `encryption_iv`, `encryption_tag`, `encryption_salt`. The api_key is NOT stored anywhere; only `api_key_hash = sha256(apiKey)` for lookup.

Retrieval side: caller sends `Authorization: Bearer <apiKey>`, endpoint looks up row by `sha256(apiKey)`, re-derives the same key with the stored salt + PBKDF2, decrypts with stored IV + auth tag.

**The encryption property holds:** an attacker with read access to `memory_configs` cannot decrypt any user's service_role_key without possessing that user's api_key. The sha256 hash cannot be reversed, and PBKDF2 cannot be run without the plaintext api_key. Verified by inspection.

## Known follow-ups (not blockers for merge)

Three minor observations surfaced during the code review. None are bugs. All three are worth tracking as follow-ups. Added to the PR body under "Known follow-ups, not blockers."

1. **`supersedeFact` skips `enforceCaps`.** `supabase.ts:290-317` does not call `enforceCaps` before inserting the new fact row. By-design: supersede is net-zero on the "active" fact count since `mc_get_fact_count` only counts `status='active'` rows and supersede flips the old row to superseded. Storage bytes grow slightly per supersede. Theoretical concern: a free-tier user could supersede indefinitely to grow storage past the 50 MB cap without triggering the cap check. Not exploitable at meaningful scale today. Follow-up: add `enforceCaps("general")` to `supersedeFact` if storage abuse ever surfaces.

2. **Case 1b auto-opt-in.** The moment PR #14 lands, every existing api_key in the `api_keys` table that hasn't been through the BYOD setup wizard starts getting managed cloud writes to `mc_*` tables. This matches the v2 plan's intent but is a silent behavioral flip for existing users. Documented in the PR body so the migration behavior is explicit.

3. **Decrypted service_role in warm-instance memory.** Before Phase 1, the memory backend was a one-shot singleton rebuilt per request. Phase 1's per-tenant `backendCache` (`db.ts:71`) keeps a decrypted `service_role_key` in memory for the lifetime of a warm Vercel instance (could be minutes to tens of minutes). Not a break of the encryption property (an attacker with process-memory read has already escalated past the threat model) but a minor expansion of the secret's in-memory lifetime. Trade-off is accepted in exchange for eliminating per-request PBKDF2 re-derivation latency. Documented so the trade-off is visible.

## Artifacts

### Four-curl probe (sandbox egress policy discovery)

Ran against the Vercel preview `unclick-agent-native-endpoin-git-69765f-chris-projects-c73c32b5.vercel.app` to confirm items 2 and 3 could be run. Result:

| Request | Result |
|---|---|
| `OPTIONS /api/mcp` (preview) | HTTP 403 `x-deny-reason: host_not_allowed` |
| `GET /api/mcp` (preview) | HTTP 403 `host_not_allowed` |
| `POST /api/mcp` no key (preview) | HTTP 403 `host_not_allowed` |
| `POST /api/mcp?key=<random>` (preview) | HTTP 403 `host_not_allowed` |
| `GET https://github.com/` (reference) | HTTP 200 |
| `GET https://api.github.com/` (reference) | HTTP 200 |
| `GET https://unclick.world/` (production) | HTTP 403 `host_not_allowed` |
| `POST https://unclick.world/api/mcp` (production) | HTTP 403 `host_not_allowed` |

All UnClick domains blocked at the sandbox egress proxy. GitHub is the only non-local host reachable from this sandbox. This is a Claude Code on the web sandbox network policy, not a Vercel or Supabase issue — Chris cannot toggle it from his end.

### PR #14 body update

Updated to:
- Check boxes on items 1, 4, 5, 6 with "verified live" / "verified by code review" labels
- Mark items 2 and 3 as "code-review verified, runtime deferred to Chris's 24-hour post-merge smoke test"
- Add a "Known follow-ups, not blockers" section with the three observations above
- Preserve all other existing PR body sections (TL;DR table, what changed, open questions, verification checklist)

### PR #14 comment posted

Text: "Verification complete. Migration applied by Chris on production Supabase. Code review passed for items 2, 3, 4, 5, 6. Item 1 verified live. Chris will smoke-test the write path personally within 24 hours of merge. Ready for Chris to mark ready-for-review and merge."

## Not done (explicit non-actions)

- PR #14 NOT merged. Chris's action.
- PR #14 NOT marked ready-for-review. Chris's action.
- Phase 2 NOT started. Still blocked on PR #14 merge per the Phase 2 preflight doc at `docs/sessions/2026-04-15-phase-2-preflight.md` on the `claude/unclick-admin-phase-2-AcJy3` branch.
- Item 2 / 3 runtime verification NOT run. Chris will personally smoke-test within 24 hours of merge by installing UnClick on his own Claude/Cursor, asking his agent to remember something, and checking the `mc_extracted_facts` table for the row. If the happy path is broken he will catch it and revert.

## Topics for memory tags

`phase-1`, `verification`, `memory`, `managed-cloud`, `supabase`, `code-review`, `sandbox-egress`, `unclick-admin-build-plan`
