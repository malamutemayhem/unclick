---
name: React and Next.js best practices
slug: react-nextjs-best-practices
version: 1.0.0
description: "Applies modern React and Next.js patterns: component boundaries, data fetching, state, performance, and accessibility."
category: frontend
tags: [react, nextjs, frontend, performance, patterns]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick playbook covering the same ground as the widely installed React and Next.js best-practice skills.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Builder, Reviewer]
required_mcp_tools: []
required_apps: []
---

# React and Next.js best practices

Use this when writing or reviewing React or Next.js code.

## Apply

1. Keep components small and single-purpose; lift state only as far as it is shared.
2. Fetch data at the right layer; cache and revalidate deliberately, avoid waterfalls.
3. Prefer derived state over duplicated state; avoid effects that just mirror props.
4. Memoise only measured hot paths; do not scatter useMemo and useCallback by reflex.
5. Build accessible markup first: semantic elements, labels, focus management.

## Rule

Readable beats clever. Match the surrounding code's conventions before introducing new ones.

## Output

Return the change or review notes, the patterns applied, and any follow-up worth a separate task.
