import { describe, it, expect } from "vitest";
import {
  temperatureCelsius, holdTimeMinutes, hardnessReductionHrc,
  toughnessGain, applicationSuitability, cycleCount, coolingMethod,
  heatingRateCPerMin, energyCostPerCycle, qualityCheckMethod, temperColors,
} from "../tempering-calc.js";

describe("temperatureCelsius", () => {
  it("blue hottest", () => {
    expect(temperatureCelsius("blue")).toBeGreaterThan(temperatureCelsius("pale_yellow"));
  });
});

describe("holdTimeMinutes", () => {
  it("positive hold time", () => {
    expect(holdTimeMinutes(10)).toBeGreaterThan(15);
  });
});

describe("hardnessReductionHrc", () => {
  it("blue most reduction", () => {
    expect(hardnessReductionHrc("blue")).toBeGreaterThan(hardnessReductionHrc("pale_yellow"));
  });
});

describe("toughnessGain", () => {
  it("blue most toughness", () => {
    expect(toughnessGain("blue")).toBeGreaterThan(toughnessGain("pale_yellow"));
  });
});

describe("applicationSuitability", () => {
  it("returns string", () => {
    expect(applicationSuitability("straw")).toBe("chisels");
  });
});

describe("cycleCount", () => {
  it("flexing most cycles", () => {
    expect(cycleCount("flexing")).toBeGreaterThan(cycleCount("cutting"));
  });
});

describe("coolingMethod", () => {
  it("blue uses oil", () => {
    expect(coolingMethod("blue")).toBe("oil");
  });
  it("straw uses air", () => {
    expect(coolingMethod("straw")).toBe("air");
  });
});

describe("heatingRateCPerMin", () => {
  it("thinner pieces heat faster", () => {
    expect(heatingRateCPerMin(5)).toBeGreaterThan(heatingRateCPerMin(20));
  });
});

describe("energyCostPerCycle", () => {
  it("positive cost", () => {
    expect(energyCostPerCycle(30, 5)).toBeGreaterThan(0);
  });
});

describe("qualityCheckMethod", () => {
  it("pale yellow uses file test", () => {
    expect(qualityCheckMethod("pale_yellow")).toBe("file_test");
  });
  it("purple uses bend test", () => {
    expect(qualityCheckMethod("purple")).toBe("bend_test");
  });
});

describe("temperColors", () => {
  it("returns 5 colors", () => {
    expect(temperColors()).toHaveLength(5);
  });
});
