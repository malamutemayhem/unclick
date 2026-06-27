import { describe, it, expect } from "vitest";
import {
  compressiveStrengthMpa, firingTempCelsius, waterAbsorptionPercent,
  thermalMass, frostResistance, sunDried,
  bestApplication, lifespanYears, costPer1000, clayBricks,
} from "../clay-brick-calc.js";

describe("compressiveStrengthMpa", () => {
  it("engineering brick is strongest", () => {
    expect(compressiveStrengthMpa("engineering")).toBeGreaterThan(
      compressiveStrengthMpa("adobe")
    );
  });
});

describe("firingTempCelsius", () => {
  it("firebrick fires hottest", () => {
    expect(firingTempCelsius("firebrick")).toBeGreaterThan(
      firingTempCelsius("common")
    );
  });
});

describe("waterAbsorptionPercent", () => {
  it("adobe absorbs most water", () => {
    expect(waterAbsorptionPercent("adobe")).toBeGreaterThan(
      waterAbsorptionPercent("engineering")
    );
  });
});

describe("thermalMass", () => {
  it("firebrick has highest thermal mass", () => {
    expect(thermalMass("firebrick")).toBeGreaterThan(
      thermalMass("common")
    );
  });
});

describe("frostResistance", () => {
  it("engineering resists frost best", () => {
    expect(frostResistance("engineering")).toBeGreaterThan(
      frostResistance("adobe")
    );
  });
});

describe("sunDried", () => {
  it("adobe is sun dried", () => {
    expect(sunDried("adobe")).toBe(true);
  });
  it("common brick is not sun dried", () => {
    expect(sunDried("common")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("firebrick best for kilns", () => {
    expect(bestApplication("firebrick")).toBe("kilns");
  });
});

describe("lifespanYears", () => {
  it("engineering lasts longest", () => {
    expect(lifespanYears("engineering")).toBeGreaterThan(
      lifespanYears("firebrick")
    );
  });
});

describe("costPer1000", () => {
  it("firebrick costs most", () => {
    expect(costPer1000("firebrick")).toBeGreaterThan(
      costPer1000("adobe")
    );
  });
});

describe("clayBricks", () => {
  it("returns 5 types", () => {
    expect(clayBricks()).toHaveLength(5);
  });
});
