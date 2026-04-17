# Phase 5 - Chunk 2: Build Desk Admin Surface Scaffold

## Context for this session
You are working on `malamutemayhem/unclick-agent-native-endpoints`, branch `claude/phase-5-build-desk-foundation`. The deploy branch is `claude/setup-malamute-mayhem-zkquO`.

Before anything else: call `get_startup_context` from the UnClick MCP server.

## What you are doing in THIS chunk
Scaffolding the Build Desk admin surface at /admin/build. This is a new tab in the admin shell with three placeholder sub-tabs.

## Step 1: Read existing patterns first

READ these files before writing any code:
- `src/pages/admin/AdminShell.tsx` -- understand routing, sidebar nav, layout
- `src/pages/admin/AdminMemory.tsx` -- understand how tab structures are built
- `src/pages/admin/memory/FactsTab.tsx` -- understand a real tab component

Follow these patterns exactly. Do NOT invent a new pattern.

## Step 2: Create Build Desk components

Create these files following the AdminMemory.tsx pattern:

**src/pages/admin/AdminBuild.tsx**
- Three tabs: "Tasks", "Workers", "History"
- Uses the same tab pattern as AdminMemory.tsx
- Passes apiKey to each tab component
- Auth via useSession(), wrapped in RequireAuth

**src/pages/admin/build/BuildTasksTab.tsx**
- Placeholder with InfoCard explaining: "Build Tasks are structured work items you can plan, decompose, and dispatch to AI coding workers. Create tasks with acceptance criteria, assign them to workers like Claude Code or Codex, and track progress here."
- Empty state showing "No build tasks yet"

**src/pages/admin/build/BuildWorkersTab.tsx**
- Placeholder with InfoCard explaining: "Workers are AI coding backends that execute your build tasks. Register Claude Code, Codex CLI, Cursor, or custom MCP workers here. UnClick dispatches tasks to the right worker and brings results back."
- Empty state showing "No workers registered"

**src/pages/admin/build/BuildHistoryTab.tsx**
- Placeholder with InfoCard explaining: "Build History shows every task dispatch, its status, and results. Use this to track what your AI workers have done and review their output."
- Empty state showing "No dispatch history"

## Step 3: Register in AdminShell

Add Build Desk to the AdminShell sidebar navigation and routing. Use an appropriate icon (wrench, hammer, or similar from whatever icon library the admin already uses).

## Step 4: Add StatCard to MemoryActivityTab

READ `src/pages/admin/memory/MemoryActivityTab.tsx` first. Add one new StatCard showing "Memory Load Rate" that calls the `admin_memory_load_metrics` action from chunk 1 and displays the percentage.

## Acceptance criteria
- [ ] /admin/build route works and shows the Build Desk
- [ ] Build Desk has "Tasks", "Workers", "History" tabs
- [ ] Each tab has an InfoCard with plain-language explanation
- [ ] Sidebar nav includes Build Desk entry
- [ ] MemoryActivityTab has Memory Load Rate StatCard
- [ ] Auth is consistent -- useSession(), RequireAuth, AdminShell pattern
- [ ] No em dashes anywhere in UI text or code comments
- [ ] Brand colors used: teal #61C1C4 primary, amber #E2B93B secondary

## Known scars -- do NOT repeat
- JSONB values must use displayValue() helper
- AdminShell.tsx provides layout -- do NOT add standalone Navbar/Footer
- useSession() for auth, not localStorage

## Out of scope
- Do NOT build CRUD operations for tasks/workers (that is chunk 3)
- Do NOT wire up real worker integrations
- Do NOT modify existing admin surfaces beyond adding the nav entry and StatCard
- Commit with message: "feat: Build Desk admin scaffold with Tasks, Workers, History tabs"
