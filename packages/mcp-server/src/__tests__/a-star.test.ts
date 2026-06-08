import { describe, it, expect } from "vitest";
import { aStar } from "../a-star.js";

describe("a-star", () => {
  it("finds shortest path on a grid", () => {
    const result = aStar({
      start: "0,0",
      goal: "2,2",
      neighbors: (node) => {
        const [x, y] = node.split(",").map(Number);
        return [
          `${x + 1},${y}`,
          `${x - 1},${y}`,
          `${x},${y + 1}`,
          `${x},${y - 1}`,
        ].filter((n) => {
          const [nx, ny] = n.split(",").map(Number);
          return nx >= 0 && nx <= 2 && ny >= 0 && ny <= 2;
        });
      },
      cost: () => 1,
      heuristic: (node) => {
        const [x, y] = node.split(",").map(Number);
        return Math.abs(2 - x) + Math.abs(2 - y);
      },
    });
    expect(result).not.toBeNull();
    expect(result!.path[0]).toBe("0,0");
    expect(result!.path[result!.path.length - 1]).toBe("2,2");
    expect(result!.cost).toBe(4);
  });

  it("returns null when no path exists", () => {
    const result = aStar({
      start: "a",
      goal: "c",
      neighbors: (node) => (node === "a" ? ["b"] : []),
      cost: () => 1,
      heuristic: () => 0,
    });
    expect(result).toBeNull();
  });

  it("finds direct path", () => {
    const result = aStar({
      start: "a",
      goal: "b",
      neighbors: (node) => (node === "a" ? ["b"] : []),
      cost: () => 5,
      heuristic: () => 0,
    });
    expect(result).not.toBeNull();
    expect(result!.path).toEqual(["a", "b"]);
    expect(result!.cost).toBe(5);
  });

  it("start equals goal", () => {
    const result = aStar({
      start: "x",
      goal: "x",
      neighbors: () => [],
      cost: () => 1,
      heuristic: () => 0,
    });
    expect(result).not.toBeNull();
    expect(result!.path).toEqual(["x"]);
    expect(result!.cost).toBe(0);
  });

  it("tracks visited count", () => {
    const result = aStar({
      start: "a",
      goal: "c",
      neighbors: (n) => {
        if (n === "a") return ["b", "c"];
        return [];
      },
      cost: () => 1,
      heuristic: () => 0,
    });
    expect(result!.visited).toBeGreaterThanOrEqual(1);
  });

  it("chooses lower cost path", () => {
    const result = aStar({
      start: "a",
      goal: "c",
      neighbors: (n) => {
        if (n === "a") return ["b", "c"];
        if (n === "b") return ["c"];
        return [];
      },
      cost: (from, to) => {
        if (from === "a" && to === "c") return 10;
        return 1;
      },
      heuristic: () => 0,
    });
    expect(result!.cost).toBe(2);
    expect(result!.path).toEqual(["a", "b", "c"]);
  });
});
