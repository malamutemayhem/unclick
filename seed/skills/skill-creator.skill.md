---
name: Skill creator
slug: skill-creator
version: 1.0.0
description: "Helps author a new UnClick skill: a valid frontmatter header, the right safety level, and a tight, runnable playbook."
category: productivity
tags: [skills, authoring, meta, playbook, template]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick rewrite of the widely used skill-creator pattern, mapped to the UnClick skill format.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Builder]
required_mcp_tools: [files.write]
required_apps: []
---

# Skill creator

Use this to turn a repeated workflow into a reusable UnClick skill.

## Run

1. Name the one job the skill does and when an agent should reach for it.
2. Fill the frontmatter: slug, description, category, tags, and required roles or tools.
3. Pick the safety level honestly: cautious if it writes files, runs code, or sends anything.
4. Write a short playbook: a one-line "use this when", a few numbered steps, an output.
5. Keep the text a playbook, not a permission grant; access stays behind Passport and policy.

## Rule

Short and runnable beats long and vague. If a step is not testable, sharpen it.

## Output

Return the new skill file, its slug and category, and any tool or app it depends on.
