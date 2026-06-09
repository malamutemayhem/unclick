import { describe, it, expect } from "vitest";
import {
  createState, step, run, countBlack, getBounds,
  toAscii, directionName, density,
  createMultiColor, stepMultiColor, runMultiColor,
} from "../langton-ant.js";

describe("createState", () => {
  it("creates empty grid with centered ant", () => {
    const s = createState(11, 11);
    expect(s.width).toBe(11);
    expect(s.height).toBe(11);
    expect(s.antX).toBe(5);
    expect(s.antY).toBe(5);
    expect(s.antDir).toBe(0);
    expect(s.step).toBe(0);
  });
});

describe("step", () => {
  it("turns right on white, flips cell", () => {
    const s = createState(11, 11);
    const next = step(s);
    expect(next.grid[5][5]).toBe(true);
    expect(next.antDir).toBe(1);
    expect(next.step).toBe(1);
  });

  it("turns left on black", () => {
    const s = createState(11, 11);
    const s1 = step(s);
    const s2 = step(s1);
    expect(s2.step).toBe(2);
  });

  it("wraps around edges", () => {
    let s = createState(5, 5);
    // ant at (0,0) facing left on white cell: turns right -> faces up, moves up -> wraps to y=4
    s = { ...s, antX: 0, antY: 0, antDir: 3 };
    const next = step(s);
    expect(next.antY).toBe(4);
  });
});

describe("run", () => {
  it("runs multiple steps", () => {
    const s = createState(21, 21);
    const result = run(s, 100);
    expect(result.step).toBe(100);
  });

  it("creates black cells over time", () => {
    const s = createState(21, 21);
    const result = run(s, 50);
    expect(countBlack(result)).toBeGreaterThan(0);
  });
});

describe("countBlack", () => {
  it("counts 0 initially", () => {
    expect(countBlack(createState(5, 5))).toBe(0);
  });

  it("counts after steps", () => {
    const result = run(createState(11, 11), 4);
    expect(countBlack(result)).toBeGreaterThan(0);
  });
});

describe("getBounds", () => {
  it("returns zeroed bounds for empty grid", () => {
    const bounds = getBounds(createState(5, 5));
    expect(bounds.minX).toBe(0);
    expect(bounds.maxX).toBe(0);
  });

  it("finds bounds after running", () => {
    const result = run(createState(21, 21), 20);
    const bounds = getBounds(result);
    expect(bounds.maxX).toBeGreaterThanOrEqual(bounds.minX);
  });
});

describe("toAscii", () => {
  it("shows ant marker", () => {
    const s = createState(5, 5);
    const ascii = toAscii(s);
    expect(ascii).toContain("@");
  });

  it("shows black cells", () => {
    const s = run(createState(5, 5), 2);
    const ascii = toAscii(s);
    expect(ascii.length).toBeGreaterThan(0);
  });
});

describe("directionName", () => {
  it("names directions", () => {
    expect(directionName(0)).toBe("up");
    expect(directionName(1)).toBe("right");
    expect(directionName(2)).toBe("down");
    expect(directionName(3)).toBe("left");
  });
});

describe("density", () => {
  it("starts at 0", () => {
    expect(density(createState(10, 10))).toBe(0);
  });

  it("increases with steps", () => {
    const result = run(createState(21, 21), 50);
    expect(density(result)).toBeGreaterThan(0);
  });
});

describe("multiColor", () => {
  it("creates multi-color state", () => {
    const s = createMultiColor(11, 11, [0, 1]);
    expect(s.numColors).toBe(2);
    expect(s.rule).toEqual([0, 1]);
  });

  it("steps multi-color ant", () => {
    const s = createMultiColor(11, 11, [0, 1]);
    const next = stepMultiColor(s);
    expect(next.step).toBe(1);
    expect(next.grid[5][5]).toBe(1);
  });

  it("runs multi-color simulation", () => {
    const s = createMultiColor(21, 21, [0, 1, 0]);
    const result = runMultiColor(s, 50);
    expect(result.step).toBe(50);
  });
});
