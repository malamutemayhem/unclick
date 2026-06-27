import { describe, it, expect } from "vitest";
import {
  shieldEff, compression, durability, frequency,
  gskCost, reusable, forMobile, material,
  bestUse, shieldGaskets,
} from "../shield-gasket-calc.js";

describe("shieldEff", () => {
  it("board level shield can best shielding", () => {
    expect(shieldEff("board_level_shield_can")).toBeGreaterThan(shieldEff("conductive_fabric_over_foam"));
  });
});

describe("compression", () => {
  it("conductive elastomer most compressible", () => {
    expect(compression("conductive_elastomer")).toBeGreaterThan(compression("board_level_shield_can"));
  });
});

describe("durability", () => {
  it("board level shield can most durable", () => {
    expect(durability("board_level_shield_can")).toBeGreaterThan(durability("conductive_fabric_over_foam"));
  });
});

describe("frequency", () => {
  it("board level shield can highest frequency", () => {
    expect(frequency("board_level_shield_can")).toBeGreaterThan(frequency("conductive_fabric_over_foam"));
  });
});

describe("gskCost", () => {
  it("conductive elastomer most expensive", () => {
    expect(gskCost("conductive_elastomer")).toBeGreaterThan(gskCost("conductive_fabric_over_foam"));
  });
});

describe("reusable", () => {
  it("beryllium copper finger is reusable", () => {
    expect(reusable("beryllium_copper_finger")).toBe(true);
  });
  it("conductive elastomer not reusable", () => {
    expect(reusable("conductive_elastomer")).toBe(false);
  });
});

describe("forMobile", () => {
  it("board level shield can for mobile", () => {
    expect(forMobile("board_level_shield_can")).toBe(true);
  });
  it("wire mesh knit not for mobile", () => {
    expect(forMobile("wire_mesh_knit")).toBe(false);
  });
});

describe("material", () => {
  it("conductive elastomer uses silver filled silicone", () => {
    expect(material("conductive_elastomer")).toBe("silver_filled_silicone");
  });
});

describe("bestUse", () => {
  it("board level shield can best for 5g rf module isolation", () => {
    expect(bestUse("board_level_shield_can")).toBe("5g_rf_module_isolation");
  });
});

describe("shieldGaskets", () => {
  it("returns 5 types", () => {
    expect(shieldGaskets()).toHaveLength(5);
  });
});
