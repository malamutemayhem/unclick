---
name: Agent handoff packet writer
slug: agent-handoff-packet-writer
version: 1.0.0
description: "Writes a clean handoff packet for the next agent, including job state, touched files, proof, blockers, and next steps."
category: memory-km
tags: [handoff, agents, continuity, proof, next-steps]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick handoff workflow.
unclick_usefulness: 5
unclick_native: hardwired
required_worker_roles: [Coordinator, Memory]
required_mcp_tools: []
required_apps: []
---

# Agent handoff packet writer

Use this before pausing, transferring, or resuming agent work.

## Packet

Include:

- Job id and title.
- Status and owner.
- What changed.
- Files touched.
- Proof passed and proof missing.
- Decisions made.
- Blockers.
- Next command or page to inspect.

## Output

Return a handoff that avoids rework and does not imply completion unless proof exists.
