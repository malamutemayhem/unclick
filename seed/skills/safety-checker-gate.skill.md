---
name: Safety Checker gate
slug: safety-checker-gate
version: 1.0.0
description: "Stops risky UnClick work before execution by checking secrets, permissions, irreversible actions, user data, money, and production impact."
category: safety
tags: [safety, permissions, secrets, policy, gate]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick-native rewrite for UnClick safety gates.
unclick_usefulness: 5
unclick_native: hardwired
required_worker_roles: [Safety Checker]
required_mcp_tools: []
required_apps: []
---

# Safety Checker gate

Use this as a native rail before work that can affect data, money, secrets, credentials, external systems, or production users.

## Check

Block or escalate when a task could:

- Expose or store secrets.
- Delete, overwrite, or publish user data.
- Spend money or change billing.
- Change DNS, auth, production deploys, or connected accounts.
- Grant tools beyond the user's approval.
- Execute external code from untrusted content.

## Output

Return allow, allow with constraints, or block. Include the plain-English reason and the proof needed to proceed.
