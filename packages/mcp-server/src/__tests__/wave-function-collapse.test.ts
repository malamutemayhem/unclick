import { describe, it, expect } from "vitest";
import { WFC } from "../wave-function-collapse.js";
import type { WFCTile } from "../wave-function-collapse.js";

const tiles: WFCTile[] = [
  {
    id: 0,
    allowedNeighbors: { up: [0, 1], down: [0, 1], left: [0, 1], right: [0, 1] },
  },
  {
    id: 1,
    allowedNeighbors: { up: [0, 1], down: [0, 1], left: [0, 1], right: [0, 1] },
  },
];

describe("WFC", () => {
  it("creates grid of correct size", () => {
    const wfc = new WFC(3, 3, tiles);
    const result = wfc.getResult();
    expect(result).toHaveLength(3);
    expect(result[0]).toHaveLength(3);
  });

  it("solves a simple tileset", () => {
    const wfc = new WFC(3, 3, tiles);
    const result = wfc.solve();
    expect(result).not.toBeNull();
    for (const row of result!) {
      for (const cell of row) {
        expect([0, 1]).toContain(cell);
      }
    }
  });

  it("step collapses one cell", () => {
    const wfc = new WFC(2, 2, tiles);
    expect(wfc.isComplete()).toBe(false);
    wfc.step();
  });

  it("solves until complete", () => {
    const wfc = new WFC(4, 4, tiles);
    const result = wfc.solve();
    expect(result).not.toBeNull();
    expect(result!.flat().every((c) => c >= 0)).toBe(true);
  });

  it("handles single tile", () => {
    const single: WFCTile[] = [{
      id: 0,
      allowedNeighbors: { up: [0], down: [0], left: [0], right: [0] },
    }];
    const wfc = new WFC(3, 3, single);
    const result = wfc.solve();
    expect(result).not.toBeNull();
    expect(result!.flat().every((c) => c === 0)).toBe(true);
  });
});
