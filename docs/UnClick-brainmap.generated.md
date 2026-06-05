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
| AUTOPILOT.md | 790b43137907 | 17556 |
| FLEET_SYNC.md | 83bbf1598b48 | 14705 |
| docs/unclick-context-boot-packet.md | 8af9b8fedfc4 | 11213 |
| docs/agent-observability.md | bffd9f890c75 | 4629 |
| docs/pinballwake-nudgeonly-api.md | e056b727ce53 | 7559 |
| docs/pinballwake-igniteonly-api.md | bea4d9c8fa21 | 7919 |
| docs/fleet-worker-roles.md | de9f41b265f3 | 4881 |
| docs/adr/0005-two-layer-admin-gating.md | cefe739796f2 | 2186 |
| docs/adr/0006-orchestrator-is-user-chat.md | bf91808d2d8d | 2169 |
| src/App.tsx | 1f196048a2b9 | 15047 |
| src/pages/admin/AdminShell.tsx | 7f369084b44d | 24686 |
| src/pages/admin/AdminSkills.tsx | 4b5e69217a39 | 14848 |
| src/lib/skillLibrary.ts | 7d69323f9491 | 10487 |
| src/lib/skillLibrarySeeds.ts | 51ca658707f8 | 652 |
| .github/workflows/ci.yml | ab3e717a4ae9 | 1663 |
| .github/workflows/brainmap-auto-update.yml | 4771ebdbdba3 | 1211 |
| .github/workflows/continuous-improvement-watch.yml | d121a434a464 | 2358 |
| package.json | 4a9c0d70b172 | 7048 |
| seed/skills/agent-handoff-packet-writer.skill.md | f9c498e48796 | 938 |
| seed/skills/browser-qa-tester.skill.md | b57ce8b2e63a | 1115 |
| seed/skills/builder-implementation-packet.skill.md | 1fcda17af905 | 1276 |
| seed/skills/coordinator-router.skill.md | 9413945c7540 | 1379 |
| seed/skills/cross-pc-context-summariser.skill.md | a3ed67bc460c | 932 |
| seed/skills/deep-research-analyst.skill.md | 74d773d9e04d | 1069 |
| seed/skills/dependency-upgrade-reviewer.skill.md | d70607ce286b | 1045 |
| seed/skills/draft-pr-description.skill.md | 29bd5a084a33 | 892 |
| seed/skills/fix-failing-ci.skill.md | 7448c5e24ded | 1080 |
| seed/skills/github-pr-summariser.skill.md | 1fd84b27d797 | 987 |
| seed/skills/memory-distiller.skill.md | b951415aa2a7 | 983 |
| seed/skills/research-brief-generator.skill.md | 849b249b5f2a | 915 |
| seed/skills/reviewer-gate.skill.md | 976af541055b | 1008 |
| seed/skills/safety-checker-gate.skill.md | 788eb3ec2b1d | 1148 |
| seed/skills/screenshot-visual-qa.skill.md | ddfa5fd572a8 | 1025 |
| seed/skills/security-review.skill.md | 1183cfc4b1ce | 1107 |
| seed/skills/senior-code-reviewer.skill.md | 22a98a1953fd | 1104 |
| seed/skills/tester-proof-plan.skill.md | d8c55bf6329a | 1153 |
| seed/skills/watcher-heartbeat-tether.skill.md | 28acf3324343 | 1057 |
| seed/skills/write-tests-for-changed-code.skill.md | 0c2617abce77 | 1049 |
| src/pages/Index.tsx | 87bc594da785 | 1598 |
| src/pages/admin/AdminActivity.tsx | 9de4fed78407 | 14774 |
| src/pages/admin/AdminSeatHeartbeat.tsx | 9c138bfc810d | 11515 |
| src/pages/admin/AdminAgents.tsx | 73353b1405ef | 45563 |
| src/pages/admin/AdminAnalytics.tsx | 8e3ab82ef00f | 10336 |
| src/pages/admin/AdminTools.tsx | 5d2838bcd848 | 6470 |
| src/pages/admin/AdminAuditLog.tsx | 028edd82cb11 | 874 |
| src/pages/admin/AdminExpressBuild.tsx | 4dadebd9c4aa | 22681 |
| src/pages/admin/AdminEcosystemPages.tsx | 0f2003fd8242 | 12106 |
| src/pages/admin/AdminBenchmarks.tsx | 69eb15aaf438 | 25684 |
| src/pages/admin/Fishbowl.tsx | ec3c5b4f4b4f | 37557 |
| src/pages/admin/AdminBrainmap.tsx | 7d9f49ee973c | 26510 |
| src/pages/admin/AdminCodebase.tsx | ff33937fdf7b | 8044 |
| src/pages/admin/copypass/CopyPassCatalog.tsx | a7d741e75c78 | 7306 |
| src/pages/admin/crews/CrewComposer.tsx | f3afb17bb001 | 13909 |
| src/pages/admin/crews/CrewRun.tsx | 8a458cc0c629 | 8427 |
| src/pages/admin/crews/CrewsRuns.tsx | b77175f114bf | 4094 |
| src/pages/admin/crews/CrewsSettings.tsx | 9a2037783312 | 889 |
| src/pages/admin/crews/CrewsCatalog.tsx | 089b6c00af2e | 5949 |
| src/pages/admin/AdminDashboard.tsx | 7ee015247aa8 | 5257 |
| src/pages/admin/AdminJobs.tsx | ea5ff201abd2 | 60846 |
| src/pages/admin/AdminJobsmith.tsx | 34ba72c04cb2 | 54660 |
| src/pages/admin/AdminKeychain.tsx | 0c355d737922 | 77124 |
| src/pages/admin/AdminMemory.tsx | f001b0a54b31 | 9731 |
| src/pages/admin/AdminModeration.tsx | c81500ffb43d | 880 |
| src/pages/admin/AdminOrchestrator.tsx | 4741f71afba9 | 94705 |
| src/pages/admin/AdminPinballWake.tsx | 1b09a0b4c1b4 | 21751 |
| src/pages/admin/AdminSettings.tsx | cce2a4ca6248 | 40580 |
| src/pages/MemorySetupGuide.tsx | 79f83645f7c9 | 10264 |
| src/pages/admin/signals/SignalsSettings.tsx | 791cd433a5b0 | 9837 |
| src/pages/admin/signals/SignalsCatalog.tsx | 7baa82ac0d7f | 10835 |
| src/pages/admin/AdminSystemHealth.tsx | 6e61ae4d3d34 | 867 |
| src/pages/admin/testpass/NewRunWizard.tsx | fd912523ee14 | 10379 |
| src/pages/admin/AdminTestPass.tsx | 0b3cc7b44107 | 27259 |
| src/pages/admin/testpass/ReportDetail.tsx | b3db4032aa33 | 12374 |
| src/pages/admin/testpass/RunDetail.tsx | 52e43b795126 | 21979 |
| src/pages/admin/testpass/TestPassCatalog.tsx | 8fc76ddd8d3f | 21847 |
| src/pages/admin/AdminTruthRate.tsx | 115c5cce9b90 | 8868 |
| src/pages/admin/AdminUsers.tsx | 701e7da2f201 | 863 |
| src/pages/admin/AdminXGate.tsx | db31f326ff07 | 26775 |
| src/pages/admin/AdminYou.tsx | 89ed912e326b | 59397 |
| src/pages/AppDetail.tsx | 0cf7c397e1b5 | 5401 |
| src/pages/Apps.tsx | 1ccab2a4ccad | 2647 |
| src/pages/AuthCallback.tsx | c7dba82923b5 | 4875 |
| src/pages/VerifyMfa.tsx | f5c6b05b7844 | 6545 |
| src/pages/Connect.tsx | ebf2c68ad6c3 | 29590 |
| src/pages/Crews.tsx | 672df3eeb92b | 18792 |
| src/pages/DeveloperDocs.tsx | 339b3a5c60ae | 23490 |
| src/pages/DeveloperSubmit.tsx | 8724b6d03268 | 12447 |
| src/pages/VibeCoding.tsx | e09d777363c0 | 8012 |
| src/pages/Developers.tsx | 9657fd564797 | 19123 |
| src/pages/Dispatch.tsx | 2cac7e8758d3 | 15470 |
| src/pages/Docs.tsx | 490548492455 | 18580 |
| src/pages/DogfoodReport.tsx | 4103b5e68d6c | 16693 |
| src/pages/FAQPage.tsx | 507e1ed5789c | 712 |
| src/pages/InstallRecover.tsx | 56c822e69817 | 6971 |
| src/pages/Jobsmith.tsx | 08e9c9874c22 | 61541 |
| src/pages/Login.tsx | 86f887990094 | 8440 |
| src/pages/MemoryConnect.tsx | c760d37398d5 | 18534 |
| src/pages/MemorySetup.tsx | c46cb67d413e | 19854 |
| src/pages/Memory.tsx | cf7f06bacc89 | 18641 |
| src/pages/NewToAI.tsx | a28cb1d9ece8 | 12559 |
| src/pages/Organiser.tsx | a439fcf2092f | 16578 |
| src/pages/Pricing.tsx | 0830c034b4a3 | 8753 |
| src/pages/Privacy.tsx | a8d0decbfea8 | 11446 |
| src/pages/Signup.tsx | bb69e5123b4b | 8623 |
| src/pages/SmartHome.tsx | 3671f5d143b1 | 20733 |
| src/pages/Terms.tsx | 4613736d1aa8 | 9327 |
| src/pages/tools/LinkInBio.tsx | 4f20852d63d4 | 7831 |
| src/pages/tools/Scheduling.tsx | 3e54b020fe15 | 9647 |
| src/pages/tools/Solve.tsx | 97da18319f81 | 13431 |
| src/pages/Tools.tsx | 1b9bc9d666a7 | 15377 |
| src/pages/XPass.tsx | 5f07b2f32036 | 8713 |
| scripts/pinballwake-ack-ledger-room.mjs | e7dcb642bc75 | 12719 |
| scripts/pinballwake-buildbait-room.mjs | 42445fca7b1e | 4811 |
| scripts/pinballwake-close-supersede-room.mjs | 4d31f6a6a8c2 | 3891 |
| scripts/pinballwake-coding-room.mjs | 9fa5689c555e | 25310 |
| scripts/pinballwake-continuous-improvement-room.mjs | 51ca5eb8745b | 14894 |
| scripts/pinballwake-dogfood-room.mjs | d161028d1382 | 2782 |
| scripts/pinballwake-event-ledger-room.mjs | e8f8f9f84123 | 16104 |
| scripts/pinballwake-jobs-room.mjs | c77c394081c2 | 14217 |
| scripts/pinballwake-launchpad-room.mjs | 9ee3556460d0 | 20544 |
| scripts/pinballwake-merge-room.mjs | 3645da5c0c93 | 8431 |
| scripts/pinballwake-overlap-resolver-room.mjs | 14d03ef6acd3 | 6787 |
| scripts/pinballwake-personality-room.mjs | c1ca769346f1 | 9644 |
| scripts/pinballwake-planning-room.mjs | 080c2946a794 | 9714 |
| scripts/pinballwake-post-merge-watch-room.mjs | 144227650844 | 5462 |
| scripts/pinballwake-publish-room.mjs | ec1dbd36ed22 | 7526 |
| scripts/pinballwake-queue-health-room.mjs | ddefab91d886 | 2842 |
| scripts/pinballwake-release-notes-room.mjs | b13cc2fdf23f | 2598 |
| scripts/pinballwake-repair-room.mjs | 6404e2b40642 | 3567 |
| scripts/pinballwake-research-room.mjs | 8307356c93c4 | 7651 |
| scripts/pinballwake-rollback-room.mjs | c63e73fd2716 | 4158 |
| scripts/pinballwake-stale-room.mjs | 8927de850588 | 3880 |
| scripts/pinballwake-worker-registry-room.mjs | e8c9f4a764e3 | 20616 |
| scripts/pinballwake-xpass-gate-room.mjs | 8012a4cbab9e | 32880 |
| packages/mcp-server/src/abn-tool.ts | 981031e37dee | 6329 |
| packages/mcp-server/src/abuseipdb-tool.ts | c3c7f2d8566c | 6263 |
| packages/mcp-server/src/airtable-tool.ts | 917c11a6f79e | 7602 |
| packages/mcp-server/src/algolia-tool.ts | aa95d5b77b4c | 7208 |
| packages/mcp-server/src/alphavantage-tool.ts | 2792412e3c61 | 9254 |
| packages/mcp-server/src/amazon-tool.ts | faeea675e2f5 | 15899 |
| packages/mcp-server/src/amber-tool.ts | 635b10e30a39 | 7078 |
| packages/mcp-server/src/anthropic-tool.ts | 72906c764b43 | 9657 |
| packages/mcp-server/src/asana-tool.ts | 2519967f5105 | 9808 |
| packages/mcp-server/src/assemblyai-tool.ts | 24ebe71790cf | 11837 |
| packages/mcp-server/src/australiapost-tool.ts | ed627c360433 | 6185 |
| packages/mcp-server/src/bandsintown-tool.ts | d255220247d1 | 4151 |
| packages/mcp-server/src/bgg-tool.ts | 182bc6f9686a | 12028 |
| packages/mcp-server/src/bitbucket-tool.ts | a6a405951262 | 4388 |
| packages/mcp-server/src/bluesky-tool.ts | 9c63ad10f656 | 16256 |
| packages/mcp-server/src/brevo-tool.ts | b79b48fd500a | 3314 |
| packages/mcp-server/src/bungie-tool.ts | a6a1a1915cc3 | 7686 |
| packages/mcp-server/src/calcom-tool.ts | d287d0a01077 | 3332 |
| packages/mcp-server/src/calculator-tool.ts | 5a3d3d30645e | 7319 |
| packages/mcp-server/src/calendly-tool.ts | 12032f4f7f6c | 7492 |
| packages/mcp-server/src/carboninterface-tool.ts | 14fa562b0217 | 7953 |
| packages/mcp-server/src/chessdotcom-tool.ts | 29bbcfa26e3f | 7874 |
| packages/mcp-server/src/circleci-tool.ts | 0c585c18d348 | 7085 |
| packages/mcp-server/src/clickup-tool.ts | b8f6a7c21317 | 6739 |
| packages/mcp-server/src/clockify-tool.ts | 86ae10a34bfb | 7218 |
| packages/mcp-server/src/cloudinary-tool.ts | 66bcda722d32 | 3562 |
| packages/mcp-server/src/coda-tool.ts | 6390ba35aece | 3626 |
| packages/mcp-server/src/cohere-tool.ts | 91a7c36218e0 | 11278 |
| packages/mcp-server/src/coingecko-tool.ts | 105c55971d63 | 7884 |
| packages/mcp-server/src/coinmarketcap-tool.ts | f44ff0239baa | 8444 |
| packages/mcp-server/src/color-tool.ts | 8e737cb9e16f | 13782 |
| packages/mcp-server/src/commonsensepass-tool.ts | bad23b55ea01 | 1995 |
| packages/mcp-server/src/compliancepass-tool.ts | bedf85b00baa | 7342 |
| packages/mcp-server/src/confluence-tool.ts | f1248450cf5a | 4326 |
| packages/mcp-server/src/contentful-tool.ts | fe4a6bb32986 | 5202 |
| packages/mcp-server/src/convertkit-tool.ts | d6f0f01e6032 | 10595 |
| packages/mcp-server/src/copypass-tool.ts | 3cbadbc448a0 | 33377 |
| packages/mcp-server/src/crews-tool.ts | aefc67a40964 | 14093 |
| packages/mcp-server/src/csuite-tool.ts | 0ab5af89bb49 | 70236 |
| packages/mcp-server/src/datadog-tool.ts | 529fa672eb0e | 8255 |
| .github/workflows/apply-migrations.yml | d2ee87e75e7f | 1529 |
| .github/workflows/auto-close-fishbowl-todo.yml | d11ec31e1d22 | 11599 |
| .github/workflows/autonomous-runner.yml | a8c83efde889 | 15338 |
| .github/workflows/claude.yml | e8fc79a85b6c | 1085 |
| .github/workflows/dirty-branch-hygiene.yml | 3df7d09eebc7 | 2190 |
| .github/workflows/dogfood-report.yml | 65897c4393aa | 6605 |
| .github/workflows/event-wake-router.yml | bfd53e324bb4 | 1453 |
| .github/workflows/fleet-throughput-watch.yml | c5a08f4edf9b | 930 |
| .github/workflows/openhands-test-mode.yml | 9aaef5273976 | 1137 |
| .github/workflows/publish-channel-package.yml | 5c9197848ca9 | 8046 |
| .github/workflows/publish-mcp-package.yml | c029877aab11 | 6427 |
| .github/workflows/publish-standalone-mcps.yml | ddd200e03a08 | 7228 |
| .github/workflows/review-enforcement-warning.yml | 64b27fdddfe8 | 548 |
| .github/workflows/scheduled-build-self-test.yml | 1362b535ff33 | 1024 |
| .github/workflows/seed-vault.yml | 003a9bd13283 | 1246 |
| .github/workflows/testpass-pr-check.yml | bca601f0a1c2 | 20251 |
| .github/workflows/testpass-scheduled-smoke.yml | 46f9a65b1dbb | 1673 |
| .github/workflows/tier2-auto-merge-queue-check.yml | 5abfca8c42dc | 830 |

