import { describe, it, expect } from "vitest";
import { NashEquilibrium } from "../nash-equilibrium.js";

describe("NashEquilibrium", () => {
  it("finds pure Nash in prisoners dilemma", () => {
    const matrix = {
      rows: 2, cols: 2,
      playerA: [[-1, -3], [0, -2]],
      playerB: [[-1, 0], [-3, -2]],
    };
    const equilibria = NashEquilibrium.findPureNash(matrix);
    expect(equilibria).toEqual([[1, 1]]);
  });

  it("finds dominant strategy", () => {
    const payoffs = [[3, 1], [2, 0]];
    expect(NashEquilibrium.findDominantStrategy(payoffs)).toBe(0);
  });

  it("no dominant strategy when none exists", () => {
    const payoffs = [[3, 0], [0, 3]];
    expect(NashEquilibrium.findDominantStrategy(payoffs)).toBeNull();
  });

  it("analyze returns full result", () => {
    const matrix = {
      rows: 2, cols: 2,
      playerA: [[-1, -3], [0, -2]],
      playerB: [[-1, 0], [-3, -2]],
    };
    const result = NashEquilibrium.analyze(matrix);
    expect(result.pureEquilibria.length).toBeGreaterThan(0);
  });

  it("mixedNash2x2 finds mixed strategy", () => {
    const payoffs = [[3, 0], [0, 3]];
    const result = NashEquilibrium.mixedNash2x2(payoffs);
    expect(result).not.toBeNull();
    expect(result![0]).toBeCloseTo(0.5);
    expect(result![1]).toBeCloseTo(0.5);
  });

  it("paretoOptimal identifies non-dominated outcomes", () => {
    const matrix = {
      rows: 2, cols: 2,
      playerA: [[3, 0], [5, 1]],
      playerB: [[3, 5], [0, 1]],
    };
    const pareto = NashEquilibrium.paretoOptimal(matrix);
    expect(pareto.length).toBeGreaterThan(0);
  });

  it("multiple pure equilibria", () => {
    const matrix = {
      rows: 2, cols: 2,
      playerA: [[3, 0], [0, 3]],
      playerB: [[3, 0], [0, 3]],
    };
    const equilibria = NashEquilibrium.findPureNash(matrix);
    expect(equilibria.length).toBe(2);
  });

  it("no pure equilibrium in matching pennies", () => {
    const matrix = {
      rows: 2, cols: 2,
      playerA: [[1, -1], [-1, 1]],
      playerB: [[-1, 1], [1, -1]],
    };
    const equilibria = NashEquilibrium.findPureNash(matrix);
    expect(equilibria.length).toBe(0);
  });
});
