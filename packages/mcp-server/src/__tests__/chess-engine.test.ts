import { describe, it, expect } from "vitest";
import { ChessBoard, squareToAlgebraic, algebraicToSquare } from "../chess-engine.js";

describe("ChessBoard", () => {
  it("standard position has 32 pieces", () => {
    const board = ChessBoard.standard();
    const count = board.pieceCount();
    expect(count.white).toBe(16);
    expect(count.black).toBe(16);
  });

  it("generates initial pawn moves", () => {
    const board = ChessBoard.standard();
    const moves = board.generateMoves("white");
    const pawnMoves = moves.filter(m => m.piece === "P");
    expect(pawnMoves.length).toBe(16);
  });

  it("generates knight moves", () => {
    const board = ChessBoard.standard();
    const moves = board.generateMoves("white");
    const knightMoves = moves.filter(m => m.piece === "N");
    expect(knightMoves.length).toBe(4);
  });

  it("makes a move", () => {
    const board = ChessBoard.standard();
    const moves = board.generateMoves();
    const e2e4 = moves.find(m =>
      m.from.file === 4 && m.from.rank === 1 && m.to.file === 4 && m.to.rank === 3
    );
    expect(e2e4).toBeDefined();
    board.makeMove(e2e4!);
    expect(board.get({ file: 4, rank: 3 })).toBe("P");
    expect(board.get({ file: 4, rank: 1 })).toBeNull();
    expect(board.turn).toBe("black");
  });

  it("finds king", () => {
    const board = ChessBoard.standard();
    const wk = board.findKing("white");
    expect(wk).toEqual({ file: 4, rank: 0 });
    const bk = board.findKing("black");
    expect(bk).toEqual({ file: 4, rank: 7 });
  });

  it("detects check", () => {
    const board = new ChessBoard();
    board.set({ file: 4, rank: 0 }, "K");
    board.set({ file: 4, rank: 7 }, "r");
    expect(board.isInCheck("white")).toBe(true);
  });

  it("generates FEN", () => {
    const board = ChessBoard.standard();
    const fen = board.toFEN();
    expect(fen).toContain("rnbqkbnr/pppppppp");
    expect(fen).toContain("RNBQKBNR");
    expect(fen).toContain(" w");
  });

  it("empty board has no pieces", () => {
    const board = new ChessBoard();
    const count = board.pieceCount();
    expect(count.white).toBe(0);
    expect(count.black).toBe(0);
  });

  it("pawn captures diagonally", () => {
    const board = new ChessBoard();
    board.set({ file: 3, rank: 3 }, "P");
    board.set({ file: 4, rank: 4 }, "p");
    const moves = board.generateMoves("white");
    const captures = moves.filter(m => m.capture);
    expect(captures.length).toBe(1);
    expect(captures[0].capture).toBe("p");
  });
});

describe("algebraic notation", () => {
  it("converts square to algebraic", () => {
    expect(squareToAlgebraic({ file: 0, rank: 0 })).toBe("a1");
    expect(squareToAlgebraic({ file: 4, rank: 4 })).toBe("e5");
  });

  it("converts algebraic to square", () => {
    expect(algebraicToSquare("a1")).toEqual({ file: 0, rank: 0 });
    expect(algebraicToSquare("h8")).toEqual({ file: 7, rank: 7 });
  });
});
