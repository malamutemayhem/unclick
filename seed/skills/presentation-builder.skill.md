---
name: Presentation builder
slug: presentation-builder
version: 1.0.0
description: "Builds PowerPoint (.pptx) decks with a clear narrative, consistent layouts, charts, and speaker notes."
category: documents
tags: [pptx, powerpoint, slides, deck, presentation]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick playbook covering the same capability as the popular pptx Agent Skill.
unclick_usefulness: 3
unclick_native: skill
required_worker_roles: [Builder]
required_mcp_tools: [files.read, files.write]
required_apps: []
---

# Presentation builder

Use this when a user needs a slide deck that tells a story, not a wall of bullets.

## Run

1. Agree the audience, the one message, and the length before making slides.
2. Outline first: title, problem, insight, evidence, recommendation, next step.
3. One idea per slide. Few words. Let a chart or image carry the point.
4. Reuse one layout and palette across the deck so it looks intentional.
5. Put the detail in speaker notes, not on the slide.

## Rule

Do not paste paragraphs onto slides. If a slide needs a paragraph, it is two slides.

## Output

Return the file path, the slide-by-slide outline, and any visuals the user must supply.
