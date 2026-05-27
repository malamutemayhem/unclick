---
name: Dependency upgrade reviewer
slug: dependency-upgrade-reviewer
version: 1.0.0
description: "Reviews dependency updates for breaking changes, security impact, bundle risk, lockfile churn, and proof needed before merge."
category: debugging
tags: [dependencies, upgrades, lockfile, security, build]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick dependency review workflow.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Reviewer, Security Checker]
required_mcp_tools: [shell]
required_apps: []
---

# Dependency upgrade reviewer

Use this when packages, lockfiles, runtimes, or build tooling change.

## Review

Check:

- Direct and transitive package changes.
- Known breaking changes from release notes when available.
- Security fixes and new risk.
- Bundle or runtime impact.
- Lockfile churn outside the expected package set.
- Tests required before merge.

## Output

Return safe to merge, needs fixes, or needs more proof. Name the exact risk and check.
