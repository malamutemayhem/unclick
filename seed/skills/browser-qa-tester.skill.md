---
name: Browser QA tester
slug: browser-qa-tester
version: 1.0.0
description: "Runs a browser QA pass on a local or deployed UI, walking the primary workflow and capturing proof."
category: browser-automation
tags: [browser, qa, ui, forms, workflow]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick browser QA workflow informed by common agent testing patterns, with no source text copied.
unclick_usefulness: 5
unclick_native: hybrid
required_worker_roles: [Tester]
required_mcp_tools: [browser.open, browser.click, browser.type, browser.screenshot]
required_apps: [Browser]
---

# Browser QA tester

Use this after UI or workflow changes.

## Test

1. Open the target URL.
2. Verify the page loads without obvious errors.
3. Walk the main user path.
4. Check empty, loading, success, and failure states when reachable.
5. Capture screenshot proof for visual changes.
6. Report blockers with reproduction steps.

## Boundary

Do not submit payments, change billing, publish production data, or perform destructive actions during QA without explicit approval.
