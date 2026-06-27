import { describe, it, expect } from "vitest";
import { Quest, QuestJournal } from "../quest-system.js";

describe("Quest", () => {
  const def = {
    id: "q1",
    name: "Gather Herbs",
    description: "Collect 10 herbs",
    objectives: [{ id: "herbs", description: "Collect herbs", target: 10, current: 0 }],
    rewards: [{ type: "gold", amount: 100 }],
  };

  it("starts as available", () => {
    const q = new Quest(def);
    expect(q.status).toBe("available");
  });

  it("activates", () => {
    const q = new Quest(def);
    q.activate();
    expect(q.status).toBe("active");
  });

  it("tracks objective progress", () => {
    const q = new Quest(def);
    q.updateObjective("herbs", 5);
    expect(q.progress()).toBeCloseTo(0.5);
  });

  it("completes when all objectives met", () => {
    const q = new Quest(def);
    q.updateObjective("herbs", 10);
    expect(q.isComplete()).toBe(true);
  });

  it("does not exceed target", () => {
    const q = new Quest(def);
    q.updateObjective("herbs", 20);
    expect(q.objectives[0].current).toBe(10);
  });

  it("can fail", () => {
    const q = new Quest(def);
    q.fail();
    expect(q.status).toBe("failed");
  });

  it("checks expiration", () => {
    const q = new Quest({ ...def, timeLimit: 1000 });
    q.activate(0);
    expect(q.isExpired(500)).toBe(false);
    expect(q.isExpired(1500)).toBe(true);
  });
});

describe("QuestJournal", () => {
  it("adds and counts quests", () => {
    const journal = new QuestJournal();
    journal.add({ id: "q1", name: "Q1", description: "D", objectives: [], rewards: [] });
    expect(journal.questCount()).toBe(1);
  });

  it("activates quests", () => {
    const journal = new QuestJournal();
    journal.add({ id: "q1", name: "Q1", description: "D", objectives: [], rewards: [] });
    expect(journal.activate("q1")).toBe(true);
    expect(journal.activeQuests().length).toBe(1);
  });

  it("respects prerequisites", () => {
    const journal = new QuestJournal();
    journal.add({ id: "q1", name: "Q1", description: "D", objectives: [], rewards: [] });
    journal.add({ id: "q2", name: "Q2", description: "D", objectives: [], rewards: [], prerequisites: ["q1"] });
    expect(journal.activate("q2")).toBe(false);
  });

  it("completes and awards rewards", () => {
    const journal = new QuestJournal();
    journal.add({ id: "q1", name: "Q1", description: "D", objectives: [], rewards: [{ type: "xp", amount: 50 }] });
    journal.activate("q1");
    const rewards = journal.complete("q1");
    expect(rewards).not.toBeNull();
    expect(rewards![0].amount).toBe(50);
  });

  it("tracks completion rate", () => {
    const journal = new QuestJournal();
    journal.add({ id: "q1", name: "Q1", description: "D", objectives: [], rewards: [] });
    journal.add({ id: "q2", name: "Q2", description: "D", objectives: [], rewards: [] });
    journal.activate("q1");
    journal.complete("q1");
    expect(journal.completionRate()).toBeCloseTo(0.5);
  });
});
