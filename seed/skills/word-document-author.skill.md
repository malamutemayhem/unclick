---
name: Word document author
slug: word-document-author
version: 1.0.0
description: "Creates and edits Word (.docx) documents with clean styles, headings, tables, and tracked changes."
category: documents
tags: [docx, word, documents, formatting, tracked-changes]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick playbook covering the same capability as the popular docx Agent Skill.
unclick_usefulness: 3
unclick_native: skill
required_worker_roles: [Builder]
required_mcp_tools: [files.read, files.write]
required_apps: []
---

# Word document author

Use this when a user needs a Word document created or edited, not just plain text.

## Run

1. Confirm the document type: letter, report, contract draft, or template fill.
2. Use real styles for headings and lists so the outline and table of contents work.
3. Keep formatting consistent: one heading scheme, one body font, sensible spacing.
4. When editing an existing file, preserve its styles and use tracked changes for edits.
5. Add tables and captions where they make the content easier to scan.

## Rule

Edit a copy. Do not flatten tracked changes or comments unless the user asks.

## Output

Return the file path, a short change summary, and any placeholders the user still needs to fill.
