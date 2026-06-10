import { describe, it, expect } from "vitest";
import {
  extractionDays, colorDepth, lighfastnessRating,
  vatTempCelsius, dipsRequired, fermentationRequired,
  yieldGramsPerKg, culturalRegion, costPerKg, indigoSources,
} from "../indigo-dye-calc.js";

describe("extractionDays", () => {
  it("sukumo takes longest", () => {
    expect(extractionDays("sukumo")).toBeGreaterThan(
      extractionDays("indigofera")
    );
  });
});

describe("colorDepth", () => {
  it("synthetic has deepest color", () => {
    expect(colorDepth("synthetic")).toBeGreaterThan(
      colorDepth("woad_plant")
    );
  });
});

describe("lighfastnessRating", () => {
  it("synthetic has best lightfastness", () => {
    expect(lighfastnessRating("synthetic")).toBeGreaterThan(
      lighfastnessRating("woad_plant")
    );
  });
});

describe("vatTempCelsius", () => {
  it("woad plant needs highest temp", () => {
    expect(vatTempCelsius("woad_plant")).toBeGreaterThan(
      vatTempCelsius("synthetic")
    );
  });
});

describe("dipsRequired", () => {
  it("woad plant needs most dips", () => {
    expect(dipsRequired("woad_plant")).toBeGreaterThan(
      dipsRequired("synthetic")
    );
  });
});

describe("fermentationRequired", () => {
  it("indigofera needs fermentation", () => {
    expect(fermentationRequired("indigofera")).toBe(true);
  });
  it("synthetic does not", () => {
    expect(fermentationRequired("synthetic")).toBe(false);
  });
});

describe("yieldGramsPerKg", () => {
  it("synthetic yields most", () => {
    expect(yieldGramsPerKg("synthetic")).toBeGreaterThan(
      yieldGramsPerKg("indigofera")
    );
  });
});

describe("culturalRegion", () => {
  it("sukumo is from japan", () => {
    expect(culturalRegion("sukumo")).toBe("japan");
  });
});

describe("costPerKg", () => {
  it("sukumo is most expensive", () => {
    expect(costPerKg("sukumo")).toBeGreaterThan(
      costPerKg("synthetic")
    );
  });
});

describe("indigoSources", () => {
  it("returns 5 sources", () => {
    expect(indigoSources()).toHaveLength(5);
  });
});
