import { describe, it, expect } from "vitest";
import {
  singleDie, multipleDice, probAtLeast, probAtMost, probExact,
  probBetween, advantageD20, disadvantageD20, dropLowest,
  explodingDice, successCount, parseDiceNotation, diceExpected,
  mode, standardDeviation,
} from "../dice-probability.js";

describe("singleDie", () => {
  it("d6 expected value 3.5", () => {
    expect(singleDie(6).expected).toBeCloseTo(3.5);
  });

  it("d6 has 6 outcomes", () => {
    expect(singleDie(6).distribution.size).toBe(6);
  });

  it("d20 min 1 max 20", () => {
    const r = singleDie(20);
    expect(r.min).toBe(1);
    expect(r.max).toBe(20);
  });
});

describe("multipleDice", () => {
  it("2d6 expected 7", () => {
    expect(multipleDice(2, 6).expected).toBeCloseTo(7);
  });

  it("2d6 min 2 max 12", () => {
    const r = multipleDice(2, 6);
    expect(r.min).toBe(2);
    expect(r.max).toBe(12);
  });

  it("probabilities sum to 1", () => {
    const r = multipleDice(3, 6);
    let total = 0;
    for (const [, p] of r.distribution) total += p;
    expect(total).toBeCloseTo(1);
  });
});

describe("probAtLeast / probAtMost / probExact / probBetween", () => {
  const d6 = singleDie(6);

  it("prob at least 1 is 1", () => {
    expect(probAtLeast(d6, 1)).toBeCloseTo(1);
  });

  it("prob at most 6 is 1", () => {
    expect(probAtMost(d6, 6)).toBeCloseTo(1);
  });

  it("prob exact 3 on d6", () => {
    expect(probExact(d6, 3)).toBeCloseTo(1 / 6);
  });

  it("prob between 2 and 5", () => {
    expect(probBetween(d6, 2, 5)).toBeCloseTo(4 / 6);
  });
});

describe("advantageD20 / disadvantageD20", () => {
  it("advantage expected > 10.5", () => {
    expect(advantageD20().expected).toBeGreaterThan(10.5);
  });

  it("disadvantage expected < 10.5", () => {
    expect(disadvantageD20().expected).toBeLessThan(10.5);
  });
});

describe("dropLowest", () => {
  it("4d6 drop 1 expected ~12.24", () => {
    const r = dropLowest(4, 6, 1);
    expect(r.expected).toBeGreaterThan(12);
    expect(r.expected).toBeLessThan(13);
  });
});

describe("explodingDice", () => {
  it("exploding d6 expected > 3.5", () => {
    expect(explodingDice(6).expected).toBeGreaterThan(3.5);
  });

  it("probabilities sum to ~1", () => {
    let total = 0;
    for (const [, p] of explodingDice(6).distribution) total += p;
    expect(total).toBeCloseTo(1, 2);
  });
});

describe("successCount", () => {
  it("5d6 threshold 5 expected ~1.67", () => {
    const r = successCount(5, 6, 5);
    expect(r.expected).toBeCloseTo(5 / 3, 1);
  });
});

describe("parseDiceNotation", () => {
  it("parses 2d6+3", () => {
    const p = parseDiceNotation("2d6+3");
    expect(p.count).toBe(2);
    expect(p.sides).toBe(6);
    expect(p.modifier).toBe(3);
  });

  it("parses 1d20", () => {
    const p = parseDiceNotation("1d20");
    expect(p.count).toBe(1);
    expect(p.sides).toBe(20);
    expect(p.modifier).toBe(0);
  });
});

describe("diceExpected", () => {
  it("2d6+3 = 10", () => {
    expect(diceExpected("2d6+3")).toBeCloseTo(10);
  });
});

describe("mode", () => {
  it("2d6 mode is 7", () => {
    const r = multipleDice(2, 6);
    expect(mode(r)).toContain(7);
  });
});

describe("standardDeviation", () => {
  it("d6 sd ~1.71", () => {
    expect(standardDeviation(singleDie(6))).toBeCloseTo(1.707, 1);
  });
});
