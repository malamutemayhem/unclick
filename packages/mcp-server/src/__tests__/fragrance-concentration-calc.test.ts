import { describe, it, expect } from "vitest";
import {
  oilPercentage, longevityRating, projectionLevel, pricePerMl,
  skinSensitivity, dailyWearSuitable, reapplicationNeeded,
  applicationMethod, typicalBottleSize, fragranceConcentrations,
} from "../fragrance-concentration-calc.js";

describe("oilPercentage", () => {
  it("parfum highest oil percentage", () => {
    expect(oilPercentage("parfum")).toBeGreaterThan(oilPercentage("body_mist"));
  });
});

describe("longevityRating", () => {
  it("parfum lasts longest", () => {
    expect(longevityRating("parfum")).toBeGreaterThan(longevityRating("edt"));
  });
});

describe("projectionLevel", () => {
  it("parfum strongest projection", () => {
    expect(projectionLevel("parfum")).toBeGreaterThan(projectionLevel("body_mist"));
  });
});

describe("pricePerMl", () => {
  it("parfum most expensive per ml", () => {
    expect(pricePerMl("parfum")).toBeGreaterThan(pricePerMl("cologne"));
  });
});

describe("skinSensitivity", () => {
  it("parfum highest skin sensitivity risk", () => {
    expect(skinSensitivity("parfum")).toBeGreaterThan(skinSensitivity("body_mist"));
  });
});

describe("dailyWearSuitable", () => {
  it("edt suitable for daily", () => {
    expect(dailyWearSuitable("edt")).toBe(true);
  });
  it("parfum not for daily", () => {
    expect(dailyWearSuitable("parfum")).toBe(false);
  });
});

describe("reapplicationNeeded", () => {
  it("body mist needs reapplication", () => {
    expect(reapplicationNeeded("body_mist")).toBe(true);
  });
  it("parfum does not", () => {
    expect(reapplicationNeeded("parfum")).toBe(false);
  });
});

describe("applicationMethod", () => {
  it("parfum dab on pulse points", () => {
    expect(applicationMethod("parfum")).toBe("dab_pulse_points");
  });
});

describe("typicalBottleSize", () => {
  it("body mist largest bottle", () => {
    expect(typicalBottleSize("body_mist")).toBe("200ml_250ml");
  });
});

describe("fragranceConcentrations", () => {
  it("returns 5 concentrations", () => {
    expect(fragranceConcentrations()).toHaveLength(5);
  });
});
