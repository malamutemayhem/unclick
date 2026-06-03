# ScopePack: split `api/memory-admin.ts` into per-action modules

Job: Boardroom `3b53873b-5f8c-414d-97ad-79850e1ca579` (REFACTOR, normal).
Owner lane: Worker 20 (final sweep). Status: ScopePack only, no file split performed.
Source register entry: `docs/compliancepass-large-file-risk-register.md` row for
`api/memory-admin.ts` ("Extract operation groups behind shared auth and response helpers").

This is a read-only map, not a refactor. It exists so the actual split can be done
later in small, reversible, behavior-preserving steps with characterization tests in
place first. Do NOT start the full split from this document alone.

## Why this is gated

`api/memory-admin.ts` is one Vercel serverless handler that fans out to roughly 140
top-level actions across about 24 domains. A single big-bang split risks changing
behavior on auth, response shape, or tenant scoping for every admin surface at once.
The safe path is: freeze behavior with tests, then move one leaf group at a time.

## File shape (observed 2026-06-02)

- Size: 11,184 lines, about 456KB.
- Entry point: `export default async function handler(req, res)` at line 2441.
- Dispatch: one `switch (action)` on `req.query.action` (default `"status"`) at line 2460.
- Case labels: 164 total (`grep -cE "^\s*case ['\"]" = 164`).
- Nested method sub-routers (7), each a second `switch` on `req.body.method ?? req.query.method`:
  - `admin_business_context` (line 4232): list, create, update, delete, reorder
  - `admin_sessions` (4319) and `admin_library` (4348): method-shaped reads
  - `admin_build_tasks` (5566): list, get, create, update_status, soft_delete
  - `admin_build_workers` (5705): list, register, update, delete, health_check
  - `reliability_dispatches` (5985): list, get, upsert, claim, release
  - `reliability_heartbeats` (6322): list, publish
- Fall-through groups (many labels, one block): ExpressRoom (8339-8342) and the
  Fishbowl/Boardroom todo/idea/comment group (9637-9652).

## Shared seams (must be extracted first, before any group moves)

These helpers live in lines 1-2440 and are used across many cases. They are the
contract every extracted module must keep importing unchanged:

- Auth/identity: `bearerFrom` (1142), `resolveSessionUser` (1155),
  `resolveSessionTenant` (1290), `resolveApiKeyHash` (1365), `sha256hex` (228).
- Crypto/creds: `deriveKey` (1054), `encryptString` (1058), `decryptString` (1069),
  `decodeProjectRef` (1079), `deriveAiKeyEncryptionKey` (1229), `decryptAiApiKey` (1235).
- Schema/install: `loadSchemaSql` (1097), `installSchema` (1111), `verifySchema` (1131).
- Memory helpers: `queueMemoryEmbedding` (766), `shouldSkipMemoryEmbedding` (745),
  `readOperatorTimeContext` (287), `readAiStylePreferences` (436),
  `parseAdminLibraryRefreshOptions` (543), `buildAdminLibraryRefreshPayload` (589),
  `readAdminLibraryTaxonomySources` (600), `upsertAdminLibraryDoc` (680).
- Coordination: `postFishbowlEvent` (1407), `resolveUnClickConnectVisibleWorkers` (1479).
- AI chat: `resolveTenantAiChatSettings` (1253), `buildAiChatContext` (1914),
  `resolveAiChatModel` (1946), `buildAdminChatTools` (1996), `buildAdminChatSystemPrompt` (2337).

Recommended first move: lift these into `api/lib/memory-admin/shared/` (auth.ts,
crypto.ts, schema.ts, embeddings.ts, ai-chat.ts) with no behavior change, re-exported
back into `memory-admin.ts`. Nothing else moves in that PR.

## Domain group inventory (candidate modules)

Each row is a contiguous block of cases that can become one module behind the shared
seams above. Line numbers are the first case in the group.

