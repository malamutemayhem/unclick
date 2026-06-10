import { describe, it, expect } from "vitest";
import {
  customization, visibility, durability, cleanEase,
  dividerCost, foldable, fitAnyDrawer, dividerMaterial,
  bestDrawer, drawerDividers,
} from "../drawer-divider-calc.js";

describe("customization", () => {
  it("spring loaded adjust most customizable", () => {
    expect(customization("spring_loaded_adjust")).toBeGreaterThan(customization("honeycomb_underwear_cell"));
  });
});

describe("visibility", () => {
  it("acrylic clear modular best visibility", () => {
    expect(visibility("acrylic_clear_modular")).toBeGreaterThan(visibility("spring_loaded_adjust"));
  });
});

describe("durability", () => {
  it("bamboo grid set most durable", () => {
    expect(durability("bamboo_grid_set")).toBeGreaterThan(durability("fabric_box_foldable"));
  });
});

describe("cleanEase", () => {
  it("acrylic clear modular easiest to clean", () => {
    expect(cleanEase("acrylic_clear_modular")).toBeGreaterThan(cleanEase("honeycomb_underwear_cell"));
  });
});

describe("dividerCost", () => {
  it("acrylic clear modular most expensive", () => {
    expect(dividerCost("acrylic_clear_modular")).toBeGreaterThan(dividerCost("fabric_box_foldable"));
  });
});

describe("foldable", () => {
  it("fabric box foldable is foldable", () => {
    expect(foldable("fabric_box_foldable")).toBe(true);
  });
  it("bamboo grid set is not foldable", () => {
    expect(foldable("bamboo_grid_set")).toBe(false);
  });
});

describe("fitAnyDrawer", () => {
  it("spring loaded adjust fits any drawer", () => {
    expect(fitAnyDrawer("spring_loaded_adjust")).toBe(true);
  });
  it("bamboo grid set does not fit any drawer", () => {
    expect(fitAnyDrawer("bamboo_grid_set")).toBe(false);
  });
});

describe("dividerMaterial", () => {
  it("bamboo grid set uses natural bamboo slat", () => {
    expect(dividerMaterial("bamboo_grid_set")).toBe("natural_bamboo_slat");
  });
});

describe("bestDrawer", () => {
  it("spring loaded adjust best for kitchen utensil junk", () => {
    expect(bestDrawer("spring_loaded_adjust")).toBe("kitchen_utensil_junk");
  });
});

describe("drawerDividers", () => {
  it("returns 5 types", () => {
    expect(drawerDividers()).toHaveLength(5);
  });
});
