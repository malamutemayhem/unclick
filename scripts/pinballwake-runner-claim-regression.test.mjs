import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  createCodingRoomJobFromBoardroomTodo,
  evaluateBoardroomTodoAutoClaimEligibility,
  inspectAutonomousRunnerJobSafety,
} from "./pinballwake-autonomous-runner.mjs";

// Regression for the live e9e308cd shape that GROUP BROADCAST cycle 4
// flagged as "Runner sees work but does not think it is allowed to claim it."
//
// The ScopePack only carries lane + owner_hint (no worker/role tokens),
// and the todo has no top-level lane field. The current eligibility logic
// bypasses role gating when no role tokens are found, so this shape MUST
// be claimable today. If a future change reintroduces a role gate that
// also blocks empty-role todos (or tightens protected-surface detection
// to read description bodies), this test fails and surfaces the regression.

describe("PinballWake autonomous Runner — orchestrator-lane claim regression", () => {
  const e9e308cdShape = {
    id: "e9e308cd-7711-4f30-8ebd-d5402fefd205",
    title:
      "Orchestrator continuity wiring: plug missing source-kinds into Orchestrator + add per-channel visibility toggles",
    status: "open",
    priority: "urgent",
    assigned_to_agent_id: null,
    actionability_reason: "unassigned_open",
    scope_pack: {
      todo_id: "e9e308cd-7711-4f30-8ebd-d5402fefd205",
      lane: "orchestrator",
      owner_hint: "live_builder_or_orchestrator_seat",
      status: "ready_for_focused_pr",
      build_goal:
        "Plug missing Orchestrator source-kind ingestion gaps and add per-channel visibility toggles.",
      owned_surfaces: [
        "Orchestrator pointer-index hooks for missing source kinds",
        "source_kind normalization",
      ],
      smallest_safe_step:
        "Find the existing Orchestrator continuity hook pattern used by conversation_turn.",
      constraints: [
        "Pointer-only design: do not copy raw Boardroom, todo, comment, signal, session, or library rows into Orchestrator.",
      ],
      acceptance: [
        "At least one previously missing source kind is indexed into Orchestrator as a pointer event.",
      ],
      verification: ["Run focused Orchestrator/channel tests touched by the PR."],
      non_overlap: ["No Passport rename work."],
    },
  };

  it("evaluateBoardroomTodoAutoClaimEligibility returns ok for e9e308cd shape", () => {
    const eligibility = evaluateBoardroomTodoAutoClaimEligibility(e9e308cdShape);
    assert.equal(
      eligibility.ok,
      true,
      `expected eligibility.ok=true, got ${JSON.stringify(eligibility)}`,
    );
    assert.equal(eligibility.reason, "boardroom_todo_claim_eligible");
  });

  it("inspectAutonomousRunnerJobSafety returns ok for the constructed job", () => {
    // createCodingRoomJobFromBoardroomTodo deliberately does NOT include the
    // todo.description body in chip/context/files, so the auth/secrets/session
    // keywords that appear in the description ("No secrets, auth, billing,
    // DNS, migrations of source tables.") do not leak into the safety search.
    const job = createCodingRoomJobFromBoardroomTodo(e9e308cdShape);
    const safety = inspectAutonomousRunnerJobSafety(job);
    assert.equal(
      safety.ok,
      true,
      `expected safety.ok=true, got ${JSON.stringify(safety)}`,
    );
    assert.equal(safety.reason, "safe_for_autonomous_runner");
  });
});
