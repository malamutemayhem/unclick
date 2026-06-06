---
name: Senior code reviewer
slug: senior-code-reviewer
version: 1.0.0
description: "Performs a senior engineering review focused on bugs, regressions, missing tests, maintainability, and user-facing risk."
category: code-review
tags: [code-review, bugs, tests, maintainability, regression]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick review skill influenced by common PR review practices, with no source text copied.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Reviewer]
required_mcp_tools: []
required_apps: []
---

# Senior code reviewer

Use this when asked to review a change, branch, pull request, or implementation.

## Review stance

Find issues before praise. Prioritize:

- User-visible bugs.
- Data loss or security risk.
- Broken contracts between modules.
- Missing tests for changed behavior.
- Overbroad changes that make rollback harder.

## Output

Lead with findings ordered by severity. Include file and line references when available. If no findings exist, say that clearly and list remaining test gaps.
