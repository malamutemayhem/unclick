import { describe, it, expect } from "vitest";
import {
  fallSpeedMs, formationTempCelsius, accumulationRate,
  drivingHazard, cropDamage, frozen,
  freezesOnContact, typicalCloudType, averageDurationHours, precipitationTypes,
} from "../precipitation-type-calc.js";

describe("fallSpeedMs", () => {
  it("hail falls fastest", () => {
    expect(fallSpeedMs("hail")).toBeGreaterThan(fallSpeedMs("snow"));
  });
});

describe("formationTempCelsius", () => {
  it("hail forms at coldest temp", () => {
    expect(formationTempCelsius("hail")).toBeLessThan(
      formationTempCelsius("rain")
    );
  });
});

describe("accumulationRate", () => {
  it("rain accumulates fastest", () => {
    expect(accumulationRate("rain")).toBeGreaterThan(
      accumulationRate("hail")
    );
  });
});

describe("drivingHazard", () => {
  it("freezing rain is worst for driving", () => {
    expect(drivingHazard("freezing_rain")).toBeGreaterThan(
      drivingHazard("rain")
    );
  });
});

describe("cropDamage", () => {
  it("hail damages crops most", () => {
    expect(cropDamage("hail")).toBeGreaterThan(cropDamage("rain"));
  });
});

describe("frozen", () => {
  it("snow is frozen", () => {
    expect(frozen("snow")).toBe(true);
  });
  it("rain is not frozen", () => {
    expect(frozen("rain")).toBe(false);
  });
});

describe("freezesOnContact", () => {
  it("freezing rain freezes on contact", () => {
    expect(freezesOnContact("freezing_rain")).toBe(true);
  });
  it("hail does not freeze on contact", () => {
    expect(freezesOnContact("hail")).toBe(false);
  });
});

describe("typicalCloudType", () => {
  it("hail from cumulonimbus", () => {
    expect(typicalCloudType("hail")).toBe("cumulonimbus");
  });
});

describe("averageDurationHours", () => {
  it("snow lasts longest", () => {
    expect(averageDurationHours("snow")).toBeGreaterThan(
      averageDurationHours("hail")
    );
  });
});

describe("precipitationTypes", () => {
  it("returns 5 types", () => {
    expect(precipitationTypes()).toHaveLength(5);
  });
});
