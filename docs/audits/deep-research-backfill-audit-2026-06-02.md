# Deep Research Backfill Audit (concept to live-job map)

Job: Boardroom `e82ebb77-8cfb-4384-9ea4-af7b772343e5` (high, open).
Owner lane: Worker 20 (final sweep). Date: 2026-06-02.
Status: partial proof. No code, no DONE claim, no duplicate parent jobs created.

This audit follows the existing ScopePack v0 on the job (comment
`4dc63f62-e1e1-42ac-b2ae-4f89fb64f8c4`) and the master build priority order
(comment `62e5be68`). Goal: make sure research-backed concepts map to live work
surfaces and do not vanish, duplicate, or drift. This is a proof-integrity audit,
not a rewrite.

## Method and honest scope limit

The ScopePack's source set is 67 Markdown deep-research files at
`C:\G\MalamuteMayhem\Jobs\UnClick\Context\Deep Researches` (count verified earlier by
`cascade-windsurf-worker-seat`, comment `e6bc366d`). Those files live on the operator's
local Windows machine and are NOT in this repository, so this seat cannot read them
directly. The full source-file-by-file table (`source file -> cluster -> job -> status`)
therefore remains deferred and needs either local file access or a CopyRoom receipt.

What this seat CAN prove from the live board is the reverse direction: for each major
research concept named in the ScopePack acceptance list, does a live Boardroom job
already carry it, and is it captured, thin/drifted, or missing. That reverse map is
below and is the actionable half.

## Concept to live-job matrix

Status legend: CAPTURED (a live job carries it), THIN/DRIFT (touched but no dedicated
or current card), MISSING (no live job), DROPPED (was a card, now in dropped set).

| Research concept | Status | Live job(s) | Note / recommended action |
|---|---|---|---|
| Scene Builder (Receipt-First) | CAPTURED | 5d9e31c9 Agentic AI; 67bbf7ae Situation Brain v0 | Situation Brain v0 is the concrete Scene Builder v0 slice. Pad 67bbf7ae, do not spawn new. |
| Truth Ladder / ProofTruth Gate | THIN/DRIFT | d2bbcce8 git-sync proof audit (Worker 1) | Proof integrity is covered operationally but there is no dedicated "Truth Ladder" card. Fold into proof-cleanup lane rather than create a new epic. |
| Decision / Outcome Ledger | CAPTURED | 9e131baf AutopilotIQ learning layer (Worker 6) | Outcome ledger is the decision ledger. Capture-only per that job's gate. |
| CopyRoom | CAPTURED | 5d9e31c9 (CopyRoom hook slice); ExpressRoom draft tools live | Carried inside Agentic AI. No separate card needed yet. |
| Fidelity Vault | MISSING (tools exist) | none | `fidelitycopy` / `fidelitypass` MCP tools exist but no tracker job. Add as a thin chip under 6e125b76 (gbrain absorb) or Agentic AI, do not create standalone epic. |
| Proof Ledger v2 | THIN/DRIFT | none current | Was live (Cascade "Proof Ledger v2 / false-green cleanup", OpenHands job history). No live card on the 82-board. Recommend a thin chip if still wanted, else mark superseded by d2bbcce8 proof audit. |
| Memory Graph | CAPTURED | b5bd4834 Memory Graph layer (Worker 9) | Already an architecture-note card. Good. |
| Prevision / Predictive Routing | MISSING | none | Master order Phase 11. Defer: explicitly later-tier, no card needed now. Note as deferred so it is not "lost". |
| Autopilot Gate Stack | CAPTURED | da583e3a safety gates (Worker 6); e63d8d6a rollback third leg (Worker 12); 0f9c7da2 auto-merge replacement | Spread across 3 cards, which matches the gate-stack shape. |
| Confidence Market | MISSING | none | Speculative research bet. Defer with reason, do not create card. |
| Adversarial / Safety testing | CAPTURED | 59cb69a8 scope-confusion replay; 85580a12 strict-client pack; 80b5c54a/a8574878 security | Covered by TestPass (Worker 14) + Security (Worker 12). |
| Dream / Reflection loop | CAPTURED | 824fa6a4 recall score + self-healing; 406280ab episodic->semantic distiller; 9e131baf | Reflection is carried by memory self-healing + AutopilotIQ. |
| Unique-bets addendum (gbrain) | CAPTURED | 6e125b76 absorb gbrain patterns (typed-link graph, compiled-truth pages, nightly consolidation, durable queue, retrieval evals) | Single parent card already holds the unique bets. |
| HarnessKit / Resolver | MISSING | none | Master order Phase 6. Defer with reason. |
| Skills Library v0 | MISSING | none | Master order Phase 6. Defer with reason. |
| Working Memory Leases | DROPPED | (dropped) d7391762 leases + stale status expiry | Already in dropped set. Leave dropped unless a live job points back. |
| Source-of-Truth Resolver | THIN/DRIFT | Boardroom-first rules live in product | Operationally enforced (Boardroom is source of truth) but no card. No action. |
| WakePass / ACK repair | CAPTURED | 0ca5accb auto-mute; 4fa1ee98 read-only re-scope; 91eedd0d heartbeat suppression | Worker 7 lane fully carries this. |
| Contradiction Quarantine | THIN/DRIFT | conflict_detect/resolve actions in api/memory-admin.ts | Shipped as product actions, no tracker card. No action needed. |

## Findings

- No high-signal research concept is fully lost. Every concept is either CAPTURED in a
  live job, THIN/DRIFT (operationally covered, no dedicated card), DROPPED (already in
  the dropped set), or MISSING-but-deferred (later-tier research bets).
- The only items worth a small backfill chip (not a new epic) are Fidelity Vault and,
  if still wanted, Proof Ledger v2. Per the ScopePack backfill rule, pad an existing
  parent (6e125b76 gbrain absorb or 5d9e31c9 Agentic AI) rather than create duplicates.
- Deferred-by-design (record so they are not "missing by accident"): Prevision/Predictive
  Routing, Confidence Market, HarnessKit/Resolver, Skills Library v0. These are master
  order Phase 6/11 and correctly sit behind the proof and gate rails.

## Still open (deferred half)

- Full 67-file source-by-source table needs local file access or a CopyRoom receipt for
  `C:\G\MalamuteMayhem\Jobs\UnClick\Context\Deep Researches`. This seat cannot reach
  that path. Hand the file-by-file index to a seat with local read access, or attach the
  files via CopyRoom, then complete the `source file -> cluster -> job` column.
- GitHub issue #933 remains the mirror; Boardroom remains source of truth. No sync change
  was made by this audit.
