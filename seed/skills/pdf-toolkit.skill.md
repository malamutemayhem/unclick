---
name: PDF toolkit
slug: pdf-toolkit
version: 1.0.0
description: "Extracts text and tables from PDFs, fills forms, merges or splits files, and generates clean formatted PDF reports."
category: documents
tags: [pdf, documents, extract, forms, reports]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick playbook covering the same capability as the popular pdf Agent Skill.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Builder]
required_mcp_tools: [files.read, files.write, shell.run]
required_apps: []
---

# PDF toolkit

Use this when a user needs to read, change, or produce a PDF.

## Run

1. Confirm the goal: extract, fill, combine, split, or create.
2. For extraction, pull text and tables with layout preserved; keep page numbers.
3. For form fill, map each field by name before writing; never guess required fields.
4. For merge or split, confirm page ranges and output names first.
5. For creation, build from a clear structure: title, sections, tables, page footer.

## Rule

Work on a copy, never the original. Report which pages or fields changed.

## Output

Return the output file path, a one-line summary of what changed, and anything the user must verify.
