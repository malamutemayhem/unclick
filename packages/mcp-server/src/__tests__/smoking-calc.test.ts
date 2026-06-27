import { describe, it, expect } from "vitest";
import {
  smokeTempCelsius, smokeTimeHoursPerKg, flavorIntensity, sweetness,
  woodChipsGPerHour, internalTempTargetCelsius, moistureLossPercent,
  shelfLifeDays, costPerKg, woodChips,
} from "../smoking-calc.js";

describe("smokeTempCelsius", () => {
  it("hot smoke is hotter than cold", () => {
    expect(smokeTempCelsius(false)).toBeGreaterThan(smokeTempCelsius(true));
  });
});

describe("smokeTimeHoursPerKg", () => {
  it("cold smoking takes longer", () => {
    expect(smokeTimeHoursPerKg(true)).toBeGreaterThan(
      smokeTimeHoursPerKg(false)
    );
  });
});

describe("flavorIntensity", () => {
  it("hickory has strongest flavor", () => {
    expect(flavorIntensity("hickory")).toBeGreaterThan(
      flavorIntensity("apple")
    );
  });
});

describe("sweetness", () => {
  it("apple is sweetest", () => {
    expect(sweetness("apple")).toBeGreaterThan(sweetness("mesquite"));
  });
});

describe("woodChipsGPerHour", () => {
  it("apple uses most chips", () => {
    expect(woodChipsGPerHour("apple")).toBeGreaterThan(
      woodChipsGPerHour("mesquite")
    );
  });
});

describe("internalTempTargetCelsius", () => {
  it("poultry needs higher temp", () => {
    expect(internalTempTargetCelsius(true)).toBeGreaterThan(
      internalTempTargetCelsius(false)
    );
  });
});

describe("moistureLossPercent", () => {
  it("hot smoking loses more moisture", () => {
    expect(moistureLossPercent(false)).toBeGreaterThan(
      moistureLossPercent(true)
    );
  });
});

describe("shelfLifeDays", () => {
  it("cold smoked lasts longer", () => {
    expect(shelfLifeDays(true)).toBeGreaterThan(shelfLifeDays(false));
  });
});

describe("costPerKg", () => {
  it("cherry is most expensive", () => {
    expect(costPerKg("cherry")).toBeGreaterThan(costPerKg("oak"));
  });
});

describe("woodChips", () => {
  it("returns 5 woods", () => {
    expect(woodChips()).toHaveLength(5);
  });
});
