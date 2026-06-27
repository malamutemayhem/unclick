import { describe, it, expect } from "vitest";
import { MinimaxSearch, GameState } from "../minimax-search.js";

class NumberGame implements GameState<number> {
  constructor(private value: number, private depth: number) {}
  isTerminal(): boolean { return this.depth === 0; }
  evaluate(): number { return this.value; }
  getMoves(): number[] { return this.depth === 0 ? [] : [-1, 1]; }
  applyMove(move: number): GameState<number> {
    return new NumberGame(this.value + move, this.depth - 1);
  }
}

describe("MinimaxSearch", () => {
  it("finds optimal move for maximizer", () => {
    const state = new NumberGame(0, 1);
    const result = MinimaxSearch.search(state, 1, true);
    expect(result.move).toBe(1);
    expect(result.score).toBe(1);
  });

  it("finds optimal move for minimizer", () => {
    const state = new NumberGame(0, 1);
    const result = MinimaxSearch.search(state, 1, false);
    expect(result.move).toBe(-1);
    expect(result.score).toBe(-1);
  });

  it("evaluates at terminal depth", () => {
    const state = new NumberGame(5, 0);
    const result = MinimaxSearch.search(state, 0, true);
    expect(result.score).toBe(5);
    expect(result.move).toBeNull();
  });

  it("explores multiple levels", () => {
    const state = new NumberGame(0, 2);
    const result = MinimaxSearch.search(state, 2, true);
    expect(result.nodesExplored).toBeGreaterThan(1);
  });

  it("negamax matches minimax for maximizer", () => {
    const state = new NumberGame(0, 1);
    const mmResult = MinimaxSearch.search(state, 1, true);
    const ngResult = MinimaxSearch.negamax(state, 1);
    expect(ngResult.score).toBe(mmResult.score);
  });

  it("counts nodes explored", () => {
    const state = new NumberGame(0, 2);
    const result = MinimaxSearch.search(state, 2, true);
    expect(result.nodesExplored).toBe(7);
  });
});
