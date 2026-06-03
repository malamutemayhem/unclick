# XGate Builder Prompts (10 seats)

Paste ONE block into each AI seat. Also give each seat the file
`docs/xgate-master-build-plan.md` (the Master Build Plan) in the same session.

Shared rules baked into every prompt (do not skip):
- Read the Master Build Plan fully before coding. Code to the FROZEN contract in
  Section 4 with zero changes to those signatures.
- ESM imports in `api/lib` MUST end in `.js` (a `.ts` extension fails CI).
- No em dashes or en dashes anywhere (code, comments). Use a hyphen.
- Gates are PURE and MUST NEVER THROW. On any parse failure or doubt, return
  verdict `"ask"`. No network, no DB, no wall-clock inside a gate (inject `now`).
- Allowlist + parse to structure; never a regex blocklist of "bad strings".
- Create ONLY the files your Part lists. Do not edit any other file (except
  Parts 9 and 10, which are explicitly allowed to).
- Co-locate tests as `*.test.ts`. Prove with `npx vitest run <your files>`.
- Branch `claude/xgate-part-<N>-<slug>`, open a DRAFT PR, do not merge.

---

## Part 1 - Core contract, policy engine, ledger (FOUNDATION; others depend on it)

You are Builder 1 of the XGate parallel build. Read `docs/xgate-master-build-plan.md`
fully. You own the FROZEN shared contract every other builder imports, so ship it
exactly as written in Section 4.

Build:
1. `api/lib/xgate/types.ts` - exactly the types/consts in Section 4 (ActionClass,
   Environment, AutonomyLevel, GateVerdict, ActionDescriptor, GateContext,
   GateResult, Gate, VERDICT_PRECEDENCE).
2. `api/lib/xgate/policy-engine.ts` - `evaluateGates(gates, ctx)`: run every gate,
   combine fail-closed using VERDICT_PRECEDENCE (deny > ask > rewrite > allow),
   return `{ verdict, results, deciding }`. Pure. If a gate somehow throws,
   treat that gate as `ask` (defense-in-depth) rather than propagating.
3. `api/lib/xgate/ledger.ts` - `ControlLedgerEntry` interface (Section 4),
   `buildLedgerEntry(ctx, decision, authority, opts)` returning one entry, and
   `redactSecrets(text)` that masks common credential shapes (AWS keys, bearer
   tokens, `sk-`/`ghp_`/`xox` prefixes, long hex/base64 blobs) before anything
   is stored.
4. Tests: `types.test.ts` (precedence ordering), `policy-engine.test.ts`
   (deny beats ask beats allow; a throwing gate becomes ask; empty gate list =
   allow), `ledger.test.ts` (redaction masks secrets; entry shape).

Constraints: pure, no IO, `.js` imports, no em dashes. Prove:
`npx vitest run api/lib/xgate/`. Open a draft PR titled "XGate Part 1: contract,
policy engine, ledger".

---

## Part 2 - SecretGate (highest leverage, lowest false-positive)

You are Builder 2. Read `docs/xgate-master-build-plan.md` fully. Implement a
`Gate` that blocks exposure of credentials BEFORE a commit or an outbound send.

Build `api/lib/xgate/gates/secret-gate.ts` exporting `secretGate: Gate` (import
the contract from `../types.js`). Detection model (from the research): combine
(a) named credential signatures (AWS `AKIA...`, GitHub `ghp_`/`gho_`, Slack
`xox...`, Google API keys, `sk-` style keys, PEM private-key headers, generic
`Authorization: Bearer ...`), (b) high Shannon entropy on token-like substrings,
and (c) keyword proximity (`secret`, `token`, `password`, `api_key`). Apply to
`ctx.action.raw` and, when present, parsed diff/payload.

Rules:
- A real credential match in a `secret`, `git` (commit), or `send`/`network`
  action -> `deny` with ruleId like `secret.aws_access_key`.
- Known test fixtures / documented examples (e.g. `AKIAIOSFODNN7EXAMPLE`, low
  entropy) -> `allow` via an allowlist, so false positives stay near zero.
- No match -> `allow`. Unsure / unparseable -> `ask`.
- Never put the raw secret in `evidence`; store a masked form.

Tests `secret-gate.test.ts`: blocks a live-looking AWS key in a commit; allows
the documented example key; allows clean text; masks the secret in evidence.
Pure, never throws, `.js` imports, no em dashes. Prove with vitest. Draft PR
"XGate Part 2: SecretGate".

