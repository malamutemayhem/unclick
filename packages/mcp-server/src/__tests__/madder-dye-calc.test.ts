import { describe, it, expect } from "vitest";
import {
  rootAgeYears, colorHue, lightfastness,
  mordantRequired, dyeBathTempCelsius, alizarinPercent,
  yieldGramsPerKgRoot, washFastness, costPerKg, madderSpecies,
} from "../madder-dye-calc.js";

describe("rootAgeYears", () => {
  it("morinda takes longest to mature", () => {
    expect(rootAgeYears("morinda")).toBeGreaterThan(
      rootAgeYears("galium")
    );
  });
});

describe("colorHue", () => {
  it("rubia tinctorum produces turkey red", () => {
    expect(colorHue("rubia_tinctorum")).toBe("turkey_red");
  });
});

describe("lightfastness", () => {
  it("morinda has best lightfastness", () => {
    expect(lightfastness("morinda")).toBeGreaterThan(
      lightfastness("galium")
    );
  });
});

describe("mordantRequired", () => {
  it("all madder species need mordant", () => {
    expect(mordantRequired("rubia_tinctorum")).toBe(true);
    expect(mordantRequired("galium")).toBe(true);
  });
});

describe("dyeBathTempCelsius", () => {
  it("morinda needs highest temp", () => {
    expect(dyeBathTempCelsius("morinda")).toBeGreaterThan(
      dyeBathTempCelsius("galium")
    );
  });
});

describe("alizarinPercent", () => {
  it("rubia tinctorum has most alizarin", () => {
    expect(alizarinPercent("rubia_tinctorum")).toBeGreaterThan(
      alizarinPercent("galium")
    );
  });
});

describe("yieldGramsPerKgRoot", () => {
  it("rubia tinctorum yields most", () => {
    expect(yieldGramsPerKgRoot("rubia_tinctorum")).toBeGreaterThan(
      yieldGramsPerKgRoot("galium")
    );
  });
});

describe("washFastness", () => {
  it("morinda has best wash fastness", () => {
    expect(washFastness("morinda")).toBeGreaterThan(
      washFastness("galium")
    );
  });
});

describe("costPerKg", () => {
  it("morinda is most expensive", () => {
    expect(costPerKg("morinda")).toBeGreaterThan(
      costPerKg("galium")
    );
  });
});

describe("madderSpecies", () => {
  it("returns 5 species", () => {
    expect(madderSpecies()).toHaveLength(5);
  });
});
