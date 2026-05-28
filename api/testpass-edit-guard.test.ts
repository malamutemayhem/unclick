import { describe, expect, it } from "vitest";

import {
  buildTestPassFailToPassOverrideSignal,
  isTestPassFailToPassOverride,
} from "./lib/testpass-edit-guard";

describe("TestPass edit override guard", () => {
  it("detects only fail to pass verdict overrides", () => {
    expect(isTestPassFailToPassOverride("fail", "check")).toBe(true);
    expect(isTestPassFailToPassOverride("FAIL", "check")).toBe(true);
    expect(isTestPassFailToPassOverride("fail", "other")).toBe(false);
    expect(isTestPassFailToPassOverride("check", "check")).toBe(false);
    expect(isTestPassFailToPassOverride(null, "check")).toBe(false);
  });

  it("builds an action_needed signal with the required justification", () => {
    const signal = buildTestPassFailToPassOverrideSignal({
      apiKeyHash: "hash-1",
      actorUserId: "user-1",
      runId: "run-1",
      item: {
        id: "item-1",
        run_id: "run-1",
        check_id: "TP-001",
        title: "Proof must be real",
        verdict: "fail",
      },
      notes: "Human reviewed the fresh proof",
    });

    expect(signal).toMatchObject({
      api_key_hash: "hash-1",
      tool: "testpass",
      action: "fail_to_pass_override",
      severity: "action_needed",
      deep_link: "/admin/testpass/runs/run-1",
      payload: {
        source: "testpass_edit_item",
        anomaly: true,
        auto_merge_gate: "hold",
        run_id: "run-1",
        item_id: "item-1",
        check_id: "TP-001",
        previous_verdict: "fail",
        new_verdict: "check",
        actor_user_id: "user-1",
        notes: "Human reviewed the fresh proof",
      },
    });
  });
});
