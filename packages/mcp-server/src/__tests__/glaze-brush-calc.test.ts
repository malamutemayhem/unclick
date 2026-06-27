import { describe, it, expect } from "vitest";
import {
  coverageArea, detailControl, glazeHold, strokeSmooth,
  brushCost, forBaseCoat, forBlending, bristleType,
  bestTechnique, glazeBrushes,
} from "../glaze-brush-calc.js";

describe("coverageArea", () => {
  it("hake flat wide most coverage area", () => {
    expect(coverageArea("hake_flat_wide")).toBeGreaterThan(coverageArea("liner_stripe_thin"));
  });
});

describe("detailControl", () => {
  it("round detail fine best detail control", () => {
    expect(detailControl("round_detail_fine")).toBeGreaterThan(detailControl("hake_flat_wide"));
  });
});

describe("glazeHold", () => {
  it("mop wash large best glaze hold", () => {
    expect(glazeHold("mop_wash_large")).toBeGreaterThan(glazeHold("liner_stripe_thin"));
  });
});

describe("strokeSmooth", () => {
  it("fan blending soft smoothest stroke", () => {
    expect(strokeSmooth("fan_blending_soft")).toBeGreaterThan(strokeSmooth("liner_stripe_thin"));
  });
});

describe("brushCost", () => {
  it("fan blending soft more expensive than hake flat", () => {
    expect(brushCost("fan_blending_soft")).toBeGreaterThan(brushCost("hake_flat_wide"));
  });
});

describe("forBaseCoat", () => {
  it("hake flat wide is for base coat", () => {
    expect(forBaseCoat("hake_flat_wide")).toBe(true);
  });
  it("round detail fine is not for base coat", () => {
    expect(forBaseCoat("round_detail_fine")).toBe(false);
  });
});

describe("forBlending", () => {
  it("fan blending soft is for blending", () => {
    expect(forBlending("fan_blending_soft")).toBe(true);
  });
  it("hake flat wide is not for blending", () => {
    expect(forBlending("hake_flat_wide")).toBe(false);
  });
});

describe("bristleType", () => {
  it("round detail fine uses sable hair pointed", () => {
    expect(bristleType("round_detail_fine")).toBe("sable_hair_pointed");
  });
});

describe("bestTechnique", () => {
  it("liner stripe thin best for fine line decoration", () => {
    expect(bestTechnique("liner_stripe_thin")).toBe("fine_line_decoration");
  });
});

describe("glazeBrushes", () => {
  it("returns 5 types", () => {
    expect(glazeBrushes()).toHaveLength(5);
  });
});
