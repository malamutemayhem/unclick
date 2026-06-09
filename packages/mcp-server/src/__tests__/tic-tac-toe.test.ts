import { describe, it, expect } from "vitest";
import {
  createBoard, makeMove, makeMoveRC, getAvailableMoves,
  boardToString, isGameOver, minimax, bestMove,
} from "../tic-tac-toe.js";

describe("createBoard", () => {
  it("creates empty 3x3 board", () => {
    const b = createBoard();
    expect(b.size).toBe(3);
    expect(b.cells.length).toBe(9);
    expect(b.currentPlayer).toBe("X");
  });
});

describe("makeMove", () => {
  it("places mark", () => {
    const b = createBoard();
    expect(makeMove(b, 4)).toBe(true);
    expect(b.cells[4]).toBe("X");
    expect(b.currentPlayer).toBe("O");
  });

  it("rejects occupied cell", () => {
    const b = createBoard();
    makeMove(b, 4);
    expect(makeMove(b, 4)).toBe(false);
  });

  it("rejects out of bounds", () => {
    const b = createBoard();
    expect(makeMove(b, -1)).toBe(false);
    expect(makeMove(b, 9)).toBe(false);
  });

  it("detects X wins", () => {
    const b = createBoard();
    makeMove(b, 0); makeMove(b, 3);
    makeMove(b, 1); makeMove(b, 4);
    makeMove(b, 2);
    expect(b.winner).toBe("X");
  });

  it("detects O wins", () => {
    const b = createBoard();
    makeMove(b, 0); makeMove(b, 3);
    makeMove(b, 1); makeMove(b, 4);
    makeMove(b, 8); makeMove(b, 5);
    expect(b.winner).toBe("O");
  });

  it("detects draw", () => {
    const b = createBoard();
    // X O X
    // X X O
    // O X O
    makeMove(b, 0); makeMove(b, 1);
    makeMove(b, 2); makeMove(b, 5);
    makeMove(b, 3); makeMove(b, 6);
    makeMove(b, 4); makeMove(b, 8);
    makeMove(b, 7);
    expect(b.winner).toBe("draw");
  });

  it("detects diagonal win", () => {
    const b = createBoard();
    makeMove(b, 0); makeMove(b, 1);
    makeMove(b, 4); makeMove(b, 2);
    makeMove(b, 8);
    expect(b.winner).toBe("X");
  });

  it("detects column win", () => {
    const b = createBoard();
    makeMove(b, 0); makeMove(b, 1);
    makeMove(b, 3); makeMove(b, 4);
    makeMove(b, 6);
    expect(b.winner).toBe("X");
  });
});

describe("makeMoveRC", () => {
  it("converts row/col to index", () => {
    const b = createBoard();
    makeMoveRC(b, 1, 1);
    expect(b.cells[4]).toBe("X");
  });
});

describe("getAvailableMoves", () => {
  it("returns all cells on empty board", () => {
    const b = createBoard();
    expect(getAvailableMoves(b).length).toBe(9);
  });

  it("shrinks after moves", () => {
    const b = createBoard();
    makeMove(b, 0);
    expect(getAvailableMoves(b).length).toBe(8);
  });

  it("returns empty when game over", () => {
    const b = createBoard();
    makeMove(b, 0); makeMove(b, 3);
    makeMove(b, 1); makeMove(b, 4);
    makeMove(b, 2);
    expect(getAvailableMoves(b).length).toBe(0);
  });
});

describe("boardToString", () => {
  it("renders board", () => {
    const b = createBoard();
    makeMove(b, 0);
    const str = boardToString(b);
    expect(str).toContain("X");
    expect(str).toContain(".");
  });
});

describe("minimax", () => {
  it("returns 0 for draw", () => {
    const b = createBoard();
    makeMove(b, 0); makeMove(b, 1);
    makeMove(b, 2); makeMove(b, 5);
    makeMove(b, 3); makeMove(b, 6);
    makeMove(b, 4); makeMove(b, 8);
    makeMove(b, 7);
    expect(minimax(b, true)).toBe(0);
  });
});

describe("bestMove", () => {
  it("blocks opponent win", () => {
    const b = createBoard();
    makeMove(b, 0); makeMove(b, 3);
    makeMove(b, 1); // X has top-left and top-mid
    // O should block at index 2
    const best = bestMove(b);
    expect(best).toBe(2);
  });

  it("takes winning move", () => {
    const b = createBoard();
    makeMove(b, 0); makeMove(b, 3);
    makeMove(b, 1); makeMove(b, 4);
    // X has 0, 1 - should play 2 to win
    const best = bestMove(b);
    expect(best).toBe(2);
  });
});
