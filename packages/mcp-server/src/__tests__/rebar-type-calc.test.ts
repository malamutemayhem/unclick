import { describe, it, expect } from "vitest";
import {
  tensile, corrosionResist, bond, fatigue,
  rbCost, magnetic, forMarine, coating,
  bestUse, rebarTypes,
} from "../rebar-type-calc.js";

describe("tensile", () => {
  it("gfrp highest tensile", () => {
    expect(tensile("gfrp_glass_fiber")).toBeGreaterThan(tensile("stainless_316_marine"));
  });
});

describe("corrosionResist", () => {
  it("stainless best corrosion resistance", () => {
    expect(corrosionResist("stainless_316_marine")).toBeGreaterThan(corrosionResist("carbon_steel_grade_60"));
  });
});

describe("bond", () => {
  it("carbon steel best bond", () => {
    expect(bond("carbon_steel_grade_60")).toBeGreaterThan(bond("gfrp_glass_fiber"));
  });
});

describe("fatigue", () => {
  it("stainless best fatigue", () => {
    expect(fatigue("stainless_316_marine")).toBeGreaterThan(fatigue("gfrp_glass_fiber"));
  });
});

describe("rbCost", () => {
  it("stainless most expensive", () => {
    expect(rbCost("stainless_316_marine")).toBeGreaterThan(rbCost("carbon_steel_grade_60"));
  });
});

describe("magnetic", () => {
  it("carbon steel is magnetic", () => {
    expect(magnetic("carbon_steel_grade_60")).toBe(true);
  });
  it("gfrp not magnetic", () => {
    expect(magnetic("gfrp_glass_fiber")).toBe(false);
  });
});

describe("forMarine", () => {
  it("stainless for marine", () => {
    expect(forMarine("stainless_316_marine")).toBe(true);
  });
  it("carbon steel not for marine", () => {
    expect(forMarine("carbon_steel_grade_60")).toBe(false);
  });
});

describe("coating", () => {
  it("galvanized uses zinc hot dip galvanize", () => {
    expect(coating("galvanized_hot_dip")).toBe("zinc_hot_dip_galvanize");
  });
});

describe("bestUse", () => {
  it("gfrp best for mri room non magnetic", () => {
    expect(bestUse("gfrp_glass_fiber")).toBe("mri_room_non_magnetic_slab");
  });
});

describe("rebarTypes", () => {
  it("returns 5 types", () => {
    expect(rebarTypes()).toHaveLength(5);
  });
});
