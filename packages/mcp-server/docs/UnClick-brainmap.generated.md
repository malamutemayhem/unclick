# UnClick Ecosystem Brainmap

Internal admin only. Auto-generated from tracked source so new AI seats can understand UnClick without a separate handover.

## Brainmap Data Contract

- Schema: `brainmap-v2`.
- This markdown is paired with `docs/UnClick-brainmap.generated.json` for the private admin visual tree.
- The JSON inventory is grouped by division so seats can quickly discover tools, rooms, wrappers, workers, modules, passes, ledgers, and source-of-truth surfaces.
- The generator reruns in CI and on a schedule. New tracked surfaces appear after the generator sees their source paths.

## Source Manifest

| Source | Hash | Bytes |
| --- | --- | --- |
| AUTOPILOT.md | missing | 0 |
| FLEET_SYNC.md | missing | 0 |
| docs/unclick-context-boot-packet.md | missing | 0 |
| docs/agent-observability.md | missing | 0 |
| docs/pinballwake-nudgeonly-api.md | missing | 0 |
| docs/pinballwake-igniteonly-api.md | missing | 0 |
| docs/fleet-worker-roles.md | missing | 0 |
| docs/adr/0005-two-layer-admin-gating.md | missing | 0 |
| docs/adr/0006-orchestrator-is-user-chat.md | missing | 0 |
| src/App.tsx | missing | 0 |
| src/pages/admin/AdminShell.tsx | missing | 0 |
| src/pages/admin/AdminControlTower.tsx | missing | 0 |
| src/lib/controltower.ts | missing | 0 |
| docs/prd/controltower.md | missing | 0 |
| src/pages/admin/AdminSkills.tsx | missing | 0 |
| src/lib/skillLibrary.ts | missing | 0 |
| src/lib/skillLibrarySeeds.ts | missing | 0 |
| .github/workflows/ci.yml | missing | 0 |
| .github/workflows/brainmap-auto-update.yml | missing | 0 |
| .github/workflows/continuous-improvement-watch.yml | missing | 0 |
| package.json | 0d42bc8a0ea2 | 3519 |

## Division Index

| Division | Meaning | Items |
| --- | --- | --- |
| Admin surfaces | Private operator views and internal control panels. | 0 |
| Public surfaces | Public product, docs, marketplace, and user-facing routes. | 0 |
| Tools | MCP and gateway capabilities available to seats. | 0 |
| Rooms | PinballWake and Boardroom lanes that route work. | 0 |
| Workers and seats | Human and AI roles that move work through the system. | 11 |
| Passes and gates | Quality, proof, safety, and fidelity checks. | 5 |
| Wrappers and protocols | Thin harnesses, bridges, policies, and routing helpers. | 3 |
| Automations | Scheduled jobs, wake routes, cron workflows, and recurring checks. | 0 |
| Ledgers and proof | Receipts, audits, evidence, and proof-of-work surfaces. | 1 |
| Source of truth | Canonical state, queue, memory, and context surfaces. | 3 |
| Modules and apps | Apps, packages, and product modules that make up UnClick. | 3 |
| Launch and onboarding | Launchpad, Heartbeat, Brainmap, and first-seat orientation. | 5 |

## UnClick Structure

- UnClick is the platform: tools, memory, agents, proof, and admin surfaces.
- Launchpad is the control hub for Autopilot work.
- Crews Council induction is a Launchpad prompt, not a new Pass product; it uses Council Lite for light dissent and asks for full Crews only when judgement is needed.
- Rooms are the operational stages that route work through research, planning, build, proof, review, safety, merge, publish, repair, and improvement.
- Heartbeat Master at `/admin/agents/heartbeat` teaches scheduled AI seats how to pulse safely.
- Heartbeat policy changes must update the `/admin/agents/heartbeat` source and verify the MASTER induction text. Memory and Brainmap entries are pointers, not the runtime MASTER.
- Ecosystem Brainmap at `/admin/brainmap` teaches seats what the system is and what each surface means.

## Seat Induction Path

Every seat should pass through this path before acting on UnClick work. It keeps Brainmap complementary to Launchpad induction: Brainmap explains the map, Launchpad chooses the lane, and Jobs/proof decide what can move.

