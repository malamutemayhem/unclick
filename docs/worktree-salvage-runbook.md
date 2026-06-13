# Worktree salvage runbook

Serves UnClick jobs:

- `2352d206` Salvage dirty/stale local worktrees before cleanup.
- `07d3e88f` Inspect `scratch/autopilot-closer-routing` forgotten checkout (preserve work, no deletion).
- `1a1eb40e` Merge safety: do not stomp dirty local UnClick worktrees.

The rule for every checkout under `C:\G\UnClick\repos\` (or any fleet machine):
**preserve first, clean later, and never let one worker stomp another worker's
dirty worktree.** GitHub `main` is the code source of truth; a dirty local
checkout is unproven work that must be captured before any sync.

## The proven preservation pattern

A salvage pass on 2026-05-29 already pushed ten local checkouts to origin under a
single timestamped namespace. These branches are live on origin today:

```
safety/local-sync-20260529-100205/01-codex-queuepush-walkin-routing-labels
safety/local-sync-20260529-100205/02-claude-vigorous-euler-8af94b
safety/local-sync-20260529-100205/03-codex-compliancepass-pr1070-final-merge-20260528
safety/local-sync-20260529-100205/04-codex-continuous-improvement-audit-20260527
safety/local-sync-20260529-100205/05-codex-openclaw-compare-20260527
safety/local-sync-20260529-100205/06-main
safety/local-sync-20260529-100205/07-codex-runner-file-contents-debug-20260527
safety/local-sync-20260529-100205/08-codex-uxpass-jobs-proof-ui
safety/local-sync-20260529-100205/09-test-wl-free-exec-harness
safety/local-sync-20260529-100205/10-codex-086847ea-executor-packet-validator
```

That means the known at-risk checkout `unclick-agent-native-endpoints`
(branch `codex/queuepush-walkin-routing-labels`) is **already preserved** at
`safety/local-sync-20260529-100205/01-codex-queuepush-walkin-routing-labels`.
Confirm that branch still resolves before any owner-scoped cleanup of that
folder. `scripts/salvage-worktrees.mjs` turns this hand-rolled pass into a
repeatable tool.

## Tool: scripts/salvage-worktrees.mjs

Walks a root directory, inspects each sub-checkout read-only, classifies it, and
builds a non-destructive preservation plan.

```bash
# Dry-run: print the plan, change nothing (default).
node scripts/salvage-worktrees.mjs --root "C:\\G\\UnClick\\repos"

# JSON for tooling.
node scripts/salvage-worktrees.mjs --root "C:\\G\\UnClick\\repos" --json

# Execute the preserve steps (push safety branches, write bundles + manifests).
node scripts/salvage-worktrees.mjs --root "C:\\G\\UnClick\\repos" --execute
```

State classification:

| State | Meaning | At risk |
|-------|---------|---------|
| `clean` | no uncommitted work, branch on a remote | no |
| `dirty` | uncommitted tracked or untracked changes | yes |
| `unpushed` | local commits not on any remote | yes |
| `detached` | detached HEAD, no branch ref protecting the tip | yes |
| `stash-only` | stash entries present | yes |

For each at-risk checkout the plan emits only preserve operations:

1. `git bundle create <NN>-<branch>.bundle --all` (a full offline copy of every ref).
2. `git push origin HEAD:refs/heads/safety/local-sync-<ts>/<NN>-<branch>` (committed tip to a safety branch).
3. `git diff HEAD > <NN>-<branch>.tracked.patch` (uncommitted tracked changes).
4. `git ls-files --others --exclude-standard > <NN>-<branch>.untracked-manifest.txt` (untracked file names, no content copy).
5. `git status --porcelain=v1 > <NN>-<branch>.status.txt` (the exact dirty state).

The planner asserts none of these contain `reset`, `clean`, `checkout -f`,
`pull`, `rebase`, `merge`, `stash pop/drop`, `branch -D`, `restore`, or
`--force`. Deletion of the local checkout is always left to the human owner,
after the safety branch and bundle are confirmed on origin.

## Job 07d3e88f: scratch/autopilot-closer-routing

Live check on 2026-06-02: `git ls-remote --heads origin` returns 731 heads and
**no** `scratch/*` branch and no branch containing `closer`. So
`scratch/autopilot-closer-routing` and its "unmerged feature branches" exist only
as a local checkout on the owner's machine; nothing is at risk on origin and
there is nothing to delete or rebase remotely.

Owner-scoped salvage before deleting that local checkout:

```bash
node scripts/salvage-worktrees.mjs --root "<parent of scratch/autopilot-closer-routing>"
# review the dry-run plan, then:
node scripts/salvage-worktrees.mjs --root "<parent>" --execute
```

Then log the disposition in `.auto-memory/abandoned-branches.md` (Anti-Stomp
ORPHAN-002 requires a logged disposition for abandoned restructure/refactor/
restore branches). An entry for this checkout is already seeded there.

## Job 1a1eb40e: merge safety, do not stomp dirty worktrees

The standing no-stomp rules (see `FLEET_SYNC.md`):

- Use cloud / live GitHub as the source of truth. Do not reset or sync a dirty
  local worktree to make it match main.
- Never run `git reset --hard`, `git clean -fd`, `git checkout -f`, or a force
  pull against a checkout you did not create.
- Do not delete or prune another worker's worktree. Live receipts on job
  `1a1eb40e` show workers removing only their own clean, merged checkout folders
  and explicitly leaving the dirty `unclick-agent-native-endpoints` checkout
  untouched for its owner.

This is enforced as code by the Anti-Stomp pack
(`packages/testpass/packs/anti-stomp-v0.yaml`), specifically:

- `GIT-HYGIENE-001`: `git status --porcelain` must be empty at session end, so
  uncommitted work is committed or stashed before a cold start can lose it. The
  pure check is `checkGitStatusClean` in `packages/testpass/src/checks/anti-stomp.ts`.
- `ORPHAN-002`: abandoned restructure / refactor / restore branches must have a
  logged disposition in `.auto-memory/abandoned-branches.md`.

Run the guard's checks:

```bash
npm run test --workspace=@unclick/testpass
```

## Checklist for any cleanup of C:\G\UnClick\repos\

1. Run `scripts/salvage-worktrees.mjs --root <repos>` (dry-run) and read the plan.
2. For each at-risk checkout, run with `--execute` to push a safety branch and write a bundle.
3. Confirm the safety branches resolve on origin (`git ls-remote --heads origin "safety/local-sync-*"`).
4. Only then may the owner delete or re-clone the local checkout into a non-synced path.
5. Log any abandoned branch in `.auto-memory/abandoned-branches.md`.
