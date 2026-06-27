import { describe, it, expect } from "vitest";
import {
  createNonogram, cloneGrid, solve, isSolved, validateSolution,
  toAscii, difficulty, createSimple5x5,
} from "../nonogram-solver.js";

describe("createNonogram", () => {
  it("creates empty grid", () => {
    const puzzle = createNonogram([[1], [1]], [[1], [1]]);
    expect(puzzle.rows).toBe(2);
    expect(puzzle.cols).toBe(2);
    expect(puzzle.grid[0][0]).toBe(0);
  });
});

describe("cloneGrid", () => {
  it("deep copies grid", () => {
    const puzzle = createNonogram([[1]], [[1]]);
    const clone = cloneGrid(puzzle.grid);
    clone[0][0] = 1;
    expect(puzzle.grid[0][0]).toBe(0);
  });
});

describe("solve", () => {
  it("solves simple 2x2", () => {
    const puzzle = createNonogram([[2], [0]], [[1], [1]]);
    const solved = solve(puzzle);
    expect(solved.grid[0][0]).toBe(1);
    expect(solved.grid[0][1]).toBe(1);
  });

  it("solves simple 5x5", () => {
    const puzzle = createSimple5x5();
    const solved = solve(puzzle);
    const unknowns = solved.grid.flat().filter(c => c === 0).length;
    expect(unknowns).toBeLessThan(25);
  });

  it("solves full row", () => {
    const puzzle = createNonogram([[3]], [[1], [1], [1]]);
    const solved = solve(puzzle);
    expect(solved.grid[0].every(c => c === 1)).toBe(true);
  });

  it("marks empty cells", () => {
    const puzzle = createNonogram([[0], [3]], [[1], [1], [1]]);
    const solved = solve(puzzle);
    expect(solved.grid[0].every(c => c === -1)).toBe(true);
  });
});

describe("isSolved", () => {
  it("false for empty puzzle", () => {
    const puzzle = createNonogram([[1]], [[1]]);
    expect(isSolved(puzzle)).toBe(false);
  });
});

describe("validateSolution", () => {
  it("validates correct manual solution", () => {
    const puzzle = createNonogram([[1]], [[1]]);
    puzzle.grid[0][0] = 1;
    expect(validateSolution(puzzle)).toBe(true);
  });

  it("rejects wrong solution", () => {
    const puzzle = createNonogram([[1]], [[1]]);
    puzzle.grid[0][0] = -1;
    expect(validateSolution(puzzle)).toBe(false);
  });
});

describe("toAscii", () => {
  it("renders grid", () => {
    const puzzle = createNonogram([[1]], [[1]]);
    puzzle.grid[0][0] = 1;
    expect(toAscii(puzzle)).toBe("#");
  });

  it("shows unknowns as ?", () => {
    const puzzle = createNonogram([[1]], [[1]]);
    expect(toAscii(puzzle)).toBe("?");
  });
});

describe("difficulty", () => {
  it("returns difficulty level", () => {
    const puzzle = createSimple5x5();
    const diff = difficulty(puzzle);
    expect(["easy", "medium", "hard"]).toContain(diff);
  });
});

describe("createSimple5x5", () => {
  it("creates 5x5 puzzle", () => {
    const puzzle = createSimple5x5();
    expect(puzzle.rows).toBe(5);
    expect(puzzle.cols).toBe(5);
  });
});
