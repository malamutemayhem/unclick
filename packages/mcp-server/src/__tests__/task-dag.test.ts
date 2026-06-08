import { describe, it, expect } from "vitest";
import { TaskDAG } from "../task-dag.js";

describe("TaskDAG", () => {
  it("runs independent tasks in parallel", async () => {
    const dag = new TaskDAG<string>();
    dag.add("a", () => "A");
    dag.add("b", () => "B");
    const results = await dag.run();
    expect(results.get("a")?.result).toBe("A");
    expect(results.get("b")?.result).toBe("B");
  });

  it("respects dependencies", async () => {
    const order: string[] = [];
    const dag = new TaskDAG<void>();
    dag.add("first", () => { order.push("first"); });
    dag.add("second", () => { order.push("second"); }, ["first"]);
    await dag.run();
    expect(order).toEqual(["first", "second"]);
  });

  it("captures task errors", async () => {
    const dag = new TaskDAG<string>();
    dag.add("fail", () => { throw new Error("boom"); });
    const results = await dag.run();
    expect(results.get("fail")?.error).toBeDefined();
  });

  it("skips tasks when dependency fails", async () => {
    const dag = new TaskDAG<string>();
    dag.add("a", () => { throw new Error("nope"); });
    dag.add("b", () => "B", ["a"]);
    const results = await dag.run();
    expect(results.get("b")?.error).toBeDefined();
  });

  it("detects cycles", async () => {
    const dag = new TaskDAG<void>();
    dag.add("a", () => {}, ["b"]);
    dag.add("b", () => {}, ["a"]);
    await expect(dag.run()).rejects.toThrow("Cycle");
  });

  it("throws on unknown dependency", async () => {
    const dag = new TaskDAG<void>();
    dag.add("a", () => {}, ["missing"]);
    await expect(dag.run()).rejects.toThrow("unknown task");
  });

  it("throws on duplicate task id", () => {
    const dag = new TaskDAG<void>();
    dag.add("a", () => {});
    expect(() => dag.add("a", () => {})).toThrow("already exists");
  });

  it("tracks size", () => {
    const dag = new TaskDAG<void>();
    dag.add("a", () => {});
    dag.add("b", () => {});
    expect(dag.size).toBe(2);
  });
});
