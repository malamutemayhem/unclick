import { describe, it, expect } from "vitest";
import {
  maxTempCelsius, thermalShockResistance, firingCycles,
  weightKg, porosity, fumingEffect,
  handBuildable, bestUse, costPerUnit, saggerMaterials,
} from "../sagger-firing-calc.js";

describe("maxTempCelsius", () => {
  it("silicon carbide handles highest temp", () => {
    expect(maxTempCelsius("silicon_carbide")).toBeGreaterThan(
      maxTempCelsius("clay")
    );
  });
});

describe("thermalShockResistance", () => {
  it("cordierite resists thermal shock best", () => {
    expect(thermalShockResistance("cordierite")).toBeGreaterThan(
      thermalShockResistance("clay")
    );
  });
});

describe("firingCycles", () => {
  it("silicon carbide lasts most cycles", () => {
    expect(firingCycles("silicon_carbide")).toBeGreaterThan(
      firingCycles("clay")
    );
  });
});

describe("weightKg", () => {
  it("silicon carbide is heaviest", () => {
    expect(weightKg("silicon_carbide")).toBeGreaterThan(
      weightKg("clay")
    );
  });
});

describe("porosity", () => {
  it("clay is most porous", () => {
    expect(porosity("clay")).toBeGreaterThan(
      porosity("silicon_carbide")
    );
  });
});

describe("fumingEffect", () => {
  it("clay allows fuming", () => {
    expect(fumingEffect("clay")).toBe(true);
  });
  it("silicon carbide does not", () => {
    expect(fumingEffect("silicon_carbide")).toBe(false);
  });
});

describe("handBuildable", () => {
  it("stoneware is hand buildable", () => {
    expect(handBuildable("stoneware")).toBe(true);
  });
  it("mullite is not", () => {
    expect(handBuildable("mullite")).toBe(false);
  });
});

describe("bestUse", () => {
  it("cordierite is best for thermal cycling", () => {
    expect(bestUse("cordierite")).toBe("thermal_cycling");
  });
});

describe("costPerUnit", () => {
  it("silicon carbide costs most", () => {
    expect(costPerUnit("silicon_carbide")).toBeGreaterThan(
      costPerUnit("clay")
    );
  });
});

describe("saggerMaterials", () => {
  it("returns 5 materials", () => {
    expect(saggerMaterials()).toHaveLength(5);
  });
});
