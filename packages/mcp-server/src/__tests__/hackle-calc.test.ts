import { describe, it, expect } from "vitest";
import {
  fiberSplit, noilRemove, blendAbility, tineCount,
  hackleCost, clampMount, forFlax, tineGauge,
  bestUse, hackles,
} from "../hackle-calc.js";

describe("fiberSplit", () => {
  it("double row fine best fiber split", () => {
    expect(fiberSplit("double_row_fine")).toBeGreaterThan(fiberSplit("mini_hackle_clamp"));
  });
});

describe("noilRemove", () => {
  it("double row fine best noil remove", () => {
    expect(noilRemove("double_row_fine")).toBeGreaterThan(noilRemove("mini_hackle_clamp"));
  });
});

describe("blendAbility", () => {
  it("blending hackle wide best blend ability", () => {
    expect(blendAbility("blending_hackle_wide")).toBeGreaterThan(blendAbility("single_row_basic"));
  });
});

describe("tineCount", () => {
  it("double row fine highest tine count", () => {
    expect(tineCount("double_row_fine")).toBeGreaterThan(tineCount("single_row_basic"));
  });
});

describe("hackleCost", () => {
  it("blending hackle wide most expensive", () => {
    expect(hackleCost("blending_hackle_wide")).toBeGreaterThan(hackleCost("single_row_basic"));
  });
});

describe("clampMount", () => {
  it("mini hackle clamp has clamp mount", () => {
    expect(clampMount("mini_hackle_clamp")).toBe(true);
  });
  it("single row basic no clamp mount", () => {
    expect(clampMount("single_row_basic")).toBe(false);
  });
});

describe("forFlax", () => {
  it("flax hackle long is for flax", () => {
    expect(forFlax("flax_hackle_long")).toBe(true);
  });
  it("double row fine not for flax", () => {
    expect(forFlax("double_row_fine")).toBe(false);
  });
});

describe("tineGauge", () => {
  it("single row basic uses medium steel round", () => {
    expect(tineGauge("single_row_basic")).toBe("medium_steel_round");
  });
});

describe("bestUse", () => {
  it("flax hackle long best for flax linen process", () => {
    expect(bestUse("flax_hackle_long")).toBe("flax_linen_process");
  });
});

describe("hackles", () => {
  it("returns 5 types", () => {
    expect(hackles()).toHaveLength(5);
  });
});
