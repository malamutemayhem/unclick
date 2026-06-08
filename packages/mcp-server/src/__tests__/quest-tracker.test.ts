import { describe, it, expect } from "vitest";
import { QuestTracker } from "../quest-tracker.js";
import type { Quest } from "../quest-tracker.js";

function makeQuest(id: string, prereqs?: string[]): Quest {
  return {
    id,
    title: `Quest ${id}`,
    description: `Do quest ${id}`,
    status: "inactive",
    objectives: [
      { id: "obj1", description: "Collect 3 items", target: 3, current: 0 },
    ],
    prerequisites: prereqs,
    rewards: { gold: 100 },
  };
}

describe("QuestTracker", () => {
  it("adds and retrieves quests", () => {
    const tracker = new QuestTracker();
    tracker.addQuest(makeQuest("q1"));
    expect(tracker.getQuest("q1")).toBeDefined();
    expect(tracker.getQuest("q1")!.status).toBe("inactive");
  });

  it("activates quests", () => {
    const tracker = new QuestTracker();
    tracker.addQuest(makeQuest("q1"));
    expect(tracker.activate("q1")).toBe(true);
    expect(tracker.getQuest("q1")!.status).toBe("active");
  });

  it("prevents double activation", () => {
    const tracker = new QuestTracker();
    tracker.addQuest(makeQuest("q1"));
    tracker.activate("q1");
    expect(tracker.activate("q1")).toBe(false);
  });

  it("enforces prerequisites", () => {
    const tracker = new QuestTracker();
    tracker.addQuest(makeQuest("q1"));
    tracker.addQuest(makeQuest("q2", ["q1"]));
    expect(tracker.activate("q2")).toBe(false);
  });

  it("updates objectives", () => {
    const tracker = new QuestTracker();
    tracker.addQuest(makeQuest("q1"));
    tracker.activate("q1");
    tracker.updateObjective("q1", "obj1", 2);
    expect(tracker.getQuest("q1")!.objectives[0].current).toBe(2);
  });

  it("completes quest when all objectives met", () => {
    const tracker = new QuestTracker();
    tracker.addQuest(makeQuest("q1"));
    tracker.activate("q1");
    tracker.updateObjective("q1", "obj1", 3);
    expect(tracker.isComplete("q1")).toBe(true);
  });

  it("fails quests", () => {
    const tracker = new QuestTracker();
    tracker.addQuest(makeQuest("q1"));
    tracker.activate("q1");
    tracker.fail("q1");
    expect(tracker.getQuest("q1")!.status).toBe("failed");
  });

  it("filters by status", () => {
    const tracker = new QuestTracker();
    tracker.addQuest(makeQuest("q1"));
    tracker.addQuest(makeQuest("q2"));
    tracker.activate("q1");
    expect(tracker.getByStatus("active")).toHaveLength(1);
    expect(tracker.getByStatus("inactive")).toHaveLength(1);
  });

  it("tracks objective progress", () => {
    const tracker = new QuestTracker();
    tracker.addQuest(makeQuest("q1"));
    tracker.activate("q1");
    tracker.updateObjective("q1", "obj1", 1);
    expect(tracker.objectiveProgress("q1")).toBeCloseTo(1 / 3);
  });

  it("resets quest", () => {
    const tracker = new QuestTracker();
    tracker.addQuest(makeQuest("q1"));
    tracker.activate("q1");
    tracker.updateObjective("q1", "obj1", 2);
    tracker.reset("q1");
    expect(tracker.getQuest("q1")!.status).toBe("inactive");
    expect(tracker.getQuest("q1")!.objectives[0].current).toBe(0);
  });
});
