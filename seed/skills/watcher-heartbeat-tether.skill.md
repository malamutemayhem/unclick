---
name: Watcher heartbeat tether
slug: watcher-heartbeat-tether
version: 1.0.0
description: "Keeps long-running UnClick work alive by recording status, checking stale jobs, and re-tethering work to the current thread."
category: agent-orchestration
tags: [watcher, heartbeat, continuity, jobs, status]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick-native rewrite for heartbeat and continuity behavior.
unclick_usefulness: 5
unclick_native: hardwired
required_worker_roles: [Watcher]
required_mcp_tools: []
required_apps: []
---

# Watcher heartbeat tether

Use this as a native liveness rail for long-running work.

## Watch

1. Read the active job, thread, and last proof note.
2. Detect whether the worker is still making progress.
3. Save a short status update when the work is not finished.
4. Escalate stale or blocked work instead of silently drifting.
5. Keep the next action obvious for a resume.

## Output

Return current state, last real progress, blocker if any, next check, and the job id.
