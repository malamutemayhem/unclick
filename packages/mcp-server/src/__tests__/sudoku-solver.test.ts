import { describe, it, expect } from "vitest";
import { SudokuSolver } from "../sudoku-solver.js";

describe("SudokuSolver", () => {
  const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  it("solves a valid puzzle", () => {
    const solution = SudokuSolver.solve(puzzle);
    expect(solution).not.toBeNull();
    expect(SudokuSolver.isComplete(solution!)).toBe(true);
    expect(SudokuSolver.isValidBoard(solution!)).toBe(true);
  });

  it("preserves given values", () => {
    const solution = SudokuSolver.solve(puzzle);
    expect(solution![0][0]).toBe(5);
    expect(solution![0][1]).toBe(3);
    expect(solution![0][4]).toBe(7);
  });

  it("isValid rejects row conflict", () => {
    expect(SudokuSolver.isValid(puzzle, 0, 2, 3)).toBe(false);
  });

  it("isValid accepts valid placement", () => {
    expect(SudokuSolver.isValid(puzzle, 0, 2, 4)).toBe(true);
  });

  it("isComplete detects incomplete", () => {
    expect(SudokuSolver.isComplete(puzzle)).toBe(false);
  });

  it("isValidBoard validates board", () => {
    expect(SudokuSolver.isValidBoard(puzzle)).toBe(true);
  });

  it("isValidBoard rejects invalid", () => {
    const bad = puzzle.map((r) => [...r]);
    bad[0][2] = 5;
    expect(SudokuSolver.isValidBoard(bad)).toBe(false);
  });
});
