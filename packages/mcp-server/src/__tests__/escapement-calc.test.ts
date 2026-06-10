import { describe, it, expect } from "vitest";
import {
  beatRate, pendulumPeriod, escapeWheelTeeth, dropAngle,
  impulseAngle, palletSpan, accuracy, mainspringTurns,
  oilInterval, tickVolume, escapementTypes,
} from "../escapement-calc.js";

describe("beatRate", () => {
  it("2x frequency", () => {
    expect(beatRate(0.5)).toBe(1);
  });
});

describe("pendulumPeriod", () => {
  it("~2s for 1m", () => {
    expect(pendulumPeriod(1)).toBeCloseTo(2, 0);
  });
  it("zero length = 0", () => {
    expect(pendulumPeriod(0)).toBe(0);
  });
});

describe("escapeWheelTeeth", () => {
  it("verge = 13", () => {
    expect(escapeWheelTeeth("verge")).toBe(13);
  });
  it("anchor = 30", () => {
    expect(escapeWheelTeeth("anchor")).toBe(30);
  });
});

describe("dropAngle", () => {
  it("grasshopper smallest", () => {
    expect(dropAngle("grasshopper")).toBeLessThan(dropAngle("verge"));
  });
});

describe("impulseAngle", () => {
  it("positive degrees", () => {
    expect(impulseAngle(30)).toBeGreaterThan(0);
  });
  it("zero teeth = 0", () => {
    expect(impulseAngle(0)).toBe(0);
  });
});

describe("palletSpan", () => {
  it("positive span", () => {
    expect(palletSpan(30, 50)).toBeGreaterThan(0);
  });
  it("zero teeth = 0", () => {
    expect(palletSpan(0, 50)).toBe(0);
  });
});

describe("accuracy", () => {
  it("grasshopper best", () => {
    expect(accuracy("grasshopper")).toBeLessThan(accuracy("verge"));
  });
});

describe("mainspringTurns", () => {
  it("positive turns", () => {
    expect(mainspringTurns(48, 6)).toBeGreaterThan(0);
  });
  it("zero ratio = 0", () => {
    expect(mainspringTurns(48, 0)).toBe(0);
  });
});

describe("oilInterval", () => {
  it("grasshopper longest", () => {
    expect(oilInterval("grasshopper")).toBeGreaterThan(oilInterval("verge"));
  });
});

describe("tickVolume", () => {
  it("positive value", () => {
    expect(tickVolume(30, 1.5)).toBeGreaterThan(0);
  });
});

describe("escapementTypes", () => {
  it("returns 6 types", () => {
    expect(escapementTypes()).toHaveLength(6);
  });
});
