import { describe, it, expect } from "vitest";
import { Automaton1D, GameOfLife } from "../cellular-automaton.js";

describe("Automaton1D", () => {
  it("initializes with center cell active by default", () => {
    const ca = new Automaton1D(110, 5);
    const state = ca.getState();
    expect(state).toEqual([0, 0, 1, 0, 0]);
  });

  it("accepts custom initial state", () => {
    const ca = new Automaton1D(110, 5, [1, 0, 1, 0, 1]);
    expect(ca.getState()).toEqual([1, 0, 1, 0, 1]);
  });

  it("evolves rule 110 correctly", () => {
    const ca = new Automaton1D(110, 7);
    const next = ca.step();
    expect(next).toHaveLength(7);
  });

  it("run returns history including initial state", () => {
    const ca = new Automaton1D(30, 9);
    const initial = ca.getState();
    const history = ca.run(5);
    expect(history).toHaveLength(6);
    expect(history[0]).toEqual(initial);
  });

  it("rule 0 kills all cells", () => {
    const ca = new Automaton1D(0, 5, [1, 1, 1, 1, 1]);
    ca.step();
    expect(ca.getState()).toEqual([0, 0, 0, 0, 0]);
  });

  it("rule 255 fills all cells", () => {
    const ca = new Automaton1D(255, 5, [0, 0, 1, 0, 0]);
    ca.step();
    expect(ca.getState()).toEqual([1, 1, 1, 1, 1]);
  });
});

describe("GameOfLife", () => {
  it("empty grid stays empty", () => {
    const gol = new GameOfLife(5, 5);
    gol.step();
    expect(gol.population()).toBe(0);
  });

  it("block is stable", () => {
    const gol = new GameOfLife(6, 6, [
      [1, 1], [2, 1], [1, 2], [2, 2],
    ]);
    gol.step();
    expect(gol.population()).toBe(4);
    expect(gol.getCell(1, 1)).toBe(1);
    expect(gol.getCell(2, 2)).toBe(1);
  });

  it("blinker oscillates", () => {
    const gol = new GameOfLife(5, 5, [
      [1, 2], [2, 2], [3, 2],
    ]);
    expect(gol.population()).toBe(3);
    gol.step();
    expect(gol.getCell(2, 1)).toBe(1);
    expect(gol.getCell(2, 2)).toBe(1);
    expect(gol.getCell(2, 3)).toBe(1);
    expect(gol.getCell(1, 2)).toBe(0);
    expect(gol.getCell(3, 2)).toBe(0);
    gol.step();
    expect(gol.getCell(1, 2)).toBe(1);
    expect(gol.getCell(2, 2)).toBe(1);
    expect(gol.getCell(3, 2)).toBe(1);
  });

  it("single cell dies", () => {
    const gol = new GameOfLife(5, 5, [[2, 2]]);
    gol.step();
    expect(gol.population()).toBe(0);
  });

  it("getLiveCells returns correct coordinates", () => {
    const gol = new GameOfLife(5, 5, [[1, 1], [3, 3]]);
    const live = gol.getLiveCells();
    expect(live).toContainEqual([1, 1]);
    expect(live).toContainEqual([3, 3]);
    expect(live).toHaveLength(2);
  });

  it("toGrid returns 2d array", () => {
    const gol = new GameOfLife(3, 3, [[1, 1]]);
    const grid = gol.toGrid();
    expect(grid).toHaveLength(3);
    expect(grid[1][1]).toBe(1);
    expect(grid[0][0]).toBe(0);
  });

  it("setCell works", () => {
    const gol = new GameOfLife(3, 3);
    gol.setCell(1, 1, 1);
    expect(gol.getCell(1, 1)).toBe(1);
    gol.setCell(1, 1, 0);
    expect(gol.getCell(1, 1)).toBe(0);
  });

  it("run advances multiple steps", () => {
    const gol = new GameOfLife(5, 5, [
      [1, 2], [2, 2], [3, 2],
    ]);
    gol.run(2);
    expect(gol.getCell(1, 2)).toBe(1);
    expect(gol.getCell(2, 2)).toBe(1);
    expect(gol.getCell(3, 2)).toBe(1);
  });
});
