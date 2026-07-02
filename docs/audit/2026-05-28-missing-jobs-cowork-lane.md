# 2026-05-28 Missing Jobs Audit: Cowork sub-lane

**Parent audit:** Boardroom todo `d2bbcce8-62a8-4a71-9b41-ccc6185173fd`: *Git sync audit: completed coding jobs need PR or commit proof*

**Sub-lane owner:** Claude Cowork (`claude-cowork-creativelead`)
**Started:** 2026-05-28T13:10Z
**Sister lane:** `chatgpt-codex-missing-jobs-auditor` (GitHub PR packet lane, parent audit comment `e6c179fe` at 13:01Z)

## Scope

This lane covers action items raised in `C:\G\UnClick\Context` handover docs and recent context bundles that were never filed as official Boardroom jobs. It is **complementary** to the GitHub PR packet lane being worked by ChatGPT-Lenovo; no scope overlap is expected.

Source documents scanned (priority order):

- `20260527 UnClick Detailed Handover Notes.md` (3,240 lines)
- `20260527 UnClick_Session_Handover.md` (746 lines)
- `20260520-20260525 Context Bundle 09.md`
- `20260525 Heartbeat Diagnosis.md`
- `20260525 Smart Timer Spec.md`

## Filed jobs (this sub-lane, first pass)

| Boardroom ID | Priority | Title | Status this PR |
|---|---|---|---|
| `e80c682f-87b1-492d-864a-8181c92fd34a` | urgent | api/ extensionless-import guard: regression test catching prod ESM crash class (PR #1047 lesson) | **Closed by this PR** |
| `80b5c54a-4642-4fda-8b5d-2c5a44cd1324` | high | /api/memory-admin sustained 401s: every-minute auth/secret mismatch from unclick.world | Filed, needs Vercel-log access (operator) |
| `e1a51d36-6b0e-4d03-80d0-b3452e04d273` | high | CI required-check path-filter audit: api/lib-only PRs sit "expected" forever and need empty trigger commit | Filed, option B docs shipped as PR #1165, option A still needs branch-protection inspect (operator) |
| `4826943a-b643-44bb-8aa6-a8fa4e7fde24` | high | Runner honesty slice: claim-only HOLD return must say hold/action explicitly (anti-false-DONE) | Filed, blocked on safe edit of minified runner file (per handover §32 caveat) |
| `00e07cb5-8b8d-4da6-8442-40f435135c0a` | normal | Cursor Bugbot removal: still appears as non-required PR check despite being out of operating model | Filed, GitHub-App config change (operator) |
| `4fa1ee98-ddaf-4f5c-b6b9-7a3815ace329` | normal | Heartbeat monitor re-scope: strictly read-only path, strip wake/post tools before re-enable | Filed, tool-grant change (operator) |
| `a126a9fb-fa85-45cf-bde4-03a70694529f` | normal | Triage policy for 11 stale-freed jobs from 2026-05-26 14:00Z release burst | Filed, product decision (operator) |

Subsequent passes 2-4 filed 22 additional gap jobs (12 from older Context + comments + signals scan, 8 from folder scan, 2 from code-TODO scan). Full list in the sub-lane status comments on parent audit `d2bbcce8`.

## What this PR ships

This PR ships the **only** safe-tier auto-mergeable item from the first pass: the **api/ extensionless-import guard** regression test (todo `e80c682f`).

## The regression guard

`scripts/api-lib-esm-extension-guard.test.mjs`

Walks `api/lib/` recursively, parses every non-test `.ts` / `.tsx` / `.mts` / `.cts` / `.js` / `.mjs` / `.cjs` source file for relative imports (static, dynamic, type-only, re-exports), and fails CI if any specifier lacks an explicit recognised ESM extension (`.js`, `.mjs`, `.cjs`, `.json`).

Wired into CI by chaining into the existing `npm test` script in `package.json`. The PR-author PAT lacks `workflow` scope to add a dedicated step to `.github/workflows/ci.yml` next to the existing RotatePass and CompliancePass guards; chaining into `npm test` gives the same effective coverage because the `Tests` step is already a required check in the `Website (root package)` CI job. A future PR with workflow scope can split it out for a cleaner failure name.

Includes positive and negative control tests:
- Positive: the exact extensionless line shape that crashed PR #1047's predecessor must fail.
- Negative: the fixed form (`./foo.js`) must pass.

## Why not action the others in this PR

Per the handover (`20260527 UnClick Detailed Handover Notes.md` §81, Safety Surfaces):

> Never touch these without explicit operator approval: secrets, API keys, passwords, billing, DNS, production deploy settings, destructive data actions, force push, hard reset, GitHub rulesets, required check bypass, canary seed close, canary flags, workflow broad execute switch.

- Path-filter widening requires changing the GitHub ruleset (`16788514`).
- Bugbot removal requires GitHub App uninstall (external).
- Heartbeat re-scope requires tool-grant change on the scheduled task.
- Runner honesty slice requires editing the minified `pinballwake-autonomous-runner.mjs`; handover §32 says explicitly do NOT hand-edit blind.
- 401 investigation requires Vercel log access not available to this seat.
- Stale-freed-jobs triage is a product decision.

Each of those is now a discrete Boardroom job with full context, so the next warm seat (or the operator) can action them with a clean ScopePack.
