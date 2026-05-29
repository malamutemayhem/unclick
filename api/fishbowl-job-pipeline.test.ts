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
      proof_state: "close_eligible",
      effective_status: "done",
      release_blocked: false,
      release_block_reason: null,
    });
  });

  it("labels completed jobs without receipts as missing proof", () => {
    expect(
      inferFishbowlJobPipeline({
        title: "Completed without linked proof",
        status: "done",
      }),
    ).toMatchObject({
      pipeline_stage_count: 1,
      pipeline_progress: 10,
      pipeline_source: "proof: missing",
      pipeline_evidence: [],
      proof_state: "missing",
      proof_state_reason: "Completed job needs observable proof.",
      effective_status: "needs_proof",
      release_blocked: true,
      release_block_reason: "Completed job needs observable proof.",
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
      proof_state: "stale",
      proof_state_reason: "The latest receipt is stale or reset.",
      effective_status: "open",
      release_blocked: false,
      release_block_reason: null,
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
      proof_state: "missing",
      proof_state_reason: "Proof is recorded as missing.",
      effective_status: "needs_proof",
      release_blocked: true,
      release_block_reason: "Proof is recorded as missing.",
    });
  });

  it("lets same-comment missing live proof override green CI progress", () => {
    expect(
      inferFishbowlJobPipeline(
        {
          title: "FidelityCopy: deterministic non-AI copy engine for FidelityPass",
          status: "in_progress",
        },
        [
          {
            text: "PR #997 FidelityCopy owner-lift completed: merged at 94c3b93 and main CI passed.",
            created_at: "2026-05-22T06:43:59Z",
          },
          {
            text: "CI update for draft PR #1005: GitHub checks are green. No DONE move; FidelityCopy still needs @unclick/mcp-server publish/tool-discovery/live receipt proof.",
            created_at: "2026-05-22T07:43:38Z",
          },
        ],
      ),
    ).toEqual({
      pipeline_stage_count: 1,
      pipeline_progress: 10,
      pipeline_source: "proof: missing",
      pipeline_evidence: ["proof_missing"],
      proof_state: "missing",
      proof_state_reason: "Proof is recorded as missing.",
      effective_status: "in_progress",
      release_blocked: false,
      release_block_reason: null,
    });
  });

  it("lets newer proof move a reopened job forward again", () => {
    expect(
      inferFishbowlJobPipeline(
        {
          title: "REOPENED: Memory Library v1 live taxonomy snapshot writer and storage proof",
          status: "open",
        },
        [
          {
            text: "Old receipt: PR #699 merged into main. Tests passed.",
            created_at: "2026-05-17T08:00:00Z",
          },
          {
            text: "BLOCKER: proof reset, live page still shows no snapshots.",
            created_at: "2026-05-17T09:00:00Z",
          },
          {
            text: "PASS: fresh proof recorded. PR #914 checks green, tests passed, reviewer pass.",
            created_at: "2026-05-17T10:00:00Z",
          },
        ],
      ),
    ).toMatchObject({
      pipeline_stage_count: 4,
      pipeline_progress: 85,
      pipeline_source: "receipt: review",
      pipeline_evidence: ["build", "proof", "review"],
      proof_state: "live",
      effective_status: "open",
      release_blocked: false,
      release_block_reason: null,
    });
  });

  it("surfaces missing UI proof as a structured proof state", () => {
    expect(
      inferFishbowlJobPipeline(
        {
          title: "Memory Recall Check proof",
          status: "done",
        },
        ["PR #999 checks green.", "BLOCKER: missing authenticated screenshot proof for /admin/memory?tab=recall-check."],
      ),
    ).toMatchObject({
      pipeline_stage_count: 1,
      pipeline_progress: 10,
      pipeline_source: "proof: missing",
      pipeline_evidence: ["proof_missing"],
      proof_state: "missing_ui_proof",
      proof_state_reason: "UI or browser proof is still missing.",
    });
  });

  it("resets UI proof warnings when proof is still missing after a green PR", () => {
    expect(
      inferFishbowlJobPipeline(
        {
          title: "Proof Ledger v2",
          status: "done",
        },
        [
          "PR #1003 checks green.",
          "BLOCKER: authenticated /admin/jobs browser screenshot proof is still missing.",
        ],
      ),
    ).toEqual({
      pipeline_stage_count: 1,
      pipeline_progress: 10,
      pipeline_source: "proof: missing",
      pipeline_evidence: ["proof_missing"],
      proof_state: "missing_ui_proof",
      proof_state_reason: "UI or browser proof is still missing.",
      effective_status: "needs_proof",
      release_blocked: true,
      release_block_reason: "UI or browser proof is still missing.",
    });
  });

  it("does not let a raw done chip advance the rail after proof is reset", () => {
    expect(
      inferFishbowlJobPipeline(
        {
          title: "CopyRoom exact-copy engine",
          status: "done",
        },
        [
          "Old receipt: PR #997 merged into main. Tests passed.",
          "BLOCKER: proof reset after npm publish failed.",
        ],
      ),
    ).toMatchObject({
      pipeline_stage_count: 1,
      pipeline_progress: 10,
      pipeline_source: "reopened: proof reset",
      pipeline_evidence: ["reopened", "proof_missing"],
      proof_state: "stale",
      effective_status: "needs_proof",
      release_blocked: true,
    });
  });

  it("keeps a blocker warning newer than old ship receipts", () => {
    expect(
      inferFishbowlJobPipeline(
        {
          title: "Proof Ledger v2",
          status: "done",
        },
        ["Old receipt: PR #700 merged into main. Tests passed.", "BLOCKER: proof ledger hold, do not lift without real proof."],
      ),
    ).toMatchObject({
      pipeline_stage_count: 5,
      pipeline_progress: 100,
      pipeline_source: "receipt: ship",
      pipeline_evidence: ["build", "proof", "ship"],
      proof_state: "blocked",
      proof_state_reason: "A blocker or hold is recorded after the latest proof.",
    });
  });

  it("labels parked jobs without treating them as done", () => {
    expect(
      inferFishbowlJobPipeline(
        {
          title: "StepBack cleanup",
          status: "open",
        },
        ["PARKED: missing ScopePack before any build work."],
      ),
    ).toMatchObject({
      pipeline_stage_count: 1,
      pipeline_progress: 10,
      pipeline_source: "status: open",
      pipeline_evidence: [],
      proof_state: "parked",
      proof_state_reason: "The job is parked or waiting for scope.",
    });
  });
});
