import { describe, it, expect } from "vitest";
import {
  paintHolding, strokeControl, coverageArea, blendingAbility,
  brushCost, naturalHair, suitableForWatercolor, bristleMaterial,
  bestTechnique, paintBrushes,
} from "../paint-brush-calc.js";

describe("paintHolding", () => {
  it("round sable best paint holding", () => {
    expect(paintHolding("round_sable")).toBeGreaterThan(paintHolding("fan_blender"));
  });
});

describe("strokeControl", () => {
  it("round sable best control", () => {
    expect(strokeControl("round_sable")).toBeGreaterThan(strokeControl("fan_blender"));
  });
});

describe("coverageArea", () => {
  it("flat bristle widest coverage", () => {
    expect(coverageArea("flat_bristle")).toBeGreaterThan(coverageArea("rigger_liner"));
  });
});

describe("blendingAbility", () => {
  it("fan blender best blending", () => {
    expect(blendingAbility("fan_blender")).toBeGreaterThan(blendingAbility("rigger_liner"));
  });
});

describe("brushCost", () => {
  it("round sable most expensive", () => {
    expect(brushCost("round_sable")).toBeGreaterThan(brushCost("flat_bristle"));
  });
});

describe("naturalHair", () => {
  it("round sable is natural", () => {
    expect(naturalHair("round_sable")).toBe(true);
  });
  it("filbert synthetic is not", () => {
    expect(naturalHair("filbert_synthetic")).toBe(false);
  });
});

describe("suitableForWatercolor", () => {
  it("round sable for watercolor", () => {
    expect(suitableForWatercolor("round_sable")).toBe(true);
  });
  it("flat bristle not for watercolor", () => {
    expect(suitableForWatercolor("flat_bristle")).toBe(false);
  });
});

describe("bristleMaterial", () => {
  it("flat bristle uses hog bristle interlocked", () => {
    expect(bristleMaterial("flat_bristle")).toBe("hog_bristle_interlocked");
  });
});

describe("bestTechnique", () => {
  it("fan blender for foliage texture dry brush", () => {
    expect(bestTechnique("fan_blender")).toBe("foliage_texture_dry_brush");
  });
});

describe("paintBrushes", () => {
  it("returns 5 types", () => {
    expect(paintBrushes()).toHaveLength(5);
  });
});
