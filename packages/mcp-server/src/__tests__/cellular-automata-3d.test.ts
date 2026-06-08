import { describe, it, expect } from "vitest";
import { CellularAutomata3D } from "../cellular-automata-3d.js";

describe("CellularAutomata3D", () => {
  it("constructor creates empty grid", () => {
    const ca = new CellularAutomata3D(3, 3, 3);
    expect(ca.population()).toBe(0);
  });

  it("set and get work correctly", () => {
    const ca = new CellularAutomata3D(5, 5, 5);
    ca.set(1, 2, 3, true);
    expect(ca.get(1, 2, 3)).toBe(true);
    expect(ca.get(0, 0, 0)).toBe(false);
  });

  it("countNeighbors counts surrounding cells", () => {
    const ca = new CellularAutomata3D(5, 5, 5);
    ca.set(1, 1, 1, true);
    ca.set(2, 1, 1, true);
    ca.set(1, 2, 1, true);
    expect(ca.countNeighbors(1, 1, 1)).toBe(2);
  });

  it("step applies birth and survive rules", () => {
    const ca = new CellularAutomata3D(5, 5, 5);
    ca.set(2, 2, 2, true);
    ca.set(2, 2, 3, true);
    const popBefore = ca.population();
    ca.step(1, 26, 1, 26);
    expect(typeof ca.population()).toBe("number");
    expect(ca.population()).not.toBe(popBefore);
  });

  it("density returns fraction", () => {
    const ca = new CellularAutomata3D(2, 2, 2);
    ca.set(0, 0, 0, true);
    ca.set(1, 1, 1, true);
    expect(ca.density()).toBeCloseTo(0.25, 3);
  });

  it("slice returns 2D layer", () => {
    const ca = new CellularAutomata3D(3, 3, 3);
    ca.set(1, 1, 1, true);
    const layer = ca.slice(1);
    expect(layer.length).toBe(3);
    expect(layer[1][1]).toBe(true);
    expect(layer[0][0]).toBe(false);
  });

  it("clear removes all cells", () => {
    const ca = new CellularAutomata3D(3, 3, 3);
    ca.set(0, 0, 0, true);
    ca.set(1, 1, 1, true);
    ca.clear();
    expect(ca.population()).toBe(0);
  });

  it("out-of-bounds get returns false", () => {
    const ca = new CellularAutomata3D(3, 3, 3);
    expect(ca.get(-1, 0, 0)).toBe(false);
    expect(ca.get(10, 10, 10)).toBe(false);
  });
});