| Step | Action | Why it matters | Surface | Pointer |
| --- | --- | --- | --- | --- |
| 1 | Load UnClick Memory | Read standing rules, recent facts, and source-linked context before interpreting the work. | UnClick Memory | mcp__unclick__.load_memory |
| 2 | Log, then read Orchestrator | Save the accepted turn, read Orchestrator continuity, and treat it as context rather than queue authority. | Orchestrator | /admin/orchestrator |
| 3 | Open Boardroom Jobs | Use Jobs as the source of truth for active work, proof state, blockers, and safe next action. | Boardroom Jobs | /admin/jobs |
| 4 | Check Control Tower | For big jobs, use Control Tower to split work into worker lanes, copy boxes, stale takeovers, and proof paths. | Control Tower | /admin/controltower |
| 5 | Pass through Brainmap | Use the generated ecosystem map to find current routes, tools, rooms, workers, aliases, and safety gates. | Ecosystem Brainmap | /admin/brainmap |
| 6 | Choose the Launchpad lane | Route the work through the safest current Autopilot lane before acting or handing off. | Launchpad | /admin/pinballwake |
| 7 | Ask Crews Council if needed | Run Council Lite on material work, then prompt full Crews Council for launch, risk, mixed proof, or broad XPass evidence. | Crews Council | scripts/pinballwake-launchpad-room.mjs |
| 8 | Check proof gates | Name required PR, commit, test, CI, live, screenshot, CopyRoom, or NO_CODE_NEEDED proof before closing. | Proof Ledger | docs/agent-observability.md |
| 9 | Dogtest the outcome | Run the focused local tests and browser or live proof that match the touched surface. | XPass and CI | package.json |
| 10 | Reply and log proof | End with PASS or BLOCKER, proof link or id, cleanup state, and next safe step. | Boardroom and Orchestrator | /admin/jobs |

## Pages and Meaning

| Route | Page | Meaning | Source |
| --- | --- | --- | --- |

## Tool Families and Meaning

| Tool family | Meaning | Source |
| --- | --- | --- |

## Tool and Worker Tree