## Division Index

| Division | Meaning | Items |
| --- | --- | --- |
| Admin surfaces | Private operator views and internal control panels. | 50 |
| Public surfaces | Public product, docs, marketplace, and user-facing routes. | 34 |
| Tools | MCP and gateway capabilities available to seats. | 219 |
| Rooms | PinballWake and Boardroom lanes that route work. | 23 |
| Workers and seats | Human and AI roles that move work through the system. | 11 |
| Passes and gates | Quality, proof, safety, and fidelity checks. | 17 |
| Wrappers and protocols | Thin harnesses, bridges, policies, and routing helpers. | 3 |
| Automations | Scheduled jobs, wake routes, cron workflows, and recurring checks. | 121 |
| Ledgers and proof | Receipts, audits, evidence, and proof-of-work surfaces. | 8 |
| Source of truth | Canonical state, queue, memory, and context surfaces. | 13 |
| Modules and apps | Apps, packages, and product modules that make up UnClick. | 116 |
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
| 4 | Pass through Brainmap | Use the generated ecosystem map to find current routes, tools, rooms, workers, aliases, and safety gates. | Ecosystem Brainmap | /admin/brainmap |
| 5 | Choose the Launchpad lane | Route the work through the safest current Autopilot lane before acting or handing off. | Launchpad | /admin/pinballwake |
| 6 | Ask Crews Council if needed | Run Council Lite on material work, then prompt full Crews Council for launch, risk, mixed proof, or broad XPass evidence. | Crews Council | scripts/pinballwake-launchpad-room.mjs |
| 7 | Check proof gates | Name required PR, commit, test, CI, live, screenshot, CopyRoom, or NO_CODE_NEEDED proof before closing. | Proof Ledger | docs/agent-observability.md |
| 8 | Dogtest the outcome | Run the focused local tests and browser or live proof that match the touched surface. | XPass and CI | package.json |
| 9 | Reply and log proof | End with PASS or BLOCKER, proof link or id, cleanup state, and next safe step. | Boardroom and Orchestrator | /admin/jobs |

## Pages and Meaning

| Route | Page | Meaning | Source |
| --- | --- | --- | --- |
| / | Index | Public home and first explanation of UnClick. | src/pages/Index.tsx |
| /admin/activity | Admin Activity | Admin surface for Admin Activity. | src/pages/admin/AdminActivity.tsx |
| /admin/agents/heartbeat | Admin Seat Heartbeat | Master heartbeat copy policy for scheduled AI seats. | src/pages/admin/AdminSeatHeartbeat.tsx |
| /admin/agents | Admin Agents | Admin surface for Admin Agents. | src/pages/admin/AdminAgents.tsx |
| /admin/analytics | Admin Analytics | Internal analytics view for platform signals and usage. | src/pages/admin/AdminAnalytics.tsx |
| /admin/apps | Admin Tools | Apps, tools, and connector capability surface. | src/pages/admin/AdminTools.tsx |
| /admin/audit-log | Admin Audit Log | Internal audit trail for sensitive admin actions. | src/pages/admin/AdminAuditLog.tsx |
| /admin/autopilot/expressbuild | Admin Express Build | Admin surface for Admin Express Build. | src/pages/admin/AdminExpressBuild.tsx |
| /admin/autopilot | Admin Autopilot | Admin surface for Admin Ecosystem Pages. | src/pages/admin/AdminEcosystemPages.tsx |
| /admin/benchmarks | Admin Benchmarks | Admin surface for Admin Benchmarks. | src/pages/admin/AdminBenchmarks.tsx |
| /admin/billing | Admin Billing | Admin surface for Admin Ecosystem Pages. | src/pages/admin/AdminEcosystemPages.tsx |
| /admin/boardroom | Boardroom | Boardroom discussion surface for worker coordination. | src/pages/admin/Fishbowl.tsx |
| /admin/brainmap | Admin Brainmap | Generated ecosystem map that teaches seats what UnClick is. | src/pages/admin/AdminBrainmap.tsx |
| /admin/checks/:productId | Admin Checks | Admin surface for Admin Ecosystem Pages. | src/pages/admin/AdminEcosystemPages.tsx |
| /admin/checks | Admin Checks | Admin surface for Admin Ecosystem Pages. | src/pages/admin/AdminEcosystemPages.tsx |
| /admin/codebase | Admin Codebase | Internal source and architecture orientation surface. | src/pages/admin/AdminCodebase.tsx |
| /admin/copypass | Copy Pass Catalog | Admin surface for Copy Pass Catalog. | src/pages/admin/copypass/CopyPassCatalog.tsx |
| /admin/crews/:id/edit | Crew Composer | Crews admin page for Crew Composer. | src/pages/admin/crews/CrewComposer.tsx |
| /admin/crews/new | Crew Composer | Crews admin page for Crew Composer. | src/pages/admin/crews/CrewComposer.tsx |
| /admin/crews/runs/:runId | Crew Run | Crews admin page for Crew Run. | src/pages/admin/crews/CrewRun.tsx |
| /admin/crews/runs | Crews Runs | Crews admin page for Crews Runs. | src/pages/admin/crews/CrewsRuns.tsx |
| /admin/crews/settings | Crews Settings | Crews admin page for Crews Settings. | src/pages/admin/crews/CrewsSettings.tsx |
| /admin/crews | Crews Catalog | Crews admin page for Crews Catalog. | src/pages/admin/crews/CrewsCatalog.tsx |
| /admin/dashboard | Admin Dashboard | Front door for current operator state. | src/pages/admin/AdminDashboard.tsx |
| /admin/jobs | Admin Jobs | Operational job and task queue. | src/pages/admin/AdminJobs.tsx |
| /admin/jobsmith | Admin Jobsmith | Admin surface for Admin Jobsmith. | src/pages/admin/AdminJobsmith.tsx |
| /admin/keychain | Admin Keychain | Passport and credential connection health. | src/pages/admin/AdminKeychain.tsx |
| /admin/ledger | Admin Ledger | Admin surface for Admin Ecosystem Pages. | src/pages/admin/AdminEcosystemPages.tsx |
| /admin/memory | Admin Memory | Admin view of persistent memory, facts, sessions, and recall. | src/pages/admin/AdminMemory.tsx |
| /admin/moderation | Admin Moderation | Admin surface for Admin Moderation. | src/pages/admin/AdminModeration.tsx |
| /admin/orchestrator/timeline | Admin Orchestrator | Readable continuity stream for seats and operator context. | src/pages/admin/AdminOrchestrator.tsx |
| /admin/orchestrator | Admin Orchestrator | Readable continuity stream for seats and operator context. | src/pages/admin/AdminOrchestrator.tsx |
| /admin/pinballwake | Admin Pinball Wake | PinballWake rooms, wake routes, and automation visibility. | src/pages/admin/AdminPinballWake.tsx |
| /admin/projects | Admin Projects | Admin surface for Admin Ecosystem Pages. | src/pages/admin/AdminEcosystemPages.tsx |
| /admin/settings | Admin Settings | Account and admin configuration. | src/pages/admin/AdminSettings.tsx |
| /admin/setup-guide | Memory Setup Guide | User-facing page for Memory Setup Guide. | src/pages/MemorySetupGuide.tsx |
| /admin/signals/settings | Signals Settings | Admin surface for Signals Settings. | src/pages/admin/signals/SignalsSettings.tsx |
| /admin/signals | Signals Catalog | Admin surface for Signals Catalog. | src/pages/admin/signals/SignalsCatalog.tsx |
| /admin/skills | Admin Skills | Read-only starter pack of UnClick-native skills, native rails, and portable SKILL.md packages. | src/pages/admin/AdminSkills.tsx |
| /admin/system-health | Admin System Health | Health checks and operational status. | src/pages/admin/AdminSystemHealth.tsx |
| /admin/testpass/new | New Run Wizard | Admin surface for New Run Wizard. | src/pages/admin/testpass/NewRunWizard.tsx |
| /admin/testpass/packs/:id/edit | Admin Test Pass | Admin surface for Admin Test Pass. | src/pages/admin/AdminTestPass.tsx |
| /admin/testpass/reports/:id | Report Detail | Admin surface for Report Detail. | src/pages/admin/testpass/ReportDetail.tsx |
| /admin/testpass/runs/:id | Run Detail | Admin surface for Run Detail. | src/pages/admin/testpass/RunDetail.tsx |
| /admin/testpass | Test Pass Catalog | Admin surface for Test Pass Catalog. | src/pages/admin/testpass/TestPassCatalog.tsx |
| /admin/truth-rate | Admin Truth Rate | Admin surface for Admin Truth Rate. | src/pages/admin/AdminTruthRate.tsx |
| /admin/users | Admin Users | Internal user management. | src/pages/admin/AdminUsers.tsx |
| /admin/workers | Admin Workers | Admin surface for Admin Ecosystem Pages. | src/pages/admin/AdminEcosystemPages.tsx |
| /admin/xgate | Admin XGate | Admin surface for Admin XGate. | src/pages/admin/AdminXGate.tsx |
| /admin/you | Admin You | Personal account, identity, and access panel. | src/pages/admin/AdminYou.tsx |
| /admin | Admin Shell | Admin surface for Admin Shell. | src/pages/admin/AdminShell.tsx |
| /apps/:slug | App Detail | User-facing page for App Detail. | src/pages/AppDetail.tsx |
| /apps | Apps | User-facing page for Apps. | src/pages/Apps.tsx |
| /auth/callback | Auth Callback | User-facing page for Auth Callback. | src/pages/AuthCallback.tsx |
| /auth/verify-mfa | Verify Mfa | User-facing page for Verify Mfa. | src/pages/VerifyMfa.tsx |
| /connect/:platform | Connect | User-facing page for Connect. | src/pages/Connect.tsx |
| /crews | Crews | Public Crews explanation and entry point. | src/pages/Crews.tsx |
| /developers/docs | Developer Docs | Developer documentation. | src/pages/DeveloperDocs.tsx |
| /developers/submit | Developer Submit | Tool submission flow. | src/pages/DeveloperSubmit.tsx |
| /developers/vibe-coding | Vibe Coding | User-facing page for Vibe Coding. | src/pages/VibeCoding.tsx |
| /developers | Developers | Developer-facing entry point. | src/pages/Developers.tsx |
| /dispatch | Dispatch | Dispatch and message handoff surface. | src/pages/Dispatch.tsx |
| /docs | Docs | User-facing page for Docs. | src/pages/Docs.tsx |
| /dogfood | Dogfood Report | Public dogfood proof report. | src/pages/DogfoodReport.tsx |
| /faq | FAQ | User-facing page for FAQPage. | src/pages/FAQPage.tsx |
| /i | Install Recover | User-facing page for Install Recover. | src/pages/InstallRecover.tsx |
| /jobsmith | Jobsmith | User-facing page for Jobsmith. | src/pages/Jobsmith.tsx |
| /login | Login | Sign-in page. | src/pages/Login.tsx |
| /memory/connect | Memory Connect | User-facing page for Memory Connect. | src/pages/MemoryConnect.tsx |
| /memory/setup-guide | Memory Setup Guide | User-facing page for Memory Setup Guide. | src/pages/MemorySetupGuide.tsx |
| /memory/setup | Memory Setup | User-facing page for Memory Setup. | src/pages/MemorySetup.tsx |
| /memory | Memory | Public memory product page. | src/pages/Memory.tsx |
| /new-to-ai | New To AI | Beginner-friendly AI orientation. | src/pages/NewToAI.tsx |
| /organiser | Organiser | User-facing page for Organiser. | src/pages/Organiser.tsx |
| /pricing | Pricing | Plans, billing, and packaging. | src/pages/Pricing.tsx |
| /privacy | Privacy | Privacy policy. | src/pages/Privacy.tsx |
| /signup | Signup | Sign-up page. | src/pages/Signup.tsx |
| /smarthome | Smart Home | User-facing page for Smart Home. | src/pages/SmartHome.tsx |
| /terms | Terms | Terms of service. | src/pages/Terms.tsx |
| /tools/link-in-bio | Link In Bio | Tool page for Link In Bio. | src/pages/tools/LinkInBio.tsx |
| /tools/scheduling | Scheduling | Tool page for Scheduling. | src/pages/tools/Scheduling.tsx |
| /tools/solve | Solve | Tool page for Solve. | src/pages/tools/Solve.tsx |
| /tools | Tools | Public tools marketplace entry point. | src/pages/Tools.tsx |
| /xpass | XPass | User-facing page for XPass. | src/pages/XPass.tsx |

