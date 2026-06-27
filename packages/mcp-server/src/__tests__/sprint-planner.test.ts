import { describe, it, expect } from "vitest";
import { SprintPlanner } from "../sprint-planner.js";

describe("SprintPlanner", () => {
  it("manages backlog", () => {
    const planner = new SprintPlanner();
    planner.addToBacklog({ id: "s1", title: "Login", points: 3, status: "backlog", priority: 1 });
    planner.addToBacklog({ id: "s2", title: "Signup", points: 5, status: "backlog", priority: 2 });
    expect(planner.backlogSize()).toBe(2);
    expect(planner.backlogPoints()).toBe(8);
  });

  it("creates sprints and adds stories", () => {
    const planner = new SprintPlanner();
    planner.addToBacklog({ id: "s1", title: "Login", points: 3, status: "backlog", priority: 1 });
    planner.createSprint("sp1", "Sprint 1", 0, 14, 10);
    expect(planner.addToSprint("sp1", "s1")).toBe(true);
    expect(planner.backlogSize()).toBe(0);
  });

  it("respects velocity limit", () => {
    const planner = new SprintPlanner();
    planner.addToBacklog({ id: "s1", title: "Big", points: 8, status: "backlog", priority: 1 });
    planner.addToBacklog({ id: "s2", title: "Also Big", points: 5, status: "backlog", priority: 2 });
    planner.createSprint("sp1", "Sprint 1", 0, 14, 10);
    planner.addToSprint("sp1", "s1");
    expect(planner.addToSprint("sp1", "s2")).toBe(false);
  });

  it("tracks sprint progress", () => {
    const planner = new SprintPlanner();
    planner.addToBacklog({ id: "s1", title: "A", points: 5, status: "backlog", priority: 1 });
    planner.addToBacklog({ id: "s2", title: "B", points: 5, status: "backlog", priority: 2 });
    planner.createSprint("sp1", "Sprint 1", 0, 14, 20);
    planner.addToSprint("sp1", "s1");
    planner.addToSprint("sp1", "s2");
    planner.updateStoryStatus("sp1", "s1", "done");
    expect(planner.sprintProgress("sp1")).toBeCloseTo(0.5);
  });

  it("calculates remaining capacity", () => {
    const planner = new SprintPlanner();
    planner.addToBacklog({ id: "s1", title: "A", points: 3, status: "backlog", priority: 1 });
    planner.createSprint("sp1", "Sprint 1", 0, 14, 10);
    planner.addToSprint("sp1", "s1");
    expect(planner.remainingCapacity("sp1")).toBe(7);
  });

  it("calculates sprint velocity (completed points)", () => {
    const planner = new SprintPlanner();
    planner.addToBacklog({ id: "s1", title: "A", points: 5, status: "backlog", priority: 1 });
    planner.createSprint("sp1", "Sprint 1", 0, 14, 10);
    planner.addToSprint("sp1", "s1");
    planner.updateStoryStatus("sp1", "s1", "done");
    expect(planner.sprintVelocity("sp1")).toBe(5);
  });

  it("calculates average velocity", () => {
    const planner = new SprintPlanner();
    planner.addToBacklog({ id: "s1", title: "A", points: 8, status: "backlog", priority: 1 });
    planner.addToBacklog({ id: "s2", title: "B", points: 4, status: "backlog", priority: 2 });
    planner.createSprint("sp1", "Sprint 1", 0, 14, 20);
    planner.createSprint("sp2", "Sprint 2", 14, 28, 20);
    planner.addToSprint("sp1", "s1");
    planner.addToSprint("sp2", "s2");
    planner.updateStoryStatus("sp1", "s1", "done");
    planner.updateStoryStatus("sp2", "s2", "done");
    expect(planner.averageVelocity()).toBe(6);
  });

  it("estimates sprints to complete backlog", () => {
    const planner = new SprintPlanner();
    planner.addToBacklog({ id: "s1", title: "A", points: 5, status: "backlog", priority: 1 });
    planner.addToBacklog({ id: "done1", title: "Done", points: 10, status: "backlog", priority: 2 });
    planner.createSprint("sp1", "Sprint 1", 0, 14, 20);
    planner.addToSprint("sp1", "done1");
    planner.updateStoryStatus("sp1", "done1", "done");
    expect(planner.sprintsToComplete()).toBe(1);
  });

  it("generates burndown data", () => {
    const planner = new SprintPlanner();
    planner.addToBacklog({ id: "s1", title: "A", points: 5, status: "backlog", priority: 1 });
    planner.addToBacklog({ id: "s2", title: "B", points: 3, status: "backlog", priority: 2 });
    planner.createSprint("sp1", "Sprint 1", 0, 14, 20);
    planner.addToSprint("sp1", "s1");
    planner.addToSprint("sp1", "s2");
    planner.updateStoryStatus("sp1", "s1", "done");
    const bd = planner.burndown("sp1");
    expect(bd.length).toBe(1);
    expect(bd[0].remaining).toBe(3);
  });
});
