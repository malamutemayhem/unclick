import { describe, expect, it } from "vitest";
import { inferFishbowlJobPipeline } from "./lib/fishbowl-job-pipeline";

describe("Fishbowl job pipeline inference", () => {
  it("shows done jobs as shipped when no proof warnings exist", () => {
    expect(
      inferFishbowlJobPipeline(
        {
          title: "Memory Library taxonomy snapshots",
          status: "done",
        },
        ["PR #699 merged into main. Tests passed."],
      ),
    ).toMatchObject({
      pipeline_stage_count: 5,
      pipeline_progress: 100,
      pipeline_source: "receipt: ship",
      pipeline_evidence: ["build", "proof", "ship"],
    });
  });

  it("resets stale green stages when a job is reopened for proof", () => {
    expect(
      inferFishbowlJobPipeline(
        {
          title: "REOPENED: Memory Library v1 live taxonomy snapshot writer and storage proof",
          status: "open",
        },
        ["Old receipt: PR #699 merged into main. Tests passed.", "BLOCKER: proof reset, live page still shows no snapshots."],
      ),
    ).toEqual({
      pipeline_stage_count: 1,
      pipeline_progress: 10,
      pipeline_source: "reopened: proof reset",
      pipeline_evidence: ["reopened", "proof_missing"],
    });
  });

  it("does not treat old completed status as healthy when missing proof is recorded", () => {
    expect(
      inferFishbowlJobPipeline(
        {
          title: "Memory Recall Check: Most Accessed Facts dedupe",
          status: "done",
        },
        ["BLOCKER: proof missing, live recall check still repeats static identity facts."],
      ),
    ).toEqual({
      pipeline_stage_count: 1,
      pipeline_progress: 10,
      pipeline_source: "proof: missing",
      pipeline_evidence: ["proof_missing"],
    });
  });
});
