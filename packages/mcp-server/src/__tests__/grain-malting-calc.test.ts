import { describe, it, expect } from "vitest";
import {
  diastaPowerLintner, steepingHours, germinationDays,
  kilnTempCelsius, colorLovibond, proteinPercent,
  extractPercent, huskPresent, bestBeerStyle, maltGrains,
} from "../grain-malting-calc.js";

describe("diastaPowerLintner", () => {
  it("barley has highest diastatic power", () => {
    expect(diastaPowerLintner("barley")).toBeGreaterThan(
      diastaPowerLintner("sorghum")
    );
  });
});

describe("steepingHours", () => {
  it("barley steeps longest", () => {
    expect(steepingHours("barley")).toBeGreaterThan(
      steepingHours("sorghum")
    );
  });
});

describe("germinationDays", () => {
  it("barley germinates longest", () => {
    expect(germinationDays("barley")).toBeGreaterThan(
      germinationDays("oat")
    );
  });
});

describe("kilnTempCelsius", () => {
  it("sorghum kilns at highest temp", () => {
    expect(kilnTempCelsius("sorghum")).toBeGreaterThan(
      kilnTempCelsius("oat")
    );
  });
});

describe("colorLovibond", () => {
  it("sorghum is darkest", () => {
    expect(colorLovibond("sorghum")).toBeGreaterThan(
      colorLovibond("wheat")
    );
  });
});

describe("proteinPercent", () => {
  it("oat has most protein", () => {
    expect(proteinPercent("oat")).toBeGreaterThan(
      proteinPercent("barley")
    );
  });
});

describe("extractPercent", () => {
  it("barley has best extract", () => {
    expect(extractPercent("barley")).toBeGreaterThan(
      extractPercent("oat")
    );
  });
});

describe("huskPresent", () => {
  it("barley has husk", () => {
    expect(huskPresent("barley")).toBe(true);
  });
  it("wheat has no husk", () => {
    expect(huskPresent("wheat")).toBe(false);
  });
});

describe("bestBeerStyle", () => {
  it("wheat makes hefeweizen", () => {
    expect(bestBeerStyle("wheat")).toBe("hefeweizen");
  });
});

describe("maltGrains", () => {
  it("returns 5 grains", () => {
    expect(maltGrains()).toHaveLength(5);
  });
});
