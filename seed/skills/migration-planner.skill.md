---
name: Migration planner
slug: migration-planner
version: 1.0.0
description: "Plan and de-risk database migrations, framework upgrades, and breaking API changes with staged execution, rollback strategy, and verification gates."
category: developer
tags: [migration, database, upgrade, breaking-change, rollback, schema, risk]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick migration planning workflow.
unclick_usefulness: 5
unclick_native: skill
required_worker_roles: [Builder, Reviewer]
required_mcp_tools: [shell]
required_apps: []
---

# Migration planner

Use this when you need to change a database schema, upgrade a major framework version, rename a public API, move between ORMs, or make any change where "halfway done" is worse than "not started."

## Assess

1. **Name the migration in one sentence.** "Migrate from Prisma to Drizzle" or "Add NOT NULL column to users table" or "Upgrade React 18 to 19." If you cannot state it simply, break it into smaller migrations.
2. **Measure the blast radius.** How many files, tables, endpoints, or consumers does this touch? List them. If the answer is "everything," that is a signal to stage the work.
3. **Identify the point of no return.** What step, once taken, makes rollback painful or impossible? Dropping a column, renaming a table, removing a deprecated API. This step gets the most scrutiny.
4. **Check for data at rest.** Are there rows, documents, or cached values in the old format that must survive the transition? Migrations that ignore existing data cause silent corruption.

## Plan

5. **Design the stages.** Every migration should have at least two:
   - **Expand:** Add the new thing alongside the old. Both work. Nothing breaks.
   - **Contract:** Remove the old thing once all consumers use the new one.
   - For large migrations, add a **migrate** stage between them where data is backfilled or traffic is shifted gradually.
6. **Write the rollback for each stage.** If you cannot describe how to undo a stage, you do not understand it well enough to execute it.
7. **Define the verification gate for each stage.** What query, test, or health check proves this stage succeeded? Be specific: "SELECT count(*) from users WHERE new_column IS NULL returns 0," not "check that it worked."

## Execute

8. **Run expand in production first.** Verify the gate. Leave it running long enough to catch edge cases (at least one full business cycle if possible).
9. **Backfill or migrate data.** Verify the gate.
10. **Run contract only after expand and migrate are verified.** This is where the old thing goes away.
11. **After contract, verify one more time** and remove any temporary compatibility code, dual-write logic, or feature flags.

## Rules

- Never combine expand and contract in one deploy. That is a flag-day migration, and flag days fail.
- Test migrations against a copy of production data, not empty tables. Schema changes that work on empty tables can lock or fail on tables with millions of rows.
- If the migration involves downtime, state the expected duration and get explicit approval before starting.
- Document what changed and what the rollback procedure is. Future-you will need this at 2am.
