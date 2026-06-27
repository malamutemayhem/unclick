import { describe, it, expect } from "vitest";
import {
  silicaPercent, viscosityLevel, eruptionTemperature, gasTrapping,
  crystalContent, commonOnEarth, explosiveEruption, tectonicSetting,
  rockFormed, magmaCompositions,
} from "../magma-composition-calc.js";

describe("silicaPercent", () => {
  it("rhyolitic highest silica", () => {
    expect(silicaPercent("rhyolitic")).toBeGreaterThan(silicaPercent("basaltic"));
  });
});

describe("viscosityLevel", () => {
  it("rhyolitic most viscous", () => {
    expect(viscosityLevel("rhyolitic")).toBeGreaterThan(viscosityLevel("basaltic"));
  });
});

describe("eruptionTemperature", () => {
  it("komatiitic hottest", () => {
    expect(eruptionTemperature("komatiitic")).toBeGreaterThan(eruptionTemperature("rhyolitic"));
  });
});

describe("gasTrapping", () => {
  it("rhyolitic traps most gas", () => {
    expect(gasTrapping("rhyolitic")).toBeGreaterThan(gasTrapping("basaltic"));
  });
});

describe("crystalContent", () => {
  it("rhyolitic most crystals", () => {
    expect(crystalContent("rhyolitic")).toBeGreaterThan(crystalContent("komatiitic"));
  });
});

describe("commonOnEarth", () => {
  it("basaltic is common", () => {
    expect(commonOnEarth("basaltic")).toBe(true);
  });
  it("komatiitic is not", () => {
    expect(commonOnEarth("komatiitic")).toBe(false);
  });
});

describe("explosiveEruption", () => {
  it("rhyolitic is explosive", () => {
    expect(explosiveEruption("rhyolitic")).toBe(true);
  });
  it("basaltic is not", () => {
    expect(explosiveEruption("basaltic")).toBe(false);
  });
});

describe("tectonicSetting", () => {
  it("basaltic at mid ocean ridge hotspot", () => {
    expect(tectonicSetting("basaltic")).toBe("mid_ocean_ridge_hotspot");
  });
});

describe("rockFormed", () => {
  it("rhyolitic forms rhyolite granite", () => {
    expect(rockFormed("rhyolitic")).toBe("rhyolite_granite");
  });
});

describe("magmaCompositions", () => {
  it("returns 5 compositions", () => {
    expect(magmaCompositions()).toHaveLength(5);
  });
});
