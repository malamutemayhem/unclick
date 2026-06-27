import { describe, it, expect } from "vitest";
import {
  createState, fromGrid, isAlive, setCell, population,
  step, run, getBounds, toAscii, fromRLE,
  PATTERNS, isStillLife, detectPeriod,
} from "../conway-life.js";

describe("createState", () => {
  it("creates empty state", () => {
    const s = createState();
    expect(population(s)).toBe(0);
  });

  it("creates from cell list", () => {
    const s = createState([[0, 0], [1, 1]]);
    expect(population(s)).toBe(2);
    expect(isAlive(s, 0, 0)).toBe(true);
  });
});

describe("fromGrid", () => {
  it("creates from boolean grid", () => {
    const s = fromGrid([[true, false], [false, true]]);
    expect(isAlive(s, 0, 0)).toBe(true);
    expect(isAlive(s, 1, 1)).toBe(true);
    expect(isAlive(s, 1, 0)).toBe(false);
  });
});

describe("setCell", () => {
  it("adds and removes cells", () => {
    let s = createState();
    s = setCell(s, 5, 5, true);
    expect(isAlive(s, 5, 5)).toBe(true);
    s = setCell(s, 5, 5, false);
    expect(isAlive(s, 5, 5)).toBe(false);
  });
});

describe("step", () => {
  it("blinker oscillates", () => {
    const s = PATTERNS.blinker();
    const s1 = step(s);
    expect(population(s1)).toBe(3);
    expect(isAlive(s1, 1, -1)).toBe(true);
    expect(isAlive(s1, 1, 0)).toBe(true);
    expect(isAlive(s1, 1, 1)).toBe(true);
  });

  it("block is stable", () => {
    const s = PATTERNS.block();
    const s1 = step(s);
    expect(population(s1)).toBe(4);
  });
});

describe("run", () => {
  it("runs multiple generations", () => {
    const s = PATTERNS.glider();
    const result = run(s, 4);
    expect(result.generation).toBe(4);
    expect(population(result)).toBe(5);
  });
});

describe("getBounds", () => {
  it("finds bounding box", () => {
    const s = createState([[0, 0], [10, 5]]);
    const b = getBounds(s);
    expect(b.minX).toBe(0);
    expect(b.maxX).toBe(10);
    expect(b.maxY).toBe(5);
  });

  it("handles empty", () => {
    const b = getBounds(createState());
    expect(b.minX).toBe(0);
    expect(b.maxX).toBe(0);
  });
});

describe("toAscii", () => {
  it("renders pattern", () => {
    const s = createState([[0, 0], [1, 0]]);
    const ascii = toAscii(s, 0);
    expect(ascii).toBe("##");
  });
});

describe("fromRLE", () => {
  it("parses blinker RLE", () => {
    const s = fromRLE("3o!");
    expect(population(s)).toBe(3);
    expect(isAlive(s, 0, 0)).toBe(true);
    expect(isAlive(s, 1, 0)).toBe(true);
    expect(isAlive(s, 2, 0)).toBe(true);
  });

  it("parses multi-row RLE", () => {
    const s = fromRLE("bo$2bo$3o!");
    expect(population(s)).toBe(5);
  });
});

describe("PATTERNS", () => {
  it("blinker has 3 cells", () => {
    expect(population(PATTERNS.blinker())).toBe(3);
  });

  it("glider has 5 cells", () => {
    expect(population(PATTERNS.glider())).toBe(5);
  });

  it("block has 4 cells", () => {
    expect(population(PATTERNS.block())).toBe(4);
  });
});

describe("isStillLife", () => {
  it("block is still life", () => {
    expect(isStillLife(PATTERNS.block())).toBe(true);
  });

  it("blinker is not still life", () => {
    expect(isStillLife(PATTERNS.blinker())).toBe(false);
  });
});

describe("detectPeriod", () => {
  it("blinker has period 2", () => {
    expect(detectPeriod(PATTERNS.blinker())).toBe(2);
  });

  it("block has period 1", () => {
    expect(detectPeriod(PATTERNS.block())).toBe(1);
  });
});
