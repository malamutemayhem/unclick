import { describe, it, expect } from "vitest";
import { resolve, canRun } from "../task-resolver.js";

describe("resolve", () => {
  it("resolves simple dependencies", () => {
    const plan = resolve([
      { id: "a", dependencies: [] },
      { id: "b", dependencies: ["a"] },
      { id: "c", dependencies: ["a"] },
      { id: "d", dependencies: ["b", "c"] },
    ]);
    expect(plan.order.indexOf("a")).toBeLessThan(plan.order.indexOf("b"));
    expect(plan.order.indexOf("a")).toBeLessThan(plan.order.indexOf("c"));
    expect(plan.order.indexOf("b")).toBeLessThan(plan.order.indexOf("d"));
  });

  it("groups parallel tasks into phases", () => {
    const plan = resolve([
      { id: "a", dependencies: [] },
      { id: "b", dependencies: [] },
      { id: "c", dependencies: ["a", "b"] },
    ]);
    expect(plan.phases[0]).toContain("a");
    expect(plan.phases[0]).toContain("b");
    expect(plan.phases[1]).toContain("c");
  });

  it("throws on circular dependency", () => {
    expect(() => resolve([
      { id: "a", dependencies: ["b"] },
      { id: "b", dependencies: ["a"] },
    ])).toThrow("Circular");
  });

  it("handles no dependencies", () => {
    const plan = resolve([
      { id: "a", dependencies: [] },
      { id: "b", dependencies: [] },
    ]);
    expect(plan.phases.length).toBe(1);
    expect(plan.order.length).toBe(2);
  });
});

describe("canRun", () => {
  it("returns next runnable tasks", () => {
    const plan = resolve([
      { id: "a", dependencies: [] },
      { id: "b", dependencies: ["a"] },
    ]);
    expect(canRun(plan, new Set())).toEqual(["a"]);
    expect(canRun(plan, new Set(["a"]))).toEqual(["b"]);
    expect(canRun(plan, new Set(["a", "b"]))).toEqual([]);
  });
});
