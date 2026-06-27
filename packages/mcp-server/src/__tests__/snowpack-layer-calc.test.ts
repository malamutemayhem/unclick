import { describe, it, expect } from "vitest";
import {
  instabilityRisk, persistenceDays, detectionDifficulty, formationTemperature,
  shearStrength, visibleOnSurface, requiresSnowPit, crystalShape,
  formationProcess, snowpackLayers,
} from "../snowpack-layer-calc.js";

describe("instabilityRisk", () => {
  it("surface hoar most unstable", () => {
    expect(instabilityRisk("surface_hoar")).toBeGreaterThan(instabilityRisk("melt_freeze_crust"));
  });
});

describe("persistenceDays", () => {
  it("depth hoar most persistent", () => {
    expect(persistenceDays("depth_hoar")).toBeGreaterThan(persistenceDays("wind_slab"));
  });
});

describe("detectionDifficulty", () => {
  it("depth hoar hardest to detect", () => {
    expect(detectionDifficulty("depth_hoar")).toBeGreaterThan(detectionDifficulty("melt_freeze_crust"));
  });
});

describe("formationTemperature", () => {
  it("depth hoar forms in coldest", () => {
    expect(formationTemperature("depth_hoar")).toBeGreaterThan(formationTemperature("melt_freeze_crust"));
  });
});

describe("shearStrength", () => {
  it("melt freeze crust strongest", () => {
    expect(shearStrength("melt_freeze_crust")).toBeGreaterThan(shearStrength("surface_hoar"));
  });
});

describe("visibleOnSurface", () => {
  it("surface hoar visible", () => {
    expect(visibleOnSurface("surface_hoar")).toBe(true);
  });
  it("depth hoar not visible", () => {
    expect(visibleOnSurface("depth_hoar")).toBe(false);
  });
});

describe("requiresSnowPit", () => {
  it("depth hoar requires snow pit", () => {
    expect(requiresSnowPit("depth_hoar")).toBe(true);
  });
  it("wind slab does not", () => {
    expect(requiresSnowPit("wind_slab")).toBe(false);
  });
});

describe("crystalShape", () => {
  it("depth hoar is cup shaped angular", () => {
    expect(crystalShape("depth_hoar")).toBe("cup_shaped_angular");
  });
});

describe("formationProcess", () => {
  it("surface hoar is radiation cooling", () => {
    expect(formationProcess("surface_hoar")).toBe("radiation_cooling_dew_frost");
  });
});

describe("snowpackLayers", () => {
  it("returns 5 layers", () => {
    expect(snowpackLayers()).toHaveLength(5);
  });
});
