import { describe, it, expect } from "vitest";
import {
  bladeLengthCm, snathLengthCm, mowingRateM2PerHour, honingIntervalMinutes,
  peeningIntervalHours, bladeWeightG, handleGripCount, optimalMowingAngleDeg,
  costEstimate, scytheStyles,
} from "../scythe-calc.js";

describe("bladeLengthCm", () => {
  it("american has longest blade", () => {
    expect(bladeLengthCm("american")).toBeGreaterThan(bladeLengthCm("ditch"));
  });
});

describe("snathLengthCm", () => {
  it("taller person = longer snath", () => {
    expect(snathLengthCm(180)).toBeGreaterThan(snathLengthCm(160));
  });
});

describe("mowingRateM2PerHour", () => {
  it("austrian mows fastest", () => {
    expect(mowingRateM2PerHour("austrian")).toBeGreaterThan(mowingRateM2PerHour("ditch"));
  });
});

describe("honingIntervalMinutes", () => {
  it("tough grass needs more frequent honing", () => {
    expect(honingIntervalMinutes("tough")).toBeLessThan(honingIntervalMinutes("soft"));
  });
});

describe("peeningIntervalHours", () => {
  it("turkish needs most frequent peening", () => {
    expect(peeningIntervalHours("turkish")).toBeLessThan(peeningIntervalHours("ditch"));
  });
});

describe("bladeWeightG", () => {
  it("american blade is heaviest", () => {
    expect(bladeWeightG("american")).toBeGreaterThan(bladeWeightG("turkish"));
  });
});

describe("handleGripCount", () => {
  it("turkish has one grip", () => {
    expect(handleGripCount("turkish")).toBe(1);
  });
});

describe("optimalMowingAngleDeg", () => {
  it("returns 30 degrees", () => {
    expect(optimalMowingAngleDeg()).toBe(30);
  });
});

describe("costEstimate", () => {
  it("austrian is most expensive", () => {
    expect(costEstimate("austrian")).toBeGreaterThan(costEstimate("turkish"));
  });
});

describe("scytheStyles", () => {
  it("returns 5 styles", () => {
    expect(scytheStyles()).toHaveLength(5);
  });
});
