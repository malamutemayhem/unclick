---
name: Draft PR description
slug: draft-pr-description
version: 1.0.0
description: "Drafts a clear pull request description from the diff, tests, user-facing impact, and remaining risk."
category: github-pr
tags: [github, pull-request, description, release-notes, proof]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick PR writing workflow.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Builder, Reviewer]
required_mcp_tools: [github.pull_requests]
required_apps: [GitHub]
---

# Draft PR description

Use this when a branch is ready for review or needs its PR body updated.

## Draft

Include:

- Summary.
- Changes.
- Tests and proof.
- Screenshots or manual checks when relevant.
- Risks or follow-ups.

## Tone

Be direct and useful. Do not overclaim. Do not say the work is complete unless the proof supports it.
