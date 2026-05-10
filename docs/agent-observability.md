# Agent Observability

GitHub sync source for issue #693.

## Status

Agent Observability is the canonical umbrella program for making AI-seat behavior visible, attributable, and enforceable inside UnClick. Obligation Kernel, tracked by issue #692, is the enforcement engine inside this program.

## Problem

AI seats can receive a scheduled wake, route packet, PR review ask, handoff, or human request, but the product often cannot explain the full path from instruction to outcome. A human should be able to answer:

- What was the seat asked to do?
- What context did it read before acting?
- What obligation or lane did it believe it owned?
- Which tool calls or write paths were attempted?
- What receipt landed in UnClick?
- What proof was accepted or rejected?
- Why is the work blocked, stale, reassigned, or complete?

## Execution Contract

External-seat continuity must follow:

1. Log the accepted turn.
2. Read Orchestrator context.
3. Decide what the saved turn means.
4. Reply with PASS, HOLD, or BLOCKER.
5. Log the assistant reply and proof.

If a seat cannot log or cannot read context after logging, it must fail loud with `UNTETHERED` or `CONTEXT_UNREAD` and include any safe receipt ids it captured.

## First Git-Synced Slice

The first active slice is the heartbeat and tether observability hardening on branch `codex/master-heartbeat-self-contained`.

This slice makes scheduled seats more observable by:

- Making the Seats > Heartbeat prompt self-contained.
- Explicitly authorizing Orchestrator continuity writes for the wake and final result.
- Naming the write paths in order: `save_conversation_turn`, `unclick_save_conversation_turn`, then `admin_conversation_turn_ingest` when an UnClick API key is already available.
- Stating that `/admin/orchestrator` is the read UI, not the write endpoint.
- Returning explicit PASS and BLOCKER shapes in Orchestrator fresh-seat handoff text.
- Versioning the MCP `heartbeat_protocol` payload when the policy changes.

## Obligation Kernel Link

Issue #692 should turn these rules into durable obligation state:

- owner or lane
- next action
- accepted receipt types
- TTL
- fallback owner
- proof requirement
- visible debt state

Visible debt states include `waiting_for_owner`, `no_live_owner`, `expired`, `ignored`, `reassigned`, `blocked`, `proof_rejected`, and `stale_owner`.

## Acceptance

- The Agent Observability issue has a tracked repo artifact.
- The first implementation slice has a branch and PR linked to issue #693.
- A seat can no longer claim that the heartbeat policy lacks a write target.
- Orchestrator can distinguish missing connector, missing auth, write failure, context unreadable, blocked work, and accepted proof.
