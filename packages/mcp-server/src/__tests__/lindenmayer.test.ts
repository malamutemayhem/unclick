import { describe, it, expect } from "vitest";
import {
  createLSystem, iterate, interpret, getBounds, toSVG,
  PRESETS, characterFrequency, stringLength,
} from "../lindenmayer.js";

describe("createLSystem", () => {
  it("creates system with axiom and rules", () => {
    const sys = createLSystem("F", { F: "FF" });
    expect(sys.axiom).toBe("F");
    expect(sys.rules.length).toBe(1);
    expect(sys.rules[0].predecessor).toBe("F");
    expect(sys.rules[0].successor).toBe("FF");
  });
});

describe("iterate", () => {
  it("0 generations returns axiom", () => {
    const sys = createLSystem("F", { F: "FF" });
    expect(iterate(sys, 0)).toBe("F");
  });

  it("1 generation applies rules", () => {
    const sys = createLSystem("F", { F: "F+F" });
    expect(iterate(sys, 1)).toBe("F+F");
  });

  it("2 generations applies recursively", () => {
    const sys = createLSystem("F", { F: "FF" });
    expect(iterate(sys, 2)).toBe("FFFF");
  });

  it("preserves characters without rules", () => {
    const sys = createLSystem("F+G", { F: "FF" });
    expect(iterate(sys, 1)).toBe("FF+G");
  });

  it("handles multiple rules", () => {
    const sys = createLSystem("AB", { A: "B", B: "AB" });
    expect(iterate(sys, 1)).toBe("BAB");
    expect(iterate(sys, 2)).toBe("ABBAB");
  });
});

describe("interpret", () => {
  it("F generates a line segment", () => {
    const result = interpret("F", 10, 90);
    expect(result.lines.length).toBe(1);
    expect(result.lines[0].x1).toBeCloseTo(0);
    expect(result.lines[0].y1).toBeCloseTo(0);
  });

  it("+ turns right", () => {
    const result = interpret("F+F", 10, 90);
    expect(result.lines.length).toBe(2);
  });

  it("- turns left", () => {
    const result = interpret("F-F", 10, 90);
    expect(result.lines.length).toBe(2);
  });

  it("[ ] saves and restores state", () => {
    const result = interpret("F[+F]-F", 10, 90);
    expect(result.lines.length).toBe(3);
  });

  it("f moves without drawing", () => {
    const result = interpret("FfF", 10, 90);
    expect(result.lines.length).toBe(2);
    expect(result.points.length).toBe(4);
  });

  it("G also draws", () => {
    const result = interpret("FG", 10, 90);
    expect(result.lines.length).toBe(2);
  });
});

describe("getBounds", () => {
  it("returns zeros for empty lines", () => {
    const b = getBounds([]);
    expect(b.minX).toBe(0);
    expect(b.maxX).toBe(0);
  });

  it("computes correct bounds", () => {
    const lines = [
      { x1: -5, y1: -3, x2: 10, y2: 8 },
      { x1: 0, y1: 0, x2: 20, y2: 15 },
    ];
    const b = getBounds(lines);
    expect(b.minX).toBe(-5);
    expect(b.minY).toBe(-3);
    expect(b.maxX).toBe(20);
    expect(b.maxY).toBe(15);
  });
});

describe("toSVG", () => {
  it("generates SVG with lines", () => {
    const result = interpret("F+F+F+F", 50, 90);
    const svg = toSVG(result.lines);
    expect(svg).toContain("<svg");
    expect(svg).toContain("<line");
    expect(svg).toContain("</svg>");
  });
});

describe("PRESETS", () => {
  it("koch curve produces valid string", () => {
    const str = iterate(PRESETS.kochCurve, 2);
    expect(str.length).toBeGreaterThan(0);
    expect(str).toContain("F");
  });

  it("dragon curve grows", () => {
    const g1 = iterate(PRESETS.dragonCurve, 1);
    const g2 = iterate(PRESETS.dragonCurve, 2);
    expect(g2.length).toBeGreaterThan(g1.length);
  });

  it("plant generates lines", () => {
    const str = iterate(PRESETS.plant, 2);
    const result = interpret(str, 5, 25);
    expect(result.lines.length).toBeGreaterThan(0);
  });

  it("hilbert curve produces drawing", () => {
    const str = iterate(PRESETS.hilbertCurve, 2);
    const result = interpret(str, 10, 90);
    expect(result.lines.length).toBeGreaterThan(0);
  });
});

describe("characterFrequency", () => {
  it("counts character occurrences", () => {
    const freq = characterFrequency("AABBC");
    expect(freq.get("A")).toBe(2);
    expect(freq.get("B")).toBe(2);
    expect(freq.get("C")).toBe(1);
  });
});

describe("stringLength", () => {
  it("returns length after iterations", () => {
    const sys = createLSystem("F", { F: "FF" });
    expect(stringLength(sys, 0)).toBe(1);
    expect(stringLength(sys, 1)).toBe(2);
    expect(stringLength(sys, 3)).toBe(8);
  });
});
