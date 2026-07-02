# Jobs (Human): the second lane, and the task-platform moat

Status: operator direction, 2026-06-11 ("AI can push human Jobs... a team-workspace lane with AI teammates")
Companions: `docs/prd/connections-circle.md` (two-block sidebar, Circle), `docs/prd/unclick-local-extension.md` (the third way a job gets done)

## The idea in one line

Jobs stops being an agent-only queue and becomes two lanes of one system: **Jobs (AI)** for the workforce, **Jobs (Human)** for people, and agents can push jobs INTO the human lane ("set up this key", "sign up here", "approve this") just as humans push jobs to agents.

## Why this is a moat and not a feature

Asana and monday.com are human task platforms trying to bolt AI on. UnClick arrives from the opposite shore: it already has a working AI workforce (seats, Boardroom coordination, XPass verification of finished work) and adds the human lane. The mixed team is the product:

- A job can be done three ways, and the system knows which: an agent does it (Jobs AI), the browser extension does it with the human confirming (the Co-Pilot lane), or a human does it (Jobs Human).
- AI teammates are first-class assigners AND assignees. Nobody else's task board has workers that actually do the work overnight and file receipts.
- XPass receipts attach to jobs, so "done" is verified, not claimed - the anchor rule (status must be earned) becomes a task-platform differentiator.
- Circle makes it multi-human: with the right permission, an agent (or teammate) can push a job to another person in your Circle. That is team task flow with AI in the loop.

Honest positioning: the wedge is mixed human+AI teams, not feature parity with Asana. Do not claim parity in any copy.

## Proof it works (same day as the idea)

This session generated five real human jobs before the feature had a name: Wayback archive seed, IndexNow ping, Bing Webmaster verification, Search Console verification, GitHub repo topics. An agent produced each one as a paste-ready instruction block with context, steps, and expected proof, then parked them in a doc and the Boardroom because there was no human lane to file them into. Jobs (Human) is the missing inbox for exactly this artifact.

## Mechanics (grounded in what exists)

- The Boardroom todo substrate already carries most of this: `create_todo`, `assigned_to_agent_id`, priorities, leases, completion. The human lane is, at minimum: an assignee that is a human account (account-first identity from the Connections plan), plus a structured hand-off payload.
- A human job carries: plain-English title, why it matters, paste-ready steps, links, expected proof, and who/what pushed it (human-first attribution: face + seat badge).
- Pushed-to-human jobs surface in the Human sidebar block and in Signals; completion can attach proof the same way agent jobs attach receipts.
- Circle permission (future toggle, default OFF): "can assign me jobs". Same both-sides-opt-in pattern as memory sharing.

## Naming and the rename rule

Operator naming: **Jobs (AI)** and **Jobs (Human)**. Inside the two-block sidebar the block titles may make the parentheticals redundant (the Agents block can show "Jobs", the Human block "Jobs"); keep the operator's parenthetical labels as the default and let UI review decide. Per the rename-safe rule: internal identifiers stay neutral (`job lane: "agent" | "human"`, `/api/jobs?lane=human`), display labels come from `src/config/product-names.ts`.

## Sequencing

Not a launch blocker for Circle PR 1. Order: two-block sidebar lands, then Jobs (Human) as a view over the todo substrate with the structured hand-off payload, then Circle's "can assign me jobs" permission, then extension ingestion of hand-off blocks (the job that semi-does itself). Public marketing of the Asana/monday angle waits until the lane demonstrably works in-house (dogfood first, claims second).
