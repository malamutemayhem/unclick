import { describe, it, expect } from "vitest";
import {
  createState, addGrain, addGrains, isStable, topple,
  stabilize, addAndStabilize, addPiles, identityPile,
  maxStable, getCell, toAscii, histogram,
} from "../sandpile.js";

describe("createState", () => {
  it("creates empty grid", () => {
    const s = createState(5, 5);
    expect(s.width).toBe(5);
    expect(s.height).toBe(5);
    expect(s.totalGrains).toBe(0);
    expect(s.grid[0][0]).toBe(0);
  });
});

describe("addGrain", () => {
  it("adds single grain", () => {
    const s = addGrain(createState(5, 5), 2, 2);
    expect(s.grid[2][2]).toBe(1);
    expect(s.totalGrains).toBe(1);
  });
});

describe("addGrains", () => {
  it("adds multiple grains", () => {
    const s = addGrains(createState(5, 5), 2, 2, 10);
    expect(s.grid[2][2]).toBe(10);
  });
});

describe("isStable", () => {
  it("empty is stable", () => {
    expect(isStable(createState(5, 5))).toBe(true);
  });

  it("unstable with 4+ grains", () => {
    const s = addGrains(createState(5, 5), 2, 2, 4);
    expect(isStable(s)).toBe(false);
  });
});

describe("topple", () => {
  it("distributes grains to neighbors", () => {
    const s = addGrains(createState(5, 5), 2, 2, 4);
    const t = topple(s);
    expect(t.grid[2][2]).toBe(0);
    expect(t.grid[1][2]).toBe(1);
    expect(t.grid[3][2]).toBe(1);
    expect(t.grid[2][1]).toBe(1);
    expect(t.grid[2][3]).toBe(1);
  });

  it("grains fall off edges", () => {
    const s = addGrains(createState(3, 3), 0, 0, 4);
    const t = topple(s);
    expect(t.grid[0][0]).toBe(0);
    expect(t.totalGrains).toBe(2);
  });
});

describe("stabilize", () => {
  it("reaches stable state", () => {
    const s = addGrains(createState(5, 5), 2, 2, 16);
    const result = stabilize(s);
    expect(isStable(result)).toBe(true);
  });

  it("preserves stability", () => {
    const s = createState(5, 5);
    expect(stabilize(s)).toBe(s);
  });
});

describe("addAndStabilize", () => {
  it("adds and stabilizes in one call", () => {
    const s = addAndStabilize(createState(5, 5), 2, 2, 8);
    expect(isStable(s)).toBe(true);
    expect(s.toppleCount).toBeGreaterThan(0);
  });
});

describe("addPiles", () => {
  it("adds two piles element-wise", () => {
    const a = addGrains(createState(5, 5), 2, 2, 2);
    const b = addGrains(createState(5, 5), 2, 2, 1);
    const sum = addPiles(a, b);
    expect(isStable(sum)).toBe(true);
    expect(sum.grid[2][2]).toBe(3);
  });

  it("throws on dimension mismatch", () => {
    const a = createState(3, 3);
    const b = createState(5, 5);
    expect(() => addPiles(a, b)).toThrow();
  });
});

describe("identityPile", () => {
  it("creates identity candidate", () => {
    const id = identityPile(5, 5);
    expect(id.grid[0][0]).toBe(2);
    expect(id.grid[2][2]).toBe(3);
  });
});

describe("maxStable", () => {
  it("creates all-3 grid", () => {
    const m = maxStable(3, 3);
    expect(m.grid[1][1]).toBe(3);
    expect(isStable(m)).toBe(true);
  });
});

describe("getCell", () => {
  it("returns cell value", () => {
    const s = addGrains(createState(5, 5), 1, 1, 3);
    expect(getCell(s, 1, 1)).toBe(3);
  });

  it("returns 0 out of bounds", () => {
    expect(getCell(createState(5, 5), -1, -1)).toBe(0);
  });
});

describe("toAscii", () => {
  it("renders grid chars", () => {
    const s = addGrains(createState(3, 3), 1, 1, 3);
    const ascii = toAscii(s);
    expect(ascii).toContain("#");
    expect(ascii).toContain(".");
  });
});

describe("histogram", () => {
  it("counts cell values", () => {
    const s = addGrains(createState(3, 3), 1, 1, 2);
    const h = histogram(s);
    expect(h.get(0)).toBe(8);
    expect(h.get(2)).toBe(1);
  });
});