---

## Part 3 - DataGate / SchemaGate (SQL destructive-action gating)

You are Builder 3. Read `docs/xgate-master-build-plan.md` fully. Implement a
`Gate` that gates destructive SQL BEFORE execution. PARSE the SQL; do not regex.

Build `api/lib/xgate/gates/data-gate.ts` exporting `dataGate: Gate`. Use a
lightweight SQL tokenizer/parser (write a small dependency-free statement
splitter + clause detector; do not add heavy deps). Rules:
- DDL (`DROP`, `TRUNCATE`, `ALTER ... DROP`) -> `deny` (ruleId `sql.ddl_drop`
  etc.), or `ask` in `dev`.
- `DELETE` or `UPDATE` with NO `WHERE` clause -> `deny` (`sql.unscoped_dml`).
- Multi-statement strings (stacked `;`) where any statement is destructive ->
  `deny` (`sql.multi_statement`) - this is the documented Postgres-MCP bypass.
- Plain `SELECT` / scoped DML -> `allow`. In `prod`, destructive always at least
  `ask` even if it would pass in dev. Unparseable -> `ask` (fail closed).

Tests `data-gate.test.ts`: blocks `DROP TABLE`; blocks `DELETE FROM users` with
no WHERE; blocks `COMMIT; DROP SCHEMA public CASCADE;`; allows `SELECT ...` and
`UPDATE ... WHERE id=1`. Pure, never throws, `.js` imports, no em dashes. Prove
with vitest. Draft PR "XGate Part 3: DataGate".

---

## Part 4 - GitGate (force-push / history-rewrite gating)

You are Builder 4. Read `docs/xgate-master-build-plan.md` fully. Implement a
`Gate` that blocks dangerous git operations BEFORE they run. Parse to argv.

