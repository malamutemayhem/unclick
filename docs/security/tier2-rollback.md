# Tier-2 rollback: the third safety leg for safe-tier auto-merge

Job: `e63d8d6a` (Worker 12, Security and rollback lane)

## Why this exists

Safe-tier auto-merge (`scripts/tier2-auto-merge-queue-check.mjs`,
`.github/workflows/tier2-auto-merge-queue-check.yml`) can squash-merge a
low-risk PR into the default branch on a schedule. Before this change it had
two safety legs:

1. Risk scoring plus gate checks BEFORE the merge.
2. `TIER2_AUTOMERGE_EXECUTE=false` dry-run default.

It had no first-class way to undo a merge that should not have landed. The
operator had to reconstruct a revert by hand under time pressure. This adds
the missing third leg: one explicit, reversible command.

## What it does

`scripts/tier2-rollback.mjs` takes one merged PR number, finds the single
squash commit that auto-merge produced, and opens a `git revert` of that
commit as its own draft PR. Because auto-merge always squash-merges, each
merged PR maps to exactly one commit, so the rollback is a clean one-commit
revert - not a history rewrite.

```bash
# Dry-run: print the exact plan, change nothing
node scripts/tier2-rollback.mjs --pr 1234

# Execute: open the revert draft PR
TIER2_ROLLBACK_EXECUTE=true node scripts/tier2-rollback.mjs --pr 1234

# Override the 72h freshness guard for an older merge
TIER2_ROLLBACK_EXECUTE=true TIER2_ROLLBACK_ALLOW_OLD=true \
  node scripts/tier2-rollback.mjs --pr 1234
```

Or run the manual workflow: Actions -> "Tier-2 Rollback (manual)" ->
Run workflow -> enter the PR number (leave `execute` off for a dry-run).

## Safety properties (by design and enforced by tests)

- Dry-run by default. `execute` must be explicitly turned on.
- Operates on ONE named PR. No queue, no fan-out, no schedule.
- Refuses PRs that are not `MERGED` or have no recorded squash commit.
- Refuses merges older than `TIER2_ROLLBACK_MAX_AGE_HOURS` (default 72h)
  unless `TIER2_ROLLBACK_ALLOW_OLD=true`, so a stale request cannot quietly
  revert a commit that later work was built on.
- The generated command plan is asserted in tests to contain no `--force`,
  no `reset --hard`, and no branch deletion.
- The revert is opened as a draft PR and is itself reversible: revert the
  revert to restore the change. Nothing is destroyed.
- Redacted: the script reads no secrets and prints none. The workflow passes
  only the standard `github.token`.

## Proof

- Tests: `node --test scripts/tier2-rollback.test.mjs` (13 passing).
  Covers the pure planner (`planTier2Rollback`), the dry-run path (asserts
  zero commands run), the execute path (asserts ordered commands), the
  first-failure stop, ineligible skips, and the destructive-pattern guard.
- Wired as `npm run test:tier2-rollback`.
- CLI degrades gracefully when `gh` is unavailable (returns a `blocker`
  result and exit code 1 rather than throwing).

## Follow-ups (not done here, deliberately)

- Optionally have auto-merge record the merged PR number plus squash SHA into
  a ledger so rollback can be invoked by SHA as well as PR number.
- Optionally post a Boardroom note when a rollback PR is opened.
