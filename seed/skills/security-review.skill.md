---
name: Security review
slug: security-review
version: 1.0.0
description: "Reviews a change for auth, secrets, data exposure, injection, unsafe dependencies, and production security regressions."
category: security
tags: [security, auth, secrets, injection, review]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick security review workflow aligned with common secure review categories.
unclick_usefulness: 5
unclick_native: hybrid
required_worker_roles: [Security Checker, Reviewer]
required_mcp_tools: []
required_apps: []
---

# Security review

Use this for changes touching auth, user data, external input, permissions, secrets, networking, or dependency boundaries.

## Check

Look for:

- Missing auth or admin checks.
- Secrets in code, logs, URLs, or prompts.
- Injection and unsafe parsing.
- Overbroad permissions.
- Sensitive data returned to the wrong user.
- Unsafe dependency updates.

## Output

Lead with exploitable findings. Include reproduction steps or reasoning. If no findings are found, list what was reviewed and residual risk.
