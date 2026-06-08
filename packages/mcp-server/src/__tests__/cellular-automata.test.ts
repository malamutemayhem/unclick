import { describe, it, expect } from "vitest";
import { CellularAutomaton1D, GameOfLife } from "../cellular-automata.js";

describe("CellularAutomaton1D", () => {
  it("initializes with empty state", () => {
    const ca = new CellularAutomaton1D(10, 30);
    expect(ca.getState()).toHaveLength(10);
    expect(ca.population()).toBe(0);
  });

  it("seeds center cell", () => {
    const ca = new CellularAutomaton1D(11, 30);
    ca.seedCenter();
    expect(ca.getState()[5]).toBe(true);
    expect(ca.population()).toBe(1);
  });

  it("evolves with Rule 30", () => {
    const ca = new CellularAutomaton1D(11, 30);
    ca.seedCenter();
    ca.step();
    const state = ca.getState();
    expect(state.some((c) => c)).toBe(true);
  });

  it("tracks history", () => {
    const ca = new CellularAutomaton1D(5, 30);
    ca.seedCenter();
    ca.run(3);
    const history = ca.getHistory();
    expect(history).toHaveLength(4);
  });

  it("generates ASCII art", () => {
    const ca = new CellularAutomaton1D(5, 30);
    ca.seedCenter();
    ca.run(2);
    const art = ca.toAscii();
    expect(art).toContain("#");
    expect(art).toContain(".");
  });

  it("sets individual cells", () => {
    const ca = new CellularAutomaton1D(5, 30);
    ca.setCell(0, true);
    ca.setCell(4, true);
    expect(ca.population()).toBe(2);
  });
});

describe("GameOfLife", () => {
  it("starts with empty grid", () => {
    const gol = new GameOfLife(10, 10);
    expect(gol.population()).toBe(0);
    expect(gol.getGeneration()).toBe(0);
  });

  it("blinker oscillates", () => {
    const gol = new GameOfLife(5, 5);
    gol.addBlinker(1, 2);
    expect(gol.population()).toBe(3);
    gol.step();
    expect(gol.population()).toBe(3);
    expect(gol.getGeneration()).toBe(1);
  });

  it("isolated cell dies", () => {
    const gol = new GameOfLife(5, 5);
    gol.setCell(2, 2, true);
    gol.step();
    expect(gol.population()).toBe(0);
  });

  it("block is stable", () => {
    const gol = new GameOfLife(6, 6);
    gol.setCell(2, 2, true);
    gol.setCell(3, 2, true);
    gol.setCell(2, 3, true);
    gol.setCell(3, 3, true);
    gol.step();
    expect(gol.population()).toBe(4);
  });

  it("glider moves", () => {
    const gol = new GameOfLife(10, 10);
    gol.addGlider(1, 1);
    expect(gol.population()).toBe(5);
    gol.run(4);
    expect(gol.population()).toBe(5);
  });

  it("generates ASCII art", () => {
    const gol = new GameOfLife(3, 3);
    gol.setCell(1, 1, true);
    const art = gol.toAscii();
    expect(art).toContain("#");
    expect(art.split("\n")).toHaveLength(3);
  });
});
