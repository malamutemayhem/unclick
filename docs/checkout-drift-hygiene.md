# Drive-synced checkout drift hygiene

Serves UnClick job `606cde4b` (Drive-synced checkout drift hygiene: pre-commit
guard + orphan-clone cleanup for `C:\G\UnClick\repos\`).

## The problem

A live git working tree that sits inside a cloud-sync root (Google Drive,
OneDrive, Dropbox, iCloud, Box, pCloud) is unsafe. The sync daemon and git both
write `.git/index` and `.git/objects` on their own schedules. When they race:

- `.git/index` is half-written, so git reports phantom modified or deleted files.
- stale `.git/index.lock` files block every git command until removed by hand.
- partially uploaded object files corrupt the repo and lose commits.

This is the "drift" that stranded the checkouts under `C:\G\UnClick\repos\`.
A live merge-safety receipt on job `606cde4b` recorded one such checkout,
`C:\G\UnClick\repos\unclick-agent-native-endpoints`, sitting on branch
`codex/queuepush-walkin-routing-labels` with many modified, deleted, and
untracked files and a 332 MB untracked tree.

An orphan clone (a checkout with no `origin` remote) is the related failure: its
commits cannot be pushed for safekeeping or reconciled with GitHub.

## The guard

`scripts/check-checkout-hygiene.mjs` detects both conditions before a commit.

```bash
node scripts/check-checkout-hygiene.mjs
node scripts/check-checkout-hygiene.mjs --path "C:\\G\\UnClick\\repos\\unclick" --extra-root "C:\\G"
node scripts/check-checkout-hygiene.mjs --json
```

Findings:

| Code | Severity | Meaning |
|------|----------|---------|
| `DRIVE-SYNC-002` | high | The `.git` directory itself is inside a sync root. Object and index corruption, not just working-tree races. |
| `DRIVE-SYNC-001` | medium | The working tree is inside a sync root. |
| `ORPHAN-CLONE-001` | high / medium | The clone has no remotes (high) or has remotes but none named `origin` (medium). |

Exit codes: `0` safe, `1` findings, `2` usage / I/O error.

The guard is advisory. It reads the checkout path, the `.git` path, and the
remote list, then reports. It never edits, moves, or deletes anything.

Known sync markers live in `SYNC_ROOT_MARKERS` in the script. Site-specific
mounts (for example a mapped Drive letter, or the `C:\G` path) can be added per
run with `--extra-root` or the `UNCLICK_EXTRA_SYNC_ROOTS` env var, so the list
does not need editing for one machine.

## Pre-commit hook (opt-in)

`scripts/hooks/pre-commit` calls the guard and warns before each commit.
Enable it per developer:

```bash
git config core.hooksPath scripts/hooks
```

Or copy `scripts/hooks/pre-commit` to `.git/hooks/pre-commit`. It is warn-only by
default. Make it blocking with `UNCLICK_CHECKOUT_GUARD_STRICT=1`. Bypass any time
with `git commit --no-verify`. The hook is opt-in and never committed into a
contributor's `.git`, matching the existing dirty-branch hygiene policy.

## Remediation: move live checkouts off synced drives

1. Pick a non-synced path for code, for example `C:\src\unclick` instead of a
   path under a Google Drive or OneDrive mount.
2. Before moving or deleting anything, preserve the existing checkout with
   `docs/worktree-salvage-runbook.md`. Never reset, clean, or force-checkout a
   drive-synced checkout to "fix" drift. Salvage first.
3. Keep only git bundles and read-only snapshots in the sync folder, never a
   live working tree.
4. Re-clone fresh from GitHub into the non-synced path and cherry-pick or import
   any salvaged work from the safety branch or bundle.

## Why a guard and not auto-cleanup

Drive drift produces exactly the false "deleted" and "modified" signals that make
automated cleanup dangerous. A reset or clean here can erase real unpushed work
that only looks like drift. The guard warns; a human salvages and relocates.

## Acceptance

- [x] `scripts/check-checkout-hygiene.mjs` detects sync roots and orphan clones, exit 0/1/2.
- [x] `scripts/check-checkout-hygiene.test.mjs` covers each provider, the orphan cases, custom roots, and rendering.
- [x] `scripts/hooks/pre-commit` opt-in, warn-only with a strict switch.
- [x] This policy doc plus the salvage runbook for the preserve-before-relocate path.
