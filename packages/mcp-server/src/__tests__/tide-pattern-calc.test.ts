import { describe, it, expect } from "vitest";
import {
  cyclesPerDay, amplitudeMeters, predictability,
  lunarInfluence, currentStrength, windDriven,
  bestActivity, navigationHazard, commonRegion, tideTypes,
} from "../tide-pattern-calc.js";

describe("cyclesPerDay", () => {
  it("semidiurnal has 2 cycles per day", () => {
    expect(cyclesPerDay("semidiurnal")).toBe(2);
  });
});

describe("amplitudeMeters", () => {
  it("semidiurnal has highest amplitude", () => {
    expect(amplitudeMeters("semidiurnal")).toBeGreaterThan(
      amplitudeMeters("neap")
    );
  });
});

describe("predictability", () => {
  it("semidiurnal is most predictable", () => {
    expect(predictability("semidiurnal")).toBeGreaterThan(
      predictability("meteorological")
    );
  });
});

describe("lunarInfluence", () => {
  it("semidiurnal has most lunar influence", () => {
    expect(lunarInfluence("semidiurnal")).toBeGreaterThan(
      lunarInfluence("meteorological")
    );
  });
});

describe("currentStrength", () => {
  it("semidiurnal has strongest current", () => {
    expect(currentStrength("semidiurnal")).toBeGreaterThan(
      currentStrength("neap")
    );
  });
});

describe("windDriven", () => {
  it("meteorological is wind driven", () => {
    expect(windDriven("meteorological")).toBe(true);
  });
  it("semidiurnal is not wind driven", () => {
    expect(windDriven("semidiurnal")).toBe(false);
  });
});

describe("bestActivity", () => {
  it("neap tides best for scuba diving", () => {
    expect(bestActivity("neap")).toBe("scuba_diving");
  });
});

describe("navigationHazard", () => {
  it("meteorological is biggest navigation hazard", () => {
    expect(navigationHazard("meteorological")).toBeGreaterThan(
      navigationHazard("neap")
    );
  });
});

describe("commonRegion", () => {
  it("diurnal common in gulf of mexico", () => {
    expect(commonRegion("diurnal")).toBe("gulf_of_mexico");
  });
});

describe("tideTypes", () => {
  it("returns 5 types", () => {
    expect(tideTypes()).toHaveLength(5);
  });
});
