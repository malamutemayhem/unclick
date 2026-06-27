import { describe, it, expect } from "vitest";
import {
  coastlineAccuracyKm, rhumbLineCount, portsCatalogued,
  vellumSizeCm2, colorPigmentsUsed, compassRoseIncluded,
  productionWeeks, seaCoverageRegions, estimatedSurvivingCount, portolanEras,
} from "../portolan-chart-calc.js";

describe("coastlineAccuracyKm", () => {
  it("14c peak is most accurate", () => {
    expect(coastlineAccuracyKm("14c_peak")).toBeLessThan(
      coastlineAccuracyKm("early_13c")
    );
  });
});

describe("rhumbLineCount", () => {
  it("14c peak has most rhumb lines", () => {
    expect(rhumbLineCount("14c_peak")).toBeGreaterThan(
      rhumbLineCount("early_13c")
    );
  });
});

describe("portsCatalogued", () => {
  it("15c expansion catalogues most ports", () => {
    expect(portsCatalogued("15c_expansion")).toBeGreaterThan(
      portsCatalogued("early_13c")
    );
  });
});

describe("vellumSizeCm2", () => {
  it("15c expansion uses largest vellum", () => {
    expect(vellumSizeCm2("15c_expansion")).toBeGreaterThan(
      vellumSizeCm2("early_13c")
    );
  });
});

describe("colorPigmentsUsed", () => {
  it("15c expansion uses most pigments", () => {
    expect(colorPigmentsUsed("15c_expansion")).toBeGreaterThan(
      colorPigmentsUsed("early_13c")
    );
  });
});

describe("compassRoseIncluded", () => {
  it("14c peak includes compass rose", () => {
    expect(compassRoseIncluded("14c_peak")).toBe(true);
  });
  it("early 13c does not", () => {
    expect(compassRoseIncluded("early_13c")).toBe(false);
  });
});

describe("productionWeeks", () => {
  it("14c peak takes longest to produce", () => {
    expect(productionWeeks("14c_peak")).toBeGreaterThan(
      productionWeeks("early_13c")
    );
  });
});

describe("seaCoverageRegions", () => {
  it("15c expansion covers most regions", () => {
    expect(seaCoverageRegions("15c_expansion")).toBeGreaterThan(
      seaCoverageRegions("early_13c")
    );
  });
});

describe("estimatedSurvivingCount", () => {
  it("15c expansion has most surviving charts", () => {
    expect(estimatedSurvivingCount("15c_expansion")).toBeGreaterThan(
      estimatedSurvivingCount("early_13c")
    );
  });
});

describe("portolanEras", () => {
  it("returns 5 eras", () => {
    expect(portolanEras()).toHaveLength(5);
  });
});
