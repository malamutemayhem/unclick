# Phase 5: Build Desk Foundation -- Claude Code Briefs

## What's here

5 chunked briefs designed to be fed to Claude Code sequentially:

| File | What it does |
|------|-------------|
| `phase5-chunk0-agents-md.md` | Creates AGENTS.md and CLAUDE.md at repo root |
| `phase5-chunk1-memory-reliability.md` | Updates tool descriptions, adds instrumentation table + metrics action |
| `phase5-chunk2-build-desk-scaffold.md` | Scaffolds /admin/build with Tasks, Workers, History tabs |
| `phase5-chunk3-schema-and-api.md` | Adds build_tasks, build_workers, build_dispatch_events tables + API actions |
| `phase5-chunk4-docs-and-pr.md` | Verification pass, session docs, and opens the PR |

## How to run

### Option A: Interactive (recommended first time)
```powershell
cd C:\path\to\unclick-agent-native-endpoints
.\docs\briefs\run-phase5.ps1
```
Pauses between each chunk so you can review.

### Option B: Fully automated
```powershell
cd C:\path\to\unclick-agent-native-endpoints
.\docs\briefs\run-phase5-auto.ps1
```
Runs all 5 chunks back-to-back. Walk away and come back.

### Option C: Manual (one at a time)
```powershell
cd C:\path\to\unclick-agent-native-endpoints
git checkout claude/phase-5-build-desk-foundation
cat .\docs\briefs\phase5-chunk0-agents-md.md | claude --dangerously-skip-permissions
# review, then:
cat .\docs\briefs\phase5-chunk1-memory-reliability.md | claude --dangerously-skip-permissions
# etc.
```

## Important notes

- All chunks work on branch `claude/phase-5-build-desk-foundation`
- PR targets `claude/setup-malamute-mayhem-zkquO` (the deploy branch)
- Each chunk tells Claude Code to call `get_startup_context` first
- Each chunk has explicit acceptance criteria and out-of-scope lists
- The final chunk (04) does verification and opens the PR
