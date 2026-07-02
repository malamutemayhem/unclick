---
name: GitHub PR summariser
slug: github-pr-summariser
version: 1.0.0
description: "Summarises a GitHub pull request into purpose, changed areas, risk, review state, CI state, and next action."
category: github-pr
tags: [github, pull-request, summary, ci, review]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick PR summary workflow.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Reviewer, Coordinator]
required_mcp_tools: [github.pull_requests]
required_apps: [GitHub]
---

# GitHub PR summariser

Use this when the operator needs the state of a pull request without reading every file.

## Summarise

Read PR title, body, commits, files, checks, and review comments when available.

Return:

- Purpose.
- Main changed areas.
- Highest-risk files.
- CI and review status.
- Merge readiness.
- Next action.

## Boundary

Summarising is read-only. Do not push, merge, close, or request reviewers unless explicitly asked.
