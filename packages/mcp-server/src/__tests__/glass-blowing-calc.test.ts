import { describe, it, expect } from "vitest";
import {
  workingTempCelsius, gatherWeightKg, workingTimeSeconds, clarityRating,
  thermalShockResistance, colorRange, refractiveIndex, blowpipeRequired,
  costPerKg, glassTypes,
} from "../glass-blowing-calc.js";

describe("workingTempCelsius", () => {
  it("borosilicate works hottest", () => {
    expect(workingTempCelsius("borosilicate")).toBeGreaterThan(
      workingTempCelsius("lead_crystal")
    );
  });
});

describe("gatherWeightKg", () => {
  it("lead crystal is heaviest gather", () => {
    expect(gatherWeightKg("lead_crystal")).toBeGreaterThan(
      gatherWeightKg("art_glass")
    );
  });
});

describe("workingTimeSeconds", () => {
  it("borosilicate gives longest working time", () => {
    expect(workingTimeSeconds("borosilicate")).toBeGreaterThan(
      workingTimeSeconds("lead_crystal")
    );
  });
});

describe("clarityRating", () => {
  it("lead crystal is clearest", () => {
    expect(clarityRating("lead_crystal")).toBeGreaterThan(
      clarityRating("bottle_glass")
    );
  });
});

describe("thermalShockResistance", () => {
  it("borosilicate resists shock best", () => {
    expect(thermalShockResistance("borosilicate")).toBeGreaterThan(
      thermalShockResistance("lead_crystal")
    );
  });
});

describe("colorRange", () => {
  it("art glass has widest color range", () => {
    expect(colorRange("art_glass")).toBeGreaterThan(
      colorRange("bottle_glass")
    );
  });
});

describe("refractiveIndex", () => {
  it("lead crystal has highest refractive index", () => {
    expect(refractiveIndex("lead_crystal")).toBeGreaterThan(
      refractiveIndex("borosilicate")
    );
  });
});

describe("blowpipeRequired", () => {
  it("always required", () => {
    expect(blowpipeRequired("soda_lime")).toBe(true);
  });
});

describe("costPerKg", () => {
  it("art glass is most expensive", () => {
    expect(costPerKg("art_glass")).toBeGreaterThan(
      costPerKg("bottle_glass")
    );
  });
});

describe("glassTypes", () => {
  it("returns 5 types", () => {
    expect(glassTypes()).toHaveLength(5);
  });
});
