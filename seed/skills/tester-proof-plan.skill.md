---
name: Tester proof plan
slug: tester-proof-plan
version: 1.0.0
description: "Creates the minimum honest test and dogfood plan needed to prove a UnClick job is actually complete."
category: testing-qa
tags: [testing, proof, dogfood, checks, xpass]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick-native rewrite from UnClick no-fake-DONE rules.
unclick_usefulness: 5
unclick_native: hardwired
required_worker_roles: [Tester]
required_mcp_tools: []
required_apps: []
---

# Tester proof plan

Use this as a native completion rail for UnClick jobs.

## Plan

1. Identify the behavior that changed.
2. Pick the smallest automated checks that exercise it.
3. Add one human-path dogfood check when UI or workflow changed.
4. Record exact command names, pages, or artifacts.
5. Separate proof from opinion.

## Done rule

No job is complete because the implementation looks right. It is complete when the relevant checks pass, the manual path has been walked when needed, and any remaining risk is named.

## Output

Return proof required, proof collected, proof missing, and a clear pass or blocked state.