Build `api/lib/xgate/gates/git-gate.ts` exporting `gitGate: Gate`. Tokenize
`ctx.action.raw` into argv (small dependency-free shell-ish tokenizer; on
anything you cannot tokenize, return `ask`). Rules:
- `git push --force` / `-f` targeting a protected branch (main, master,
  release/*) -> `deny` (`git.force_push_protected`).
- `git push --force-with-lease` to a non-protected feature branch -> `allow`.
- `git reset --hard`, `git clean -fdx`, `git branch -D <protected>`,
  `git filter-repo`, history rewrite on shared branches -> `ask` or `deny` per
  environment.
- Ordinary `git add/commit/push` (non-force) -> `allow`.
- Include a helper `recommendBranchProtection()` returning the server-side
  GitHub branch-protection settings UnClick should also set (research says the
  durable fix is server-side).

Tests `git-gate.test.ts`: blocks force-push to main; allows force-with-lease to
a feature branch; allows a normal push; ask on unparseable. Pure, never throws,
`.js` imports, no em dashes. Prove with vitest. Draft PR "XGate Part 4: GitGate".

---

## Part 5 - CommandGate (shell allowlist; HARDEST, state the boundary)

You are Builder 5. Read `docs/xgate-master-build-plan.md` fully, especially
Section 8. Implement a `Gate` for shell commands using an allowlist + argv
parsing, and clearly document that an MCP server CANNOT see client-run shell -
this gate covers shell routed through UnClick tools only; client shell is
delegated to client hooks (Part 9) and sandboxes.

Build `api/lib/xgate/gates/command-gate.ts` exporting `commandGate: Gate`.
- Tokenize to argv per sub-command, including pipes and substitutions; if you
  hit a node you cannot understand, FAIL CLOSED -> `ask`.
- Deny known-catastrophic shapes after parsing (resolved): `rm -rf` whose target
  resolves to `/`, `~`, `$HOME`, or an empty/unset variable; `dd of=/dev/sd*`;
  `mkfs.*`; `chmod -R 777`; pipe-to-shell of remote content
  (`curl ... | sh`/`| bash`/`| zsh`).
- Auto-allow recognized safe ops inside scope: `rm -rf node_modules`,
  `rm -rf dist/`, `rm -rf .next/`, `ls`, `cat`, `grep`, `npm test`, etc.
- Detect eval-like re-entry (`eval`, `source`, `.`, `exec`, base64-decode piped
  to a shell) -> `ask`/`deny`.
- Anything not on the allowlist -> `ask` (deny-by-default for unattended).

Tests `command-gate.test.ts`: blocks `rm -rf /` and `rm -rf $UNSET/`; blocks
`curl x | bash`; allows `rm -rf node_modules`; ask on base64-pipe and on
unparseable input. Pure, never throws, `.js` imports, no em dashes. Prove with
vitest. Draft PR "XGate Part 5: CommandGate" - in the PR body, state the
client-shell coverage boundary plainly.

---

## Part 6 - ShipGate (prod deploy / rollback / publish gating)

You are Builder 6. Read `docs/xgate-master-build-plan.md` fully. Implement a
`Gate` that gates production-affecting actions BEFORE they run.

Build `api/lib/xgate/gates/ship-gate.ts` exporting `shipGate: Gate`. Classify
the action as a ship operation (deploy, rollback, publish, release, DNS change,
infra apply) from `ctx.action`. Rules:
- Ship op targeting `prod` -> `ask` interactive, `deny` unattended unless a
  pre-authorized token is present in context (model the token check as a pure
  input field you read; do not implement auth here).
- Ship op to `dev`/`staging` -> `allow`.
- Require a proof reference (xpass receipt / commit SHA) to be present for prod
  ships; if absent -> `deny` (`ship.no_proof`). Read it from
  `ctx.action.parsed` (define a small typed shape) - do not fetch anything.

Tests `ship-gate.test.ts`: prod deploy without proof -> deny; prod deploy with
proof, interactive -> ask; staging deploy -> allow; prod deploy unattended
without token -> deny. Pure, never throws, `.js` imports, no em dashes. Prove
with vitest. Draft PR "XGate Part 6: ShipGate".

---

## Part 7 - ScopeGate + SpendGate (wire the half-existing ones)

You are Builder 7. Read `docs/xgate-master-build-plan.md` fully. Implement two
gates that formalize controls UnClick half-has today.

Build:
1. `api/lib/xgate/gates/scope-gate.ts` exporting `scopeGate: Gate`. Using
   `ctx.ownedFiles` (the ScopePack) and `ctx.action.targetFiles`, deny any
   action that would write a file outside the owned set (`scope.out_of_bounds`).
   If `ownedFiles` is undefined (no active scope) -> `allow`. If targetFiles
   unknown for a write -> `ask`. Match paths normalized (handle `./`, trailing
   slash, case per the repo norm).
2. `api/lib/xgate/gates/spend-gate.ts` exporting `spendGate: Gate`. Read
   `ctx.action.estimatedSpendUsd` and a budget you accept via a small typed
   options object (default e.g. maxSpendUsd 1.0). Over budget -> `deny`
   (`spend.over_budget`); within -> `allow`. This is the cost axis that folds
   into the autonomy budget.

Tests `scope-gate.test.ts` and `spend-gate.test.ts`: out-of-scope write denied;
in-scope allowed; no-scope allowed; over-budget denied; within-budget allowed.
Pure, never throws, `.js` imports, no em dashes. Prove with vitest. Draft PR
"XGate Part 7: ScopeGate + SpendGate".

---

## Part 8 - Autonomy engine, KillGate, persistence migration

You are Builder 8. Read `docs/xgate-master-build-plan.md` fully. Build the shared
decision layer the whole family routes through, plus its storage.

Build:
1. `api/lib/xgate/autonomy.ts` - `applyAutonomy(decision, ctx, budget)` that
   takes a PolicyDecision (from Part 1) and the environment/autonomy level and
   applies the cross-cutting rules: in `unattended`, convert `ask` on destructive
   classes to `deny`; enforce a consecutive-denial circuit breaker (accept prior
   denial count in, return whether to halt). Pure.
2. `api/lib/xgate/kill-switch.ts` - a pure `isKillSwitchActive(state)` predicate
   and `applyKillSwitch(decision, state)` that forces every non-allow to `deny`
   with authority `kill_switch` when the global stop is set. The state is passed
   in (read from KV/DB by Part 9), not fetched here.
3. `supabase/migrations/<timestamp>_xgate.sql` - tables `mc_xgate_ledger`
   (the ControlLedgerEntry columns) and `mc_xgate_killswitch`
   (api_key_hash PK, active boolean, reason, updated_at). RLS enabled;
   `revoke all from anon, authenticated; grant all to service_role`. Additive,
   non-destructive, no drops. No em dashes in SQL comments.

Tests `autonomy.test.ts`, `kill-switch.test.ts`: unattended escalates ask->deny
on destructive; circuit breaker halts after N; kill switch forces deny. Pure,
never throws, `.js` imports, no em dashes. Prove with vitest. Draft PR
"XGate Part 8: autonomy + kill switch + migration".

---

## Part 9 - Integration: endpoint, registry, client-hook configs (TOUCHES EXISTING FILES)

You are Builder 9, the integrator. Read `docs/xgate-master-build-plan.md` fully.
You assemble the gates into a live, authorized endpoint and generate delegated
client hooks. You MAY edit existing files; do it surgically and additively.

Build/edit:
1. `api/lib/xgate/registry.ts` - imports every gate (Parts 2-8) and exports the
   ordered gate array for `evaluateGates`. This is the only place that imports
   all gates; if a gate file is not merged yet, leave a clearly-marked TODO
   import so the file still compiles (use a feature list + dynamic guard).
2. `api/xgate-check.ts` - a Vercel endpoint: POST an ActionDescriptor + context,
   run `evaluateGates` + `applyAutonomy` + `applyKillSwitch`, persist a ledger
   entry, return the verdict + ruleId. Auth: accept CRON_SECRET bearer OR an
   admin Supabase session (mirror `api/eval-truth-rate.ts` / `api/benchmarks.ts`
   exactly). Read the kill-switch state from `mc_xgate_killswitch`. Read-only
   except the ledger insert.
3. `api/lib/xgate/client-hooks.ts` - `generateClaudeCodeHook()` and
   `generateCursorHook()` that emit config calling back to `/api/xgate-check`,
   so client-run shell/edits get covered where the client supports hooks. Pure
   string/JSON builders + tests.
4. Edit `vercel.json` to add any needed route/cron only if required (the
   `api/*.ts` auto-routes, so likely no edit needed - verify first).

Verify HARD (you touch the build): `npm run build`, `npm run test:api-lib-esm-extension`,
`npx vitest run api/lib/xgate/ api/xgate-check.test.ts`, and regenerate the
brainmap if you added an `api/lib` file with orchestrator/boardroom/memory in the
name (yours do not, but run `npm run brainmap:check`). State the client-shell
boundary in the PR body. Draft PR "XGate Part 9: endpoint + registry + client hooks".

---

## Part 10 - Admin dashboard, eval fixtures, docs (TOUCHES EXISTING FILES)

You are Builder 10. Read `docs/xgate-master-build-plan.md` fully. You make XGate
visible and documented, and add it to the proof-as-reward eval as a fixture set.

Build/edit:
1. `src/pages/admin/AdminXGate.tsx` - an admin page that calls `/api/xgate-check`
   history (or a `?action=recent` read you define) and renders recent decisions:
   verdict, gate, ruleId, action class, environment, and the kill-switch toggle
   state (read-only display is fine; wiring the toggle write is optional and must
   be admin-gated). Match the styling of `src/pages/admin/AdminBenchmarks.tsx`
   and `AdminTruthRate.tsx` (same colors, loading/error idiom, session-token
   fetch with 403 redirect).
2. Edit `src/App.tsx` - add a route `truth-rate`-style: `<Route path="xgate" ...>`.
3. Edit `src/pages/admin/AdminShell.tsx` - add a nav entry "XGate" with a lucide
   icon (e.g. `ShieldHalf` or `Gauge`; confirm it is not already imported).
4. `docs/xgate-family-map.md` - the inventory: which gates exist, which were
   wired vs net-new, and the XPass-vs-XGate (after vs before) distinction.
5. Add an eval fixture file `api/lib/eval/xgate-fixtures.ts` (+ test) with a few
   canonical decisions (force-push-to-main denied, secret commit denied, scoped
   delete allowed) so XGate decisions are regression-tested like everything else.

Verify HARD (you touch the build + UI): `npm run build`, `npx vitest run`,
`npm run brainmap:check` (App.tsx/AdminShell change will regenerate it - commit
the regenerated brainmap), no em dashes (check the new docs/page). Draft PR
"XGate Part 10: admin dashboard + eval fixtures + docs".

---

## Integration order (for whoever merges)

Merge Part 1 first (everyone imports it). Then Parts 2-8 in any order (all
additive, independent files). Then Part 9 (registry imports the merged gates;
update the registry as gates land). Then Part 10 (UI + docs + fixtures). Run the
full root suite + `npm run build` + the mcp-server package test before integrating
to main.
