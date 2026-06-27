import { describe, it, expect } from "vitest";
import { TaskGraph } from "../task-graph.js";

describe("TaskGraph", () => {
  it("adds and retrieves tasks", () => {
    const g = new TaskGraph();
    g.addTask("a");
    expect(g.getTask("a")).toBeDefined();
    expect(g.getTask("a")!.status).toBe("pending");
  });

  it("topological sort with no deps", () => {
    const g = new TaskGraph();
    g.addTask("a");
    g.addTask("b");
    const order = g.topologicalSort();
    expect(order).not.toBeNull();
    expect(order!.length).toBe(2);
  });

  it("topological sort respects deps", () => {
    const g = new TaskGraph();
    g.addTask("build", ["compile"]);
    g.addTask("compile");
    const order = g.topologicalSort()!;
    expect(order.indexOf("compile")).toBeLessThan(order.indexOf("build"));
  });

  it("detects cycles", () => {
    const g = new TaskGraph();
    g.addTask("a", ["b"]);
    g.addTask("b", ["a"]);
    expect(g.hasCycle()).toBe(true);
  });

  it("finds ready tasks", () => {
    const g = new TaskGraph();
    g.addTask("a");
    g.addTask("b", ["a"]);
    expect(g.ready()).toEqual(["a"]);
  });

  it("runs and completes tasks", () => {
    const g = new TaskGraph();
    g.addTask("a");
    g.addTask("b", ["a"]);
    expect(g.run("a")).toBe(true);
    expect(g.complete("a")).toBe(true);
    expect(g.ready()).toEqual(["b"]);
  });

  it("prevents running task with incomplete deps", () => {
    const g = new TaskGraph();
    g.addTask("a");
    g.addTask("b", ["a"]);
    expect(g.run("b")).toBe(false);
  });

  it("fails task and skips dependents", () => {
    const g = new TaskGraph();
    g.addTask("a");
    g.addTask("b", ["a"]);
    g.addTask("c", ["b"]);
    g.run("a");
    g.fail("a");
    expect(g.getTask("a")!.status).toBe("failed");
    expect(g.getTask("b")!.status).toBe("skipped");
    expect(g.getTask("c")!.status).toBe("skipped");
  });

  it("computes critical path", () => {
    const g = new TaskGraph();
    g.addTask("a", [], 3);
    g.addTask("b", ["a"], 2);
    g.addTask("c", [], 1);
    const path = g.criticalPath();
    expect(path).toContain("a");
    expect(path).toContain("b");
  });

  it("computes parallel schedule", () => {
    const g = new TaskGraph();
    g.addTask("a");
    g.addTask("b");
    g.addTask("c", ["a", "b"]);
    const waves = g.parallelSchedule();
    expect(waves.length).toBe(2);
    expect(waves[0]).toEqual(["a", "b"]);
    expect(waves[1]).toEqual(["c"]);
  });

  it("calculates total cost", () => {
    const g = new TaskGraph();
    g.addTask("a", [], 5);
    g.addTask("b", [], 3);
    expect(g.totalCost()).toBe(8);
  });

  it("finds dependents", () => {
    const g = new TaskGraph();
    g.addTask("a");
    g.addTask("b", ["a"]);
    g.addTask("c", ["a"]);
    expect(g.dependents("a")).toEqual(["b", "c"]);
  });

  it("computes transitive dependencies", () => {
    const g = new TaskGraph();
    g.addTask("a");
    g.addTask("b", ["a"]);
    g.addTask("c", ["b"]);
    const deps = g.transitiveDeps("c");
    expect(deps.has("a")).toBe(true);
    expect(deps.has("b")).toBe(true);
  });

  it("resets all tasks", () => {
    const g = new TaskGraph();
    g.addTask("a");
    g.run("a");
    g.complete("a");
    g.reset();
    expect(g.getTask("a")!.status).toBe("pending");
  });

  it("counts tasks", () => {
    const g = new TaskGraph();
    g.addTask("a");
    g.addTask("b");
    g.addTask("c");
    expect(g.taskCount()).toBe(3);
  });
});
