import { describe, it, expect } from "vitest";
import {
  createState, createFromPattern, createRandom,
  step, run, toAscii, historyToAscii,
  countAlive, density, isStatic, entropy,
  NOTABLE_RULES,
} from "../cellular-automata-1d.js";

describe("createState", () => {
  it("creates grid with single center cell", () => {
    const s = createState(11, 30);
    expect(s.cells.length).toBe(11);
    expect(s.cells[5]).toBe(true);
    expect(s.cells[0]).toBe(false);
    expect(s.rule).toBe(30);
    expect(s.generation).toBe(0);
  });
});

describe("createFromPattern", () => {
  it("creates from boolean array", () => {
    const s = createFromPattern([true, false, true], 90);
    expect(s.cells).toEqual([true, false, true]);
    expect(s.rule).toBe(90);
  });
});

describe("createRandom", () => {
  it("creates random pattern", () => {
    const s = createRandom(20, 110, 0.5, 42);
    expect(s.cells.length).toBe(20);
    const alive = s.cells.filter(c => c).length;
    expect(alive).toBeGreaterThan(0);
    expect(alive).toBeLessThan(20);
  });

  it("is deterministic with same seed", () => {
    const a = createRandom(30, 110, 0.5, 123);
    const b = createRandom(30, 110, 0.5, 123);
    expect(a.cells).toEqual(b.cells);
  });
});

describe("step", () => {
  it("applies rule correctly", () => {
    const s = createState(11, 30);
    const next = step(s);
    expect(next.generation).toBe(1);
    expect(next.cells.length).toBe(11);
  });

  it("rule 90 produces XOR pattern", () => {
    const s = createState(7, 90);
    const next = step(s);
    expect(next.cells[2]).toBe(true);
    expect(next.cells[3]).toBe(false);
    expect(next.cells[4]).toBe(true);
  });

  it("wraps at boundaries", () => {
    const s = createFromPattern([true, false, false, false, false], 30);
    const next = step(s);
    expect(next.cells[4]).toBeDefined();
  });
});

describe("run", () => {
  it("produces history", () => {
    const s = createState(11, 30);
    const history = run(s, 5);
    expect(history.length).toBe(6);
    expect(history[0].generation).toBe(0);
    expect(history[5].generation).toBe(5);
  });
});

describe("toAscii", () => {
  it("renders cells", () => {
    const s = createFromPattern([true, false, true], 0);
    expect(toAscii(s)).toBe("#.#");
  });

  it("uses custom chars", () => {
    const s = createFromPattern([true, false], 0);
    expect(toAscii(s, "1", "0")).toBe("10");
  });
});

describe("historyToAscii", () => {
  it("renders multiple generations", () => {
    const s = createState(5, 90);
    const history = run(s, 2);
    const ascii = historyToAscii(history);
    const lines = ascii.split("\n");
    expect(lines.length).toBe(3);
  });
});

describe("countAlive", () => {
  it("counts true cells", () => {
    const s = createFromPattern([true, false, true, true], 0);
    expect(countAlive(s)).toBe(3);
  });
});

describe("density", () => {
  it("computes fraction alive", () => {
    const s = createFromPattern([true, false, true, false], 0);
    expect(density(s)).toBeCloseTo(0.5);
  });
});

describe("isStatic", () => {
  it("detects identical states", () => {
    const a = createFromPattern([true, false], 0);
    const b = createFromPattern([true, false], 0);
    expect(isStatic(a, b)).toBe(true);
  });

  it("detects different states", () => {
    const a = createFromPattern([true, false], 0);
    const b = createFromPattern([false, true], 0);
    expect(isStatic(a, b)).toBe(false);
  });
});

describe("entropy", () => {
  it("returns 0 for all same", () => {
    const s = createFromPattern([true, true, true], 0);
    expect(entropy(s)).toBe(0);
  });

  it("returns 1 for equal split", () => {
    const s = createFromPattern([true, false, true, false], 0);
    expect(entropy(s)).toBeCloseTo(1);
  });
});

describe("NOTABLE_RULES", () => {
  it("contains standard rules", () => {
    expect(NOTABLE_RULES.rule30).toBe(30);
    expect(NOTABLE_RULES.rule90).toBe(90);
    expect(NOTABLE_RULES.rule110).toBe(110);
  });
});
