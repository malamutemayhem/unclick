import { describe, it, expect } from "vitest";
import {
  cutClean, hoofSafe, speedRemove, controlGrip,
  clinchCost, powered, forOldShoe, edgeStyle,
  bestUse, clinchCutters,
} from "../clinch-cutter-calc.js";

describe("cutClean", () => {
  it("electric rotary grind cleanest cut", () => {
    expect(cutClean("electric_rotary_grind")).toBeGreaterThan(cutClean("gouge_scoop_pull"));
  });
});

describe("hoofSafe", () => {
  it("buffer blade flat safest for hoof", () => {
    expect(hoofSafe("buffer_blade_flat")).toBeGreaterThan(hoofSafe("electric_rotary_grind"));
  });
});

describe("speedRemove", () => {
  it("electric rotary grind fastest removal", () => {
    expect(speedRemove("electric_rotary_grind")).toBeGreaterThan(speedRemove("buffer_blade_flat"));
  });
});

describe("controlGrip", () => {
  it("combined pull cut best control grip", () => {
    expect(controlGrip("combined_pull_cut")).toBeGreaterThan(controlGrip("electric_rotary_grind"));
  });
});

describe("clinchCost", () => {
  it("electric rotary grind most expensive", () => {
    expect(clinchCost("electric_rotary_grind")).toBeGreaterThan(clinchCost("buffer_blade_flat"));
  });
});

describe("powered", () => {
  it("electric rotary grind is powered", () => {
    expect(powered("electric_rotary_grind")).toBe(true);
  });
  it("buffer blade flat not powered", () => {
    expect(powered("buffer_blade_flat")).toBe(false);
  });
});

describe("forOldShoe", () => {
  it("buffer blade flat is for old shoe", () => {
    expect(forOldShoe("buffer_blade_flat")).toBe(true);
  });
  it("electric rotary grind not for old shoe", () => {
    expect(forOldShoe("electric_rotary_grind")).toBe(false);
  });
});

describe("edgeStyle", () => {
  it("crease nail pull uses crease channel grip", () => {
    expect(edgeStyle("crease_nail_pull")).toBe("crease_channel_grip");
  });
});

describe("bestUse", () => {
  it("combined pull cut best for full shoe remove", () => {
    expect(bestUse("combined_pull_cut")).toBe("full_shoe_remove");
  });
});

describe("clinchCutters", () => {
  it("returns 5 types", () => {
    expect(clinchCutters()).toHaveLength(5);
  });
});
