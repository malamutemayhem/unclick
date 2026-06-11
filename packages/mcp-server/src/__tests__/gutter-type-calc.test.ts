import { describe, it, expect } from "vitest";
import {
  capacity, aesthetic, durability, cleanEase,
  gtCost, seamless, forCommercial, material,
  bestUse, gutterTypeTypes,
} from "../gutter-type-calc.js";

describe("capacity", () => {
  it("industrial trough highest capacity", () => {
    expect(capacity("industrial_trough_wide_open")).toBeGreaterThan(capacity("half_round_semicircle_classic"));
  });
});

describe("aesthetic", () => {
  it("fascia integrated best aesthetic", () => {
    expect(aesthetic("fascia_integrated_concealed")).toBeGreaterThan(aesthetic("industrial_trough_wide_open"));
  });
});

describe("durability", () => {
  it("industrial trough most durable", () => {
    expect(durability("industrial_trough_wide_open")).toBeGreaterThan(durability("k_style_ogee_residential"));
  });
});

describe("cleanEase", () => {
  it("half round easiest to clean", () => {
    expect(cleanEase("half_round_semicircle_classic")).toBeGreaterThan(cleanEase("fascia_integrated_concealed"));
  });
});

describe("gtCost", () => {
  it("fascia integrated most expensive", () => {
    expect(gtCost("fascia_integrated_concealed")).toBeGreaterThan(gtCost("k_style_ogee_residential"));
  });
});

describe("seamless", () => {
  it("k style is seamless", () => {
    expect(seamless("k_style_ogee_residential")).toBe(true);
  });
  it("half round not seamless", () => {
    expect(seamless("half_round_semicircle_classic")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("box gutter for commercial", () => {
    expect(forCommercial("box_gutter_commercial_square")).toBe(true);
  });
  it("k style not for commercial", () => {
    expect(forCommercial("k_style_ogee_residential")).toBe(false);
  });
});

describe("material", () => {
  it("half round uses copper zinc", () => {
    expect(material("half_round_semicircle_classic")).toBe("copper_zinc_half_round_section");
  });
});

describe("bestUse", () => {
  it("industrial trough for warehouse", () => {
    expect(bestUse("industrial_trough_wide_open")).toBe("warehouse_factory_high_volume_drain");
  });
});

describe("gutterTypeTypes", () => {
  it("returns 5 types", () => {
    expect(gutterTypeTypes()).toHaveLength(5);
  });
});
