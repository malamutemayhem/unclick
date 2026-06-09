import { describe, it, expect } from "vitest";
import {
  createBoard, dropPiece, getValidMoves, isGameOver,
  boardToString, columnHeight, evaluate,
} from "../connect-four.js";

describe("createBoard", () => {
  it("creates empty board", () => {
    const b = createBoard();
    expect(b.rows).toBe(6);
    expect(b.cols).toBe(7);
    expect(b.currentPlayer).toBe(1);
    expect(b.winner).toBeNull();
  });
});

describe("dropPiece", () => {
  it("drops to bottom", () => {
    const b = createBoard();
    const row = dropPiece(b, 3);
    expect(row).toBe(5);
    expect(b.grid[5][3]).toBe(1);
  });

  it("stacks pieces", () => {
    const b = createBoard();
    dropPiece(b, 3);
    const row = dropPiece(b, 3);
    expect(row).toBe(4);
  });

  it("alternates players", () => {
    const b = createBoard();
    dropPiece(b, 0);
    expect(b.currentPlayer).toBe(2);
    dropPiece(b, 1);
    expect(b.currentPlayer).toBe(1);
  });

  it("rejects full column", () => {
    const b = createBoard();
    for (let i = 0; i < 6; i++) dropPiece(b, 0);
    expect(dropPiece(b, 0)).toBe(-1);
  });

  it("rejects out of bounds", () => {
    const b = createBoard();
    expect(dropPiece(b, -1)).toBe(-1);
    expect(dropPiece(b, 7)).toBe(-1);
  });

  it("detects horizontal win", () => {
    const b = createBoard();
    dropPiece(b, 0); dropPiece(b, 0);
    dropPiece(b, 1); dropPiece(b, 1);
    dropPiece(b, 2); dropPiece(b, 2);
    dropPiece(b, 3);
    expect(b.winner).toBe(1);
  });

  it("detects vertical win", () => {
    const b = createBoard();
    dropPiece(b, 0); dropPiece(b, 1);
    dropPiece(b, 0); dropPiece(b, 1);
    dropPiece(b, 0); dropPiece(b, 1);
    dropPiece(b, 0);
    expect(b.winner).toBe(1);
  });

  it("detects draw", () => {
    const b = createBoard(2, 2);
    dropPiece(b, 0); dropPiece(b, 1);
    dropPiece(b, 0); dropPiece(b, 1);
    expect(b.draw).toBe(true);
  });
});

describe("getValidMoves", () => {
  it("returns all columns for empty board", () => {
    const b = createBoard();
    expect(getValidMoves(b)).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it("excludes full columns", () => {
    const b = createBoard();
    for (let i = 0; i < 6; i++) dropPiece(b, 0);
    const moves = getValidMoves(b);
    expect(moves).not.toContain(0);
  });
});

describe("boardToString", () => {
  it("renders board", () => {
    const b = createBoard();
    dropPiece(b, 0);
    const str = boardToString(b);
    expect(str).toContain("X");
    expect(str).toContain(".");
  });
});

describe("columnHeight", () => {
  it("returns 0 for empty column", () => {
    const b = createBoard();
    expect(columnHeight(b, 0)).toBe(0);
  });

  it("counts pieces", () => {
    const b = createBoard();
    dropPiece(b, 0); dropPiece(b, 0);
    expect(columnHeight(b, 0)).toBe(2);
  });
});

describe("evaluate", () => {
  it("returns positive for winner", () => {
    const b = createBoard();
    dropPiece(b, 0); dropPiece(b, 0);
    dropPiece(b, 1); dropPiece(b, 1);
    dropPiece(b, 2); dropPiece(b, 2);
    dropPiece(b, 3);
    expect(evaluate(b, 1)).toBe(1000);
    expect(evaluate(b, 2)).toBe(-1000);
  });
});
