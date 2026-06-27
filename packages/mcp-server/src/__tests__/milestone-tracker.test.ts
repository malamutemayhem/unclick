import { describe, it, expect } from "vitest";
import { MilestoneTracker } from "../milestone-tracker.js";

describe("MilestoneTracker", () => {
  it("adds and counts milestones", () => {
    const tracker = new MilestoneTracker();
    tracker.add({ id: "m1", name: "Alpha", description: "Alpha release", dueDate: 100, dependencies: [] });
    expect(tracker.count()).toBe(1);
  });

  it("starts as pending", () => {
    const tracker = new MilestoneTracker();
    tracker.add({ id: "m1", name: "Alpha", description: "", dueDate: 100, dependencies: [] });
    expect(tracker.get("m1")!.status).toBe("pending");
  });

  it("progresses through statuses", () => {
    const tracker = new MilestoneTracker();
    tracker.add({ id: "m1", name: "Alpha", description: "", dueDate: 100, dependencies: [] });
    tracker.startProgress("m1");
    expect(tracker.get("m1")!.status).toBe("in-progress");
    tracker.complete("m1", 90);
    expect(tracker.get("m1")!.status).toBe("completed");
  });

  it("detects overdue milestones", () => {
    const tracker = new MilestoneTracker();
    tracker.add({ id: "m1", name: "Late", description: "", dueDate: 50, dependencies: [] });
    expect(tracker.checkOverdue(100).length).toBe(1);
  });

  it("finds upcoming milestones", () => {
    const tracker = new MilestoneTracker();
    tracker.add({ id: "m1", name: "Soon", description: "", dueDate: 110, dependencies: [] });
    tracker.add({ id: "m2", name: "Later", description: "", dueDate: 500, dependencies: [] });
    expect(tracker.upcoming(100, 50).length).toBe(1);
  });

  it("calculates completion rate", () => {
    const tracker = new MilestoneTracker();
    tracker.add({ id: "m1", name: "A", description: "", dueDate: 100, dependencies: [] });
    tracker.add({ id: "m2", name: "B", description: "", dueDate: 200, dependencies: [] });
    tracker.complete("m1");
    expect(tracker.completionRate()).toBeCloseTo(0.5);
  });

  it("finds next milestone", () => {
    const tracker = new MilestoneTracker();
    tracker.add({ id: "m1", name: "A", description: "", dueDate: 100, dependencies: [] });
    tracker.add({ id: "m2", name: "B", description: "", dueDate: 200, dependencies: [] });
    const next = tracker.nextMilestone(50);
    expect(next!.id).toBe("m1");
  });

  it("filters by status", () => {
    const tracker = new MilestoneTracker();
    tracker.add({ id: "m1", name: "A", description: "", dueDate: 100, dependencies: [] });
    tracker.add({ id: "m2", name: "B", description: "", dueDate: 200, dependencies: [] });
    tracker.complete("m1");
    expect(tracker.byStatus("completed").length).toBe(1);
    expect(tracker.byStatus("pending").length).toBe(1);
  });

  it("checks dependency completion", () => {
    const tracker = new MilestoneTracker();
    tracker.add({ id: "m1", name: "A", description: "", dueDate: 100, dependencies: [] });
    tracker.add({ id: "m2", name: "B", description: "", dueDate: 200, dependencies: ["m1"] });
    expect(tracker.dependenciesMet("m2")).toBe(false);
    tracker.complete("m1");
    expect(tracker.dependenciesMet("m2")).toBe(true);
  });

  it("returns timeline sorted by due date", () => {
    const tracker = new MilestoneTracker();
    tracker.add({ id: "m2", name: "B", description: "", dueDate: 200, dependencies: [] });
    tracker.add({ id: "m1", name: "A", description: "", dueDate: 100, dependencies: [] });
    const timeline = tracker.timeline();
    expect(timeline[0].id).toBe("m1");
  });

  it("marks milestones as missed", () => {
    const tracker = new MilestoneTracker();
    tracker.add({ id: "m1", name: "A", description: "", dueDate: 100, dependencies: [] });
    tracker.markMissed("m1");
    expect(tracker.get("m1")!.status).toBe("missed");
  });
});
