---
name: Write tests for changed code
slug: write-tests-for-changed-code
version: 1.0.0
description: "Adds focused tests for recently changed behavior using the repository's existing test style and proof standards."
category: testing-qa
tags: [tests, coverage, regression, vitest, proof]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick testing workflow.
unclick_usefulness: 5
unclick_native: hybrid
required_worker_roles: [Builder, Tester]
required_mcp_tools: [shell]
required_apps: []
---

# Write tests for changed code

Use this after implementation when behavior changed and proof needs to be stronger.

## Add tests

1. Read nearby tests before writing new ones.
2. Cover the changed behavior and the likely regression.
3. Avoid broad snapshots unless the repo already relies on them.
4. Keep mocks small and explicit.
5. Run the targeted test first, then the wider suite when risk is shared.

## Output

Return what behavior is covered, where the test lives, and the exact proof command.
