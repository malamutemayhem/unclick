---
name: Reviewer gate
slug: reviewer-gate
version: 1.0.0
description: "Reviews a finished change for regressions, missing proof, unsafe scope expansion, and whether it can honestly move forward."
category: code-review
tags: [review, gate, regression, proof, quality]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick-native rewrite for review-gated UnClick jobs.
unclick_usefulness: 5
unclick_native: hybrid
required_worker_roles: [Reviewer]
required_mcp_tools: []
required_apps: []
---

# Reviewer gate

Use this after a build pass and before any release or "done" state.

## Review

Check:

- The change solves the named job.
- The implementation follows nearby patterns.
- The proof matches the changed behavior.
- No unrelated user work was reverted.
- New risk is named plainly.
- The next worker has enough context if the job continues.

## Output

Lead with blocking findings. If none exist, say so directly, list proof seen, and name remaining risk.
