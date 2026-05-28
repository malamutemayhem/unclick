# CI required-check unstick: the empty trigger commit

If a PR touches only files outside the required CI workflows' `paths:` filter, the required checks never fire and the PR cannot merge. GitHub reports the checks as "expected" indefinitely. This was first observed on PR #1047 (a one-character `.js` ESM fix in `api/lib/`) and is expected to recur on any future `api/lib`-only change until the path filters are widened.

This doc records the safe unstick. **No `--admin` bypass.**

## When to use this

You opened a PR. The required checks (`Website (root package)` / `MCP server package`) show as `expected` but never as `pending` or `running`. After ~5 minutes nothing changes. You have not made a draft, the branch is up to date with `main`, and there are no merge conflicts.

This means the workflow's `paths:` filter or the GitHub branch-protection rule (ruleset id `16788514`) did not select your change set.

## The unstick

Push one empty commit to the PR branch. GitHub treats it as a normal commit event and the required checks fire and pass.

```bash
# from your PR branch, in a fresh clone or clean worktree:
git commit --allow-empty -m "ci: trigger required checks (path-filter unstick)"
git push
```

That's it. The checks run, pass, and the PR becomes mergeable through the normal squash-merge gate.

## What this is NOT

- **NOT a bypass.** The required checks actually run and actually pass. The branch-protection ruleset is honored. No `--admin` flag, no merge-without-review.
- **NOT a fix.** It papers over a path-filter mismatch. The underlying fix is to widen the workflow's `paths:` filter (or the required-check definition) to include `api/**` so that api-only PRs trigger the same checks. That requires `workflow` scope on the branch-protection ruleset — tracked as the option-A half of Boardroom todo `e1a51d36`.

## Why not just widen the filter

We will, eventually. Two reasons it hasn't happened yet:

1. Touching `.github/workflows/ci.yml` or the branch-protection ruleset requires explicit human approval and the right scope. It's not a safe-tier auto-merge.
2. Widening the filter without understanding *why* it was narrow in the first place could trigger unnecessary CI runs across unrelated changes (cost + flakiness).

So in the meantime, when you hit the symptom, use the empty-commit unstick. It is the *least invasive* honest path.

## Historical context

- PR #1047: first observation. Chris discovered the unstick after the required checks sat as "expected" for over an hour on a one-character ESM extension fix.
- PR #1165 (this doc): second observation, meta-recursive. The docs-only PR landing this very procedure was itself blocked by the same bug. Applied the unstick to land it.
- Lesson captured in `20260527 UnClick_Session_Handover.md` §12.
- Boardroom todo `e1a51d36` is the parent for this whole topic. It links the option A / option B fork.

## See also

- `docs/audit/2026-05-28-missing-jobs-cowork-lane.md` — the missing-jobs sub-lane that filed `e1a51d36`.
- `scripts/api-lib-esm-extension-guard.test.mjs` — the regression guard for the exact PR #1047 bug class.
- `.github/workflows/ci.yml` — the required-check workflow whose path filter is the root of this.
