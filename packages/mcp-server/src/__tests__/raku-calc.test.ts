import { describe, it, expect } from "vitest";
import {
  firingTemperatureCelsius, heatingRateCPerMinute, firingTimeMinutes,
  reductionTimeMInutes, smokeIntensity, thermalShockRisk,
  cracklePatternDensity, carbonTrappingLikelihood, coolingMethodMinutes,
  reductionMaterials,
} from "../raku-calc.js";

describe("firingTemperatureCelsius", () => {
  it("returns 1000C", () => {
    expect(firingTemperatureCelsius()).toBe(1000);
  });
});

describe("heatingRateCPerMinute", () => {
  it("returns 15C per minute", () => {
    expect(heatingRateCPerMinute()).toBe(15);
  });
});

describe("firingTimeMinutes", () => {
  it("higher temp = longer firing", () => {
    expect(firingTimeMinutes(1000)).toBeGreaterThan(firingTimeMinutes(500));
  });
});

describe("reductionTimeMInutes", () => {
  it("sawdust takes longest", () => {
    expect(reductionTimeMInutes("sawdust")).toBeGreaterThan(
      reductionTimeMInutes("horsehair")
    );
  });
});

describe("smokeIntensity", () => {
  it("sawdust produces most smoke", () => {
    expect(smokeIntensity("sawdust")).toBeGreaterThan(smokeIntensity("horsehair"));
  });
});

describe("thermalShockRisk", () => {
  it("thin walls = highest risk", () => {
    expect(thermalShockRisk(2)).toBe(9);
  });
  it("thick walls = lowest risk", () => {
    expect(thermalShockRisk(8)).toBe(3);
  });
});

describe("cracklePatternDensity", () => {
  it("thinner glaze = denser crackle", () => {
    expect(cracklePatternDensity(0.5)).toBeGreaterThan(cracklePatternDensity(2));
  });
});

describe("carbonTrappingLikelihood", () => {
  it("horsehair best for carbon trapping", () => {
    expect(carbonTrappingLikelihood("horsehair")).toBeGreaterThan(
      carbonTrappingLikelihood("leaves")
    );
  });
});

describe("coolingMethodMinutes", () => {
  it("water is fastest", () => {
    expect(coolingMethodMinutes("water")).toBeLessThan(coolingMethodMinutes("sand"));
  });
});

describe("reductionMaterials", () => {
  it("returns 5 materials", () => {
    expect(reductionMaterials()).toHaveLength(5);
  });
});
