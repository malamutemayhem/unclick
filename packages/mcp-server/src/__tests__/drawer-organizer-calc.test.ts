import { describe, it, expect } from "vitest";
import {
  compartmentCount, customizability, visibility, itemProtection,
  organizerCost, stackable, nonSlipBase, trayMaterial,
  bestDrawer, drawerOrganizers,
} from "../drawer-organizer-calc.js";

describe("compartmentCount", () => {
  it("felt lined jewelry most compartments", () => {
    expect(compartmentCount("felt_lined_jewelry")).toBeGreaterThan(compartmentCount("spring_loaded_divider"));
  });
});

describe("customizability", () => {
  it("modular grid office most customizable", () => {
    expect(customizability("modular_grid_office")).toBeGreaterThan(customizability("felt_lined_jewelry"));
  });
});

describe("visibility", () => {
  it("acrylic clear makeup best visibility", () => {
    expect(visibility("acrylic_clear_makeup")).toBeGreaterThan(visibility("spring_loaded_divider"));
  });
});

describe("itemProtection", () => {
  it("felt lined jewelry best protection", () => {
    expect(itemProtection("felt_lined_jewelry")).toBeGreaterThan(itemProtection("modular_grid_office"));
  });
});

describe("organizerCost", () => {
  it("felt lined jewelry most expensive", () => {
    expect(organizerCost("felt_lined_jewelry")).toBeGreaterThan(organizerCost("acrylic_clear_makeup"));
  });
});

describe("stackable", () => {
  it("acrylic clear makeup is stackable", () => {
    expect(stackable("acrylic_clear_makeup")).toBe(true);
  });
  it("bamboo expandable kitchen is not", () => {
    expect(stackable("bamboo_expandable_kitchen")).toBe(false);
  });
});

describe("nonSlipBase", () => {
  it("bamboo expandable kitchen has non slip base", () => {
    expect(nonSlipBase("bamboo_expandable_kitchen")).toBe(true);
  });
  it("modular grid office does not", () => {
    expect(nonSlipBase("modular_grid_office")).toBe(false);
  });
});

describe("trayMaterial", () => {
  it("felt lined jewelry uses velvet lined mdf", () => {
    expect(trayMaterial("felt_lined_jewelry")).toBe("velvet_lined_mdf");
  });
});

describe("bestDrawer", () => {
  it("acrylic clear makeup best for vanity bathroom cosmetics", () => {
    expect(bestDrawer("acrylic_clear_makeup")).toBe("vanity_bathroom_cosmetics");
  });
});

describe("drawerOrganizers", () => {
  it("returns 5 types", () => {
    expect(drawerOrganizers()).toHaveLength(5);
  });
});