| Division | Kind | Name | Meaning | Route | Source |
| --- | --- | --- | --- | --- | --- |
| Launch and onboarding | coordination layer | Control Tower | Big-job coordinator that creates worker lanes, Master Copy Box prompts, worker counts, stale takeovers, and XGate/XPass/Crews proof paths. | /admin/controltower | src/pages/admin/AdminControlTower.tsx |
| Launch and onboarding | judgement prompt | Crews Council Induction | Launchpad prompt that runs Council Lite on material work and asks for a full Crews Council only when launch, risk, mixed proof, or broad XPass evidence needs judgement. | /admin/pinballwake | scripts/pinballwake-launchpad-room.mjs |
| Launch and onboarding | map | Ecosystem Brainmap | Generated sitemap and system map that teaches seats what UnClick contains. | /admin/brainmap | src/pages/admin/AdminBrainmap.tsx |
| Launch and onboarding | policy | Heartbeat Master | Canonical schedule prompt and procedure for safe heartbeat seats. | /admin/agents/heartbeat | src/pages/admin/AdminSeatHeartbeat.tsx |
| Launch and onboarding | route | Launchpad | Control hub that points seats to the next safe operating lane. | /admin/pinballwake | scripts/pinballwake-launchpad-room.mjs |
| Ledgers and proof | ledger | Proof Ledger | Structured evidence, proof freshness, receipts, and DONE trust surface. | - | docs/agent-observability.md |
| Modules and apps | app | JobSmith | CV, cover-letter, job application, and rules/checklist engine. | /admin/jobsmith | apps/jobsmith/package.json |
| Modules and apps | automation module | AutoPilotKit | Internal automation bolt-on for proof-first work motion. | - | AUTOPILOT.md |
| Modules and apps | skill library | Skills Library | Read-only starter pack of UnClick-native skills, hardwired rails, hybrid workflows, and portable skill packages. | /admin/skills | src/pages/admin/AdminSkills.tsx |
| Passes and gates | component source gate | UIPass Toolbox | Curated UI source registry and proof scoreboard for shadcn, Radix, React Aria, Base UI, Floating UI, Motion, 21st.dev, Magic UI, Aceternity, Origin UI, and advisory design intelligence. | - | packages/uxpass/src/ui-toolbox.ts |
| Passes and gates | fidelity gate | CopyRoom | Exact-copy room for code, docs, tables, notes, and source text so seats do not retype drift-prone material. | - | docs/UnClick-brainmap.generated.md |
| Passes and gates | fidelity gate | FidelityPass | Checks exactness and invariant preservation when copying, refactoring, or translating content. | - | scripts/fidelitycopy.test.mjs |
| Passes and gates | judgment gate | CommonSensePass | Plain-reasoning gate used before healthy, done, merge-ready, or PASS claims. | - | api/commonsensepass-bridge.test.ts |
| Passes and gates | wake gate | WakePass | Verifies ACKs, stale handoffs, and worker wake requests before motion claims. | - | docs/pinballwake-igniteonly-api.md |
| Source of truth | context | Orchestrator | Continuity stream and story layer that helps seats understand what happened. | /admin/orchestrator | src/pages/admin/AdminOrchestrator.tsx |
| Source of truth | memory | Memory Library | Source-linked facts, sessions, context, and generated memory shelves. | /admin/memory | src/pages/admin/AdminMemory.tsx |
| Source of truth | queue | Boardroom Jobs | Primary work source for open, in-progress, done, and dropped chips. | /admin/jobs | src/pages/admin/AdminJobs.tsx |
| Workers and seats | seat | Claude Reviewer Seat | External reviewer lane used for independent checks and proof review. | - | docs/fleet-worker-roles.md |
| Workers and seats | seat | Codex Builder Seat | Codex lane used for scoped implementation, routing, and proof updates. | - | docs/fleet-worker-roles.md |
| Workers and seats | seat | Cursor Builder Seat | External builder lane used for scoped code work and PRs. | - | docs/fleet-worker-roles.md |
| Workers and seats | worker role | Builder | Implements focused code or content changes from a scoped packet. | - | docs/fleet-worker-roles.md |
| Workers and seats | worker role | Coordinator | Routes work, chooses the next room, and keeps lanes aligned. | - | docs/fleet-worker-roles.md |
| Workers and seats | worker role | Improver | Turns repeated pain into system improvements. | - | docs/fleet-worker-roles.md |
| Workers and seats | worker role | Ledger | Records proof, receipts, approvals, and rollback evidence. | - | docs/fleet-worker-roles.md |
| Workers and seats | worker role | Publisher | Moves approved work toward deployment and public proof. | - | docs/fleet-worker-roles.md |
| Workers and seats | worker role | Reviewer | Checks quality, regressions, and missing tests. | - | docs/fleet-worker-roles.md |
| Workers and seats | worker role | Safety Checker | Protects secrets, auth, destructive actions, and release gates. | - | docs/fleet-worker-roles.md |
| Workers and seats | worker role | Tester | Runs proof and reports what passed or blocked. | - | docs/fleet-worker-roles.md |
| Wrappers and protocols | bridge | IgniteOnly | Verified worker wake packets only, never build, merge, or completion state. | - | docs/pinballwake-igniteonly-api.md |
| Wrappers and protocols | bridge | NudgeOnly | Low-risk receipt nudges that never mutate source-of-truth state. | - | docs/pinballwake-nudgeonly-api.md |
| Wrappers and protocols | claim lifecycle | SeatRelay | Stale release, smart reassignment, and bonded handoff for stuck worker claims. | - | docs/UnClick-brainmap.generated.md |

## Public/Internal Alias Table

| Internal name | Public name | Meaning |
| --- | --- | --- |
| EnterprisePass | CompliancePass | Enterprise readiness checks need a public-safe product name. |
| QualityPass | SlopPass | Old QualityPass references now resolve to SlopPass. |
| Fishbowl | Boardroom | Internal worker discussion becomes a user-facing room name. |
| To-Do List | Jobs | Task queue language maps to the current admin Jobs surface. |
| Heartbeat | Heartbeat Master | The copy policy that teaches scheduled seats how to pulse. |
| NudgeOnlyAPI | NudgeOnly | Low-risk receipt nudges, never source-of-truth mutation. |
| IgniteOnlyAPI | IgniteOnly | Verified worker wake packets, never build, merge, or completion state. |

## Rooms List

| Room | Meaning | Source |
| --- | --- | --- |

## Workers List

