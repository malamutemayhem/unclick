import { describe, it, expect } from "vitest";
import { minimax, alphaBeta, negamax } from "../minimax.js";
import type { GameState } from "../minimax.js";

class NumberGame implements GameState<number> {
  constructor(
    private value: number,
    private depth: number,
    private maxDepth: number,
  ) {}

  isTerminal(): boolean {
    return this.depth >= this.maxDepth;
  }

  evaluate(): number {
    return this.value;
  }

  getMoves(): number[] {
    if (this.isTerminal()) return [];
    return [-1, 0, 1];
  }

  applyMove(move: number): GameState<number> {
    return new NumberGame(this.value + move, this.depth + 1, this.maxDepth);
  }
}

class TicTacToe implements GameState<number> {
  constructor(
    private board: number[],
    private player: number,
  ) {}

  isTerminal(): boolean {
    return this.getWinner() !== 0 || this.board.every((c) => c !== 0);
  }

  private getWinner(): number {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (this.board[a] !== 0 && this.board[a] === this.board[b] && this.board[b] === this.board[c]) {
        return this.board[a];
      }
    }
    return 0;
  }

  evaluate(): number {
    const w = this.getWinner();
    if (w === 1) return 10;
    if (w === -1) return -10;
    return 0;
  }

  getMoves(): number[] {
    if (this.isTerminal()) return [];
    const moves: number[] = [];
    for (let i = 0; i < 9; i++) {
      if (this.board[i] === 0) moves.push(i);
    }
    return moves;
  }

  applyMove(move: number): GameState<number> {
    const newBoard = [...this.board];
    newBoard[move] = this.player;
    return new TicTacToe(newBoard, -this.player);
  }
}

describe("minimax", () => {
  it("finds best move in simple game", () => {
    const game = new NumberGame(0, 0, 2);
    const result = minimax(game, 2, true);
    // Maximizer picks +1 (value=1), minimizer picks -1 (value=0)
    expect(result.move).toBe(1);
    expect(result.score).toBe(0);
  });

  it("minimizer picks lowest", () => {
    const game = new NumberGame(0, 0, 1);
    const result = minimax(game, 1, false);
    expect(result.move).toBe(-1);
    expect(result.score).toBe(-1);
  });

  it("tracks nodes explored", () => {
    const game = new NumberGame(0, 0, 2);
    const result = minimax(game, 2, true);
    expect(result.nodesExplored).toBeGreaterThan(1);
  });
});

describe("alphaBeta", () => {
  it("produces same result as minimax", () => {
    const game = new NumberGame(0, 0, 3);
    const mm = minimax(game, 3, true);
    const ab = alphaBeta(game, 3, true);
    expect(ab.score).toBe(mm.score);
  });

  it("explores fewer nodes with pruning", () => {
    const game = new NumberGame(0, 0, 4);
    const mm = minimax(game, 4, true);
    const ab = alphaBeta(game, 4, true);
    expect(ab.nodesExplored).toBeLessThanOrEqual(mm.nodesExplored);
  });

  it("handles tic-tac-toe", () => {
    // Player 1 about to win (needs position 2)
    const board = [1, 1, 0, -1, -1, 0, 0, 0, 0];
    const game = new TicTacToe(board, 1);
    const result = alphaBeta(game, 9, true);
    expect(result.move).toBe(2);
    expect(result.score).toBe(10);
  });
});

describe("negamax", () => {
  it("finds best move", () => {
    const game = new NumberGame(0, 0, 1);
    const result = negamax(game, 1);
    expect(result.score).toBe(1);
  });

  it("tracks explored nodes", () => {
    const game = new NumberGame(0, 0, 3);
    const result = negamax(game, 3);
    expect(result.nodesExplored).toBeGreaterThan(1);
  });
});
