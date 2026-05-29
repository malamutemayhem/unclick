# CompliancePass Large-File Risk Register

CompliancePass flags large source files because they slow review, make ownership harder to see, and increase merge risk. This register does not make the risk disappear. It gives reviewers a stable place to see why the files are large today and what should reduce them later.

## Current High-Risk Files

| File | Current reason | Owner lane | Reduction path |
| --- | --- | --- | --- |
| `packages/mcp-server/src/tool-wiring.ts` | Central generated-style MCP tool registry and handler wiring. | MCP server | Move tool families into smaller registries while keeping the public tool names stable. |
| `api/memory-admin.ts` | Admin memory API surface combines auth, search, graph, and maintenance operations. | Memory/Admin API | Extract operation groups behind shared auth and response helpers. |
| `scripts/pinballwake-autonomous-runner.mjs` | Autonomous runner policy, queue handling, and proof logic live in one script. | PinballWake/Autopilot | Split policy evaluation, queue hydration, and proof emission into separate modules. |
| `src/components/Tools.tsx` | Large tool catalog UI with filtering, layout, and detail rendering in one component. | Frontend catalog | Extract filter state, result list, and tool detail panels. |
| `packages/mcp-server/src/server.ts` | MCP server bootstrap and compatibility glue are still concentrated. | MCP server | Move transport setup and tool execution helpers out of the bootstrap file. |
| `src/pages/admin/AdminOrchestrator.tsx` | Admin orchestration view mixes data loading, state summaries, and dense UI sections. | Admin UI | Split into panels for status, queue, continuity, and proof. |
| `packages/mcp-server/src/catalog.ts` | Catalog metadata is stored in a broad static module. | MCP server | Generate or shard catalog metadata by tool family. |
| `api/fishbowl-watcher.ts` | Watcher combines event hydration, filtering, and persistence logic. | Orchestrator/Fishbowl | Extract source adapters and decision helpers. |
| `src/pages/admin/AdminKeychain.tsx` | Keychain admin view mixes inventory, rotation, and detail UI. | Admin UI/RotatePass | Split provider inventory, key details, and rotation workflows. |
| `api/lib/orchestrator-context.ts` | Orchestrator context assembly combines live source reads and compaction rules. | Orchestrator | Separate source readers, scoring, and response shaping. |
| `src/pages/admin/AdminJobs.tsx` | Jobs admin page combines queue state, filters, claim actions, and proof display. | Admin UI/Jobs | Extract queue table, claim drawer, and proof components. |
| `apps/api/src/db/index.ts` | Database helpers and schema access are concentrated. | API platform | Group helpers by domain and keep shared pool/config in one module. |
| `packages/mcp-server/src/memory/supabase.ts` | Memory persistence adapter includes many Supabase operations. | Memory MCP | Split fact, session, identity, and search operations. |
| `scripts/fleet-throughput-watch.mjs` | Fleet watch script combines measurement, thresholds, and reporting. | Fleet/Autopilot | Extract metrics collection and report formatting. |
| `src/pages/admin/AdminJobsmith.tsx` | Jobsmith UI combines builder, preview, and dispatch behavior. | Admin UI/Jobsmith | Split form state, preview, and dispatch proof panels. |

## Guardrail

Do not treat this register as permission to grow these files. It is a live reduction queue for maintainability work, and CompliancePass should continue to report the risk until the files are actually smaller or owned by generated-code tooling.
