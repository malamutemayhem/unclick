---
name: Coordinator router
slug: coordinator-router
version: 1.0.0
description: "Routes a user request to the right UnClick worker lane, keeps the Boardroom job as source of truth, and refuses to mark done without proof."
category: agent-orchestration
tags: [coordination, routing, boardroom, jobs, proof]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick-native rewrite from Skills deep research and Boardroom operating rules.
unclick_usefulness: 5
unclick_native: hardwired
required_worker_roles: [Coordinator]
required_mcp_tools: []
required_apps: []
---

# Coordinator router

Use this as a native UnClick rail, not as an optional package.

## Run

1. Read the newest user turn and the active Boardroom or Jobs item.
2. Classify the work as question, plan, build, review, proof, release, or memory.
3. Pick the smallest worker set that can finish it.
4. Declare the source of truth before execution.
5. Keep a live status note when work lasts more than a short pass.
6. Block "done" until proof exists.

## Native boundary

Hardwire this behavior into UnClick orchestration. The visible skill is only the playbook. It must not grant tools, credentials, shell access, browser access, or write permission.

## Output

Return the selected worker lane, the current job id when known, the next action, and the proof still needed.
