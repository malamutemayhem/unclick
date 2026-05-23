import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildAuthHeaders,
  buildDispatchTerminalRequest,
  parseDispatchCompleteArgs,
  redactHeaders,
  validateDispatchCompleteArgs,
} from "./reliability-dispatch-complete.mjs";

describe("reliability dispatch terminal cleanup", () => {
  it("builds a completed heartbeat request for stale WakePass cleanup", () => {
    const args = parseDispatchCompleteArgs([
      "--dispatch-id",
      "dispatch_d678a93f3052a1ee7c29daf966d90c75",
      "--agent-id",
      "unclick-builder-tether-seat",
      "--state",
      "completed",
      "--api-url",
      "https://unclick.world/api/memory-admin",
    ]);

    assert.equal(validateDispatchCompleteArgs(args), null);
    assert.deepEqual(buildDispatchTerminalRequest(args), {
      url: "https://unclick.world/api/memory-admin?action=reliability_heartbeats&method=publish",
      body: {
        dispatch_id: "dispatch_d678a93f3052a1ee7c29daf966d90c75",
        agent_id: "unclick-builder-tether-seat",
        state: "completed",
        current_task: "dispatch cleanup",
        next_action: "remove stale WakePass blocker",
      },
    });
  });

  it("builds a release request for non-completed terminal states", () => {
    const args = parseDispatchCompleteArgs([
      "--dispatch-id",
      "dispatch_failed_case",
      "--agent-id",
      "unclick-builder-tether-seat",
      "--state",
      "failed",
    ]);

    assert.equal(validateDispatchCompleteArgs(args), null);
    assert.deepEqual(buildDispatchTerminalRequest(args), {
      url: "https://unclick.world/api/memory-admin?action=reliability_dispatches&method=release",
      body: {
        dispatch_id: "dispatch_failed_case",
        agent_id: "unclick-builder-tether-seat",
        status: "failed",
      },
    });
  });

  it("validates required dispatch id and terminal state", () => {
    assert.equal(validateDispatchCompleteArgs(parseDispatchCompleteArgs([])), "dispatch_id required");
    assert.equal(
      validateDispatchCompleteArgs(
        parseDispatchCompleteArgs(["--dispatch-id", "dispatch_1", "--state", "leased"]),
      ),
      "state must be completed, failed, or cancelled",
    );
  });

  it("redacts authorization headers before debug output", () => {
    const headers = buildAuthHeaders("secret-token");
    assert.equal(headers.Authorization, "Bearer secret-token");
    assert.deepEqual(redactHeaders(headers), {
      Authorization: "Bearer [redacted]",
      "Content-Type": "application/json",
    });
  });
});
