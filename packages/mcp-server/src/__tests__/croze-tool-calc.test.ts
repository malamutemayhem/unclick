import { describe, it, expect } from "vitest";
import {
  grooveClean, depthConsist, setupSpeed, sizeRange,
  crozeCost, adjustable, forWetBarrel, cutterShape,
  bestUse, crozeTools,
} from "../croze-tool-calc.js";

describe("grooveClean", () => {
  it("dry barrel tight cleanest groove", () => {
    expect(grooveClean("dry_barrel_tight")).toBeGreaterThan(grooveClean("combination_multi_size"));
  });
});

describe("depthConsist", () => {
  it("fixed depth standard most consistent", () => {
    expect(depthConsist("fixed_depth_standard")).toBeGreaterThan(depthConsist("combination_multi_size"));
  });
});

describe("setupSpeed", () => {
  it("fixed depth standard fastest setup", () => {
    expect(setupSpeed("fixed_depth_standard")).toBeGreaterThan(setupSpeed("combination_multi_size"));
  });
});

describe("sizeRange", () => {
  it("adjustable fence set widest range", () => {
    expect(sizeRange("adjustable_fence_set")).toBeGreaterThan(sizeRange("fixed_depth_standard"));
  });
});

describe("crozeCost", () => {
  it("combination multi size most expensive", () => {
    expect(crozeCost("combination_multi_size")).toBeGreaterThan(crozeCost("fixed_depth_standard"));
  });
});

describe("adjustable", () => {
  it("adjustable fence set is adjustable", () => {
    expect(adjustable("adjustable_fence_set")).toBe(true);
  });
  it("fixed depth standard not adjustable", () => {
    expect(adjustable("fixed_depth_standard")).toBe(false);
  });
});

describe("forWetBarrel", () => {
  it("wet barrel wide is for wet barrel", () => {
    expect(forWetBarrel("wet_barrel_wide")).toBe(true);
  });
  it("dry barrel tight not for wet barrel", () => {
    expect(forWetBarrel("dry_barrel_tight")).toBe(false);
  });
});

describe("cutterShape", () => {
  it("combination multi size uses swap blade set", () => {
    expect(cutterShape("combination_multi_size")).toBe("swap_blade_set");
  });
});

describe("bestUse", () => {
  it("wet barrel wide best for liquid barrel seal", () => {
    expect(bestUse("wet_barrel_wide")).toBe("liquid_barrel_seal");
  });
});

describe("crozeTools", () => {
  it("returns 5 types", () => {
    expect(crozeTools()).toHaveLength(5);
  });
});
