import { describe, it, expect } from "vitest";
import { MCTSTree, MCTSState } from "../mcts-tree.js";

class CoinGame implements MCTSState<number> {
  constructor(private coins: number, private isMaxTurn: boolean) {}
  isTerminal(): boolean { return this.coins <= 0; }
  getResult(): number { return this.isMaxTurn ? 0 : 1; }
  getMoves(): number[] {
    const moves: number[] = [];
    for (let i = 1; i <= Math.min(3, this.coins); i++) moves.push(i);
    return moves;
  }
  applyMove(move: number): MCTSState<number> {
    return new CoinGame(this.coins - move, !this.isMaxTurn);
  }
  clone(): MCTSState<number> {
    return new CoinGame(this.coins, this.isMaxTurn);
  }
}

describe("MCTSTree", () => {
  it("returns a valid move", () => {
    const state = new CoinGame(5, true);
    const move = MCTSTree.search(state, 100);
    expect(move).not.toBeNull();
    expect([1, 2, 3]).toContain(move);
  });

  it("returns null for terminal state", () => {
    const state = new CoinGame(0, true);
    const move = MCTSTree.search(state, 10);
    expect(move).toBeNull();
  });

  it("finds winning move in forced win", () => {
    const state = new CoinGame(1, true);
    const move = MCTSTree.search(state, 50);
    expect(move).toBe(1);
  });

  it("handles single available move", () => {
    const state = new CoinGame(1, true);
    const move = MCTSTree.search(state, 10);
    expect(move).toBe(1);
  });

  it("runs specified iterations", () => {
    const state = new CoinGame(4, true);
    const move = MCTSTree.search(state, 200);
    expect(move).not.toBeNull();
  });
});
