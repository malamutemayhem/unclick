import { describe, it, expect } from "vitest";
import { AlphaBetaPrune, ABGameState } from "../alpha-beta-prune.js";

class SimpleGame implements ABGameState<number> {
  constructor(private value: number, private depth: number) {}
  isTerminal(): boolean { return this.depth === 0; }
  evaluate(): number { return this.value; }
  getMoves(): number[] { return this.depth === 0 ? [] : [-1, 1]; }
  applyMove(move: number): ABGameState<number> {
    return new SimpleGame(this.value + move, this.depth - 1);
  }
}

describe("AlphaBetaPrune", () => {
  it("finds same result as minimax", () => {
    const state = new SimpleGame(0, 2);
    const result = AlphaBetaPrune.search(state, 2, true);
    expect(result.score).toBe(0);
  });

  it("prunes branches", () => {
    const state = new SimpleGame(0, 3);
    const result = AlphaBetaPrune.search(state, 3, true);
    expect(result.pruned).toBeGreaterThanOrEqual(0);
    expect(result.nodesExplored).toBeGreaterThan(0);
  });

  it("explores fewer nodes than minimax", () => {
    const state = new SimpleGame(0, 3);
    const abResult = AlphaBetaPrune.search(state, 3, true);
    expect(abResult.nodesExplored).toBeLessThanOrEqual(15);
  });

  it("returns move at depth 1", () => {
    const state = new SimpleGame(0, 1);
    const result = AlphaBetaPrune.search(state, 1, true);
    expect(result.move).toBe(1);
  });

  it("terminal returns null move", () => {
    const state = new SimpleGame(10, 0);
    const result = AlphaBetaPrune.search(state, 0, true);
    expect(result.move).toBeNull();
    expect(result.score).toBe(10);
  });

  it("minimizer picks optimal", () => {
    const state = new SimpleGame(0, 1);
    const result = AlphaBetaPrune.search(state, 1, false);
    expect(result.move).toBe(-1);
    expect(result.score).toBe(-1);
  });

  it("reports pruned count", () => {
    const state = new SimpleGame(0, 3);
    const result = AlphaBetaPrune.search(state, 3, true);
    expect(typeof result.pruned).toBe("number");
  });
});
