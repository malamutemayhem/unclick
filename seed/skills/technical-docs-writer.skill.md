---
name: Technical documentation writer
slug: technical-docs-writer
version: 1.0.0
description: "Writes clear technical docs: quickstart, how-to guides, reference, and runnable examples, structured for the reader's task."
category: content
tags: [documentation, writing, quickstart, reference, examples]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick playbook distilled from common technical-writing skill patterns.
unclick_usefulness: 3
unclick_native: skill
required_worker_roles: [Builder]
required_mcp_tools: [files.read, files.write]
required_apps: []
---

# Technical documentation writer

Use this when a feature or API needs docs someone can actually follow.

## Run

1. Start from the reader's task and skill level, not the system's internals.
2. Lead with a quickstart that gets to a working result fast.
3. Separate how-to guides (goal-led) from reference (complete and dry).
4. Show real, runnable examples; state inputs, outputs, and common errors.
5. Keep it current: note versions and remove anything no longer true.

## Rule

Verify every command and snippet runs. Do not document behaviour you have not checked.

## Output

Return the doc, the sections covered, and any gap that still needs an owner.