| # | Candidate module | First line | Actions (representative) |
|---|---|---|---|
| 1 | memory-read | 2461 | admin_get_setup_guide, status, business_context, sessions, facts, library, library_doc, conversations, code, search |
| 2 | memory-write | 2701 | delete_fact, delete_session, update_business_context, admin_update_fact, admin_fact_add |
| 3 | agents-admin | 2765 | admin_agents_list, admin_agent_get/create/update/delete/tools_update/memory_update/duplicate/activity/resolve, admin_connectors_list |
| 4 | byod-setup | 3206 | setup_status, setup, disconnect, config, device_check |
| 5 | devices-auth | 3409 | list_devices, auth_device_list, auth_device_revoke, admin_check_connection, remove_device |
| 6 | tenant-settings | 3585 | tenant_settings_get/set, admin_get_autoload_settings (6574), admin_update_autoload_settings (6700), operator_timezone_update (4634), ai_style_update (4687) |
| 7 | memory-metrics | 3624 | admin_memory_load_metrics, admin_missed_context_alerts, admin_generate_config, health_summary (4117), admin_memory_activity (4429) |
| 8 | conflicts | 3902 | conflict_detect, conflict_check, conflict_dismiss, conflict_resolve, check_duplicates |
| 9 | admin-context | 4232 | admin_business_context (nested), admin_sessions, admin_library, admin_profile, admin_context_apply_template (5280), admin_session_preview (5360) |
| 10 | account-keys | 4724 | generate_api_key, reset_api_key, delete_account, admin_set_app_state (5026) |
| 11 | tool-detect | 4970 | admin_tools, tool_detect, admin_tool_scan, dismiss_tool_nudge, log_tool_event (3548) |
| 12 | maintenance | 5403 | admin_clear_all, admin_export_all, nightly_decay |
| 13 | build-desk | 5566 | admin_build_tasks (nested), admin_build_workers (nested), admin_build_dispatch, admin_unclick_connect_dry_run, admin_unclick_connect_commit |
| 14 | reliability | 5985 | reliability_dispatches (nested), reliability_heartbeats (nested), reliability_reclaim_stale (6499) |
| 15 | ai-chat-channel | 6743 | admin_ai_chat, admin_channel_send/poll/status/heartbeat, admin_conversation_turn_ingest, admin_search (6978), admin_bug_reports (7057) |
| 16 | crews | 7074 | list_agents, clone_agent, update_agent, create_agent, list_crews, create_crew, update_crew, delete_crew, start_crew_run, finish_crew_run, get_run, list_runs |
| 17 | testpass | 7740 | list_testpass_runs/packs, get_testpass_pack/run, start_testpass_run, get_report, list_reports, abandon_report |
| 18 | signals | 8101 | list_signals, mark_signal_read, mark_many_signals_read, mark_all_read, get_signal_preferences, update_signal_preferences, check_signals |
| 19 | expressroom | 8339 | expressroom_create_draft/list_drafts/update_draft/promote_to_todo |
| 20 | fishbowl-coord | 8678 | fishbowl_admin_claim/set_emoji/set_status/post/read, orchestrator_context_read (9361), autopilot_record_event (8906), autopilot_zero_touch_metrics (8944), fishbowl_* todo/idea/comment group (9637-9652) |

Note: group 20 is internally named "fishbowl" in code. Per CLAUDE.md this is the
retired internal alias for Boardroom and must stay as the code/delivery address. Do
NOT rename it to Boardroom during this refactor.

## Smallest safe first chip (do this, nothing more)

1. Add characterization tests around the two highest-traffic read aggregators before
   moving any code: `status` (line 2472, the default action, aggregates per-layer
   counts and decay tiers) and `health_summary` (line 4117). Capture current JSON
   response shape for a known fixture so any later move is provably behavior-preserving.
   Co-locate next to the existing `api/memory-admin-ai-style.test.ts` and
   `api/memory-admin-refresh.test.ts`.
2. Only after those tests are green, extract the shared seams into
   `api/lib/memory-admin/shared/` (no case moves). Re-export so `memory-admin.ts` is
   unchanged behaviorally.
3. Then move exactly one leaf group with no nested method router and no cross-group
   helper of its own: group 19 (expressroom) or group 12 (maintenance) are the
   cleanest first candidates. One group per PR.

## Non-goals / stop conditions

- No schema, auth, or secret changes. This refactor preserves behavior only.
- No nested-method group (build-desk, reliability, admin-context) moves until at least
  two leaf groups have shipped and stayed green.
- Do not touch `packages/memory-mcp` or memory backend code: that surface is owned by
  Worker 9 (PR #1250 bitemporal/parity work). This job is `api/` only.
- Stop and re-scope if any extracted module would need to import a sibling group's
  private helper; that means the seam was drawn wrong.

## Verification gates (per extraction PR)

- `cd` to repo root and run the website test suite covering `api/**` (root Vitest
  config includes `api/**`).
- The new characterization tests for `status` and `health_summary` must stay green.
- Response shape diff for the moved group must be empty against the pre-move fixture.
- Draft PR first; one domain group per PR; revertable in a single `git revert`.
