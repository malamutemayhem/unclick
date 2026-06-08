import { describe, it, expect } from "vitest";
import { produce, produceStochastic, interpret, presets } from "../l-system.js";

describe("produce", () => {
  it("applies rules for one iteration", () => {
    const result = produce({ axiom: "A", rules: { A: "AB", B: "A" }, iterations: 1 });
    expect(result).toBe("AB");
  });

  it("applies rules for multiple iterations", () => {
    const result = produce({ axiom: "A", rules: { A: "AB", B: "A" }, iterations: 3 });
    expect(result).toBe("ABAAB");
  });

  it("preserves characters without rules", () => {
    const result = produce({ axiom: "AXB", rules: { A: "AA", B: "BB" }, iterations: 1 });
    expect(result).toBe("AAXBB");
  });

  it("handles zero iterations", () => {
    const result = produce({ axiom: "F", rules: { F: "F+F" }, iterations: 0 });
    expect(result).toBe("F");
  });

  it("generates Koch curve string", () => {
    const result = produce(presets.kochCurve);
    expect(result).toContain("F");
    expect(result).toContain("+");
    expect(result).toContain("-");
    expect(result.length).toBeGreaterThan(presets.kochCurve.axiom.length);
  });
});

describe("produceStochastic", () => {
  it("produces output with weighted rules", () => {
    const result = produceStochastic(
      "A",
      { A: [{ replacement: "AB", weight: 1 }, { replacement: "AC", weight: 0 }] },
      1,
    );
    expect(result).toBe("AB");
  });

  it("preserves characters without rules", () => {
    const result = produceStochastic("AXA", { A: [{ replacement: "B", weight: 1 }] }, 1);
    expect(result).toBe("BXB");
  });
});

describe("interpret", () => {
  it("draws a straight line for F", () => {
    const { lines } = interpret("F", 10, 90, 0);
    expect(lines).toHaveLength(1);
    expect(lines[0].x1).toBeCloseTo(0);
    expect(lines[0].y1).toBeCloseTo(0);
    expect(lines[0].x2).toBeCloseTo(10);
    expect(lines[0].y2).toBeCloseTo(0);
  });

  it("handles turns", () => {
    const { lines } = interpret("F+F", 10, 90, 0);
    expect(lines).toHaveLength(2);
    expect(lines[1].x2).toBeCloseTo(10);
    expect(lines[1].y2).toBeCloseTo(10);
  });

  it("G moves without drawing", () => {
    const { lines } = interpret("GF", 10, 90, 0);
    expect(lines).toHaveLength(1);
    expect(lines[0].x1).toBeCloseTo(10);
  });

  it("push/pop stack with brackets", () => {
    const { lines } = interpret("F[+F]-F", 10, 90, 0);
    expect(lines).toHaveLength(3);
    // After pop, third F draws from same position as end of first F
    expect(lines[2].x1).toBeCloseTo(lines[0].x2);
    expect(lines[2].y1).toBeCloseTo(lines[0].y2);
  });

  it("computes bounds", () => {
    const { bounds } = interpret("F+F+F+F", 10, 90, 0);
    expect(bounds.maxX).toBeGreaterThanOrEqual(0);
    expect(bounds.minY).toBeLessThanOrEqual(0);
  });

  it("handles presets without error", () => {
    const str = produce(presets.dragonCurve);
    const { lines } = interpret(str, 5, 90);
    expect(lines.length).toBeGreaterThan(0);
  });
});
