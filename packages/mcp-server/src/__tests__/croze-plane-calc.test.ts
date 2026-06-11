import { describe, it, expect } from "vitest";
import {
  grooveClean, depthConsist, setupSpeed, barrelRange,
  crozeCost, adjustable, forWet, cutterStyle,
  bestUse, crozePlanes,
} from "../croze-plane-calc.js";

describe("grooveClean", () => {
  it("router style modern cleanest groove", () => {
    expect(grooveClean("router_style_modern")).toBeGreaterThan(grooveClean("wet_barrel_heavy"));
  });
});

describe("depthConsist", () => {
  it("router style modern most consistent depth", () => {
    expect(depthConsist("router_style_modern")).toBeGreaterThan(depthConsist("fixed_cutter_standard"));
  });
});

describe("setupSpeed", () => {
  it("dry barrel light fastest setup", () => {
    expect(setupSpeed("dry_barrel_light")).toBeGreaterThan(setupSpeed("adjustable_fence_set"));
  });
});

describe("barrelRange", () => {
  it("adjustable fence set best barrel range", () => {
    expect(barrelRange("adjustable_fence_set")).toBeGreaterThan(barrelRange("fixed_cutter_standard"));
  });
});

describe("crozeCost", () => {
  it("router style modern most expensive", () => {
    expect(crozeCost("router_style_modern")).toBeGreaterThan(crozeCost("dry_barrel_light"));
  });
});

describe("adjustable", () => {
  it("adjustable fence set is adjustable", () => {
    expect(adjustable("adjustable_fence_set")).toBe(true);
  });
  it("fixed cutter standard not adjustable", () => {
    expect(adjustable("fixed_cutter_standard")).toBe(false);
  });
});

describe("forWet", () => {
  it("wet barrel heavy is for wet", () => {
    expect(forWet("wet_barrel_heavy")).toBe(true);
  });
  it("dry barrel light not for wet", () => {
    expect(forWet("dry_barrel_light")).toBe(false);
  });
});

describe("cutterStyle", () => {
  it("router style modern uses router bit head", () => {
    expect(cutterStyle("router_style_modern")).toBe("router_bit_head");
  });
});

describe("bestUse", () => {
  it("adjustable fence set best for multi size barrel", () => {
    expect(bestUse("adjustable_fence_set")).toBe("multi_size_barrel");
  });
});

describe("crozePlanes", () => {
  it("returns 5 types", () => {
    expect(crozePlanes()).toHaveLength(5);
  });
});
