import { describe, it, expect } from "vitest";
import {
  whorlWeightG, shaftLengthCm, yarnOutputGPerHour, twistPerCm,
  spinDirectionS, drafTingZoneCm, yarnCountNe, plyStrengthMultiplier,
  dailyOutputG, spindleCost, spindleFibers,
} from "../spindle-calc.js";

describe("whorlWeightG", () => {
  it("hemp heaviest", () => {
    expect(whorlWeightG("hemp")).toBeGreaterThan(whorlWeightG("silk"));
  });
});

describe("shaftLengthCm", () => {
  it("hemp longest", () => {
    expect(shaftLengthCm("hemp")).toBeGreaterThan(shaftLengthCm("silk"));
  });
});

describe("yarnOutputGPerHour", () => {
  it("wool fastest", () => {
    expect(yarnOutputGPerHour("wool")).toBeGreaterThan(yarnOutputGPerHour("silk"));
  });
});

describe("twistPerCm", () => {
  it("silk most twist", () => {
    expect(twistPerCm("silk")).toBeGreaterThan(twistPerCm("hemp"));
  });
});

describe("spinDirectionS", () => {
  it("cotton is S-twist", () => {
    expect(spinDirectionS("cotton")).toBe(true);
  });
  it("wool is Z-twist", () => {
    expect(spinDirectionS("wool")).toBe(false);
  });
});

describe("drafTingZoneCm", () => {
  it("1.5x staple length", () => {
    expect(drafTingZoneCm(10)).toBe(15);
  });
});

describe("yarnCountNe", () => {
  it("positive count", () => {
    expect(yarnCountNe(20)).toBeGreaterThan(0);
  });
  it("zero diameter = 0", () => {
    expect(yarnCountNe(0)).toBe(0);
  });
});

describe("plyStrengthMultiplier", () => {
  it("increases with ply count", () => {
    expect(plyStrengthMultiplier(4)).toBeGreaterThan(plyStrengthMultiplier(1));
  });
});

describe("dailyOutputG", () => {
  it("positive output", () => {
    expect(dailyOutputG(8, "wool")).toBeGreaterThan(0);
  });
});

describe("spindleCost", () => {
  it("metal most expensive", () => {
    expect(spindleCost("metal")).toBeGreaterThan(spindleCost("clay"));
  });
});

describe("spindleFibers", () => {
  it("returns 5 fibers", () => {
    expect(spindleFibers()).toHaveLength(5);
  });
});
