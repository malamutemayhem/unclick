import { describe, it, expect } from "vitest";
import {
  jobToRunTrace,
  deriveDisposition,
  type LiveAdapterInput,
  type BoardroomJob,
  type BoardroomComment,
} from "./live-adapter.js";
import { scoreLiveJobs } from "./live-score.js";
import { scoreTrace, type XPassReceiptSlice } from "../score-trace.js";

const NOW = Date.parse("2026-06-01T00:00:00.000Z");

const freshPass: XPassReceiptSlice = {
  kind: "xpass_receipt_v1",
  verdict: "pass",
  provenance: { head_sha: "head-1" },
  staleness: { stale_checks: [], unscoped_checks: [], target_sha: "head-1" },
};

function input(job: Partial<BoardroomJob>, extra: Partial<LiveAdapterInput> = {}): LiveAdapterInput {
  return {
    job: { id: "job-1", status: "in_progress", ...job },
    nowMs: NOW,
    ...extra,
  };
}

describe("deriveDisposition", () => {
  it("done -> closed", () => {
    expect(deriveDisposition(input({ status: "done" }))).toBe("closed");
  });

  it("dropped -> abandoned", () => {
    expect(deriveDisposition(input({ status: "dropped" }))).toBe("abandoned");
  });

  it("reopened flag wins over status", () => {
    expect(deriveDisposition(input({ status: "done", reopened: true }))).toBe("reopened");
  });

  it("owned job with expired lease -> stale", () => {
    const exp = new Date(NOW - 60_000).toISOString();
    expect(
      deriveDisposition(input({ assigned_to_agent_id: "a1", lease_expires_at: exp })),
    ).toBe("stale");
  });

  it("owned job idle beyond staleAfter -> stale", () => {
    const last = new Date(NOW - 48 * 60 * 60 * 1000).toISOString();
    expect(
      deriveDisposition(input({ assigned_to_agent_id: "a1", last_real_action_at: last })),
    ).toBe("stale");
  });

  it("owned job with recent action -> open", () => {
    const last = new Date(NOW - 60_000).toISOString();
    expect(
      deriveDisposition(input({ assigned_to_agent_id: "a1", last_real_action_at: last })),
    ).toBe("open");
  });

  it("unowned open job -> open (not stale)", () => {
    expect(deriveDisposition(input({ status: "open" }))).toBe("open");
  });
});

describe("jobToRunTrace", () => {
  it("maps a healthy closed job with an independent verifier to a verified completion", () => {
    const comments: BoardroomComment[] = [
      { author_agent_id: "reviewer", text: "PASS", is_pass_proof: true },
    ];
    const trace = jobToRunTrace(
      input(
        { status: "done", created_by_agent_id: "builder", assigned_to_agent_id: "builder" },
        { comments, xpassReceipt: freshPass, currentHeadSha: "head-1", completionCode: "allowed" },
      ),
    );
    expect(trace.disposition).toBe("closed");
    expect(trace.verifierAgentId).toBe("reviewer");
    expect(scoreTrace(trace).outcome).toBe("verified_completion");
  });

  it("does not count the closer's own comment as an independent verifier", () => {
    const comments: BoardroomComment[] = [
      { author_agent_id: "builder", text: "PASS", is_pass_proof: true },
    ];
    const trace = jobToRunTrace(
      input(
        { status: "done", created_by_agent_id: "builder", assigned_to_agent_id: "builder" },
        { comments, xpassReceipt: freshPass, currentHeadSha: "head-1", completionCode: "allowed" },
      ),
    );
    expect(trace.verifierAgentId).toBeNull();
    expect(scoreTrace(trace).outcome).toBe("false_green");
  });

  it("propagates rolled_back and user_corrected hard negatives", () => {
    const trace = jobToRunTrace(
      input({ status: "done", rolled_back: true }, { xpassReceipt: freshPass, currentHeadSha: "head-1" }),
    );
    expect(trace.rolledBack).toBe(true);
    expect(scoreTrace(trace).outcome).toBe("false_green");
  });
});

describe("scoreLiveJobs", () => {
  it("rolls a batch of real jobs into the truth-rate dashboard and lists action items", () => {
    const report = scoreLiveJobs([
      // verified
      input(
        { id: "ok", status: "done", created_by_agent_id: "b", assigned_to_agent_id: "b" },
        {
          comments: [{ author_agent_id: "rev", is_pass_proof: true }],
          xpassReceipt: freshPass,
          currentHeadSha: "head-1",
          completionCode: "allowed",
        },
      ),
      // false-green: no receipt
      input({ id: "fake", status: "done", assigned_to_agent_id: "b" }, { currentHeadSha: "head-1" }),
      // stale owner
      input({
        id: "stuck",
        status: "in_progress",
        assigned_to_agent_id: "b",
        lease_expires_at: new Date(NOW - 1000).toISOString(),
      }),
    ]);

    expect(report.summary.total).toBe(3);
    expect(report.summary.verified).toBe(1);
    expect(report.summary.falseGreen).toBe(1);
    expect(report.summary.stale).toBe(1);
    expect(report.falseGreenJobIds).toEqual(["fake"]);
    expect(report.staleJobIds).toEqual(["stuck"]);
    // truthRate = 1 / (1 + 1) = 0.5
    expect(report.summary.truthRate).toBeCloseTo(0.5, 5);
  });
});
