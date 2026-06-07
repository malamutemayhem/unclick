---
name: Test-driven development workflow
slug: tdd-workflow
version: 1.0.0
description: "Drives a change test-first: write a failing test, make it pass with the smallest change, then refactor, in atomic steps."
category: testing-qa
tags: [tdd, testing, red-green-refactor, discipline, quality]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick playbook distilled from the widely starred superpowers test-driven development pattern.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Builder, Tester]
required_mcp_tools: []
required_apps: []
---

# Test-driven development workflow

Use this for any change where correctness matters and a test can express it.

## Loop

1. Write one failing test that names the behaviour you want. Run it; watch it fail.
2. Make the smallest change that turns it green. Resist building ahead.
3. Refactor with the test green: remove duplication, clarify names, keep behaviour.
4. Repeat in small steps; commit at each green point.

## Rule

No new behaviour without a test that first failed for the right reason. Keep steps atomic.

## Output

Return the tests added, what they cover, and the final green run summary.
