import { describe, it, expect } from "vitest";
import {
  colorRendering, energyEfficiency, heatOutput, installCost,
  adjustability, safeForArtwork, dimmable, beamType,
  bestApplication, exhibitLightings,
} from "../exhibit-lighting-calc.js";

describe("colorRendering", () => {
  it("halogen spot best color rendering", () => {
    expect(colorRendering("halogen_spot")).toBeGreaterThan(colorRendering("ambient_wash"));
  });
});

describe("energyEfficiency", () => {
  it("led track most efficient", () => {
    expect(energyEfficiency("led_track")).toBeGreaterThan(energyEfficiency("halogen_spot"));
  });
});

describe("heatOutput", () => {
  it("halogen spot most heat", () => {
    expect(heatOutput("halogen_spot")).toBeGreaterThan(heatOutput("fiber_optic"));
  });
});

describe("installCost", () => {
  it("fiber optic most expensive", () => {
    expect(installCost("fiber_optic")).toBeGreaterThan(installCost("halogen_spot"));
  });
});

describe("adjustability", () => {
  it("led track most adjustable", () => {
    expect(adjustability("led_track")).toBeGreaterThan(adjustability("ambient_wash"));
  });
});

describe("safeForArtwork", () => {
  it("fiber optic safe for artwork", () => {
    expect(safeForArtwork("fiber_optic")).toBe(true);
  });
  it("halogen spot is not", () => {
    expect(safeForArtwork("halogen_spot")).toBe(false);
  });
});

describe("dimmable", () => {
  it("led track is dimmable", () => {
    expect(dimmable("led_track")).toBe(true);
  });
  it("uv filtered is not", () => {
    expect(dimmable("uv_filtered")).toBe(false);
  });
});

describe("beamType", () => {
  it("fiber optic is pinpoint display case", () => {
    expect(beamType("fiber_optic")).toBe("pinpoint_display_case");
  });
});

describe("bestApplication", () => {
  it("led track for gallery flexible hanging", () => {
    expect(bestApplication("led_track")).toBe("gallery_flexible_hanging");
  });
});

describe("exhibitLightings", () => {
  it("returns 5 types", () => {
    expect(exhibitLightings()).toHaveLength(5);
  });
});
