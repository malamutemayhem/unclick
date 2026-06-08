import { describe, it, expect } from "vitest";
import { DancingLinks } from "../dancing-links.js";

describe("DancingLinks", () => {
  it("solves simple exact cover", () => {
    const dlx = new DancingLinks(3);
    dlx.addRow(0, [0, 1]);
    dlx.addRow(1, [1, 2]);
    dlx.addRow(2, [0]);
    dlx.addRow(3, [2]);
    const solutions = dlx.solve(10);
    expect(solutions.length).toBeGreaterThan(0);
    for (const sol of solutions) {
      const covered = new Set<number>();
      for (const row of sol) {
        if (row === 0) { covered.add(0); covered.add(1); }
        if (row === 1) { covered.add(1); covered.add(2); }
        if (row === 2) { covered.add(0); }
        if (row === 3) { covered.add(2); }
      }
      expect(covered.size).toBe(3);
    }
  });

  it("returns empty when no solution exists", () => {
    const dlx = new DancingLinks(3);
    dlx.addRow(0, [0, 1]);
    dlx.addRow(1, [0, 2]);
    const solutions = dlx.solve();
    expect(solutions.length).toBe(0);
  });

  it("finds single row covering all columns", () => {
    const dlx = new DancingLinks(3);
    dlx.addRow(0, [0, 1, 2]);
    const solutions = dlx.solve();
    expect(solutions).toEqual([[0]]);
  });

  it("respects maxSolutions limit", () => {
    const dlx = new DancingLinks(2);
    dlx.addRow(0, [0]);
    dlx.addRow(1, [1]);
    dlx.addRow(2, [0]);
    dlx.addRow(3, [1]);
    const solutions = dlx.solve(1);
    expect(solutions.length).toBe(1);
  });

  it("handles identity matrix", () => {
    const dlx = new DancingLinks(3);
    dlx.addRow(0, [0]);
    dlx.addRow(1, [1]);
    dlx.addRow(2, [2]);
    const solutions = dlx.solve();
    expect(solutions.length).toBe(1);
    expect(solutions[0].sort()).toEqual([0, 1, 2]);
  });

  it("solves with overlapping rows", () => {
    const dlx = new DancingLinks(4);
    dlx.addRow(0, [0, 1]);
    dlx.addRow(1, [2, 3]);
    dlx.addRow(2, [0, 2]);
    dlx.addRow(3, [1, 3]);
    const solutions = dlx.solve(10);
    expect(solutions.length).toBe(2);
  });

  it("handles single column", () => {
    const dlx = new DancingLinks(1);
    dlx.addRow(0, [0]);
    dlx.addRow(1, [0]);
    const solutions = dlx.solve(10);
    expect(solutions.length).toBe(2);
  });
});
