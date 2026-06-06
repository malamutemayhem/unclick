---
name: Builder implementation packet
slug: builder-implementation-packet
version: 1.0.0
description: "Turns an approved task into a compact build packet with scope, files, constraints, tests, and proof expectations for the Builder worker."
category: agent-orchestration
tags: [builder, implementation, packet, handoff, scope]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick-native rewrite for UnClick Builder handoffs.
unclick_usefulness: 5
unclick_native: hybrid
required_worker_roles: [Coordinator, Builder]
required_mcp_tools: []
required_apps: []
---

# Builder implementation packet

Use this when a request is ready to be built but the Builder needs a clean handoff.

## Packet

Include:

- Goal in one sentence.
- Files and surfaces likely to change.
- Non-goals and unsafe shortcuts.
- Existing patterns to follow.
- Tests or checks that count as proof.
- Rollback notes when the change touches shared behavior.

## Build guardrails

Prefer the repo's existing style. Keep the change narrow. Do not invent a new abstraction unless it removes real complexity. Never mark the task complete from intent alone.

## Output

Return a concise implementation packet plus the first verification command or manual check.
