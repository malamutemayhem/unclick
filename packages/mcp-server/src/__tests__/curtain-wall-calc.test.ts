import { describe, it, expect } from "vitest";
import {
  thermal, structural, aesthetic, speed,
  cwCost, prefabricated, forHighRise, glazing,
  bestUse, curtainWallTypes,
} from "../curtain-wall-calc.js";

describe("thermal", () => {
  it("double skin best thermal", () => {
    expect(thermal("double_skin_ventilated")).toBeGreaterThan(thermal("point_supported_spider"));
  });
});

describe("structural", () => {
  it("unitized highest structural", () => {
    expect(structural("unitized_prefab_panel")).toBeGreaterThan(structural("point_supported_spider"));
  });
});

describe("aesthetic", () => {
  it("point supported best aesthetic", () => {
    expect(aesthetic("point_supported_spider")).toBeGreaterThan(aesthetic("stick_built_field_assembled"));
  });
});

describe("speed", () => {
  it("unitized fastest install", () => {
    expect(speed("unitized_prefab_panel")).toBeGreaterThan(speed("point_supported_spider"));
  });
});

describe("cwCost", () => {
  it("point supported most expensive", () => {
    expect(cwCost("point_supported_spider")).toBeGreaterThan(cwCost("stick_built_field_assembled"));
  });
});

describe("prefabricated", () => {
  it("unitized is prefabricated", () => {
    expect(prefabricated("unitized_prefab_panel")).toBe(true);
  });
  it("stick built not prefabricated", () => {
    expect(prefabricated("stick_built_field_assembled")).toBe(false);
  });
});

describe("forHighRise", () => {
  it("unitized for high rise", () => {
    expect(forHighRise("unitized_prefab_panel")).toBe(true);
  });
  it("stick built not for high rise", () => {
    expect(forHighRise("stick_built_field_assembled")).toBe(false);
  });
});

describe("glazing", () => {
  it("structural silicone flush face", () => {
    expect(glazing("structural_glazed_silicone")).toBe("structural_silicone_flush_face");
  });
});

describe("bestUse", () => {
  it("double skin for energy efficient", () => {
    expect(bestUse("double_skin_ventilated")).toBe("energy_efficient_office_tower");
  });
});

describe("curtainWallTypes", () => {
  it("returns 5 types", () => {
    expect(curtainWallTypes()).toHaveLength(5);
  });
});
