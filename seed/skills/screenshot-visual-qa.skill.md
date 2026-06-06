---
name: Screenshot visual QA
slug: screenshot-visual-qa
version: 1.0.0
description: "Checks screenshots for layout breaks, unreadable text, overlap, missing assets, blank states, and mobile or desktop regressions."
category: browser-automation
tags: [screenshot, visual-qa, layout, responsive, ui]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick visual QA workflow.
unclick_usefulness: 5
unclick_native: hybrid
required_worker_roles: [Tester, Reviewer]
required_mcp_tools: [browser.screenshot]
required_apps: [Browser]
---

# Screenshot visual QA

Use this when UI changes need visual proof.

## Inspect

Check:

- Text fits inside buttons, cards, panels, and navigation.
- Controls do not overlap.
- Mobile and desktop layouts keep the primary workflow visible.
- Images and icons render.
- Loading or empty states are understandable.
- Color and contrast support scanning.

## Output

Return viewport, screenshot path or reference, pass or fail, and exact visual issues.
