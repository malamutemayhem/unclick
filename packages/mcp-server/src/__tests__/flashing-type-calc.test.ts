import { describe, it, expect } from "vitest";
import {
  waterproof, durability, installEase, aesthetic,
  ftCost, selfAdhesive, forRoof, material,
  bestUse, flashingTypeTypes,
} from "../flashing-type-calc.js";

describe("waterproof", () => {
  it("through wall most waterproof", () => {
    expect(waterproof("through_wall_membrane_weep")).toBeGreaterThan(waterproof("drip_edge_fascia_gutter"));
  });
});

describe("durability", () => {
  it("counter flashing most durable", () => {
    expect(durability("counter_flashing_reglet_embed")).toBeGreaterThan(durability("valley_flashing_w_profile"));
  });
});

describe("installEase", () => {
  it("drip edge easiest install", () => {
    expect(installEase("drip_edge_fascia_gutter")).toBeGreaterThan(installEase("through_wall_membrane_weep"));
  });
});

describe("aesthetic", () => {
  it("counter flashing best aesthetic", () => {
    expect(aesthetic("counter_flashing_reglet_embed")).toBeGreaterThan(aesthetic("through_wall_membrane_weep"));
  });
});

describe("ftCost", () => {
  it("through wall most expensive", () => {
    expect(ftCost("through_wall_membrane_weep")).toBeGreaterThan(ftCost("drip_edge_fascia_gutter"));
  });
});

describe("selfAdhesive", () => {
  it("through wall is self adhesive", () => {
    expect(selfAdhesive("through_wall_membrane_weep")).toBe(true);
  });
  it("step flashing not self adhesive", () => {
    expect(selfAdhesive("step_flashing_metal_shingle")).toBe(false);
  });
});

describe("forRoof", () => {
  it("step flashing for roof", () => {
    expect(forRoof("step_flashing_metal_shingle")).toBe(true);
  });
  it("through wall not for roof", () => {
    expect(forRoof("through_wall_membrane_weep")).toBe(false);
  });
});

describe("material", () => {
  it("valley uses aluminum copper pan", () => {
    expect(material("valley_flashing_w_profile")).toBe("aluminum_copper_w_valley_pan");
  });
});

describe("bestUse", () => {
  it("drip edge for eave rake", () => {
    expect(bestUse("drip_edge_fascia_gutter")).toBe("eave_rake_edge_water_divert_gutter");
  });
});

describe("flashingTypeTypes", () => {
  it("returns 5 types", () => {
    expect(flashingTypeTypes()).toHaveLength(5);
  });
});
