import { describe, it, expect } from "vitest";
import {
  createBoard, getFlips, isValidMove, getValidMoves,
  makeMove, getWinner, boardToString, countPieces,
} from "../reversi.js";

describe("createBoard", () => {
  it("sets up initial 4 pieces", () => {
    const b = createBoard();
    expect(b.size).toBe(8);
    const pieces = countPieces(b);
    expect(pieces.black).toBe(2);
    expect(pieces.white).toBe(2);
  });

  it("starts with player 1", () => {
    const b = createBoard();
    expect(b.currentPlayer).toBe(1);
  });
});

describe("getFlips", () => {
  it("finds flippable pieces", () => {
    const b = createBoard();
    const flips = getFlips(b, 2, 3, 1);
    expect(flips.length).toBeGreaterThan(0);
  });

  it("returns empty for invalid position", () => {
    const b = createBoard();
    const flips = getFlips(b, 0, 0, 1);
    expect(flips.length).toBe(0);
  });
});

describe("isValidMove", () => {
  it("validates legal moves", () => {
    const b = createBoard();
    const moves = getValidMoves(b, 1);
    expect(moves.length).toBeGreaterThan(0);
    for (const [r, c] of moves) {
      expect(isValidMove(b, r, c, 1)).toBe(true);
    }
  });

  it("rejects out of bounds", () => {
    const b = createBoard();
    expect(isValidMove(b, -1, 0, 1)).toBe(false);
  });
});

describe("getValidMoves", () => {
  it("returns opening moves", () => {
    const b = createBoard();
    const moves = getValidMoves(b, 1);
    expect(moves.length).toBe(4);
  });
});

describe("makeMove", () => {
  it("flips pieces", () => {
    const b = createBoard();
    const moves = getValidMoves(b, 1);
    makeMove(b, moves[0][0], moves[0][1]);
    const pieces = countPieces(b);
    expect(pieces.black).toBeGreaterThan(2);
  });

  it("switches player", () => {
    const b = createBoard();
    const moves = getValidMoves(b, 1);
    makeMove(b, moves[0][0], moves[0][1]);
    expect(b.currentPlayer).toBe(2);
  });

  it("rejects invalid moves", () => {
    const b = createBoard();
    expect(makeMove(b, 0, 0)).toBe(false);
  });
});

describe("boardToString", () => {
  it("renders board with B and W", () => {
    const b = createBoard();
    const str = boardToString(b);
    expect(str).toContain("B");
    expect(str).toContain("W");
    expect(str).toContain(".");
  });
});

describe("countPieces", () => {
  it("counts correctly", () => {
    const b = createBoard();
    const pieces = countPieces(b);
    expect(pieces.black + pieces.white + pieces.empty).toBe(64);
  });
});

describe("getWinner", () => {
  it("returns null when not over", () => {
    const b = createBoard();
    expect(getWinner(b)).toBeNull();
  });
});
