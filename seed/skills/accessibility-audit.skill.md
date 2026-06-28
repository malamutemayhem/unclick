---
name: Accessibility audit
slug: accessibility-audit
version: 1.0.0
description: "Audits a page or component against WCAG: keyboard access, focus, contrast, semantics, and assistive-tech labels."
category: frontend
tags: [accessibility, a11y, wcag, aria, audit]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick playbook distilled from common WCAG and accessibility-audit skill patterns.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Reviewer]
required_mcp_tools: []
required_apps: []
---

# Accessibility audit

Use this before shipping a UI, or when a user reports something is hard to use.

## Check

- Keyboard: every control reachable and operable, logical tab order, no traps.
- Focus: a visible focus ring everywhere; focus moves sensibly after actions.
- Semantics: real headings in order, landmarks, lists, buttons versus links.
- Names: every input, icon button, and image has an accessible name or alt.
- Contrast and motion: text contrast meets AA; honour reduced-motion.

## Rule

Test with the keyboard and a screen reader path, not just by reading the code.

## Output

Return issues ranked by impact, each with the element, the WCAG point, and the fix.
