import { describe, it, expect } from "vitest";
import { GameOfLife } from "../game-of-life.js";

describe("GameOfLife", () => {
  it("starts empty", () => {
    const gol = new GameOfLife(10, 10);
    expect(gol.population()).toBe(0);
    expect(gol.gen).toBe(0);
  });

  it("setCell and getCell", () => {
    const gol = new GameOfLife(10, 10);
    gol.setCell(5, 5, true);
    expect(gol.getCell(5, 5)).toBe(true);
    expect(gol.getCell(0, 0)).toBe(false);
  });

  it("blinker oscillates", () => {
    const gol = new GameOfLife(5, 5, false);
    gol.addBlinker(1, 2);
    expect(gol.population()).toBe(3);
    gol.step();
    expect(gol.population()).toBe(3);
    expect(gol.getCell(2, 1)).toBe(true);
    expect(gol.getCell(2, 2)).toBe(true);
    expect(gol.getCell(2, 3)).toBe(true);
    gol.step();
    expect(gol.getCell(1, 2)).toBe(true);
  });

  it("lone cell dies", () => {
    const gol = new GameOfLife(5, 5);
    gol.setCell(2, 2, true);
    gol.step();
    expect(gol.getCell(2, 2)).toBe(false);
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

  it("run advances multiple steps", () => {
    const gol = new GameOfLife(10, 10);
    gol.addBlinker(3, 4);
    gol.run(10);
    expect(gol.gen).toBe(10);
  });

  it("randomize creates cells", () => {
    const gol = new GameOfLife(20, 20);
    gol.randomize(0.5);
    expect(gol.population()).toBeGreaterThan(0);
  });

  it("clear resets", () => {
    const gol = new GameOfLife(10, 10);
    gol.randomize();
    gol.step();
    gol.clear();
    expect(gol.population()).toBe(0);
    expect(gol.gen).toBe(0);
  });

  it("toString produces grid", () => {
    const gol = new GameOfLife(3, 3);
    gol.setCell(1, 1, true);
    const str = gol.toString();
    expect(str).toContain("#");
    expect(str.split("\n")).toHaveLength(3);
  });

  it("dimensions", () => {
    const gol = new GameOfLife(15, 20);
    expect(gol.gridWidth).toBe(15);
    expect(gol.gridHeight).toBe(20);
  });
});
