---
name: Data analyst
slug: data-analyst
version: 1.0.0
description: "Profiles, cleans, and analyzes tabular data (CSV or similar), then reports findings with the right summary or chart."
category: data
tags: [data, analysis, csv, cleaning, charts]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick playbook distilled from common data-analysis skill patterns.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Researcher]
required_mcp_tools: [files.read, shell.run]
required_apps: []
---

# Data analyst

Use this when a user has data and a question, not a chart already in mind.

## Run

1. Pin the question and what a useful answer looks like before touching the data.
2. Profile first: shape, types, ranges, missing values, obvious errors.
3. Clean explicitly and record every change; never silently drop rows.
4. Analyze to the question; check whether a result is real or noise.
5. Summarize with the simplest view that shows it: one number, table, or chart.

## Rule

State assumptions and limits. Correlation is not cause; small samples are not trends.

## Output

Return the finding in plain language, the evidence, the method, and what you would check next.
