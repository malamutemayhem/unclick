import { describe, it, expect } from "vitest";
import {
  peakTempCelsius, firingHours, atmosphereControl,
  surfaceEffects, fuelType, predictability,
  environmentalImpact, skillRequired, costPerFiring, firingTypes,
} from "../kiln-firing-calc.js";

describe("peakTempCelsius", () => {
  it("wood fired reaches highest temp", () => {
    expect(peakTempCelsius("wood_fired")).toBeGreaterThan(
      peakTempCelsius("oxidation")
    );
  });
});

describe("firingHours", () => {
  it("wood fired takes longest", () => {
    expect(firingHours("wood_fired")).toBeGreaterThan(
      firingHours("oxidation")
    );
  });
});

describe("atmosphereControl", () => {
  it("reduction has best atmosphere control", () => {
    expect(atmosphereControl("reduction")).toBeGreaterThan(
      atmosphereControl("wood_fired")
    );
  });
});

describe("surfaceEffects", () => {
  it("wood fired has most surface effects", () => {
    expect(surfaceEffects("wood_fired")).toBeGreaterThan(
      surfaceEffects("oxidation")
    );
  });
});

describe("fuelType", () => {
  it("oxidation uses electric", () => {
    expect(fuelType("oxidation")).toBe("electric");
  });
});

describe("predictability", () => {
  it("oxidation is most predictable", () => {
    expect(predictability("oxidation")).toBeGreaterThan(
      predictability("wood_fired")
    );
  });
});

describe("environmentalImpact", () => {
  it("salt has highest environmental impact", () => {
    expect(environmentalImpact("salt")).toBeGreaterThan(
      environmentalImpact("oxidation")
    );
  });
});

describe("skillRequired", () => {
  it("wood fired needs most skill", () => {
    expect(skillRequired("wood_fired")).toBeGreaterThan(
      skillRequired("oxidation")
    );
  });
});

describe("costPerFiring", () => {
  it("wood fired costs most", () => {
    expect(costPerFiring("wood_fired")).toBeGreaterThan(
      costPerFiring("oxidation")
    );
  });
});

describe("firingTypes", () => {
  it("returns 5 types", () => {
    expect(firingTypes()).toHaveLength(5);
  });
});
