---
name: Frontend design review
slug: frontend-design-review
version: 1.0.0
description: "Reviews UI code and screens against accessibility, performance, and visual-craft rules, and pushes for bold, non-generic design."
category: frontend
tags: [frontend, design, ui, accessibility, performance]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick playbook covering the same ground as the widely installed frontend-design and web-design-guidelines skills.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Reviewer]
required_mcp_tools: []
required_apps: []
---

# Frontend design review

Use this after a UI change, before it ships.

## Check

- Hierarchy: clear focal point, real spacing scale, aligned grid, restrained type scale.
- Craft: consistent radius, shadows, and color; states for hover, focus, active, disabled, empty, loading, error.
- Accessibility: visible focus, labeled controls, contrast, keyboard paths, heading order, reduced-motion support.
- Performance: image sizing, no layout shift, lazy-load heavy assets.
- Voice: avoid the generic default look; make one deliberate, distinctive choice.

## Rule

Critique the screen, not the person. Every flag gets a concrete fix, not just a label.

## Output

Return findings grouped by severity, each with the file or element and the specific fix.