| Worker | Meaning |
| --- | --- |
| Coordinator | Routes work, chooses the next room, and keeps lanes aligned. |
| Builder | Implements focused code or content changes from a scoped packet. |
| Tester | Runs proof and reports what passed or blocked. |
| Reviewer | Checks quality, regressions, and missing tests. |
| Safety Checker | Protects secrets, auth, destructive actions, and release gates. |
| Ledger | Records proof, receipts, approvals, and rollback evidence. |
| Publisher | Moves approved work toward deployment and public proof. |
| Improver | Turns repeated pain into system improvements. |

## Safety Rules

- Admin-only surfaces use `RequireAdmin` and must also be hidden from non-admin sidebar navigation.
- Brainmap visual admin is owner-only for `creativelead@malamutemayhem.com` inside the Yellow Private Admin lane.
- NudgeOnly can request receipt or escalation only. Trusted lanes verify before action.
- IgniteOnly can request worker wake packets only. Trusted lanes still build, review, merge, and record proof.
- Heartbeats must never print keys or credentials.
- Generated Brainmap changes must come from source updates plus regenerated artifacts, not hand editing the generated files.
- Proof should include TestPass, Reviewer, Safety Checker, and Ledger-style evidence where applicable.

## Launchpad Route

- Launchpad routes work from Coordinator to Builder, Tester, Reviewer, Safety Checker, and Ledger PASS.
- Launchpad checks Council induction so Council Lite is always visible on material work, and full Crews appears when launch, risk, mixed XPass proof, or broad evidence needs judgement.
- Launchpad readiness is represented in `scripts/pinballwake-launchpad-room.mjs` and related tests.
- User-facing control lives in Autopilot admin surfaces, with worker discussion in Boardroom.

## Ledger Rules

- Ledger records proof, approvals, receipts, worker status, rollback notes, and audit trails.
- PASS means proof exists and cleanup is done.
- BLOCKER means a safe reason, checked progress, and next fix are recorded.
- Receipts should use source links, run ids, commit ids, PRs, or generated artifact hashes.

## CI and Stale Guard

| Script | Command |
| --- | --- |
| build | npm run prepare:wiring && npm run build --workspace=@unclick/commonsensepass && npm run build --workspace=@unclick/flowpass && npm run build --workspace=@unclick/securitypass && tsc |
| dev | npm run prepare:wiring && npm run build --workspace=@unclick/commonsensepass && npm run build --workspace=@unclick/flowpass && npm run build --workspace=@unclick/securitypass && tsx src/index.ts |
| prepublishOnly | npm run build |
| test | npm run prepare:wiring && npm run build --workspace=@unclick/commonsensepass && npm run build --workspace=@unclick/flowpass && npm run build --workspace=@unclick/securitypass && tsx --test src/memory/__tests__/typed-links.test.ts src/memory/__tests__/typed-memory.test.ts src/memory/__tests__/hybrid-search.test.ts src/memory/__tests__/business-context-search.test.ts src/memory/__tests__/fused-retrieval.test.ts src/memory/__tests__/bitemporal.test.ts src/memory/__tests__/reconcile.test.ts src/memory/__tests__/response-bounds.test.ts src/memory/__tests__/load-memory-invalidation.test.ts src/memory/__tests__/snapshot-taxonomy.test.ts src/memory/__tests__/local-backend.test.ts src/memory/__tests__/session-inspection-trigger.test.ts src/memory/__tests__/provenance.test.ts src/memory/__tests__/decay-policy.test.ts src/memory/__tests__/consolidation.test.ts src/memory/__tests__/scopes.test.ts src/memory/__tests__/write-gate.test.ts src/memory/__tests__/forget-propagation.test.ts src/memory/__tests__/corrections.test.ts src/memory/__tests__/eval-harness.test.ts src/memory/__tests__/passport.test.ts src/memory/__tests__/auto-capture.test.ts && vitest run && node --test scripts/connector-depth-ladder.test.mjs && node scripts/generate-tool-index.mjs --check && node scripts/connector-depth-ladder.mjs --check && node scripts/check-standalone-registry.mjs |

- `node scripts/UnClick-brainmap.mjs --check` fails if `docs/UnClick-brainmap.generated.md` is stale.
- `node scripts/UnClick-brainmap.mjs --check` also fails if `docs/UnClick-brainmap.generated.json` is stale.
- `node --test scripts/UnClick-brainmap.test.mjs` verifies required sections and meaning rows.
