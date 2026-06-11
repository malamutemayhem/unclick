import { describe, it, expect } from "vitest";
import {
  durability, waterproof, aesthetic, weight,
  ppCost, combustible, forFlat, coping,
  bestUse, parapetTypeTypes,
} from "../parapet-type-calc.js";

describe("durability", () => {
  it("concrete most durable", () => {
    expect(durability("concrete_cast_precast")).toBeGreaterThan(durability("eifs_stucco_finish"));
  });
});

describe("waterproof", () => {
  it("metal panel best waterproofing", () => {
    expect(waterproof("metal_panel_coped")).toBeGreaterThan(waterproof("eifs_stucco_finish"));
  });
});

describe("aesthetic", () => {
  it("glass best aesthetic", () => {
    expect(aesthetic("glass_frameless_guard")).toBeGreaterThan(aesthetic("concrete_cast_precast"));
  });
});

describe("weight", () => {
  it("eifs lightest (highest score)", () => {
    expect(weight("eifs_stucco_finish")).toBeGreaterThan(weight("concrete_cast_precast"));
  });
});

describe("ppCost", () => {
  it("glass most expensive", () => {
    expect(ppCost("glass_frameless_guard")).toBeGreaterThan(ppCost("eifs_stucco_finish"));
  });
});

describe("combustible", () => {
  it("eifs is combustible", () => {
    expect(combustible("eifs_stucco_finish")).toBe(true);
  });
  it("masonry not combustible", () => {
    expect(combustible("masonry_brick_cmu")).toBe(false);
  });
});

describe("forFlat", () => {
  it("all types for flat roof", () => {
    expect(forFlat("masonry_brick_cmu")).toBe(true);
  });
});

describe("coping", () => {
  it("metal panel uses snap on cleat", () => {
    expect(coping("metal_panel_coped")).toBe("metal_coping_snap_on_cleat");
  });
});

describe("bestUse", () => {
  it("glass for rooftop terrace", () => {
    expect(bestUse("glass_frameless_guard")).toBe("rooftop_terrace_view_guard");
  });
});

describe("parapetTypeTypes", () => {
  it("returns 5 types", () => {
    expect(parapetTypeTypes()).toHaveLength(5);
  });
});
