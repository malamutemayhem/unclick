import { describe, expect, it } from "vitest";
import {
  analyzePasteIntake,
  buildControlTowerClaimReceipt,
  claimControlTowerLane,
  createControlTowerPlan,
  shouldTriggerControlTower,
  type ControlTowerJobBoardItem,
} from "./controltower";

describe("controltower planner", () => {
  it("triggers for big coordinated jobs but not tiny one-step asks", () => {
    expect(
      shouldTriggerControlTower(
        "Finish the entire UnClick homepage to 100%, run UIPass, UXPass, TestPass, Crews, and dogtest it.",
      ).triggered,
    ).toBe(true);

    expect(shouldTriggerControlTower("Rename this button label.").triggered).toBe(false);
  });

  it("turns noisy pasted context into a deduped and redacted intake packet", () => {
    const intake = analyzePasteIntake([
      [
        "Decision: ControlTower uses Boardroom Jobs as source of truth.",
        "Decision: ControlTower uses Boardroom Jobs as source of truth.",
        "Please build the worker lane copy box.",
        "BLOCKER: missing screenshot proof",
        "api_key: sk-thisShouldNotSurvive123456789",
        "PR #1304 has proof",
      ].join("\n"),
    ]);

    expect(intake.rawItems).toBe(6);
    expect(intake.duplicatesIgnored).toBe(1);
    expect(intake.redactedItems).toBe(1);
    expect(intake.decisions[0]).toContain("source of truth");
    expect(intake.tasks[0]).toContain("worker lane");
    expect(intake.blockers[0]).toContain("missing screenshot proof");
    expect(intake.proofRefs.some((line) => line.includes("PR #1304"))).toBe(true);
    expect(intake.usefulLines).not.toContain("api_key: sk-thisShouldNotSurvive123456789");
    expect(intake.usefulLines).toContain("[redacted secret-like text]");
  });

  it("builds a Master Copy Box with Boardroom source truth and Worker X of Y instructions", () => {
    const plan = createControlTowerPlan({
      prompt: "Big job: improve the whole UnClick site and run XPass proof.",
      pastes: ["Need a ScopePack. Need UI proof."],
      now: "2026-06-07T10:00:00.000Z",
    });

    expect(plan.triggered).toBe(true);
    expect(plan.sourceOfTruth).toBe("Boardroom Jobs + Boardroom + latest ScopePack");
    expect(plan.workerCounts.totalLanes).toBe(7);
    expect(plan.masterCopyBox).toContain("CONTROL TOWER JOB");
    expect(plan.masterCopyBox).toContain("I am Worker X of Y");
    expect(plan.masterCopyBox).toContain("Boardroom Jobs");
    expect(plan.resumeHint).toContain("without the copy box");
  });

  it("uses existing Boardroom jobs as lanes before default fallback lanes", () => {
    const jobs: ControlTowerJobBoardItem[] = [
      {
        id: "job-urgent",
        title: "Fix stale UXPass lane",
        status: "open",
        priority: "urgent",
        updatedAt: "2026-06-07T09:00:00.000Z",
      },
      {
        id: "job-normal",
        title: "Tidy docs",
        status: "open",
        priority: "normal",
        updatedAt: "2026-06-07T09:00:00.000Z",
      },
    ];

    const plan = createControlTowerPlan({
      prompt: "ControlTower: continue the big XPass coordination job.",
      jobBoardItems: jobs,
      now: "2026-06-07T10:00:00.000Z",
    });

    expect(plan.lanes[1]).toMatchObject({
      title: "Fix stale UXPass lane",
      source: "job_board",
      sourceJobId: "job-urgent",
    });
  });

  it("claims an open lane with simple worker wording", () => {
    const plan = createControlTowerPlan({
      prompt: "ControlTower: build the whole XPass worker flow.",
      now: "2026-06-07T10:00:00.000Z",
    });

    const claim = claimControlTowerLane(plan);

    expect(claim.claimType).toBe("lane");
    expect(claim.message).toContain("I am Worker 1 of 7");
    expect(claim.message).toContain("report proof back to Boardroom Jobs");
  });

  it("builds a durable Boardroom claim receipt for the next worker lane", () => {
    const plan = createControlTowerPlan({
      prompt: "ControlTower: finish the XPass homepage proof job.",
      jobBoardItems: [
        {
          id: "job-homepage-proof",
          title: "Fix homepage proof",
          status: "open",
          priority: "urgent",
          updatedAt: "2026-06-07T09:00:00.000Z",
        },
      ],
      now: "2026-06-07T10:00:00.000Z",
    });

    const claim = claimControlTowerLane(plan);
    const receipt = buildControlTowerClaimReceipt(plan, claim, {
      workerId: "admin-seat",
      now: "2026-06-07T10:01:00.000Z",
    });

    expect(receipt).toMatchObject({
      kind: "controltower_lane_claim_v1",
      laneTitle: "Fix homepage proof",
      workerId: "admin-seat",
      workerNumber: 1,
      workerTotal: 7,
      sourceJobId: "job-homepage-proof",
      resumeSafe: true,
    });
    expect(receipt.text).toContain("CONTROLTOWER_LANE_CLAIM v1");
    expect(receipt.text).toContain("Boardroom job: job-homepage-proof");
    expect(receipt.text).toContain("Worker: admin-seat as Worker 1 of 7");
    expect(receipt.text).toContain("work only this lane");
  });

  it("builds a helper receipt instead of starting random work when lanes are full", () => {
    const plan = createControlTowerPlan({
      prompt: "ControlTower: finish the entire site.",
      jobBoardItems: [
        {
          id: "job-a",
          title: "A",
          status: "in_progress",
          assignedTo: "worker-a",
          priority: "urgent",
          updatedAt: "2026-06-07T09:30:00.000Z",
        },
        {
          id: "job-b",
          title: "B",
          status: "in_progress",
          assignedTo: "worker-b",
          priority: "high",
          updatedAt: "2026-06-07T09:30:00.000Z",
        },
      ],
      maxActiveWorkers: 2,
      now: "2026-06-07T10:00:00.000Z",
    });

    const claim = claimControlTowerLane(plan);
    const receipt = buildControlTowerClaimReceipt(plan, claim, { workerId: "overflow-seat" });

    expect(receipt.claimType).toBe("helper");
    expect(receipt.sourceJobId).toBeNull();
    expect(receipt.resumeSafe).toBe(true);
    expect(receipt.text).toContain("Boardroom job: none yet");
    expect(receipt.text).toContain("do not start random extra work");
  });

  it("lets a worker take over a stale lane", () => {
    const plan = createControlTowerPlan({
      prompt: "ControlTower: continue the big XPass coordination job.",
      jobBoardItems: [
        {
          id: "stale-job",
          title: "Finish missing UI proof",
          status: "in_progress",
          assignedTo: "old-worker",
          priority: "urgent",
          updatedAt: "2026-06-06T20:00:00.000Z",
        },
      ],
      now: "2026-06-07T10:00:00.000Z",
    });

    const claim = claimControlTowerLane(plan, { now: "2026-06-07T10:00:00.000Z" });

    expect(plan.lanes.some((lane) => lane.status === "stale")).toBe(true);
    expect(claim.claimType).toBe("stale_takeover");
    expect(claim.message).toContain("stale");
  });

  it("turns overflow chats into helpers when active slots are full", () => {
    const plan = createControlTowerPlan({
      prompt: "ControlTower: finish the entire site.",
      jobBoardItems: [
        {
          id: "job-a",
          title: "A",
          status: "in_progress",
          assignedTo: "worker-a",
          priority: "urgent",
          updatedAt: "2026-06-07T09:30:00.000Z",
        },
        {
          id: "job-b",
          title: "B",
          status: "in_progress",
          assignedTo: "worker-b",
          priority: "high",
          updatedAt: "2026-06-07T09:30:00.000Z",
        },
      ],
      maxActiveWorkers: 2,
      now: "2026-06-07T10:00:00.000Z",
    });

    const claim = claimControlTowerLane(plan);

    expect(claim.claimType).toBe("helper");
    expect(claim.message).toContain("active worker slots are full");
    expect(["Scout", "Reviewer", "Proof Checker"]).toContain(claim.helperRole);
  });

  it("marks the intake lane done when there are no useful paste items", () => {
    const plan = createControlTowerPlan({
      prompt: "ControlTower: build the whole XPass worker flow.",
      pastes: [],
      now: "2026-06-07T10:00:00.000Z",
    });

    const intakeLane = plan.lanes.find((l) => l.id === "intake-scopepack");
    expect(intakeLane).toBeDefined();
    expect(intakeLane!.status).toBe("done");
    expect(intakeLane!.source).toBe("default");
  });

  it("marks the intake lane waiting when paste has useful items", () => {
    const plan = createControlTowerPlan({
      prompt: "ControlTower: build the whole XPass worker flow.",
      pastes: ["Decision: use Boardroom Jobs as source of truth."],
      now: "2026-06-07T10:00:00.000Z",
    });

    const intakeLane = plan.lanes.find((l) => l.id === "intake-scopepack");
    expect(intakeLane).toBeDefined();
    expect(intakeLane!.status).toBe("waiting");
    expect(intakeLane!.source).toBe("paste_intake");
  });
});
