import { describe, it, expect } from "vitest";
import {
  movesToSolve, estimatedMinutes, combinations, permutations,
  secretCompartments, woodJoints, magnetCount, springForce,
  toleranceMm, woodShrinkage, resetDifficulty, collectibleValue,
  materialCost, puzzleTypes,
} from "../puzzle-box.js";

describe("movesToSolve", () => {
  it("more moves for harder", () => {
    expect(movesToSolve(10, 5)).toBeGreaterThan(movesToSolve(10, 1));
  });
});

describe("estimatedMinutes", () => {
  it("novice slowest", () => {
    expect(estimatedMinutes(20, "novice")).toBeGreaterThan(estimatedMinutes(20, "expert"));
  });
});

describe("combinations", () => {
  it("10^3 = 1000", () => {
    expect(combinations(3, 10)).toBe(1000);
  });
});

describe("permutations", () => {
  it("5P3 = 60", () => {
    expect(permutations(5, 3)).toBe(60);
  });
});

describe("secretCompartments", () => {
  it("positive count", () => {
    expect(secretCompartments(500)).toBeGreaterThan(0);
  });
});

describe("woodJoints", () => {
  it("calculated correctly", () => {
    expect(woodJoints(6, 3)).toBe(6 * 2 + 3 * 3);
  });
});

describe("magnetCount", () => {
  it("2 per lock point", () => {
    expect(magnetCount(4)).toBe(8);
  });
});

describe("springForce", () => {
  it("positive newtons", () => {
    expect(springForce(5, 0.5)).toBe(2.5);
  });
});

describe("toleranceMm", () => {
  it("tighter for harder", () => {
    expect(toleranceMm(5)).toBeLessThan(toleranceMm(1));
  });
});

describe("woodShrinkage", () => {
  it("positive mm", () => {
    expect(woodShrinkage(5, 0.2, 100)).toBeGreaterThan(0);
  });
});

describe("resetDifficulty", () => {
  it("easy for few steps", () => {
    expect(resetDifficulty(3)).toBe("easy");
  });

  it("extreme for many steps", () => {
    expect(resetDifficulty(50)).toBe("extreme");
  });
});

describe("collectibleValue", () => {
  it("positive value", () => {
    expect(collectibleValue(50, 4, 8)).toBeGreaterThan(0);
  });
});

describe("materialCost", () => {
  it("positive cost", () => {
    expect(materialCost(0.05, 500, 10, 2)).toBeGreaterThan(0);
  });
});

describe("puzzleTypes", () => {
  it("returns 6 types", () => {
    expect(puzzleTypes()).toHaveLength(6);
  });
});
