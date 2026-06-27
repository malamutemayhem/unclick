import { describe, it, expect } from "vitest";
import { AchievementTracker } from "../achievement.js";

describe("AchievementTracker", () => {
  it("registers achievements", () => {
    const tracker = new AchievementTracker();
    tracker.register({ id: "kills", name: "Slayer", description: "Get kills", points: 10, tiers: [10, 50, 100] });
    expect(tracker.totalCount()).toBe(1);
  });

  it("tracks progress", () => {
    const tracker = new AchievementTracker();
    tracker.register({ id: "kills", name: "Slayer", description: "Get kills", tiers: [10] });
    tracker.increment("kills", 5);
    expect(tracker.getProgress("kills")).toBe(5);
  });

  it("unlocks when threshold met", () => {
    const tracker = new AchievementTracker();
    tracker.register({ id: "kills", name: "Slayer", description: "Get kills", tiers: [5] });
    tracker.increment("kills", 3);
    expect(tracker.isUnlocked("kills")).toBe(false);
    const unlock = tracker.increment("kills", 3);
    expect(unlock).not.toBeNull();
    expect(tracker.isUnlocked("kills")).toBe(true);
  });

  it("supports tiered achievements", () => {
    const tracker = new AchievementTracker();
    tracker.register({ id: "kills", name: "Slayer", description: "", tiers: [10, 50, 100] });
    tracker.increment("kills", 10);
    expect(tracker.getTier("kills")).toBe(1);
    tracker.increment("kills", 40);
    expect(tracker.getTier("kills")).toBe(2);
  });

  it("computes total points", () => {
    const tracker = new AchievementTracker();
    tracker.register({ id: "a", name: "A", description: "", points: 10, tiers: [1] });
    tracker.register({ id: "b", name: "B", description: "", points: 20, tiers: [1] });
    tracker.increment("a", 1);
    expect(tracker.totalPoints()).toBe(10);
  });

  it("computes completion percentage", () => {
    const tracker = new AchievementTracker();
    tracker.register({ id: "a", name: "A", description: "", tiers: [1] });
    tracker.register({ id: "b", name: "B", description: "", tiers: [1] });
    tracker.increment("a", 1);
    expect(tracker.completionPercentage()).toBeCloseTo(50);
  });

  it("filters by category", () => {
    const tracker = new AchievementTracker();
    tracker.register({ id: "a", name: "A", description: "", category: "combat" });
    tracker.register({ id: "b", name: "B", description: "", category: "social" });
    expect(tracker.getByCategory("combat").length).toBe(1);
  });

  it("hides hidden achievements until unlocked", () => {
    const tracker = new AchievementTracker();
    tracker.register({ id: "secret", name: "Secret", description: "", hidden: true, tiers: [1] });
    tracker.register({ id: "visible", name: "Visible", description: "" });
    expect(tracker.getVisible().length).toBe(1);
    tracker.increment("secret", 1);
    expect(tracker.getVisible().length).toBe(2);
  });

  it("resets individual achievements", () => {
    const tracker = new AchievementTracker();
    tracker.register({ id: "a", name: "A", description: "", tiers: [1] });
    tracker.increment("a", 1);
    tracker.reset("a");
    expect(tracker.isUnlocked("a")).toBe(false);
    expect(tracker.getProgress("a")).toBe(0);
  });

  it("resets all achievements", () => {
    const tracker = new AchievementTracker();
    tracker.register({ id: "a", name: "A", description: "", tiers: [1] });
    tracker.register({ id: "b", name: "B", description: "", tiers: [1] });
    tracker.increment("a", 1);
    tracker.increment("b", 1);
    tracker.resetAll();
    expect(tracker.unlockedCount()).toBe(0);
  });

  it("lists locked achievements", () => {
    const tracker = new AchievementTracker();
    tracker.register({ id: "a", name: "A", description: "", tiers: [1] });
    tracker.register({ id: "b", name: "B", description: "", tiers: [1] });
    tracker.increment("a", 1);
    expect(tracker.getLocked().length).toBe(1);
  });
});
