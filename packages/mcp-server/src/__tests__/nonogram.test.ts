import { describe, it, expect } from "vitest";
import {
  createPuzzle, createBoard, setCell, isComplete, isCorrect,
  solve, boardToString, cluesToString, validateClues,
} from "../nonogram.js";

describe("createPuzzle", () => {
  it("generates row clues", () => {
    const p = createPuzzle([
      [true, true, false],
      [false, true, true],
    ]);
    expect(p.rowClues[0]).toEqual([2]);
    expect(p.rowClues[1]).toEqual([2]);
  });

  it("generates column clues", () => {
    const p = createPuzzle([
      [true, false],
      [true, true],
    ]);
    expect(p.colClues[0]).toEqual([2]);
    expect(p.colClues[1]).toEqual([1]);
  });

  it("handles empty rows", () => {
    const p = createPuzzle([
      [false, false],
      [true, true],
    ]);
    expect(p.rowClues[0]).toEqual([0]);
  });

  it("handles multiple runs", () => {
    const p = createPuzzle([
      [true, false, true, true],
    ]);
    expect(p.rowClues[0]).toEqual([1, 2]);
  });
});

describe("createBoard", () => {
  it("creates board with unknown cells", () => {
    const p = createPuzzle([[true, false]]);
    const b = createBoard(p);
    expect(b.cells[0][0]).toBe("unknown");
    expect(b.cells[0][1]).toBe("unknown");
  });
});

describe("setCell", () => {
  it("sets cell state", () => {
    const p = createPuzzle([[true]]);
    const b = createBoard(p);
    setCell(b, 0, 0, "filled");
    expect(b.cells[0][0]).toBe("filled");
  });
});

describe("isComplete", () => {
  it("returns false when unknowns remain", () => {
    const p = createPuzzle([[true, false]]);
    const b = createBoard(p);
    setCell(b, 0, 0, "filled");
    expect(isComplete(b)).toBe(false);
  });

  it("returns true when all decided", () => {
    const p = createPuzzle([[true, false]]);
    const b = createBoard(p);
    setCell(b, 0, 0, "filled");
    setCell(b, 0, 1, "empty");
    expect(isComplete(b)).toBe(true);
  });
});

describe("isCorrect", () => {
  it("validates correct solution", () => {
    const p = createPuzzle([[true, false], [false, true]]);
    const b = createBoard(p);
    setCell(b, 0, 0, "filled");
    setCell(b, 0, 1, "empty");
    setCell(b, 1, 0, "empty");
    setCell(b, 1, 1, "filled");
    expect(isCorrect(b)).toBe(true);
  });

  it("rejects incorrect solution", () => {
    const p = createPuzzle([[true, false]]);
    const b = createBoard(p);
    setCell(b, 0, 0, "empty");
    setCell(b, 0, 1, "filled");
    expect(isCorrect(b)).toBe(false);
  });
});

describe("solve", () => {
  it("solves a simple puzzle", () => {
    const p = createPuzzle([
      [true, true],
      [true, false],
    ]);
    const solution = solve(p);
    expect(solution).not.toBeNull();
    expect(solution![0][0]).toBe("filled");
    expect(solution![0][1]).toBe("filled");
    expect(solution![1][0]).toBe("filled");
    expect(solution![1][1]).toBe("empty");
  });

  it("solves a 3x3 puzzle", () => {
    const pattern = [
      [true, false, true],
      [false, true, false],
      [true, false, true],
    ];
    const p = createPuzzle(pattern);
    const solution = solve(p);
    expect(solution).not.toBeNull();
  });
});

describe("boardToString", () => {
  it("renders board", () => {
    const p = createPuzzle([[true, false]]);
    const b = createBoard(p);
    setCell(b, 0, 0, "filled");
    setCell(b, 0, 1, "empty");
    const str = boardToString(b);
    expect(str).toContain("#");
    expect(str).toContain(".");
  });
});

describe("cluesToString", () => {
  it("formats clues", () => {
    const p = createPuzzle([[true, false, true]]);
    const str = cluesToString(p);
    expect(str).toContain("Row 0: 1 1");
  });
});

describe("validateClues", () => {
  it("validates consistent clues", () => {
    const p = createPuzzle([[true, true], [false, true]]);
    expect(validateClues(p)).toBe(true);
  });
});