## Tool Families and Meaning

| Tool family | Meaning | Source |
| --- | --- | --- |
| abn | abn MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/abn-tool.ts |
| abuseipdb | abuseipdb MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/abuseipdb-tool.ts |
| airtable | airtable MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/airtable-tool.ts |
| algolia | algolia MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/algolia-tool.ts |
| alphavantage | alphavantage MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/alphavantage-tool.ts |
| amazon | amazon MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/amazon-tool.ts |
| amber | amber MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/amber-tool.ts |
| anthropic | anthropic MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/anthropic-tool.ts |
| asana | asana MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/asana-tool.ts |
| assemblyai | assemblyai MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/assemblyai-tool.ts |
| australiapost | australiapost MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/australiapost-tool.ts |
| bandsintown | bandsintown MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/bandsintown-tool.ts |
| bgg | bgg MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/bgg-tool.ts |
| bitbucket | bitbucket MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/bitbucket-tool.ts |
| bluesky | bluesky MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/bluesky-tool.ts |
| brevo | brevo MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/brevo-tool.ts |
| bungie | bungie MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/bungie-tool.ts |
| calcom | calcom MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/calcom-tool.ts |
| calculator | calculator MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/calculator-tool.ts |
| calendly | calendly MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/calendly-tool.ts |
| carboninterface | carboninterface MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/carboninterface-tool.ts |
| chessdotcom | chessdotcom MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/chessdotcom-tool.ts |
| circleci | circleci MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/circleci-tool.ts |
| clickup | clickup MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/clickup-tool.ts |
| clockify | clockify MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/clockify-tool.ts |
| cloudinary | cloudinary MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/cloudinary-tool.ts |
| coda | coda MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/coda-tool.ts |
| cohere | cohere MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/cohere-tool.ts |
| coingecko | coingecko MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/coingecko-tool.ts |
| coinmarketcap | coinmarketcap MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/coinmarketcap-tool.ts |
| color | color MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/color-tool.ts |
| commonsensepass | commonsensepass MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/commonsensepass-tool.ts |
| compliancepass | compliancepass MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/compliancepass-tool.ts |
| confluence | confluence MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/confluence-tool.ts |
| contentful | contentful MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/contentful-tool.ts |
| convertkit | convertkit MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/convertkit-tool.ts |
| copypass | copypass MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/copypass-tool.ts |
| crews | crews MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/crews-tool.ts |
| csuite | csuite MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/csuite-tool.ts |
| datadog | datadog MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/datadog-tool.ts |
| datetime | datetime MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/datetime-tool.ts |
| deepl | deepl MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/deepl-tool.ts |
| deezer | deezer MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/deezer-tool.ts |
| digitalocean | digitalocean MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/digitalocean-tool.ts |
| discogs | discogs MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/discogs-tool.ts |
| discord | discord MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/discord-tool.ts |
| domain | domain MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/domain-tool.ts |
| dropbox | dropbox MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/dropbox-tool.ts |
| ebay | ebay MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/ebay-tool.ts |
| ebird | ebird MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/ebird-tool.ts |
| elevenlabs | elevenlabs MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/elevenlabs-tool.ts |
| email | email MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/email-tool.ts |
| espn | espn MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/espn-tool.ts |
| etsy | etsy MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/etsy-tool.ts |
| eventbrite | eventbrite MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/eventbrite-tool.ts |
| exchangerate | exchangerate MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/exchangerate-tool.ts |
| feedly | feedly MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/feedly-tool.ts |
| fidelitycopy | fidelitycopy MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/fidelitycopy-tool.ts |
| figma | figma MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/figma-tool.ts |
| flowpass | flowpass MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/flowpass-tool.ts |
| flyio | flyio MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/flyio-tool.ts |
| foursquare | foursquare MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/foursquare-tool.ts |
| fpl | fpl MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/fpl-tool.ts |
| gdelt | gdelt MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/gdelt-tool.ts |
| genius | genius MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/genius-tool.ts |
| geopass | geopass MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/geopass-tool.ts |
| ghost | ghost MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/ghost-tool.ts |
| giphy | giphy MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/giphy-tool.ts |
| github | github MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/github-tool.ts |
| gitlab | gitlab MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/gitlab-tool.ts |
| groq | groq MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/groq-tool.ts |
| guardian | guardian MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/guardian-tool.ts |
| gumroad | gumroad MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/gumroad-tool.ts |
| hackernews | hackernews MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/hackernews-tool.ts |
| haveibeenpwned | haveibeenpwned MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/haveibeenpwned-tool.ts |
| Heartbeat Protocol | Canonical heartbeat policy served to scheduled seats. | packages/mcp-server/src/heartbeat-protocol.ts |
| heygen | heygen MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/heygen-tool.ts |
| higgsfield | higgsfield MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/higgsfield-tool.ts |
| hubspot | hubspot MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/hubspot-tool.ts |
| hunter | hunter MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/hunter-tool.ts |
| igdb | igdb MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/igdb-tool.ts |
| IgniteOnly | IgniteOnly verified worker wake packet bridge. | packages/mcp-server/src/igniteonly-tool.ts |
| instapaper | instapaper MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/instapaper-tool.ts |
| intercom | intercom MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/intercom-tool.ts |
| ipapi | ipapi MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/ipapi-tool.ts |
| ipaustralia | ipaustralia MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/ipaustralia-tool.ts |
| jira | jira MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/jira-tool.ts |
| jobsmith | jobsmith MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/jobsmith-tool.ts |
| keychain | keychain MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/keychain-tool.ts |
| klaviyo | klaviyo MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/klaviyo-tool.ts |
| kling | kling MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/kling-tool.ts |
| lastfm | lastfm MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/lastfm-tool.ts |
| legalpass | legalpass MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/legalpass-tool.ts |
| lego | lego MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/lego-tool.ts |
| lemonsqueezy | lemonsqueezy MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/lemonsqueezy-tool.ts |
| lichess | lichess MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/lichess-tool.ts |
| line | line MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/line-tool.ts |
| linear | linear MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/linear-tool.ts |
| mailchimp | mailchimp MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/mailchimp-tool.ts |
| mapbox | mapbox MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/mapbox-tool.ts |
| mastodon | mastodon MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/mastodon-tool.ts |
| meal | meal MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/meal-tool.ts |
| miro | miro MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/miro-tool.ts |
| mistral | mistral MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/mistral-tool.ts |
| mixpanel | mixpanel MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/mixpanel-tool.ts |
| monday | monday MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/monday-tool.ts |
| monica | monica MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/monica-tool.ts |
| musicbrainz | musicbrainz MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/musicbrainz-tool.ts |
| nasa | nasa MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/nasa-tool.ts |
| neon | neon MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/neon-tool.ts |
| netlify | netlify MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/netlify-tool.ts |
| newsapi | newsapi MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/newsapi-tool.ts |
| notion | notion MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/notion-tool.ts |
| NudgeOnly | NudgeOnly low-token receipt bridge and advisory classifier. | packages/mcp-server/src/nudgeonly-tool.ts |
| numbers | numbers MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/numbers-tool.ts |
| nvd | nvd MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/nvd-tool.ts |
| omdb | omdb MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/omdb-tool.ts |
| openai | openai MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/openai-tool.ts |
| openaq | openaq MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/openaq-tool.ts |
| openexchangerates | openexchangerates MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/openexchangerates-tool.ts |
| openf1 | openf1 MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/openf1-tool.ts |
| openfoodfacts | openfoodfacts MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/openfoodfacts-tool.ts |
| openlibrary | openlibrary MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/openlibrary-tool.ts |
| openmeteo | openmeteo MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/openmeteo-tool.ts |
| pagerduty | pagerduty MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/pagerduty-tool.ts |
| pandascore | pandascore MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/pandascore-tool.ts |
| paypal | paypal MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/paypal-tool.ts |
| perplexity | perplexity MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/perplexity-tool.ts |
| pika | pika MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/pika-tool.ts |
| pinecone | pinecone MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/pinecone-tool.ts |
| pinterest | pinterest MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/pinterest-tool.ts |
| pipedrive | pipedrive MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/pipedrive-tool.ts |
| plaid | plaid MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/plaid-tool.ts |
| podcastindex | podcastindex MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/podcastindex-tool.ts |
| posthog | posthog MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/posthog-tool.ts |
| postman | postman MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/postman-tool.ts |
| postmark | postmark MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/postmark-tool.ts |
| ptv | ptv MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/ptv-tool.ts |
| pushonly | pushonly MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/pushonly-tool.ts |
| pushover | pushover MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/pushover-tool.ts |
| qc | qc MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/qc-tool.ts |
| quickbooks | quickbooks MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/quickbooks-tool.ts |
| radiobrowser | radiobrowser MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/radiobrowser-tool.ts |
| raindrop | raindrop MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/raindrop-tool.ts |
| random | random MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/random-tool.ts |
| rawg | rawg MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/rawg-tool.ts |
| readwise | readwise MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/readwise-tool.ts |
| reddit | reddit MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/reddit-tool.ts |
| render | render MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/render-tool.ts |
| replicate | replicate MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/replicate-tool.ts |
| resend | resend MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/resend-tool.ts |
| restcountries | restcountries MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/restcountries-tool.ts |
| riot | riot MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/riot-tool.ts |
| runway | runway MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/runway-tool.ts |
| seatgeek | seatgeek MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/seatgeek-tool.ts |
| securitypass | securitypass MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/securitypass-tool.ts |
| segment | segment MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/segment-tool.ts |
| sendgrid | sendgrid MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/sendgrid-tool.ts |
| sendle | sendle MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/sendle-tool.ts |
| sentry | sentry MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/sentry-tool.ts |
| seopass | seopass MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/seopass-tool.ts |
| setlistfm | setlistfm MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/setlistfm-tool.ts |
| shodan | shodan MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/shodan-tool.ts |
| shopify | shopify MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/shopify-tool.ts |
| shortcut | shortcut MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/shortcut-tool.ts |
| slack | slack MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/slack-tool.ts |
| sleeper | sleeper MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/sleeper-tool.ts |
| sloppass | sloppass MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/sloppass-tool.ts |
| speedrun | speedrun MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/speedrun-tool.ts |
| splitwise | splitwise MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/splitwise-tool.ts |
| spotify | spotify MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/spotify-tool.ts |
| square | square MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/square-tool.ts |
| stability | stability MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/stability-tool.ts |
| steam | steam MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/steam-tool.ts |
| stripe | stripe MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/stripe-tool.ts |
| supercell | supercell MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/supercell-tool.ts |
| tab | tab MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/tab-tool.ts |
| telegram | telegram MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/telegram-tool.ts |
| testpass | TestPass proof and test orchestration capability. | packages/mcp-server/src/testpass-tool.ts |
| text | text MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/text-tool.ts |
| thelott | thelott MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/thelott-tool.ts |
| ticketmaster | ticketmaster MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/ticketmaster-tool.ts |
| tiktok | tiktok MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/tiktok-tool.ts |
| tmdb | tmdb MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/tmdb-tool.ts |
| todoist | todoist MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/todoist-tool.ts |
| togetherai | togetherai MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/togetherai-tool.ts |
| toggl | toggl MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/toggl-tool.ts |
| toilets | toilets MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/toilets-tool.ts |
| tomorrowio | tomorrowio MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/tomorrowio-tool.ts |
| trello | trello MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/trello-tool.ts |
| trivia | trivia MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/trivia-tool.ts |
| trove | trove MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/trove-tool.ts |
| turso | turso MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/turso-tool.ts |
| twilio | twilio MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/twilio-tool.ts |
| twitch | twitch MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/twitch-tool.ts |
| typeform | typeform MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/typeform-tool.ts |
| unit converter | unit converter MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/unit-converter-tool.ts |
| unsplash | unsplash MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/unsplash-tool.ts |
| untappd | untappd MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/untappd-tool.ts |
| upstash | upstash MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/upstash-tool.ts |
| uptimerobot | uptimerobot MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/uptimerobot-tool.ts |
| urlscan | urlscan MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/urlscan-tool.ts |
| usgs | usgs MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/usgs-tool.ts |
| uxpass | UXPass experience verification capability. | packages/mcp-server/src/uxpass-tool.ts |
| vault | vault MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/vault-tool.ts |
| vercel | vercel MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/vercel-tool.ts |
| virustotal | virustotal MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/virustotal-tool.ts |
| webflow | webflow MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/webflow-tool.ts |
| whatsapp | whatsapp MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/whatsapp-tool.ts |
| wikipedia | wikipedia MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/wikipedia-tool.ts |
| willyweather | willyweather MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/willyweather-tool.ts |
| wise | wise MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/wise-tool.ts |
| woocommerce | woocommerce MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/woocommerce-tool.ts |
| wordpress | wordpress MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/wordpress-tool.ts |
| xero | xero MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/xero-tool.ts |
| xpass aggregated verdict | xpass aggregated verdict MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/xpass-aggregated-verdict-tool.ts |
| yelp | yelp MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/yelp-tool.ts |
| youtube | youtube MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/youtube-tool.ts |
| zendesk | zendesk MCP capability, available through the UnClick tool gateway. | packages/mcp-server/src/zendesk-tool.ts |

