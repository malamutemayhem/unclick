import { describe, it, expect } from "vitest";
import {
  speed, contrast, precision, depth,
  lmCost, nonContact, forMetal, wavelength,
  bestUse, laserMarkingTypes,
} from "../laser-marking-calc.js";

describe("speed", () => {
  it("fiber laser fastest", () => {
    expect(speed("fiber_laser_metal")).toBeGreaterThan(speed("uv_laser_cold_mark"));
  });
});

describe("contrast", () => {
  it("UV laser best contrast", () => {
    expect(contrast("uv_laser_cold_mark")).toBeGreaterThan(contrast("co2_laser_organic"));
  });
});

describe("precision", () => {
  it("UV laser most precise", () => {
    expect(precision("uv_laser_cold_mark")).toBeGreaterThan(precision("co2_laser_organic"));
  });
});

describe("depth", () => {
  it("fiber laser deepest mark", () => {
    expect(depth("fiber_laser_metal")).toBeGreaterThan(depth("uv_laser_cold_mark"));
  });
});

describe("lmCost", () => {
  it("UV laser most expensive", () => {
    expect(lmCost("uv_laser_cold_mark")).toBeGreaterThan(lmCost("co2_laser_organic"));
  });
});

describe("nonContact", () => {
  it("all laser types are non-contact", () => {
    expect(nonContact("fiber_laser_metal")).toBe(true);
  });
  it("UV also non-contact", () => {
    expect(nonContact("uv_laser_cold_mark")).toBe(true);
  });
});

describe("forMetal", () => {
  it("fiber laser for metal", () => {
    expect(forMetal("fiber_laser_metal")).toBe(true);
  });
  it("CO2 not for metal", () => {
    expect(forMetal("co2_laser_organic")).toBe(false);
  });
});

describe("wavelength", () => {
  it("green laser uses 532nm", () => {
    expect(wavelength("green_laser_silicon")).toBe("532nm_second_harmonic_green");
  });
});

describe("bestUse", () => {
  it("MOPA for stainless color mark", () => {
    expect(bestUse("mopa_fiber_color")).toBe("stainless_color_mark_anodized_al");
  });
});

describe("laserMarkingTypes", () => {
  it("returns 5 types", () => {
    expect(laserMarkingTypes()).toHaveLength(5);
  });
});
