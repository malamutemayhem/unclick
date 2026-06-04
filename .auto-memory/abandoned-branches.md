# Abandoned Branch Log

When you abandon a restructure, refactor, redesign, or restore branch without
merging it, append an entry below. ORPHAN-002 (Anti-Stomp pack) will flag
unlogged branches of this type.

## Entry format

```
## <branch-name>
- Date: YYYY-MM-DD
- Reason abandoned: <why it didn't merge>
- Unique work: <list commits or "none">
- Disposition: cherry-pick <sha> | archived | deleted
```

---

## scratch/autopilot-closer-routing
- Date: 2026-06-02
- Reason abandoned: Forgotten dedicated local checkout (job 07d3e88f) with unmerged feature branches. Never pushed to origin.
- Unique work: Unknown from here. Live `git ls-remote --heads origin` on 2026-06-02 returns no `scratch/*` branch and no branch containing "closer", so any work is local-only on the owner machine and not at risk on GitHub.
- Disposition: preserve-before-delete (owner-scoped). Run `scripts/salvage-worktrees.mjs --root <parent>` to push each unmerged branch to `safety/local-sync-<ts>/NN-<branch>` and write a bundle, then the owner may delete the local checkout. No remote deletion needed (nothing on origin).

<!-- Agents: append entries above this line -->
