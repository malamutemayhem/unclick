import { describe, it, expect } from "vitest";
import {
  shapeConsist, wallThickness, profileVariety, durability,
  dieCost, hollowCore, customDesign, dieMaterial,
  bestUse, extruderDies,
} from "../extruder-die-calc.js";

describe("shapeConsist", () => {
  it("ribbon flat strip most consistent shape", () => {
    expect(shapeConsist("ribbon_flat_strip")).toBeGreaterThan(shapeConsist("handle_pull_shape"));
  });
});

describe("wallThickness", () => {
  it("square coil solid thickest wall", () => {
    expect(wallThickness("square_coil_solid")).toBeGreaterThan(wallThickness("ribbon_flat_strip"));
  });
});

describe("profileVariety", () => {
  it("custom cut brass most profile variety", () => {
    expect(profileVariety("custom_cut_brass")).toBeGreaterThan(profileVariety("ribbon_flat_strip"));
  });
});

describe("durability", () => {
  it("custom cut brass most durable", () => {
    expect(durability("custom_cut_brass")).toBeGreaterThan(durability("handle_pull_shape"));
  });
});

describe("dieCost", () => {
  it("custom cut brass most expensive", () => {
    expect(dieCost("custom_cut_brass")).toBeGreaterThan(dieCost("round_tube_hollow"));
  });
});

describe("hollowCore", () => {
  it("round tube hollow has hollow core", () => {
    expect(hollowCore("round_tube_hollow")).toBe(true);
  });
  it("square coil solid no hollow core", () => {
    expect(hollowCore("square_coil_solid")).toBe(false);
  });
});

describe("customDesign", () => {
  it("custom cut brass is custom design", () => {
    expect(customDesign("custom_cut_brass")).toBe(true);
  });
  it("round tube hollow not custom design", () => {
    expect(customDesign("round_tube_hollow")).toBe(false);
  });
});

describe("dieMaterial", () => {
  it("round tube hollow uses aluminum machined disc", () => {
    expect(dieMaterial("round_tube_hollow")).toBe("aluminum_machined_disc");
  });
});

describe("bestUse", () => {
  it("handle pull shape best for mug handle pull", () => {
    expect(bestUse("handle_pull_shape")).toBe("mug_handle_pull");
  });
});

describe("extruderDies", () => {
  it("returns 5 types", () => {
    expect(extruderDies()).toHaveLength(5);
  });
});
