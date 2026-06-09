import { describe, it, expect } from "vitest";
import {
  dartScore, createDart, parseDart, formatDart,
  createLeg, throwDart, checkoutOptions, isCheckoutPossible,
  highestCheckout, averageDarts, threeDartAverage,
  maxSingleDart, maxThreeDarts, is180, tonPlus,
  nineDarter, standardGameScores,
} from "../darts-score.js";

describe("dartScore", () => {
  it("single 20 = 20", () => {
    expect(dartScore(createDart("S", 20))).toBe(20);
  });

  it("double 20 = 40", () => {
    expect(dartScore(createDart("D", 20))).toBe(40);
  });

  it("triple 20 = 60", () => {
    expect(dartScore(createDart("T", 20))).toBe(60);
  });

  it("bullseye = 25", () => {
    expect(dartScore(createDart("B", 25))).toBe(25);
  });

  it("double bull = 50", () => {
    expect(dartScore(createDart("DB", 50))).toBe(50);
  });
});

describe("parseDart / formatDart", () => {
  it("parses T20", () => {
    const d = parseDart("T20");
    expect(d.segment).toBe("T");
    expect(d.number).toBe(20);
  });

  it("parses DB", () => {
    expect(parseDart("DB").segment).toBe("DB");
  });

  it("formats dart", () => {
    expect(formatDart(createDart("T", 20))).toBe("T20");
  });
});

describe("createLeg / throwDart", () => {
  it("starts at given score", () => {
    const leg = createLeg(501);
    expect(leg.remaining).toBe(501);
  });

  it("reduces score on hit", () => {
    const leg = createLeg(501);
    const after = throwDart(leg, createDart("T", 20));
    expect(after.remaining).toBe(441);
  });

  it("bust on going below 0", () => {
    const leg = createLeg(10);
    const after = throwDart(leg, createDart("T", 20));
    expect(after.remaining).toBe(10);
  });

  it("finishes on double out", () => {
    const leg = createLeg(40);
    const after = throwDart(leg, createDart("D", 20));
    expect(after.isFinished).toBe(true);
  });

  it("bust on single out", () => {
    const leg = createLeg(20);
    const after = throwDart(leg, createDart("S", 20));
    expect(after.isFinished).toBe(false);
    expect(after.remaining).toBe(20);
  });
});

describe("checkoutOptions", () => {
  it("D20 for 40", () => {
    const opts = checkoutOptions(40);
    expect(opts.length).toBeGreaterThan(0);
    expect(opts.some(o => o.length === 1 && o[0].segment === "D" && o[0].number === 20)).toBe(true);
  });

  it("no checkout for 171", () => {
    expect(checkoutOptions(171).length).toBe(0);
  });
});

describe("isCheckoutPossible", () => {
  it("true for 170", () => {
    expect(isCheckoutPossible(170)).toBe(true);
  });

  it("false for 1", () => {
    expect(isCheckoutPossible(1)).toBe(false);
  });

  it("false for 169", () => {
    expect(isCheckoutPossible(169)).toBe(false);
  });
});

describe("averageDarts / threeDartAverage", () => {
  it("computes average", () => {
    let leg = createLeg(501);
    leg = throwDart(leg, createDart("T", 20));
    leg = throwDart(leg, createDart("T", 20));
    leg = throwDart(leg, createDart("T", 20));
    expect(averageDarts(leg)).toBeCloseTo(60);
    expect(threeDartAverage(leg)).toBeCloseTo(180);
  });
});

describe("constants", () => {
  it("highest checkout is 170", () => {
    expect(highestCheckout()).toBe(170);
  });

  it("max single dart is 60", () => {
    expect(maxSingleDart()).toBe(60);
  });

  it("max three darts is 180", () => {
    expect(maxThreeDarts()).toBe(180);
  });
});

describe("is180 / tonPlus", () => {
  it("triple 20 x3 is 180", () => {
    expect(is180(createDart("T", 20), createDart("T", 20), createDart("T", 20))).toBe(true);
  });

  it("T20+T20+T20 is ton plus", () => {
    expect(tonPlus(createDart("T", 20), createDart("T", 20), createDart("T", 20))).toBe(true);
  });
});

describe("nineDarter", () => {
  it("sums to 501", () => {
    const darts = nineDarter();
    const total = darts.reduce((acc, d) => acc + dartScore(d), 0);
    expect(total).toBe(501);
    expect(darts.length).toBe(9);
  });
});

describe("standardGameScores", () => {
  it("includes 501", () => {
    expect(standardGameScores()).toContain(501);
  });
});
