import { describe, it, expect } from "vitest";
import { GameTheory } from "../game-theory.js";

describe("GameTheory", () => {
  const pd = GameTheory.prisonersDilemma(-1, -3, 0, -2);

  it("prisonersDilemma creates valid matrix", () => {
    expect(pd.players.length).toBe(2);
    expect(pd.strategies[0]).toEqual(["Cooperate", "Defect"]);
    expect(pd.payoffs.length).toBe(2);
  });

  it("findNashEquilibria finds equilibrium in PD", () => {
    const eq = GameTheory.findNashEquilibria(pd);
    expect(eq.length).toBe(1);
    expect(eq[0].strategy1).toBe("Defect");
    expect(eq[0].strategy2).toBe("Defect");
  });

  it("dominantStrategy finds dominant strategy", () => {
    const dom = GameTheory.dominantStrategy(pd, 0);
    expect(dom).toBe("Defect");
  });

  it("dominantStrategy returns null when none exists", () => {
    const matrix = {
      players: ["A", "B"] as [string, string],
      strategies: [["X", "Y"], ["X", "Y"]] as [string[], string[]],
      payoffs: [
        [[3, 5], [0, 3]] as [number, number][],
        [[5, 0], [1, 1]] as [number, number][],
      ],
    };
    const dom = GameTheory.dominantStrategy(matrix, 1);
    expect(dom).toBeNull();
  });

  it("paretoOptimal identifies pareto outcomes", () => {
    const optimal = GameTheory.paretoOptimal(pd);
    expect(optimal.length).toBeGreaterThan(0);
  });

  it("maximin finds risk-averse strategy", () => {
    const result = GameTheory.maximin(pd, 0);
    expect(result.strategy).toBe("Defect");
    expect(result.value).toBe(-2);
  });

  it("socialWelfare sums payoffs", () => {
    const welfare = GameTheory.socialWelfare(pd, 0, 0);
    expect(welfare).toBe(-2);
  });

  it("handles multiple equilibria", () => {
    const coordination = {
      players: ["A", "B"] as [string, string],
      strategies: [["Left", "Right"], ["Left", "Right"]] as [string[], string[]],
      payoffs: [
        [[2, 2], [0, 0]] as [number, number][],
        [[0, 0], [1, 1]] as [number, number][],
      ],
    };
    const eq = GameTheory.findNashEquilibria(coordination);
    expect(eq.length).toBe(2);
  });
});
