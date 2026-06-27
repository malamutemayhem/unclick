import { describe, it, expect } from "vitest";
import {
  plosiveBlock, soundClarity, durability, installEase,
  filterCost, washable, universalFit, mountType,
  bestMic, popFilters,
} from "../pop-filter-calc.js";

describe("plosiveBlock", () => {
  it("nylon mesh dual layer best plosive block", () => {
    expect(plosiveBlock("nylon_mesh_dual_layer")).toBeGreaterThan(plosiveBlock("foam_windscreen_slip"));
  });
});

describe("soundClarity", () => {
  it("metal screen perforated best sound clarity", () => {
    expect(soundClarity("metal_screen_perforated")).toBeGreaterThan(soundClarity("foam_windscreen_slip"));
  });
});

describe("durability", () => {
  it("metal screen perforated most durable", () => {
    expect(durability("metal_screen_perforated")).toBeGreaterThan(durability("foam_windscreen_slip"));
  });
});

describe("installEase", () => {
  it("foam windscreen slip easiest install", () => {
    expect(installEase("foam_windscreen_slip")).toBeGreaterThan(installEase("nylon_mesh_dual_layer"));
  });
});

describe("filterCost", () => {
  it("metal screen perforated more expensive than nylon", () => {
    expect(filterCost("metal_screen_perforated")).toBeGreaterThan(filterCost("nylon_mesh_dual_layer"));
  });
});

describe("washable", () => {
  it("metal screen perforated is washable", () => {
    expect(washable("metal_screen_perforated")).toBe(true);
  });
  it("fabric gooseneck clamp is not washable", () => {
    expect(washable("fabric_gooseneck_clamp")).toBe(false);
  });
});

describe("universalFit", () => {
  it("nylon mesh dual layer is universal fit", () => {
    expect(universalFit("nylon_mesh_dual_layer")).toBe(true);
  });
  it("foam windscreen slip is not universal fit", () => {
    expect(universalFit("foam_windscreen_slip")).toBe(false);
  });
});

describe("mountType", () => {
  it("foam windscreen slip uses slip on direct fit", () => {
    expect(mountType("foam_windscreen_slip")).toBe("slip_on_direct_fit");
  });
});

describe("bestMic", () => {
  it("nylon mesh dual layer best for condenser vocal studio", () => {
    expect(bestMic("nylon_mesh_dual_layer")).toBe("condenser_vocal_studio");
  });
});

describe("popFilters", () => {
  it("returns 5 types", () => {
    expect(popFilters()).toHaveLength(5);
  });
});
