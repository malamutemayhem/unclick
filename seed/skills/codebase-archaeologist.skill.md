---
name: Codebase archaeologist
slug: codebase-archaeologist
version: 1.0.0
description: "Systematic exploration of an unfamiliar codebase: map the architecture, find the key files, surface conventions and hidden assumptions, and produce a walkthrough a new engineer can use on day one."
category: developer
tags: [onboarding, architecture, exploration, codebase, conventions, documentation]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick codebase exploration workflow.
unclick_usefulness: 5
unclick_native: skill
required_worker_roles: [Researcher]
required_mcp_tools: []
required_apps: []
---

# Codebase archaeologist

Use this when you need to understand an unfamiliar codebase, onboard to a new project, or explain a project's architecture to someone who has never seen it.

## Survey (top-down, 5 minutes max)

1. **Read the root.** README, CLAUDE.md, package.json/Cargo.toml/pyproject.toml, Makefile. These tell you the language, framework, entry points, and how the author thinks about the project.
2. **Map the directory tree.** One level deep first. Name each top-level directory's purpose in one phrase. Flag any directory whose purpose is not obvious from its name.
3. **Find the entry points.** main(), index.ts, server.ts, app.py, routes/. Trace one request or command from entry to response. This is the spine of the project.
4. **Identify the data layer.** Where does state live: database, files, in-memory, external API? Find the schema, models, or types that define the core domain.

## Dig (targeted, as needed)

5. **Find the conventions.** How are files named? How are tests organized? Is there a pattern for error handling, logging, config? Note where the codebase is consistent and where it deviates.
6. **Find the coupling.** Which modules import from which? Where are the hard boundaries (packages, services, API contracts) and where is everything tangled?
7. **Find the gotchas.** Environment variables that must be set. Services that must be running. Build steps that are not obvious. Migration ordering. Anything that would bite a new developer.
8. **Check the tests.** What is well-tested and what has no coverage? Test files often reveal intended behavior better than source files.

## Deliver

9. **Produce a walkthrough** with these sections:
   - **One-paragraph summary:** what this project does and for whom.
   - **Architecture map:** top-level structure, entry points, data flow.
   - **Key files:** the 5-10 files a new engineer should read first, in order, with one line on why each matters.
   - **Conventions:** naming, patterns, test organization.
   - **Gotchas:** setup traps, hidden dependencies, known quirks.
   - **Where to start:** the single best file to open first to understand the project.

## Rules

- Read before you summarize. Do not infer architecture from file names alone.
- Say "I have not explored this area" rather than guessing. Gaps are more useful than wrong maps.
- Keep the walkthrough under 2 pages. If it is longer, you are explaining too much and mapping too little.
