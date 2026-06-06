# PR auto-review replacement (post-Bugbot): Greptile + Mergify

Job: `0f9c7da2` (Worker 12, Security and rollback lane). Decision packet.
No GitHub App is installed and no live merge-acting config is added by this
packet (both would be human-gated, outward-facing actions). Proposed configs
below are inert until a human installs the app and copies them in.

Standing rule (confirmed in memory and `docs/adding-a-connector.md`): Cursor
Bugbot is discontinued. Treat its checks as noise. This packet defines what
replaces the two things Bugbot used to provide.

## What Bugbot did, and the gap

Bugbot gave two things on every PR: (a) an automated code-review comment pass,
and (b) a status check that gates were aware of. With Bugbot out of the
operating model, the gap is:

- Automated first-pass PR review: currently only on-demand via `@claude`
  (`.github/workflows/claude.yml`). Nothing reviews every PR automatically.
- Merge gating: handled by the homegrown safe-class auto-merge
  (`scripts/tier2-auto-merge-queue-check.mjs` +
  `.github/workflows/tier2-auto-merge-queue-check.yml`) and the dry-run
  `review-enforcement-warning.yml`.

## Current review/merge surfaces (live today)

| surface | trigger | role |
|---|---|---|
| `claude.yml` | `@claude` mention | on-demand review/fix |
| `review-enforcement-warning.yml` | every PR | dry-run review/proof warning (`continue-on-error`) |
| `tier2-auto-merge-queue-check.yml` | cron `*/10` | safe-class auto-merge (execute=false today) |
| `tier2-rollback.yml` | manual | one-step rollback (added by job e63d8d6a) |

## Recommendation

1. **Automated review -> Greptile** (GitHub App). It posts an automated
   review on every PR, which is the closest like-for-like replacement for
   Bugbot's auto-review. Keep `@claude` for deeper on-demand passes. (GitHub
   Copilot PR review via `request_copilot_review` is a no-extra-vendor
   fallback if avoiding another app is preferred.)
2. **Safe-class auto-merge -> keep the homegrown tier2 script for now, adopt
   Mergify only if a true merge queue is needed.** The tier2 script already
   encodes UnClick-specific risk scoring (sensitive-path detection, review-
   proof comments, dry-run default). Mergify is worth it when you need a
   serialized merge queue with required-check batching across many concurrent
   PRs. Until that volume exists, Mergify mostly duplicates tier2 and adds an
   external actor on the repo. Decision: defer Mergify; revisit when PR
   concurrency makes a queue necessary.

So the minimal replacement is: install Greptile for auto-review, keep tier2
for merge. Mergify config is included below only for when a queue is wanted.

## Sequencing caveat (important)

Do NOT delete the `"Cursor Bugbot"` reference in
`scripts/tier2-auto-merge-queue-check.mjs:561`
(`TIER2_AUTOMERGE_OPTIONAL_PENDING_CHECKS` default) until the Bugbot GitHub
App is actually uninstalled. That entry tells auto-merge to treat a pending
Bugbot check as optional. While the app is still installed but inert, an
orphaned `Cursor Bugbot` check can sit `IN_PROGRESS` forever; removing the
optional-pending entry first would let that orphan block every auto-merge.

Order of operations:
1. Human uninstalls the Cursor Bugbot GitHub App (record `00e07cb5`; external,
   Chris-gated).
2. Confirm no PR shows a `Cursor Bugbot` check anymore.
3. Then drop the `"Cursor Bugbot"` default and its test references in
   `scripts/tier2-auto-merge-queue-check.{mjs,test.mjs}` (a follow-up chip).

## Human-gated steps to enable Greptile

1. Install the Greptile GitHub App on `malamutemayhem/unclick` (admin action).
2. Add `GREPTILE_API_KEY` (and org/repo config) in repo/Vercel secrets as the
   app requires. Never commit the key.
3. Add `greptile.json` (proposed below) at repo root.
4. Make the Greptile review a NON-required check first (observe a week), then
   promote to required if signal is good.

## Proposed config (inert until copied in by a human)

Greptile (`greptile.json`):

```json
{
  "review": {
    "enabled": true,
    "auto_review": true,
    "comment_threshold": "medium",
    "labels_to_skip": ["dependencies", "docs-only"]
  },
  "instructions": "Follow docs/connector-standard.md and CLAUDE.md style rules. No em dashes. Flag RLS USING(true) on non-service_role roles, missing api_key_hash filters, and secrets in code."
}
```

Mergify (`.mergify.yml`) -- only if a merge queue is later adopted:

```yaml
queue_rules:
  - name: safe-class
    queue_conditions:
      - "#approved-reviews-by>=1"
      - check-success=ci
      - label=safe-class
      - -label=do-not-merge
    merge_conditions:
      - check-success=ci
    merge_method: squash

pull_request_rules:
  - name: queue safe-class PRs
    conditions:
      - base=main
      - label=safe-class
    actions:
      queue:
        name: safe-class
```

Both blocks are intentionally NOT written as live files in this PR. Copy them
in only after the corresponding app is installed and reviewed, so nothing
starts acting on PRs unattended.

## Proof / scope

- No app installed, no secret added, no live `.mergify.yml` or `greptile.json`
  committed (would be unattended outward-facing automation -> human-gated).
- Bugbot already out of operating model (standing rule); the only repo
  references left are the defensive optional-pending-check entries, which must
  stay until the app is uninstalled (see sequencing caveat).
- This packet is the decision + the exact enable steps + inert configs.
