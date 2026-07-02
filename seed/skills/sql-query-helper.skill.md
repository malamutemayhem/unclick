---
name: SQL query helper
slug: sql-query-helper
version: 1.0.0
description: "Writes, explains, and optimizes SQL with safe, parameterized queries and a read-first, check-before-write discipline."
category: data
tags: [sql, database, query, optimization, safety]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick playbook distilled from common SQL-assistant skill patterns.
unclick_usefulness: 3
unclick_native: skill
required_worker_roles: [Builder]
required_mcp_tools: [db.query]
required_apps: []
---

# SQL query helper

Use this to write or improve SQL against a known schema.

## Run

1. Confirm the schema and the exact question before writing SQL.
2. Write readable SQL: clear joins, explicit columns, no select-star in shipped queries.
3. Parameterize every input; never build queries by string concatenation.
4. For slow queries, read the plan and fix the cause: indexes, join order, filters.
5. Treat writes and deletes as dangerous: preview the rows, scope with a key, confirm.

## Rule

Default to read-only. Never run a destructive statement without an explicit go-ahead.

## Output

Return the query, a one-line explanation, and the expected row count or impact.
