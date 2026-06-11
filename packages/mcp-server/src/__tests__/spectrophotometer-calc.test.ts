import { describe, it, expect } from "vitest";
import {
  wavelengthRange, resolution, accuracy, speed,
  spCost, scanning, forQuantitative, detector,
  bestUse, spectrophotometerTypes,
} from "../spectrophotometer-calc.js";

describe("wavelengthRange", () => {
  it("uv vis double beam widest wavelength range", () => {
    expect(wavelengthRange("uv_vis_double_beam")).toBeGreaterThan(wavelengthRange("atomic_absorption"));
  });
});

describe("resolution", () => {
  it("uv vis double beam highest resolution", () => {
    expect(resolution("uv_vis_double_beam")).toBeGreaterThan(resolution("uv_vis_single_beam"));
  });
});

describe("accuracy", () => {
  it("atomic absorption most accurate", () => {
    expect(accuracy("atomic_absorption")).toBeGreaterThan(accuracy("uv_vis_single_beam"));
  });
});

describe("speed", () => {
  it("nir reflectance fastest", () => {
    expect(speed("nir_reflectance")).toBeGreaterThan(speed("uv_vis_single_beam"));
  });
});

describe("spCost", () => {
  it("atomic absorption most expensive", () => {
    expect(spCost("atomic_absorption")).toBeGreaterThan(spCost("uv_vis_single_beam"));
  });
});

describe("scanning", () => {
  it("uv vis double beam is scanning", () => {
    expect(scanning("uv_vis_double_beam")).toBe(true);
  });
  it("nir reflectance not scanning", () => {
    expect(scanning("nir_reflectance")).toBe(false);
  });
});

describe("forQuantitative", () => {
  it("all types for quantitative analysis", () => {
    expect(forQuantitative("uv_vis_single_beam")).toBe(true);
    expect(forQuantitative("atomic_absorption")).toBe(true);
  });
});

describe("detector", () => {
  it("atomic absorption uses hollow cathode lamp", () => {
    expect(detector("atomic_absorption")).toBe("hollow_cathode_lamp_flame_graphite_furnace_element_specific");
  });
});

describe("bestUse", () => {
  it("nir reflectance for grain moisture protein", () => {
    expect(bestUse("nir_reflectance")).toBe("grain_moisture_protein_fat_content_food_at_line_analysis");
  });
});

describe("spectrophotometerTypes", () => {
  it("returns 5 types", () => {
    expect(spectrophotometerTypes()).toHaveLength(5);
  });
});
