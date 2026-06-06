---
name: Fix failing CI
slug: fix-failing-ci
version: 1.0.0
description: "Diagnoses and fixes failed CI checks by reading logs, reproducing locally when possible, making the smallest repair, and re-running proof."
category: debugging
tags: [ci, github-actions, failing-checks, tests, debug]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick-native CI repair workflow.
unclick_usefulness: 5
unclick_native: hybrid
required_worker_roles: [Builder, Tester]
required_mcp_tools: [github.checks, shell]
required_apps: [GitHub]
---

# Fix failing CI

Use this when a branch or pull request has failing checks.

## Diagnose

1. Identify the failing job and exact failing step.
2. Read the smallest useful log range.
3. Classify the failure as test, lint, type, build, dependency, environment, or flaky.
4. Reproduce locally when feasible.
5. Patch the root cause, not the symptom.
6. Re-run the failing check or a close local equivalent.

## Output

Return the failing check, cause, files changed, proof command, and any CI-only risk.
