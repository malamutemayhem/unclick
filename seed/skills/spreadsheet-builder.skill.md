---
name: Spreadsheet builder
slug: spreadsheet-builder
version: 1.0.0
description: "Builds and edits Excel (.xlsx) spreadsheets with formulas, formatting, pivot summaries, and charts."
category: documents
tags: [xlsx, excel, spreadsheet, formulas, charts]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick playbook covering the same capability as the popular xlsx Agent Skill.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Builder]
required_mcp_tools: [files.read, files.write, shell.run]
required_apps: []
---

# Spreadsheet builder

Use this when a user needs a working spreadsheet, not a static table.

## Run

1. Confirm the inputs, the calculations, and the output the user wants.
2. Keep raw data on its own sheet; put summaries and charts on a separate sheet.
3. Use real formulas and named ranges, not hard-coded numbers, so the file stays live.
4. Add a pivot summary or chart when it makes the numbers easier to read.
5. Format for humans: headers, number formats, frozen panes, sensible column widths.

## Rule

Never overwrite source data with computed values. Show formulas, not just results.

## Output

Return the file path, the key figures, and any assumption baked into the calculations.
