import { describe, it, expect } from "vitest";
import {
  durability, waterproof, comfort, installEase,
  vfCost, floating, forWetArea, core,
  bestUse, vinylFloorTypes,
} from "../vinyl-floor-calc.js";

describe("durability", () => {
  it("spc most durable", () => {
    expect(durability("spc_stone_polymer_core")).toBeGreaterThan(durability("sheet_vinyl_full_spread"));
  });
});

describe("waterproof", () => {
  it("sheet vinyl most waterproof", () => {
    expect(waterproof("sheet_vinyl_full_spread")).toBeGreaterThan(waterproof("lvt_glue_down_tile"));
  });
});

describe("comfort", () => {
  it("wpc most comfortable", () => {
    expect(comfort("wpc_wood_polymer_core")).toBeGreaterThan(comfort("spc_stone_polymer_core"));
  });
});

describe("installEase", () => {
  it("lvp easiest install", () => {
    expect(installEase("lvp_rigid_core_click")).toBeGreaterThan(installEase("sheet_vinyl_full_spread"));
  });
});

describe("vfCost", () => {
  it("lvt more expensive than sheet", () => {
    expect(vfCost("lvt_glue_down_tile")).toBeGreaterThan(vfCost("sheet_vinyl_full_spread"));
  });
});

describe("floating", () => {
  it("lvp is floating", () => {
    expect(floating("lvp_rigid_core_click")).toBe(true);
  });
  it("lvt not floating", () => {
    expect(floating("lvt_glue_down_tile")).toBe(false);
  });
});

describe("forWetArea", () => {
  it("all for wet area", () => {
    expect(forWetArea("sheet_vinyl_full_spread")).toBe(true);
  });
});

describe("core", () => {
  it("wpc uses wood polymer foam", () => {
    expect(core("wpc_wood_polymer_core")).toBe("wood_polymer_composite_foam");
  });
});

describe("bestUse", () => {
  it("sheet vinyl for bathroom", () => {
    expect(bestUse("sheet_vinyl_full_spread")).toBe("bathroom_laundry_seamless");
  });
});

describe("vinylFloorTypes", () => {
  it("returns 5 types", () => {
    expect(vinylFloorTypes()).toHaveLength(5);
  });
});