## Tool and Worker Tree

| Division | Kind | Name | Meaning | Route | Source |
| --- | --- | --- | --- | --- | --- |
| Admin surfaces | admin page | Admin Activity | Admin surface for Admin Activity. | /admin/activity | src/pages/admin/AdminActivity.tsx |
| Admin surfaces | admin page | Admin Agents | Admin surface for Admin Agents. | /admin/agents | src/pages/admin/AdminAgents.tsx |
| Admin surfaces | admin page | Admin Analytics | Internal analytics view for platform signals and usage. | /admin/analytics | src/pages/admin/AdminAnalytics.tsx |
| Admin surfaces | admin page | Admin Audit Log | Internal audit trail for sensitive admin actions. | /admin/audit-log | src/pages/admin/AdminAuditLog.tsx |
| Admin surfaces | admin page | Admin Autopilot | Admin surface for Admin Ecosystem Pages. | /admin/autopilot | src/pages/admin/AdminEcosystemPages.tsx |
| Admin surfaces | admin page | Admin Benchmarks | Admin surface for Admin Benchmarks. | /admin/benchmarks | src/pages/admin/AdminBenchmarks.tsx |
| Admin surfaces | admin page | Admin Billing | Admin surface for Admin Ecosystem Pages. | /admin/billing | src/pages/admin/AdminEcosystemPages.tsx |
| Admin surfaces | admin page | Admin Brainmap | Generated ecosystem map that teaches seats what UnClick is. | /admin/brainmap | src/pages/admin/AdminBrainmap.tsx |
| Admin surfaces | admin page | Admin Checks | Admin surface for Admin Ecosystem Pages. | /admin/checks/:productId | src/pages/admin/AdminEcosystemPages.tsx |
| Admin surfaces | admin page | Admin Checks | Admin surface for Admin Ecosystem Pages. | /admin/checks | src/pages/admin/AdminEcosystemPages.tsx |
| Admin surfaces | admin page | Admin Codebase | Internal source and architecture orientation surface. | /admin/codebase | src/pages/admin/AdminCodebase.tsx |
| Admin surfaces | admin page | Admin Dashboard | Front door for current operator state. | /admin/dashboard | src/pages/admin/AdminDashboard.tsx |
| Admin surfaces | admin page | Admin Express Build | Admin surface for Admin Express Build. | /admin/autopilot/expressbuild | src/pages/admin/AdminExpressBuild.tsx |
| Admin surfaces | admin page | Admin Jobs | Operational job and task queue. | /admin/jobs | src/pages/admin/AdminJobs.tsx |
| Admin surfaces | admin page | Admin Jobsmith | Admin surface for Admin Jobsmith. | /admin/jobsmith | src/pages/admin/AdminJobsmith.tsx |
| Admin surfaces | admin page | Admin Keychain | Passport and credential connection health. | /admin/keychain | src/pages/admin/AdminKeychain.tsx |
| Admin surfaces | admin page | Admin Ledger | Admin surface for Admin Ecosystem Pages. | /admin/ledger | src/pages/admin/AdminEcosystemPages.tsx |
| Admin surfaces | admin page | Admin Memory | Admin view of persistent memory, facts, sessions, and recall. | /admin/memory | src/pages/admin/AdminMemory.tsx |
| Admin surfaces | admin page | Admin Moderation | Admin surface for Admin Moderation. | /admin/moderation | src/pages/admin/AdminModeration.tsx |
| Admin surfaces | admin page | Admin Orchestrator | Readable continuity stream for seats and operator context. | /admin/orchestrator/timeline | src/pages/admin/AdminOrchestrator.tsx |
| Admin surfaces | admin page | Admin Orchestrator | Readable continuity stream for seats and operator context. | /admin/orchestrator | src/pages/admin/AdminOrchestrator.tsx |
| Admin surfaces | admin page | Admin Pinball Wake | PinballWake rooms, wake routes, and automation visibility. | /admin/pinballwake | src/pages/admin/AdminPinballWake.tsx |
| Admin surfaces | admin page | Admin Projects | Admin surface for Admin Ecosystem Pages. | /admin/projects | src/pages/admin/AdminEcosystemPages.tsx |
| Admin surfaces | admin page | Admin Seat Heartbeat | Master heartbeat copy policy for scheduled AI seats. | /admin/agents/heartbeat | src/pages/admin/AdminSeatHeartbeat.tsx |
| Admin surfaces | admin page | Admin Settings | Account and admin configuration. | /admin/settings | src/pages/admin/AdminSettings.tsx |
| Admin surfaces | admin page | Admin Shell | Admin surface for Admin Shell. | /admin | src/pages/admin/AdminShell.tsx |
| Admin surfaces | admin page | Admin Skills | Read-only starter pack of UnClick-native skills, native rails, and portable SKILL.md packages. | /admin/skills | src/pages/admin/AdminSkills.tsx |
| Admin surfaces | admin page | Admin System Health | Health checks and operational status. | /admin/system-health | src/pages/admin/AdminSystemHealth.tsx |
| Admin surfaces | admin page | Admin Test Pass | Admin surface for Admin Test Pass. | /admin/testpass/packs/:id/edit | src/pages/admin/AdminTestPass.tsx |
| Admin surfaces | admin page | Admin Tools | Apps, tools, and connector capability surface. | /admin/apps | src/pages/admin/AdminTools.tsx |
| Admin surfaces | admin page | Admin Truth Rate | Admin surface for Admin Truth Rate. | /admin/truth-rate | src/pages/admin/AdminTruthRate.tsx |
| Admin surfaces | admin page | Admin Users | Internal user management. | /admin/users | src/pages/admin/AdminUsers.tsx |
| Admin surfaces | admin page | Admin Workers | Admin surface for Admin Ecosystem Pages. | /admin/workers | src/pages/admin/AdminEcosystemPages.tsx |
| Admin surfaces | admin page | Admin XGate | Admin surface for Admin XGate. | /admin/xgate | src/pages/admin/AdminXGate.tsx |
| Admin surfaces | admin page | Admin You | Personal account, identity, and access panel. | /admin/you | src/pages/admin/AdminYou.tsx |
| Admin surfaces | admin page | Boardroom | Boardroom discussion surface for worker coordination. | /admin/boardroom | src/pages/admin/Fishbowl.tsx |
| Admin surfaces | admin page | Copy Pass Catalog | Admin surface for Copy Pass Catalog. | /admin/copypass | src/pages/admin/copypass/CopyPassCatalog.tsx |
| Admin surfaces | admin page | Crew Composer | Crews admin page for Crew Composer. | /admin/crews/:id/edit | src/pages/admin/crews/CrewComposer.tsx |
| Admin surfaces | admin page | Crew Composer | Crews admin page for Crew Composer. | /admin/crews/new | src/pages/admin/crews/CrewComposer.tsx |
| Admin surfaces | admin page | Crew Run | Crews admin page for Crew Run. | /admin/crews/runs/:runId | src/pages/admin/crews/CrewRun.tsx |
| Admin surfaces | admin page | Crews Catalog | Crews admin page for Crews Catalog. | /admin/crews | src/pages/admin/crews/CrewsCatalog.tsx |
| Admin surfaces | admin page | Crews Runs | Crews admin page for Crews Runs. | /admin/crews/runs | src/pages/admin/crews/CrewsRuns.tsx |
| Admin surfaces | admin page | Crews Settings | Crews admin page for Crews Settings. | /admin/crews/settings | src/pages/admin/crews/CrewsSettings.tsx |
| Admin surfaces | admin page | Memory Setup Guide | User-facing page for Memory Setup Guide. | /admin/setup-guide | src/pages/MemorySetupGuide.tsx |
| Admin surfaces | admin page | New Run Wizard | Admin surface for New Run Wizard. | /admin/testpass/new | src/pages/admin/testpass/NewRunWizard.tsx |
| Admin surfaces | admin page | Report Detail | Admin surface for Report Detail. | /admin/testpass/reports/:id | src/pages/admin/testpass/ReportDetail.tsx |
| Admin surfaces | admin page | Run Detail | Admin surface for Run Detail. | /admin/testpass/runs/:id | src/pages/admin/testpass/RunDetail.tsx |
| Admin surfaces | admin page | Signals Catalog | Admin surface for Signals Catalog. | /admin/signals | src/pages/admin/signals/SignalsCatalog.tsx |
| Admin surfaces | admin page | Signals Settings | Admin surface for Signals Settings. | /admin/signals/settings | src/pages/admin/signals/SignalsSettings.tsx |
| Admin surfaces | admin page | Test Pass Catalog | Admin surface for Test Pass Catalog. | /admin/testpass | src/pages/admin/testpass/TestPassCatalog.tsx |
| Automations | autopilot module | autopilot control ledger | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/lib/autopilot-control-ledger.ts |
| Automations | autopilot module | autopilotkit liveness | autopilotkit liveness shared frontend logic. | - | scripts/lib/autopilotkit-liveness.mjs |
| Automations | autopilot module | pinballwake autopilot master loop | pinballwake autopilot master loop UnClick module. | - | scripts/pinballwake-autopilot-master-loop.mjs |
| Automations | autopilot module | pinballwake autopilot triage | pinballwake autopilot triage UnClick module. | - | scripts/pinballwake-autopilot-triage.mjs |
| Automations | script | autopilotkit liveness | Autopilot coordination, proof, or wake helper. | - | scripts/lib/autopilotkit-liveness.mjs |
| Automations | script | autopilotkit liveness.test | Autopilot coordination, proof, or wake helper. | - | scripts/autopilotkit-liveness.test.mjs |
| Automations | script | enterprisepass receipt guard.test | Receipt bridge or proof trail helper. | - | scripts/enterprisepass-receipt-guard.test.mjs |
| Automations | script | event wake router | Wake routing, ACK, or stale-handling helper. | - | scripts/event-wake-router.mjs |
| Automations | script | event wake router.test | Wake routing, ACK, or stale-handling helper. | - | scripts/event-wake-router.test.mjs |
| Automations | script | pinballwake ack ledger room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-ack-ledger-room.mjs |
| Automations | script | pinballwake ack ledger room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-ack-ledger-room.test.mjs |
| Automations | script | pinballwake autonomous runner | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-autonomous-runner.mjs |
| Automations | script | pinballwake autonomous runner.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-autonomous-runner.test.mjs |
| Automations | script | pinballwake autopilot master loop | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-autopilot-master-loop.mjs |
| Automations | script | pinballwake autopilot master loop.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-autopilot-master-loop.test.mjs |
| Automations | script | pinballwake autopilot triage | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-autopilot-triage.mjs |
| Automations | script | pinballwake autopilot triage.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-autopilot-triage.test.mjs |
| Automations | script | pinballwake build executor | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-build-executor.mjs |
| Automations | script | pinballwake build executor.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-build-executor.test.mjs |
| Automations | script | pinballwake buildbait room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-buildbait-room.mjs |
| Automations | script | pinballwake buildbait room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-buildbait-room.test.mjs |
| Automations | script | pinballwake close supersede room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-close-supersede-room.mjs |
| Automations | script | pinballwake close supersede room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-close-supersede-room.test.mjs |
| Automations | script | pinballwake coding room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-coding-room.mjs |
| Automations | script | pinballwake coding room runner | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-coding-room-runner.mjs |
| Automations | script | pinballwake coding room runner.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-coding-room-runner.test.mjs |
| Automations | script | pinballwake coding room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-coding-room.test.mjs |
| Automations | script | pinballwake commonsense pass | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-commonsense-pass.mjs |
| Automations | script | pinballwake commonsense pass.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-commonsense-pass.test.mjs |
| Automations | script | pinballwake continuous improvement room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-continuous-improvement-room.mjs |
| Automations | script | pinballwake continuous improvement room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-continuous-improvement-room.test.mjs |
| Automations | script | pinballwake continuous improvement watch | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-continuous-improvement-watch.mjs |
| Automations | script | pinballwake continuous improvement watch.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-continuous-improvement-watch.test.mjs |
| Automations | script | pinballwake dogfood room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-dogfood-room.mjs |
| Automations | script | pinballwake dogfood room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-dogfood-room.test.mjs |
| Automations | script | pinballwake event ledger room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-event-ledger-room.mjs |
| Automations | script | pinballwake event ledger room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-event-ledger-room.test.mjs |
| Automations | script | pinballwake executor lane | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-executor-lane.mjs |
| Automations | script | pinballwake executor lane.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-executor-lane.test.mjs |
| Automations | script | pinballwake executor packet | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-executor-packet.mjs |
| Automations | script | pinballwake executor packet.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-executor-packet.test.mjs |
| Automations | script | pinballwake jobs room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-jobs-room.mjs |
| Automations | script | pinballwake jobs room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-jobs-room.test.mjs |
| Automations | script | pinballwake launchpad room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-launchpad-room.mjs |
| Automations | script | pinballwake launchpad room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-launchpad-room.test.mjs |
| Automations | script | pinballwake merge controller | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-merge-controller.mjs |
| Automations | script | pinballwake merge controller.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-merge-controller.test.mjs |
| Automations | script | pinballwake merge room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-merge-room.mjs |
| Automations | script | pinballwake merge room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-merge-room.test.mjs |
| Automations | script | pinballwake openhands proof runner | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-openhands-proof-runner.mjs |
| Automations | script | pinballwake openhands proof runner.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-openhands-proof-runner.test.mjs |
| Automations | script | pinballwake openhands worker | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-openhands-worker.mjs |
| Automations | script | pinballwake openhands worker.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-openhands-worker.test.mjs |
| Automations | script | pinballwake overlap resolver room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-overlap-resolver-room.mjs |
| Automations | script | pinballwake overlap resolver room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-overlap-resolver-room.test.mjs |
| Automations | script | pinballwake personality room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-personality-room.mjs |
| Automations | script | pinballwake personality room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-personality-room.test.mjs |
| Automations | script | pinballwake pipeline dry run | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-pipeline-dry-run.mjs |
| Automations | script | pinballwake pipeline dry run.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-pipeline-dry-run.test.mjs |
| Automations | script | pinballwake pipeline executor | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-pipeline-executor.mjs |
| Automations | script | pinballwake pipeline executor.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-pipeline-executor.test.mjs |
| Automations | script | pinballwake planning room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-planning-room.mjs |
| Automations | script | pinballwake planning room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-planning-room.test.mjs |
| Automations | script | pinballwake post merge watch room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-post-merge-watch-room.mjs |
| Automations | script | pinballwake post merge watch room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-post-merge-watch-room.test.mjs |
| Automations | script | pinballwake proof executor | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-proof-executor.mjs |
| Automations | script | pinballwake proof executor.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-proof-executor.test.mjs |
| Automations | script | pinballwake publish room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-publish-room.mjs |
| Automations | script | pinballwake publish room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-publish-room.test.mjs |
| Automations | script | pinballwake queue health room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-queue-health-room.mjs |
| Automations | script | pinballwake queue health room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-queue-health-room.test.mjs |
| Automations | script | pinballwake quiet window proof | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-quiet-window-proof.mjs |
| Automations | script | pinballwake quiet window proof.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-quiet-window-proof.test.mjs |
| Automations | script | pinballwake release notes room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-release-notes-room.mjs |
| Automations | script | pinballwake release notes room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-release-notes-room.test.mjs |
| Automations | script | pinballwake repair room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-repair-room.mjs |
| Automations | script | pinballwake repair room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-repair-room.test.mjs |
| Automations | script | pinballwake research room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-research-room.mjs |
| Automations | script | pinballwake research room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-research-room.test.mjs |
| Automations | script | pinballwake rollback room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-rollback-room.mjs |
| Automations | script | pinballwake rollback room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-rollback-room.test.mjs |
| Automations | script | pinballwake scopepack hydrator | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-scopepack-hydrator.mjs |
| Automations | script | pinballwake stale room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-stale-room.mjs |
| Automations | script | pinballwake stale room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-stale-room.test.mjs |
| Automations | script | pinballwake worker registry room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-worker-registry-room.mjs |
| Automations | script | pinballwake worker registry room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-worker-registry-room.test.mjs |
| Automations | script | pinballwake writerlane free models | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-writerlane-free-models.mjs |
| Automations | script | pinballwake writerlane free models.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-writerlane-free-models.test.mjs |
| Automations | script | pinballwake writerlane free writer | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-writerlane-free-writer.mjs |
| Automations | script | pinballwake writerlane free writer.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-writerlane-free-writer.test.mjs |
| Automations | script | pinballwake writerlane live catalog | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-writerlane-live-catalog.mjs |
| Automations | script | pinballwake writerlane live catalog.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-writerlane-live-catalog.test.mjs |
| Automations | script | pinballwake writerlane validator | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-writerlane-validator.mjs |
| Automations | script | pinballwake writerlane validator.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-writerlane-validator.test.mjs |
| Automations | script | pinballwake xpass gate room | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-xpass-gate-room.mjs |
| Automations | script | pinballwake xpass gate room.test | PinballWake room, wake, or routing script used by the automation lane. | - | scripts/pinballwake-xpass-gate-room.test.mjs |
| Automations | script | tier2 auto merge queue check | tier2 auto merge queue check operational script. | - | scripts/tier2-auto-merge-queue-check.mjs |
| Automations | script | tier2 auto merge queue check.test | tier2 auto merge queue check.test operational script. | - | scripts/tier2-auto-merge-queue-check.test.mjs |
| Automations | script | Un Click brainmap | Brainmap generator or freshness check. | - | scripts/UnClick-brainmap.mjs |
| Automations | script | Un Click brainmap.test | Brainmap generator or freshness check. | - | scripts/UnClick-brainmap.test.mjs |
| Automations | workflow | apply migrations.yml | apply migrations GitHub automation workflow. | - | .github/workflows/apply-migrations.yml |
| Automations | workflow | auto close fishbowl todo.yml | auto close fishbowl todo GitHub automation workflow. | - | .github/workflows/auto-close-fishbowl-todo.yml |
| Automations | workflow | autonomous runner.yml | autonomous runner GitHub automation workflow. | - | .github/workflows/autonomous-runner.yml |
| Automations | workflow | brainmap auto update.yml | Scheduled workflow that regenerates the ecosystem Brainmap. | - | .github/workflows/brainmap-auto-update.yml |
| Automations | workflow | ci.yml | Continuous integration checks for build, tests, and proof safety. | - | .github/workflows/ci.yml |
| Automations | workflow | claude.yml | claude GitHub automation workflow. | - | .github/workflows/claude.yml |
| Automations | workflow | continuous improvement watch.yml | continuous improvement watch GitHub automation workflow. | - | .github/workflows/continuous-improvement-watch.yml |
| Automations | workflow | dirty branch hygiene.yml | dirty branch hygiene GitHub automation workflow. | - | .github/workflows/dirty-branch-hygiene.yml |
| Automations | workflow | dogfood report.yml | dogfood report GitHub automation workflow. | - | .github/workflows/dogfood-report.yml |
| Automations | workflow | event wake router.yml | GitHub-triggered wake and routing workflow. | - | .github/workflows/event-wake-router.yml |
| Automations | workflow | fleet throughput watch.yml | fleet throughput watch GitHub automation workflow. | - | .github/workflows/fleet-throughput-watch.yml |
| Automations | workflow | openhands test mode.yml | openhands test mode GitHub automation workflow. | - | .github/workflows/openhands-test-mode.yml |
| Automations | workflow | publish channel package.yml | publish channel package GitHub automation workflow. | - | .github/workflows/publish-channel-package.yml |
| Automations | workflow | publish mcp package.yml | publish mcp package GitHub automation workflow. | - | .github/workflows/publish-mcp-package.yml |
| Automations | workflow | publish standalone mcps.yml | publish standalone mcps GitHub automation workflow. | - | .github/workflows/publish-standalone-mcps.yml |
| Automations | workflow | review enforcement warning.yml | review enforcement warning GitHub automation workflow. | - | .github/workflows/review-enforcement-warning.yml |
| Automations | workflow | scheduled build self test.yml | scheduled build self test GitHub automation workflow. | - | .github/workflows/scheduled-build-self-test.yml |
| Automations | workflow | seed vault.yml | seed vault GitHub automation workflow. | - | .github/workflows/seed-vault.yml |
| Automations | workflow | testpass pr check.yml | testpass pr check GitHub automation workflow. | - | .github/workflows/testpass-pr-check.yml |
| Automations | workflow | testpass scheduled smoke.yml | testpass scheduled smoke GitHub automation workflow. | - | .github/workflows/testpass-scheduled-smoke.yml |
| Automations | workflow | tier2 auto merge queue check.yml | tier2 auto merge queue check GitHub automation workflow. | - | .github/workflows/tier2-auto-merge-queue-check.yml |
| Launch and onboarding | brainmap source | Un Click brainmap | Un Click brainmap UnClick module. | - | scripts/UnClick-brainmap.mjs |
| Launch and onboarding | judgement prompt | Crews Council Induction | Launchpad prompt that runs Council Lite on material work and asks for a full Crews Council only when launch, risk, mixed proof, or broad XPass evidence needs judgement. | /admin/pinballwake | scripts/pinballwake-launchpad-room.mjs |
| Launch and onboarding | map | Ecosystem Brainmap | Generated sitemap and system map that teaches seats what UnClick contains. | /admin/brainmap | src/pages/admin/AdminBrainmap.tsx |
| Launch and onboarding | policy | Heartbeat Master | Canonical schedule prompt and procedure for safe heartbeat seats. | /admin/agents/heartbeat | src/pages/admin/AdminSeatHeartbeat.tsx |
| Launch and onboarding | route | Launchpad | Control hub that points seats to the next safe operating lane. | /admin/pinballwake | scripts/pinballwake-launchpad-room.mjs |
| Ledgers and proof | ledger | Proof Ledger | Structured evidence, proof freshness, receipts, and DONE trust surface. | - | docs/agent-observability.md |
| Ledgers and proof | proof module | ledger | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/lib/xgate/ledger.ts |
| Ledgers and proof | proof module | pinballwake ack ledger room | pinballwake ack ledger room UnClick module. | - | scripts/pinballwake-ack-ledger-room.mjs |
| Ledgers and proof | proof module | pinballwake event ledger room | pinballwake event ledger room UnClick module. | - | scripts/pinballwake-event-ledger-room.mjs |
| Ledgers and proof | proof module | pinballwake openhands proof runner | pinballwake openhands proof runner UnClick module. | - | scripts/pinballwake-openhands-proof-runner.mjs |
| Ledgers and proof | proof module | pinballwake proof executor | pinballwake proof executor UnClick module. | - | scripts/pinballwake-proof-executor.mjs |
| Ledgers and proof | proof module | pinballwake quiet window proof | pinballwake quiet window proof UnClick module. | - | scripts/pinballwake-quiet-window-proof.mjs |
| Ledgers and proof | proof module | trendslop receipt | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/lib/xgate/gates/trendslop-receipt.ts |
| Modules and apps | app module | app Log Store | app Log Store shared frontend logic. | - | src/lib/jobsmith/appLogStore.ts |
| Modules and apps | app module | build Browser Corpus | build Browser Corpus shared frontend logic. | - | src/lib/jobsmith/buildBrowserCorpus.ts |
| Modules and apps | app module | generate jobsmith rules | generate jobsmith rules UnClick module. | - | scripts/generate-jobsmith-rules.mjs |
| Modules and apps | app module | parse Pdf Browser | parse Pdf Browser shared frontend logic. | - | src/lib/jobsmith/parsePdfBrowser.ts |
| Modules and apps | app | api | package UnClick module. | - | apps/api/package.json |
| Modules and apps | app | jobsmith | JobSmith application module for CV, checklist, and rule-pack work. | - | apps/jobsmith/package.json |
| Modules and apps | app | JobSmith | CV, cover-letter, job application, and rules/checklist engine. | /admin/jobsmith | apps/jobsmith/package.json |
| Modules and apps | automation module | AutoPilotKit | Internal automation bolt-on for proof-first work motion. | - | AUTOPILOT.md |
| Modules and apps | component | Admin Settings | Account and admin configuration. | - | src/pages/AdminSettings.tsx |
| Modules and apps | component | Admin XPass Hub | Admin surface for Admin XPass Hub. | - | src/pages/admin/AdminXPassHub.tsx |
| Modules and apps | component | Arena Home | Arena page for Arena Home. | - | src/pages/arena/ArenaHome.tsx |
| Modules and apps | component | Arena Leaderboard | Arena page for Arena Leaderboard. | - | src/pages/arena/ArenaLeaderboard.tsx |
| Modules and apps | component | Arena Problem | Arena page for Arena Problem. | - | src/pages/arena/ArenaProblem.tsx |
| Modules and apps | component | Arena Submit Problem | Arena page for Arena Submit Problem. | - | src/pages/arena/ArenaSubmitProblem.tsx |
| Modules and apps | component | Backstage Pass | User-facing page for Backstage Pass. | - | src/pages/BackstagePass.tsx |
| Modules and apps | component | Brain Map | Legacy Memory Brain Map component kept distinct from ecosystem Brainmap. | - | src/pages/admin/BrainMap.tsx |
| Modules and apps | component | Build Desk | Build and project work surface. | - | src/pages/BuildDesk.tsx |
| Modules and apps | component | Comments | Admin surface for Comments. | - | src/pages/admin/fishbowl/Comments.tsx |
| Modules and apps | component | Connected Services | Tool page for Connected Services. | - | src/pages/admin/tools/ConnectedServices.tsx |
| Modules and apps | component | Context Tab | Memory admin panel for Context Tab. | - | src/pages/admin/memory/ContextTab.tsx |
| Modules and apps | component | Empty State | Memory admin panel for Empty State. | - | src/pages/admin/memory/EmptyState.tsx |
| Modules and apps | component | Facts Tab | Memory admin panel for Facts Tab. | - | src/pages/admin/memory/FactsTab.tsx |
| Modules and apps | component | Ideas | Admin surface for Ideas. | - | src/pages/admin/fishbowl/Ideas.tsx |
| Modules and apps | component | Info Card | Memory admin panel for Info Card. | - | src/pages/admin/memory/InfoCard.tsx |
| Modules and apps | component | Library Tab | Memory admin panel for Library Tab. | - | src/pages/admin/memory/LibraryTab.tsx |
| Modules and apps | component | Memory Activity Tab | Memory admin panel for Memory Activity Tab. | - | src/pages/admin/memory/MemoryActivityTab.tsx |
| Modules and apps | component | Memory Admin | User-facing page for Memory Admin. | - | src/pages/MemoryAdmin.tsx |
| Modules and apps | component | Not Found | User-facing page for Not Found. | - | src/pages/NotFound.tsx |
| Modules and apps | component | search Highlight | Admin surface for search Highlight. | - | src/pages/admin/searchHighlight.tsx |
| Modules and apps | component | Sessions Tab | Memory admin panel for Sessions Tab. | - | src/pages/admin/memory/SessionsTab.tsx |
| Modules and apps | component | Settings | User-facing page for Settings. | - | src/pages/Settings.tsx |
| Modules and apps | component | Settings | Admin surface for Settings. | - | src/pages/admin/fishbowl/Settings.tsx |
| Modules and apps | component | Storage Bar | Memory admin panel for Storage Bar. | - | src/pages/admin/memory/StorageBar.tsx |
| Modules and apps | component | Todos | Admin surface for Todos. | - | src/pages/admin/fishbowl/Todos.tsx |
| Modules and apps | component | Un Click Tools | Tool page for Un Click Tools. | - | src/pages/admin/tools/UnClickTools.tsx |
| Modules and apps | package | abn mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/abn-mcp/package.json |
| Modules and apps | package | amber mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/amber-mcp/package.json |
| Modules and apps | package | australiapost mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/australiapost-mcp/package.json |
| Modules and apps | package | bgg mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/bgg-mcp/package.json |
| Modules and apps | package | channel plugin | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/channel-plugin/package.json |
| Modules and apps | package | chessdotcom mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/chessdotcom-mcp/package.json |
| Modules and apps | package | coingecko mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/coingecko-mcp/package.json |
| Modules and apps | package | commonsensepass | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/commonsensepass/package.json |
| Modules and apps | package | compliancepass | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/compliancepass/package.json |
| Modules and apps | package | copypass | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/copypass/package.json |
| Modules and apps | package | core | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/core/package.json |
| Modules and apps | package | deezer mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/deezer-mcp/package.json |
| Modules and apps | package | domain mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/domain-mcp/package.json |
| Modules and apps | package | espn mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/espn-mcp/package.json |
| Modules and apps | package | exchangerate mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/exchangerate-mcp/package.json |
| Modules and apps | package | flowpass | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/flowpass/package.json |
| Modules and apps | package | fpl mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/fpl-mcp/package.json |
| Modules and apps | package | gdelt mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/gdelt-mcp/package.json |
| Modules and apps | package | genius mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/genius-mcp/package.json |
| Modules and apps | package | geopass | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/geopass/package.json |
| Modules and apps | package | hackernews mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/hackernews-mcp/package.json |
| Modules and apps | package | igdb mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/igdb-mcp/package.json |
| Modules and apps | package | ipapi mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/ipapi-mcp/package.json |
| Modules and apps | package | ipaustralia mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/ipaustralia-mcp/package.json |
| Modules and apps | package | lastfm mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/lastfm-mcp/package.json |
| Modules and apps | package | legalpass | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/legalpass/package.json |
| Modules and apps | package | lichess mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/lichess-mcp/package.json |
| Modules and apps | package | mcp server | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/mcp-server/package.json |
| Modules and apps | package | meal mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/meal-mcp/package.json |
| Modules and apps | package | memory mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/memory-mcp/package.json |
| Modules and apps | package | musicbrainz mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/musicbrainz-mcp/package.json |
| Modules and apps | package | nasa mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/nasa-mcp/package.json |
| Modules and apps | package | omdb mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/omdb-mcp/package.json |
| Modules and apps | package | openaq mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/openaq-mcp/package.json |
| Modules and apps | package | openf1 mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/openf1-mcp/package.json |
| Modules and apps | package | openfoodfacts mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/openfoodfacts-mcp/package.json |
| Modules and apps | package | openlibrary mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/openlibrary-mcp/package.json |
| Modules and apps | package | openmeteo mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/openmeteo-mcp/package.json |
| Modules and apps | package | ptv mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/ptv-mcp/package.json |
| Modules and apps | package | radiobrowser mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/radiobrowser-mcp/package.json |
| Modules and apps | package | rawg mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/rawg-mcp/package.json |
| Modules and apps | package | reddit mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/reddit-mcp/package.json |
| Modules and apps | package | restcountries mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/restcountries-mcp/package.json |
| Modules and apps | package | securitypass | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/securitypass/package.json |
| Modules and apps | package | sendle mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/sendle-mcp/package.json |
| Modules and apps | package | seopass | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/seopass/package.json |
| Modules and apps | package | sleeper mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/sleeper-mcp/package.json |
| Modules and apps | package | sloppass | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/sloppass/package.json |
| Modules and apps | package | speedrun mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/speedrun-mcp/package.json |
| Modules and apps | package | spotify mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/spotify-mcp/package.json |
| Modules and apps | package | testpass | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/testpass/package.json |
| Modules and apps | package | thelott mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/thelott-mcp/package.json |
| Modules and apps | package | tmdb mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/tmdb-mcp/package.json |
| Modules and apps | package | trivia mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/trivia-mcp/package.json |
| Modules and apps | package | untappd mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/untappd-mcp/package.json |
| Modules and apps | package | usgs mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/usgs-mcp/package.json |
| Modules and apps | package | uxpass | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/uxpass/package.json |
| Modules and apps | package | willyweather mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/willyweather-mcp/package.json |
| Modules and apps | package | wizard | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/wizard/package.json |
| Modules and apps | package | youtube mcp | Shared package used by UnClick tools, MCP, or worker lanes. | - | packages/standalone/youtube-mcp/package.json |
| Modules and apps | skill library | Skills Library | Read-only starter pack of UnClick-native skills, hardwired rails, hybrid workflows, and portable skill packages. | /admin/skills | src/pages/admin/AdminSkills.tsx |
| Modules and apps | skill package | agent handoff packet writer | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/agent-handoff-packet-writer.skill.md |
| Modules and apps | skill package | browser qa tester | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/browser-qa-tester.skill.md |
| Modules and apps | skill package | builder implementation packet | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/builder-implementation-packet.skill.md |
| Modules and apps | skill package | coordinator router | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/coordinator-router.skill.md |
| Modules and apps | skill package | cross pc context summariser | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/cross-pc-context-summariser.skill.md |
| Modules and apps | skill package | deep research analyst | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/deep-research-analyst.skill.md |
| Modules and apps | skill package | dependency upgrade reviewer | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/dependency-upgrade-reviewer.skill.md |
| Modules and apps | skill package | draft pr description | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/draft-pr-description.skill.md |
| Modules and apps | skill package | fix failing ci | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/fix-failing-ci.skill.md |
| Modules and apps | skill package | github pr summariser | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/github-pr-summariser.skill.md |
| Modules and apps | skill package | memory distiller | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/memory-distiller.skill.md |
| Modules and apps | skill package | research brief generator | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/research-brief-generator.skill.md |
| Modules and apps | skill package | reviewer gate | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/reviewer-gate.skill.md |
| Modules and apps | skill package | safety checker gate | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/safety-checker-gate.skill.md |
| Modules and apps | skill package | screenshot visual qa | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/screenshot-visual-qa.skill.md |
| Modules and apps | skill package | security review | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/security-review.skill.md |
| Modules and apps | skill package | senior code reviewer | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/senior-code-reviewer.skill.md |
| Modules and apps | skill package | tester proof plan | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/tester-proof-plan.skill.md |
| Modules and apps | skill package | watcher heartbeat tether | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/watcher-heartbeat-tether.skill.md |
| Modules and apps | skill package | write tests for changed code | Agent Skills-compatible starter package with provenance, safety, and native-mode metadata. | /admin/skills | seed/skills/write-tests-for-changed-code.skill.md |
| Passes and gates | component source gate | UIPass Toolbox | Curated UI source registry and proof scoreboard for shadcn, Radix, React Aria, Base UI, Floating UI, Motion, 21st.dev, Magic UI, Aceternity, Origin UI, and advisory design intelligence. | - | packages/uxpass/src/ui-toolbox.ts |
| Passes and gates | fidelity gate | CopyRoom | Exact-copy room for code, docs, tables, notes, and source text so seats do not retype drift-prone material. | - | docs/UnClick-brainmap.generated.md |
| Passes and gates | fidelity gate | FidelityPass | Checks exactness and invariant preservation when copying, refactoring, or translating content. | - | scripts/fidelitycopy.test.mjs |
| Passes and gates | judgment gate | CommonSensePass | Plain-reasoning gate used before healthy, done, merge-ready, or PASS claims. | - | api/commonsensepass-bridge.test.ts |
| Passes and gates | pass | testpass | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/testpass.ts |
| Passes and gates | pass | testpass background handoff | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/lib/testpass-background-handoff.ts |
| Passes and gates | pass | testpass boundary | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/lib/testpass-boundary.ts |
| Passes and gates | pass | testpass edit guard | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/lib/testpass-edit-guard.ts |
| Passes and gates | pass | testpass pr comment | testpass pr comment UnClick module. | - | scripts/testpass-pr-comment.mjs |
| Passes and gates | pass | testpass pr target | testpass pr target UnClick module. | - | scripts/testpass-pr-target.mjs |
| Passes and gates | pass | testpass run | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/testpass-run.ts |
| Passes and gates | pass | uxpass | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/uxpass.ts |
| Passes and gates | pass | uxpass run | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/uxpass-run.ts |
| Passes and gates | pass | uxpass run handoff | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/lib/uxpass-run-handoff.ts |
| Passes and gates | pass | uxpass site sweep | uxpass site sweep UnClick module. | - | scripts/uxpass-site-sweep.mjs |
| Passes and gates | pass | uxpass visual audit | uxpass visual audit UnClick module. | - | scripts/uxpass-visual-audit.mjs |
| Passes and gates | wake gate | WakePass | Verifies ACKs, stale handoffs, and worker wake requests before motion claims. | - | docs/pinballwake-igniteonly-api.md |
| Public surfaces | public page | App Detail | User-facing page for App Detail. | /apps/:slug | src/pages/AppDetail.tsx |
| Public surfaces | public page | Apps | User-facing page for Apps. | /apps | src/pages/Apps.tsx |
| Public surfaces | public page | Auth Callback | User-facing page for Auth Callback. | /auth/callback | src/pages/AuthCallback.tsx |
| Public surfaces | public page | Connect | User-facing page for Connect. | /connect/:platform | src/pages/Connect.tsx |
| Public surfaces | public page | Crews | Public Crews explanation and entry point. | /crews | src/pages/Crews.tsx |
| Public surfaces | public page | Developer Docs | Developer documentation. | /developers/docs | src/pages/DeveloperDocs.tsx |
| Public surfaces | public page | Developer Submit | Tool submission flow. | /developers/submit | src/pages/DeveloperSubmit.tsx |
| Public surfaces | public page | Developers | Developer-facing entry point. | /developers | src/pages/Developers.tsx |
| Public surfaces | public page | Dispatch | Dispatch and message handoff surface. | /dispatch | src/pages/Dispatch.tsx |
| Public surfaces | public page | Docs | User-facing page for Docs. | /docs | src/pages/Docs.tsx |
| Public surfaces | public page | Dogfood Report | Public dogfood proof report. | /dogfood | src/pages/DogfoodReport.tsx |
| Public surfaces | public page | FAQ | User-facing page for FAQPage. | /faq | src/pages/FAQPage.tsx |
| Public surfaces | public page | Index | Public home and first explanation of UnClick. | / | src/pages/Index.tsx |
| Public surfaces | public page | Install Recover | User-facing page for Install Recover. | /i | src/pages/InstallRecover.tsx |
| Public surfaces | public page | Jobsmith | User-facing page for Jobsmith. | /jobsmith | src/pages/Jobsmith.tsx |
| Public surfaces | public page | Link In Bio | Tool page for Link In Bio. | /tools/link-in-bio | src/pages/tools/LinkInBio.tsx |
| Public surfaces | public page | Login | Sign-in page. | /login | src/pages/Login.tsx |
| Public surfaces | public page | Memory | Public memory product page. | /memory | src/pages/Memory.tsx |
| Public surfaces | public page | Memory Connect | User-facing page for Memory Connect. | /memory/connect | src/pages/MemoryConnect.tsx |
| Public surfaces | public page | Memory Setup | User-facing page for Memory Setup. | /memory/setup | src/pages/MemorySetup.tsx |
| Public surfaces | public page | Memory Setup Guide | User-facing page for Memory Setup Guide. | /memory/setup-guide | src/pages/MemorySetupGuide.tsx |
| Public surfaces | public page | New To AI | Beginner-friendly AI orientation. | /new-to-ai | src/pages/NewToAI.tsx |
| Public surfaces | public page | Organiser | User-facing page for Organiser. | /organiser | src/pages/Organiser.tsx |
| Public surfaces | public page | Pricing | Plans, billing, and packaging. | /pricing | src/pages/Pricing.tsx |
| Public surfaces | public page | Privacy | Privacy policy. | /privacy | src/pages/Privacy.tsx |
| Public surfaces | public page | Scheduling | Tool page for Scheduling. | /tools/scheduling | src/pages/tools/Scheduling.tsx |
| Public surfaces | public page | Signup | Sign-up page. | /signup | src/pages/Signup.tsx |
| Public surfaces | public page | Smart Home | User-facing page for Smart Home. | /smarthome | src/pages/SmartHome.tsx |
| Public surfaces | public page | Solve | Tool page for Solve. | /tools/solve | src/pages/tools/Solve.tsx |
| Public surfaces | public page | Terms | Terms of service. | /terms | src/pages/Terms.tsx |
| Public surfaces | public page | Tools | Public tools marketplace entry point. | /tools | src/pages/Tools.tsx |
| Public surfaces | public page | Verify Mfa | User-facing page for Verify Mfa. | /auth/verify-mfa | src/pages/VerifyMfa.tsx |
| Public surfaces | public page | Vibe Coding | User-facing page for Vibe Coding. | /developers/vibe-coding | src/pages/VibeCoding.tsx |
| Public surfaces | public page | XPass | User-facing page for XPass. | /xpass | src/pages/XPass.tsx |
| Rooms | PinballWake room | ack ledger | PinballWake room logic generated from scripts/pinballwake-ack-ledger-room.mjs. | - | scripts/pinballwake-ack-ledger-room.mjs |
| Rooms | PinballWake room | buildbait | PinballWake room logic generated from scripts/pinballwake-buildbait-room.mjs. | - | scripts/pinballwake-buildbait-room.mjs |
| Rooms | PinballWake room | close supersede | PinballWake room logic generated from scripts/pinballwake-close-supersede-room.mjs. | - | scripts/pinballwake-close-supersede-room.mjs |
| Rooms | PinballWake room | coding | PinballWake room logic generated from scripts/pinballwake-coding-room.mjs. | - | scripts/pinballwake-coding-room.mjs |
| Rooms | PinballWake room | continuous improvement | PinballWake room logic generated from scripts/pinballwake-continuous-improvement-room.mjs. | - | scripts/pinballwake-continuous-improvement-room.mjs |
| Rooms | PinballWake room | dogfood | PinballWake room logic generated from scripts/pinballwake-dogfood-room.mjs. | - | scripts/pinballwake-dogfood-room.mjs |
| Rooms | PinballWake room | event ledger | PinballWake room logic generated from scripts/pinballwake-event-ledger-room.mjs. | - | scripts/pinballwake-event-ledger-room.mjs |
| Rooms | PinballWake room | jobs | PinballWake room logic generated from scripts/pinballwake-jobs-room.mjs. | - | scripts/pinballwake-jobs-room.mjs |
| Rooms | PinballWake room | launchpad | PinballWake room logic generated from scripts/pinballwake-launchpad-room.mjs. | - | scripts/pinballwake-launchpad-room.mjs |
| Rooms | PinballWake room | merge | PinballWake room logic generated from scripts/pinballwake-merge-room.mjs. | - | scripts/pinballwake-merge-room.mjs |
| Rooms | PinballWake room | overlap resolver | PinballWake room logic generated from scripts/pinballwake-overlap-resolver-room.mjs. | - | scripts/pinballwake-overlap-resolver-room.mjs |
| Rooms | PinballWake room | personality | PinballWake room logic generated from scripts/pinballwake-personality-room.mjs. | - | scripts/pinballwake-personality-room.mjs |
| Rooms | PinballWake room | planning | PinballWake room logic generated from scripts/pinballwake-planning-room.mjs. | - | scripts/pinballwake-planning-room.mjs |
| Rooms | PinballWake room | post merge watch | PinballWake room logic generated from scripts/pinballwake-post-merge-watch-room.mjs. | - | scripts/pinballwake-post-merge-watch-room.mjs |
| Rooms | PinballWake room | publish | PinballWake room logic generated from scripts/pinballwake-publish-room.mjs. | - | scripts/pinballwake-publish-room.mjs |
| Rooms | PinballWake room | queue health | PinballWake room logic generated from scripts/pinballwake-queue-health-room.mjs. | - | scripts/pinballwake-queue-health-room.mjs |
| Rooms | PinballWake room | release notes | PinballWake room logic generated from scripts/pinballwake-release-notes-room.mjs. | - | scripts/pinballwake-release-notes-room.mjs |
| Rooms | PinballWake room | repair | PinballWake room logic generated from scripts/pinballwake-repair-room.mjs. | - | scripts/pinballwake-repair-room.mjs |
| Rooms | PinballWake room | research | PinballWake room logic generated from scripts/pinballwake-research-room.mjs. | - | scripts/pinballwake-research-room.mjs |
| Rooms | PinballWake room | rollback | PinballWake room logic generated from scripts/pinballwake-rollback-room.mjs. | - | scripts/pinballwake-rollback-room.mjs |
| Rooms | PinballWake room | stale | PinballWake room logic generated from scripts/pinballwake-stale-room.mjs. | - | scripts/pinballwake-stale-room.mjs |
| Rooms | PinballWake room | worker registry | PinballWake room logic generated from scripts/pinballwake-worker-registry-room.mjs. | - | scripts/pinballwake-worker-registry-room.mjs |
| Rooms | PinballWake room | xpass gate | PinballWake room logic generated from scripts/pinballwake-xpass-gate-room.mjs. | - | scripts/pinballwake-xpass-gate-room.mjs |
| Source of truth | context | Orchestrator | Continuity stream and story layer that helps seats understand what happened. | /admin/orchestrator | src/pages/admin/AdminOrchestrator.tsx |
| Source of truth | memory | Memory Library | Source-linked facts, sessions, context, and generated memory shelves. | /admin/memory | src/pages/admin/AdminMemory.tsx |
| Source of truth | queue | Boardroom Jobs | Primary work source for open, in-progress, done, and dropped chips. | /admin/jobs | src/pages/admin/AdminJobs.tsx |
| Source of truth | state module | backfill typed memory events | backfill typed memory events UnClick module. | - | scripts/backfill-typed-memory-events.ts |
| Source of truth | state module | boardroom compat | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/lib/boardroom-compat.ts |
| Source of truth | state module | boardroom read bounds | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/lib/boardroom-read-bounds.ts |
| Source of truth | state module | embed | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/memory/embed.ts |
| Source of truth | state module | memory admin | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/memory-admin.ts |
| Source of truth | state module | memory Data Island | memory Data Island shared frontend logic. | - | src/lib/memoryDataIsland.ts |
| Source of truth | state module | memory recall sections | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/lib/memory-recall-sections.ts |
| Source of truth | state module | memory retrieval eval | memory retrieval eval UnClick module. | - | scripts/memory-retrieval-eval.mjs |
| Source of truth | state module | memory Taxonomy | memory Taxonomy shared frontend logic. | - | src/lib/memoryTaxonomy.ts |
| Source of truth | state module | orchestrator context | Server endpoint or helper used by UnClick admin, memory, workers, or tools. | - | api/lib/orchestrator-context.ts |
| Tools | MCP tool | abn | abn MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/abn-tool.ts |
| Tools | MCP tool | abuseipdb | abuseipdb MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/abuseipdb-tool.ts |
| Tools | MCP tool | airtable | airtable MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/airtable-tool.ts |
| Tools | MCP tool | algolia | algolia MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/algolia-tool.ts |
| Tools | MCP tool | alphavantage | alphavantage MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/alphavantage-tool.ts |
| Tools | MCP tool | amazon | amazon MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/amazon-tool.ts |
| Tools | MCP tool | amber | amber MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/amber-tool.ts |
| Tools | MCP tool | anthropic | anthropic MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/anthropic-tool.ts |
| Tools | MCP tool | asana | asana MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/asana-tool.ts |
| Tools | MCP tool | assemblyai | assemblyai MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/assemblyai-tool.ts |
| Tools | MCP tool | australiapost | australiapost MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/australiapost-tool.ts |
| Tools | MCP tool | bandsintown | bandsintown MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/bandsintown-tool.ts |
| Tools | MCP tool | bgg | bgg MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/bgg-tool.ts |
| Tools | MCP tool | bitbucket | bitbucket MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/bitbucket-tool.ts |
| Tools | MCP tool | bluesky | bluesky MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/bluesky-tool.ts |
| Tools | MCP tool | brevo | brevo MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/brevo-tool.ts |
| Tools | MCP tool | bungie | bungie MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/bungie-tool.ts |
| Tools | MCP tool | calcom | calcom MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/calcom-tool.ts |
| Tools | MCP tool | calculator | calculator MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/calculator-tool.ts |
| Tools | MCP tool | calendly | calendly MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/calendly-tool.ts |
| Tools | MCP tool | carboninterface | carboninterface MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/carboninterface-tool.ts |
| Tools | MCP tool | chessdotcom | chessdotcom MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/chessdotcom-tool.ts |
| Tools | MCP tool | circleci | circleci MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/circleci-tool.ts |
| Tools | MCP tool | clickup | clickup MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/clickup-tool.ts |
| Tools | MCP tool | clockify | clockify MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/clockify-tool.ts |
| Tools | MCP tool | cloudinary | cloudinary MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/cloudinary-tool.ts |
| Tools | MCP tool | coda | coda MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/coda-tool.ts |
| Tools | MCP tool | cohere | cohere MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/cohere-tool.ts |
| Tools | MCP tool | coingecko | coingecko MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/coingecko-tool.ts |
| Tools | MCP tool | coinmarketcap | coinmarketcap MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/coinmarketcap-tool.ts |
| Tools | MCP tool | color | color MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/color-tool.ts |
| Tools | MCP tool | commonsensepass | commonsensepass MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/commonsensepass-tool.ts |
| Tools | MCP tool | compliancepass | compliancepass MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/compliancepass-tool.ts |
| Tools | MCP tool | confluence | confluence MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/confluence-tool.ts |
| Tools | MCP tool | contentful | contentful MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/contentful-tool.ts |
| Tools | MCP tool | convertkit | convertkit MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/convertkit-tool.ts |
| Tools | MCP tool | copypass | copypass MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/copypass-tool.ts |
| Tools | MCP tool | crews | crews MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/crews-tool.ts |
| Tools | MCP tool | csuite | csuite MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/csuite-tool.ts |
| Tools | MCP tool | datadog | datadog MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/datadog-tool.ts |
| Tools | MCP tool | datetime | datetime MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/datetime-tool.ts |
| Tools | MCP tool | deepl | deepl MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/deepl-tool.ts |
| Tools | MCP tool | deezer | deezer MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/deezer-tool.ts |
| Tools | MCP tool | digitalocean | digitalocean MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/digitalocean-tool.ts |
| Tools | MCP tool | discogs | discogs MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/discogs-tool.ts |
| Tools | MCP tool | discord | discord MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/discord-tool.ts |
| Tools | MCP tool | domain | domain MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/domain-tool.ts |
| Tools | MCP tool | dropbox | dropbox MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/dropbox-tool.ts |
| Tools | MCP tool | ebay | ebay MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/ebay-tool.ts |
| Tools | MCP tool | ebird | ebird MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/ebird-tool.ts |
| Tools | MCP tool | elevenlabs | elevenlabs MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/elevenlabs-tool.ts |
| Tools | MCP tool | email | email MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/email-tool.ts |
| Tools | MCP tool | espn | espn MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/espn-tool.ts |
| Tools | MCP tool | etsy | etsy MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/etsy-tool.ts |
| Tools | MCP tool | eventbrite | eventbrite MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/eventbrite-tool.ts |
| Tools | MCP tool | exchangerate | exchangerate MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/exchangerate-tool.ts |
| Tools | MCP tool | feedly | feedly MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/feedly-tool.ts |
| Tools | MCP tool | fidelitycopy | fidelitycopy MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/fidelitycopy-tool.ts |
| Tools | MCP tool | figma | figma MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/figma-tool.ts |
| Tools | MCP tool | flowpass | flowpass MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/flowpass-tool.ts |
| Tools | MCP tool | flyio | flyio MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/flyio-tool.ts |
| Tools | MCP tool | foursquare | foursquare MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/foursquare-tool.ts |
| Tools | MCP tool | fpl | fpl MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/fpl-tool.ts |
| Tools | MCP tool | gdelt | gdelt MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/gdelt-tool.ts |
| Tools | MCP tool | genius | genius MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/genius-tool.ts |
| Tools | MCP tool | geopass | geopass MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/geopass-tool.ts |
| Tools | MCP tool | ghost | ghost MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/ghost-tool.ts |
| Tools | MCP tool | giphy | giphy MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/giphy-tool.ts |
| Tools | MCP tool | github | github MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/github-tool.ts |
| Tools | MCP tool | gitlab | gitlab MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/gitlab-tool.ts |
| Tools | MCP tool | groq | groq MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/groq-tool.ts |
| Tools | MCP tool | guardian | guardian MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/guardian-tool.ts |
| Tools | MCP tool | gumroad | gumroad MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/gumroad-tool.ts |
| Tools | MCP tool | hackernews | hackernews MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/hackernews-tool.ts |
| Tools | MCP tool | haveibeenpwned | haveibeenpwned MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/haveibeenpwned-tool.ts |
| Tools | MCP tool | Heartbeat Protocol | Canonical heartbeat policy served to scheduled seats. | - | packages/mcp-server/src/heartbeat-protocol.ts |
| Tools | MCP tool | heygen | heygen MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/heygen-tool.ts |
| Tools | MCP tool | higgsfield | higgsfield MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/higgsfield-tool.ts |
| Tools | MCP tool | hubspot | hubspot MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/hubspot-tool.ts |
| Tools | MCP tool | hunter | hunter MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/hunter-tool.ts |
| Tools | MCP tool | igdb | igdb MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/igdb-tool.ts |
| Tools | MCP tool | IgniteOnly | IgniteOnly verified worker wake packet bridge. | - | packages/mcp-server/src/igniteonly-tool.ts |
| Tools | MCP tool | instapaper | instapaper MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/instapaper-tool.ts |
| Tools | MCP tool | intercom | intercom MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/intercom-tool.ts |
| Tools | MCP tool | ipapi | ipapi MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/ipapi-tool.ts |
| Tools | MCP tool | ipaustralia | ipaustralia MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/ipaustralia-tool.ts |
| Tools | MCP tool | jira | jira MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/jira-tool.ts |
| Tools | MCP tool | jobsmith | jobsmith MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/jobsmith-tool.ts |
| Tools | MCP tool | keychain | keychain MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/keychain-tool.ts |
| Tools | MCP tool | klaviyo | klaviyo MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/klaviyo-tool.ts |
| Tools | MCP tool | kling | kling MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/kling-tool.ts |
| Tools | MCP tool | lastfm | lastfm MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/lastfm-tool.ts |
| Tools | MCP tool | legalpass | legalpass MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/legalpass-tool.ts |
| Tools | MCP tool | lego | lego MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/lego-tool.ts |
| Tools | MCP tool | lemonsqueezy | lemonsqueezy MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/lemonsqueezy-tool.ts |
| Tools | MCP tool | lichess | lichess MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/lichess-tool.ts |
| Tools | MCP tool | line | line MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/line-tool.ts |
| Tools | MCP tool | linear | linear MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/linear-tool.ts |
| Tools | MCP tool | mailchimp | mailchimp MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/mailchimp-tool.ts |
| Tools | MCP tool | mapbox | mapbox MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/mapbox-tool.ts |
| Tools | MCP tool | mastodon | mastodon MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/mastodon-tool.ts |
| Tools | MCP tool | meal | meal MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/meal-tool.ts |
| Tools | MCP tool | miro | miro MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/miro-tool.ts |
| Tools | MCP tool | mistral | mistral MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/mistral-tool.ts |
| Tools | MCP tool | mixpanel | mixpanel MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/mixpanel-tool.ts |
| Tools | MCP tool | monday | monday MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/monday-tool.ts |
| Tools | MCP tool | monica | monica MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/monica-tool.ts |
| Tools | MCP tool | musicbrainz | musicbrainz MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/musicbrainz-tool.ts |
| Tools | MCP tool | nasa | nasa MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/nasa-tool.ts |
| Tools | MCP tool | neon | neon MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/neon-tool.ts |
| Tools | MCP tool | netlify | netlify MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/netlify-tool.ts |
| Tools | MCP tool | newsapi | newsapi MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/newsapi-tool.ts |
| Tools | MCP tool | notion | notion MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/notion-tool.ts |
| Tools | MCP tool | NudgeOnly | NudgeOnly low-token receipt bridge and advisory classifier. | - | packages/mcp-server/src/nudgeonly-tool.ts |
| Tools | MCP tool | numbers | numbers MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/numbers-tool.ts |
| Tools | MCP tool | nvd | nvd MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/nvd-tool.ts |
| Tools | MCP tool | omdb | omdb MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/omdb-tool.ts |
| Tools | MCP tool | openai | openai MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/openai-tool.ts |
| Tools | MCP tool | openaq | openaq MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/openaq-tool.ts |
| Tools | MCP tool | openexchangerates | openexchangerates MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/openexchangerates-tool.ts |
| Tools | MCP tool | openf1 | openf1 MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/openf1-tool.ts |
| Tools | MCP tool | openfoodfacts | openfoodfacts MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/openfoodfacts-tool.ts |
| Tools | MCP tool | openlibrary | openlibrary MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/openlibrary-tool.ts |
| Tools | MCP tool | openmeteo | openmeteo MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/openmeteo-tool.ts |
| Tools | MCP tool | pagerduty | pagerduty MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/pagerduty-tool.ts |
| Tools | MCP tool | pandascore | pandascore MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/pandascore-tool.ts |
| Tools | MCP tool | paypal | paypal MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/paypal-tool.ts |
| Tools | MCP tool | perplexity | perplexity MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/perplexity-tool.ts |
| Tools | MCP tool | pika | pika MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/pika-tool.ts |
| Tools | MCP tool | pinecone | pinecone MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/pinecone-tool.ts |
| Tools | MCP tool | pinterest | pinterest MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/pinterest-tool.ts |
| Tools | MCP tool | pipedrive | pipedrive MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/pipedrive-tool.ts |
| Tools | MCP tool | plaid | plaid MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/plaid-tool.ts |
| Tools | MCP tool | podcastindex | podcastindex MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/podcastindex-tool.ts |
| Tools | MCP tool | posthog | posthog MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/posthog-tool.ts |
| Tools | MCP tool | postman | postman MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/postman-tool.ts |
| Tools | MCP tool | postmark | postmark MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/postmark-tool.ts |
| Tools | MCP tool | ptv | ptv MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/ptv-tool.ts |
| Tools | MCP tool | pushonly | pushonly MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/pushonly-tool.ts |
| Tools | MCP tool | pushover | pushover MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/pushover-tool.ts |
| Tools | MCP tool | qc | qc MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/qc-tool.ts |
| Tools | MCP tool | quickbooks | quickbooks MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/quickbooks-tool.ts |
| Tools | MCP tool | radiobrowser | radiobrowser MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/radiobrowser-tool.ts |
| Tools | MCP tool | raindrop | raindrop MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/raindrop-tool.ts |
| Tools | MCP tool | random | random MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/random-tool.ts |
| Tools | MCP tool | rawg | rawg MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/rawg-tool.ts |
| Tools | MCP tool | readwise | readwise MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/readwise-tool.ts |
| Tools | MCP tool | reddit | reddit MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/reddit-tool.ts |
| Tools | MCP tool | render | render MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/render-tool.ts |
| Tools | MCP tool | replicate | replicate MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/replicate-tool.ts |
| Tools | MCP tool | resend | resend MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/resend-tool.ts |
| Tools | MCP tool | restcountries | restcountries MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/restcountries-tool.ts |
| Tools | MCP tool | riot | riot MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/riot-tool.ts |
| Tools | MCP tool | runway | runway MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/runway-tool.ts |
| Tools | MCP tool | seatgeek | seatgeek MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/seatgeek-tool.ts |
| Tools | MCP tool | securitypass | securitypass MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/securitypass-tool.ts |
| Tools | MCP tool | segment | segment MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/segment-tool.ts |
| Tools | MCP tool | sendgrid | sendgrid MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/sendgrid-tool.ts |
| Tools | MCP tool | sendle | sendle MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/sendle-tool.ts |
| Tools | MCP tool | sentry | sentry MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/sentry-tool.ts |
| Tools | MCP tool | seopass | seopass MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/seopass-tool.ts |
| Tools | MCP tool | setlistfm | setlistfm MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/setlistfm-tool.ts |
| Tools | MCP tool | shodan | shodan MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/shodan-tool.ts |
| Tools | MCP tool | shopify | shopify MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/shopify-tool.ts |
| Tools | MCP tool | shortcut | shortcut MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/shortcut-tool.ts |
| Tools | MCP tool | slack | slack MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/slack-tool.ts |
| Tools | MCP tool | sleeper | sleeper MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/sleeper-tool.ts |
| Tools | MCP tool | sloppass | sloppass MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/sloppass-tool.ts |
| Tools | MCP tool | speedrun | speedrun MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/speedrun-tool.ts |
| Tools | MCP tool | splitwise | splitwise MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/splitwise-tool.ts |
| Tools | MCP tool | spotify | spotify MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/spotify-tool.ts |
| Tools | MCP tool | square | square MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/square-tool.ts |
| Tools | MCP tool | stability | stability MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/stability-tool.ts |
| Tools | MCP tool | steam | steam MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/steam-tool.ts |
| Tools | MCP tool | stripe | stripe MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/stripe-tool.ts |
| Tools | MCP tool | supercell | supercell MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/supercell-tool.ts |
| Tools | MCP tool | tab | tab MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/tab-tool.ts |
| Tools | MCP tool | telegram | telegram MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/telegram-tool.ts |
| Tools | MCP tool | testpass | TestPass proof and test orchestration capability. | - | packages/mcp-server/src/testpass-tool.ts |
| Tools | MCP tool | text | text MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/text-tool.ts |
| Tools | MCP tool | thelott | thelott MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/thelott-tool.ts |
| Tools | MCP tool | ticketmaster | ticketmaster MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/ticketmaster-tool.ts |
| Tools | MCP tool | tiktok | tiktok MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/tiktok-tool.ts |
| Tools | MCP tool | tmdb | tmdb MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/tmdb-tool.ts |
| Tools | MCP tool | todoist | todoist MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/todoist-tool.ts |
| Tools | MCP tool | togetherai | togetherai MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/togetherai-tool.ts |
| Tools | MCP tool | toggl | toggl MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/toggl-tool.ts |
| Tools | MCP tool | toilets | toilets MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/toilets-tool.ts |
| Tools | MCP tool | tomorrowio | tomorrowio MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/tomorrowio-tool.ts |
| Tools | MCP tool | trello | trello MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/trello-tool.ts |
| Tools | MCP tool | trivia | trivia MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/trivia-tool.ts |
| Tools | MCP tool | trove | trove MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/trove-tool.ts |
| Tools | MCP tool | turso | turso MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/turso-tool.ts |
| Tools | MCP tool | twilio | twilio MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/twilio-tool.ts |
| Tools | MCP tool | twitch | twitch MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/twitch-tool.ts |
| Tools | MCP tool | typeform | typeform MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/typeform-tool.ts |
| Tools | MCP tool | unit converter | unit converter MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/unit-converter-tool.ts |
| Tools | MCP tool | unsplash | unsplash MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/unsplash-tool.ts |
| Tools | MCP tool | untappd | untappd MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/untappd-tool.ts |
| Tools | MCP tool | upstash | upstash MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/upstash-tool.ts |
| Tools | MCP tool | uptimerobot | uptimerobot MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/uptimerobot-tool.ts |
| Tools | MCP tool | urlscan | urlscan MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/urlscan-tool.ts |
| Tools | MCP tool | usgs | usgs MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/usgs-tool.ts |
| Tools | MCP tool | uxpass | UXPass experience verification capability. | - | packages/mcp-server/src/uxpass-tool.ts |
| Tools | MCP tool | vault | vault MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/vault-tool.ts |
| Tools | MCP tool | vercel | vercel MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/vercel-tool.ts |
| Tools | MCP tool | virustotal | virustotal MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/virustotal-tool.ts |
| Tools | MCP tool | webflow | webflow MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/webflow-tool.ts |
| Tools | MCP tool | whatsapp | whatsapp MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/whatsapp-tool.ts |
| Tools | MCP tool | wikipedia | wikipedia MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/wikipedia-tool.ts |
| Tools | MCP tool | willyweather | willyweather MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/willyweather-tool.ts |
| Tools | MCP tool | wise | wise MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/wise-tool.ts |
| Tools | MCP tool | woocommerce | woocommerce MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/woocommerce-tool.ts |
| Tools | MCP tool | wordpress | wordpress MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/wordpress-tool.ts |
| Tools | MCP tool | xero | xero MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/xero-tool.ts |
| Tools | MCP tool | xpass aggregated verdict | xpass aggregated verdict MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/xpass-aggregated-verdict-tool.ts |
| Tools | MCP tool | yelp | yelp MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/yelp-tool.ts |
| Tools | MCP tool | youtube | youtube MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/youtube-tool.ts |
| Tools | MCP tool | zendesk | zendesk MCP capability, available through the UnClick tool gateway. | - | packages/mcp-server/src/zendesk-tool.ts |
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
| ack ledger | PinballWake room logic generated from scripts/pinballwake-ack-ledger-room.mjs. | scripts/pinballwake-ack-ledger-room.mjs |
| buildbait | PinballWake room logic generated from scripts/pinballwake-buildbait-room.mjs. | scripts/pinballwake-buildbait-room.mjs |
| close supersede | PinballWake room logic generated from scripts/pinballwake-close-supersede-room.mjs. | scripts/pinballwake-close-supersede-room.mjs |
| coding | PinballWake room logic generated from scripts/pinballwake-coding-room.mjs. | scripts/pinballwake-coding-room.mjs |
| continuous improvement | PinballWake room logic generated from scripts/pinballwake-continuous-improvement-room.mjs. | scripts/pinballwake-continuous-improvement-room.mjs |
| dogfood | PinballWake room logic generated from scripts/pinballwake-dogfood-room.mjs. | scripts/pinballwake-dogfood-room.mjs |
| event ledger | PinballWake room logic generated from scripts/pinballwake-event-ledger-room.mjs. | scripts/pinballwake-event-ledger-room.mjs |
| jobs | PinballWake room logic generated from scripts/pinballwake-jobs-room.mjs. | scripts/pinballwake-jobs-room.mjs |
| launchpad | PinballWake room logic generated from scripts/pinballwake-launchpad-room.mjs. | scripts/pinballwake-launchpad-room.mjs |
| merge | PinballWake room logic generated from scripts/pinballwake-merge-room.mjs. | scripts/pinballwake-merge-room.mjs |
| overlap resolver | PinballWake room logic generated from scripts/pinballwake-overlap-resolver-room.mjs. | scripts/pinballwake-overlap-resolver-room.mjs |
| personality | PinballWake room logic generated from scripts/pinballwake-personality-room.mjs. | scripts/pinballwake-personality-room.mjs |
| planning | PinballWake room logic generated from scripts/pinballwake-planning-room.mjs. | scripts/pinballwake-planning-room.mjs |
| post merge watch | PinballWake room logic generated from scripts/pinballwake-post-merge-watch-room.mjs. | scripts/pinballwake-post-merge-watch-room.mjs |
| publish | PinballWake room logic generated from scripts/pinballwake-publish-room.mjs. | scripts/pinballwake-publish-room.mjs |
| queue health | PinballWake room logic generated from scripts/pinballwake-queue-health-room.mjs. | scripts/pinballwake-queue-health-room.mjs |
| release notes | PinballWake room logic generated from scripts/pinballwake-release-notes-room.mjs. | scripts/pinballwake-release-notes-room.mjs |
| repair | PinballWake room logic generated from scripts/pinballwake-repair-room.mjs. | scripts/pinballwake-repair-room.mjs |
| research | PinballWake room logic generated from scripts/pinballwake-research-room.mjs. | scripts/pinballwake-research-room.mjs |
| rollback | PinballWake room logic generated from scripts/pinballwake-rollback-room.mjs. | scripts/pinballwake-rollback-room.mjs |
| stale | PinballWake room logic generated from scripts/pinballwake-stale-room.mjs. | scripts/pinballwake-stale-room.mjs |
| worker registry | PinballWake room logic generated from scripts/pinballwake-worker-registry-room.mjs. | scripts/pinballwake-worker-registry-room.mjs |
| xpass gate | PinballWake room logic generated from scripts/pinballwake-xpass-gate-room.mjs. | scripts/pinballwake-xpass-gate-room.mjs |

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
| brainmap:check | node scripts/UnClick-brainmap.mjs --check |
| brainmap:generate | node scripts/UnClick-brainmap.mjs |
| build | npm run build --workspace=@unclick/commonsensepass && npm run build --workspace=@unclick/flowpass && vite build |
| build:dev | vite build --mode development |
| compliancepass:report | npm run build --workspace=@unclick/compliancepass && node scripts/build-compliancepass-report.mjs |
| lint | eslint . |
| test | npm run build --workspace=@unclick/commonsensepass && npm run build --workspace=@unclick/flowpass && npm run build --workspace=@unclick/securitypass && vitest run && npm run test:api-lib-esm-extension |
| test:api | npm run test --workspace=apps/api |
| test:api-lib-esm-extension | node --test scripts/api-lib-esm-extension-guard.test.mjs |
| test:brainmap | node --test scripts/UnClick-brainmap.test.mjs |
| test:compliancepass-receipt | node --test scripts/enterprisepass-receipt-guard.test.mjs |
| test:continuous-improvement-watch | node --test scripts/pinballwake-continuous-improvement-watch.test.mjs |
| test:enterprisepass-receipt | node --test scripts/enterprisepass-receipt-guard.test.mjs |
| test:git-hygiene | node --test scripts/check-checkout-hygiene.test.mjs scripts/check-dirty-branch.test.mjs scripts/salvage-worktrees.test.mjs |
| test:memory-eval | node --test scripts/memory-retrieval-eval.test.mjs |
| test:rotatepass-redaction | node --test scripts/rotatepass-redaction-guard.test.mjs |
| test:tier2-rollback | node --test scripts/tier2-rollback.test.mjs |
| test:watch | vitest |
| test:writerlane-live-catalog | node --test scripts/pinballwake-writerlane-live-catalog.test.mjs |

- `node scripts/UnClick-brainmap.mjs --check` fails if `docs/UnClick-brainmap.generated.md` is stale.
- `node scripts/UnClick-brainmap.mjs --check` also fails if `docs/UnClick-brainmap.generated.json` is stale.
- `node --test scripts/UnClick-brainmap.test.mjs` verifies required sections and meaning rows.
