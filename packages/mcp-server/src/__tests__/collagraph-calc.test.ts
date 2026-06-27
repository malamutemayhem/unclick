import { describe, it, expect } from "vitest";
import {
  textureDepth, detailFine, durability, buildEase,
  collagCost, waterproof, forIntaglio, plateBase,
  bestUse, collagraphs,
} from "../collagraph-calc.js";

describe("textureDepth", () => {
  it("carborundum grit texture deepest texture", () => {
    expect(textureDepth("carborundum_grit_texture")).toBeGreaterThan(textureDepth("cardboard_collage_basic"));
  });
});

describe("detailFine", () => {
  it("metal leaf collage finest detail", () => {
    expect(detailFine("metal_leaf_collage")).toBeGreaterThan(detailFine("fabric_collage_soft"));
  });
});

describe("durability", () => {
  it("metal leaf collage most durable", () => {
    expect(durability("metal_leaf_collage")).toBeGreaterThan(durability("cardboard_collage_basic"));
  });
});

describe("buildEase", () => {
  it("cardboard collage basic easiest build", () => {
    expect(buildEase("cardboard_collage_basic")).toBeGreaterThan(buildEase("metal_leaf_collage"));
  });
});

describe("collagCost", () => {
  it("metal leaf collage most expensive", () => {
    expect(collagCost("metal_leaf_collage")).toBeGreaterThan(collagCost("cardboard_collage_basic"));
  });
});

describe("waterproof", () => {
  it("carborundum grit texture is waterproof", () => {
    expect(waterproof("carborundum_grit_texture")).toBe(true);
  });
  it("cardboard collage basic not waterproof", () => {
    expect(waterproof("cardboard_collage_basic")).toBe(false);
  });
});

describe("forIntaglio", () => {
  it("carborundum grit texture is for intaglio", () => {
    expect(forIntaglio("carborundum_grit_texture")).toBe(true);
  });
  it("cardboard collage basic not for intaglio", () => {
    expect(forIntaglio("cardboard_collage_basic")).toBe(false);
  });
});

describe("plateBase", () => {
  it("acrylic gel build uses gel medium buildup", () => {
    expect(plateBase("acrylic_gel_build")).toBe("gel_medium_buildup");
  });
});

describe("bestUse", () => {
  it("cardboard collage basic best for beginner relief print", () => {
    expect(bestUse("cardboard_collage_basic")).toBe("beginner_relief_print");
  });
});

describe("collagraphs", () => {
  it("returns 5 types", () => {
    expect(collagraphs()).toHaveLength(5);
  });
});
