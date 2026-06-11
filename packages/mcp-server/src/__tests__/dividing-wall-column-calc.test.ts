import { describe, it, expect } from "vitest";
import {
  energySaving, separation, capitalSaving, controllability,
  dwCost, multiProduct, forTernary, wall,
  bestUse, dividingWallColumnTypes,
} from "../dividing-wall-column-calc.js";

describe("energySaving", () => {
  it("heat integrated best energy saving", () => {
    expect(energySaving("heat_integrated_dwc")).toBeGreaterThan(energySaving("adiabatic_dwc_simple"));
  });
});

describe("separation", () => {
  it("multi partition best separation", () => {
    expect(separation("multi_partition_wall")).toBeGreaterThan(separation("standard_dwc_three"));
  });
});

describe("capitalSaving", () => {
  it("adiabatic dwc best capital saving", () => {
    expect(capitalSaving("adiabatic_dwc_simple")).toBeGreaterThan(capitalSaving("kaibel_four_product"));
  });
});

describe("controllability", () => {
  it("adiabatic dwc best controllability", () => {
    expect(controllability("adiabatic_dwc_simple")).toBeGreaterThan(controllability("multi_partition_wall"));
  });
});

describe("dwCost", () => {
  it("multi partition most expensive", () => {
    expect(dwCost("multi_partition_wall")).toBeGreaterThan(dwCost("adiabatic_dwc_simple"));
  });
});

describe("multiProduct", () => {
  it("all dwc types are multi product", () => {
    expect(multiProduct("standard_dwc_three")).toBe(true);
  });
});

describe("forTernary", () => {
  it("standard dwc for ternary", () => {
    expect(forTernary("standard_dwc_three")).toBe(true);
  });
  it("kaibel not for ternary", () => {
    expect(forTernary("kaibel_four_product")).toBe(false);
  });
});

describe("wall", () => {
  it("kaibel uses extended wall", () => {
    expect(wall("kaibel_four_product")).toBe("extended_wall_four_product_side_draw_kaibel");
  });
});

describe("bestUse", () => {
  it("standard dwc for btx separation", () => {
    expect(bestUse("standard_dwc_three")).toBe("btx_separation_naphtha_reformate_three_cut");
  });
});

describe("dividingWallColumnTypes", () => {
  it("returns 5 types", () => {
    expect(dividingWallColumnTypes()).toHaveLength(5);
  });
});
