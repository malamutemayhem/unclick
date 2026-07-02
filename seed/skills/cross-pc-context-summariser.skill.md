---
name: Cross-PC context summariser
slug: cross-pc-context-summariser
version: 1.0.0
description: "Summarises work so another UnClick seat or computer can resume without asking the operator to repeat context."
category: memory-km
tags: [handover, cross-pc, resume, continuity, summary]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick continuity workflow.
unclick_usefulness: 5
unclick_native: hardwired
required_worker_roles: [Memory, Coordinator]
required_mcp_tools: []
required_apps: []
---

# Cross-PC context summariser

Use this when work may move between seats, computers, or threads.

## Summarise

Include:

- Current goal.
- Workspace or branch.
- Files touched.
- Commands already run.
- Current blockers.
- User preferences that matter for the next pass.
- Exact next action.

## Output

Return a handover that a fresh worker can use immediately. Keep it factual and compact.
