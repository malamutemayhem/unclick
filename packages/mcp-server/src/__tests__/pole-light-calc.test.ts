import { describe, it, expect } from "vitest";
import {
  lumens, efficiency, windLoad, aesthetic,
  plCost, darkSky, forParking, distribution,
  bestUse, poleLightTypes,
} from "../pole-light-calc.js";

describe("lumens", () => {
  it("sports field highest lumens", () => {
    expect(lumens("sports_field_high_mast")).toBeGreaterThan(lumens("solar_bollard_hybrid"));
  });
});

describe("efficiency", () => {
  it("solar most efficient", () => {
    expect(efficiency("solar_bollard_hybrid")).toBeGreaterThan(efficiency("post_top_acorn"));
  });
});

describe("windLoad", () => {
  it("sports field best wind load", () => {
    expect(windLoad("sports_field_high_mast")).toBeGreaterThan(windLoad("decorative_pendant_arm"));
  });
});

describe("aesthetic", () => {
  it("decorative best aesthetic", () => {
    expect(aesthetic("decorative_pendant_arm")).toBeGreaterThan(aesthetic("shoebox_cobra_head"));
  });
});

describe("plCost", () => {
  it("sports field most expensive", () => {
    expect(plCost("sports_field_high_mast")).toBeGreaterThan(plCost("solar_bollard_hybrid"));
  });
});

describe("darkSky", () => {
  it("shoebox is dark sky", () => {
    expect(darkSky("shoebox_cobra_head")).toBe(true);
  });
  it("post top not dark sky", () => {
    expect(darkSky("post_top_acorn")).toBe(false);
  });
});

describe("forParking", () => {
  it("shoebox for parking", () => {
    expect(forParking("shoebox_cobra_head")).toBe(true);
  });
  it("decorative not parking", () => {
    expect(forParking("decorative_pendant_arm")).toBe(false);
  });
});

describe("distribution", () => {
  it("solar uses 360 path", () => {
    expect(distribution("solar_bollard_hybrid")).toBe("low_level_path_360_degree");
  });
});

describe("bestUse", () => {
  it("shoebox for parking lot", () => {
    expect(bestUse("shoebox_cobra_head")).toBe("parking_lot_roadway_area");
  });
});

describe("poleLightTypes", () => {
  it("returns 5 types", () => {
    expect(poleLightTypes()).toHaveLength(5);
  });
});
