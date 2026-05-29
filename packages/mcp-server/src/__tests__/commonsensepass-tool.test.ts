import { describe, expect, it } from "vitest";

import { ADDITIONAL_HANDLERS, ADDITIONAL_TOOLS } from "../tool-wiring.js";
import { commonsensepassCheck, commonsensepassRules, evaluateCommonSensePass } from "../commonsensepass-tool.js";

describe("CommonSensePass MCP exposure", () => {
  it("registers the check and rules tools", () => {
    const names = ADDITIONAL_TOOLS.map((tool) => tool.name);
    expect(names).toContain("commonsensepass_check");
    expect(names).toContain("commonsensepass_rules");
    expect(ADDITIONAL_HANDLERS).toHaveProperty("commonsensepass_check");
    expect(ADDITIONAL_HANDLERS).toHaveProperty("commonsensepass_rules");
  });

  it("blocks heartbeat health when active jobs are zero and backlog exists", async () => {
    const result = await commonsensepassCheck({
      claim_type: "heartbeat_health",
      claim: "UnClick healthy.",
      evidence: {
        active_jobs: 0,
        visible_backlog: 3,
        held_backlog: 1,
      },
    }) as Record<string, unknown>;

    expect(result.verdict).toBe("BLOCKER");
    expect(result.rule_id).toBe("R1_NO_QUIET_IF_BACKLOG");
    expect(result.reason_code).toBe("queue_hydration_failure");
    expect(result.can_propagate_claim).toBe(false);
  });

  it("suppresses duplicate Reviewer or Safety wakes after a current-head PASS", () => {
    const result = evaluateCommonSensePass({
      claim_type: "queuepush_wake",
      claim: "Wake Reviewer for PR #740.",
      evidence: {
        wake_kind: "reviewer",
        current_head_sha: "abc123",
        existing_pass_head_sha: "abc123",
      },
    });

    expect(result.verdict).toBe("SUPPRESS");
    expect(result.should_suppress_action).toBe(true);
    expect(result.reason_code).toBe("duplicate_wake_after_pass");
  });

  it("blocks merge-ready claims without fresh proof", async () => {
    const result = await commonsensepassCheck({
      claim_type: "merge_ready",
      claim: "PR is ready to merge.",
      evidence: {
        current_head_sha: "def456",
        pr_draft: false,
        checks_status: "green",
        reviewer_pass_current: true,
        safety_pass_current: false,
      },
    }) as Record<string, unknown>;

    expect(result.verdict).toBe("BLOCKER");
    expect(result.reason_code).toBe("merge_ready_missing_fresh_proof");
    expect(String(result.summary)).toContain("safety_pass_current_head");
  });

  it("blocks done claims without proof references", async () => {
    const result = await commonsensepassCheck({
      claim_type: "done_claim",
      claim: "The job is done.",
      evidence: {
        todo_status: "done",
      },
    }) as Record<string, unknown>;

    expect(result.verdict).toBe("BLOCKER");
    expect(result.reason_code).toBe("done_without_proof");
  });

  it("returns the verdict-only rule pack for workers", async () => {
    const result = await commonsensepassRules() as Record<string, unknown>;

    expect(result.pass).toBe("CommonSensePass");
    expect(result.authority).toMatchObject({ verdict_only: true });
    expect(JSON.stringify(result)).toContain("R3_NO_NO_WORK_IF_CLAIMABLE");
  });
});
