import { describe, it, expect } from "vitest";
import {
  tempCelsius, timeHoursPerKg, moistureTargetPercent, nutrientRetentionPercent,
  weightReductionPercent, shelfLifeMonths, energyCost, textureQuality,
  costPerKg, dehydrationMethods,
} from "../dehydration-calc.js";

describe("tempCelsius", () => {
  it("freeze drying uses lowest temp", () => {
    expect(tempCelsius("freeze_drying")).toBeLessThan(tempCelsius("oven"));
  });
});

describe("timeHoursPerKg", () => {
  it("air drying takes longest", () => {
    expect(timeHoursPerKg("air_drying")).toBeGreaterThan(
      timeHoursPerKg("oven")
    );
  });
});

describe("moistureTargetPercent", () => {
  it("freeze drying removes most moisture", () => {
    expect(moistureTargetPercent("freeze_drying")).toBeLessThan(
      moistureTargetPercent("air_drying")
    );
  });
});

describe("nutrientRetentionPercent", () => {
  it("freeze drying retains most nutrients", () => {
    expect(nutrientRetentionPercent("freeze_drying")).toBeGreaterThan(
      nutrientRetentionPercent("oven")
    );
  });
});

describe("weightReductionPercent", () => {
  it("freeze drying reduces weight most", () => {
    expect(weightReductionPercent("freeze_drying")).toBeGreaterThan(
      weightReductionPercent("air_drying")
    );
  });
});

describe("shelfLifeMonths", () => {
  it("freeze dried lasts longest", () => {
    expect(shelfLifeMonths("freeze_drying")).toBeGreaterThan(
      shelfLifeMonths("air_drying")
    );
  });
});

describe("energyCost", () => {
  it("sun drying uses no energy", () => {
    expect(energyCost("sun_drying")).toBe(0);
  });
});

describe("textureQuality", () => {
  it("freeze drying has best texture", () => {
    expect(textureQuality("freeze_drying")).toBeGreaterThan(
      textureQuality("oven")
    );
  });
});

describe("costPerKg", () => {
  it("freeze drying is most expensive", () => {
    expect(costPerKg("freeze_drying")).toBeGreaterThan(
      costPerKg("air_drying")
    );
  });
});

describe("dehydrationMethods", () => {
  it("returns 5 methods", () => {
    expect(dehydrationMethods()).toHaveLength(5);
  });
});
