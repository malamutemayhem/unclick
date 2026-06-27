import { describe, it, expect } from "vitest";
import {
  grooveDepth, speedForge, controlHit, sizeRange,
  fullerCost, selfCentering, needsStriker, jawProfile,
  bestUse, springFullers,
} from "../spring-fuller-calc.js";

describe("grooveDepth", () => {
  it("guillotine drop cut deepest groove", () => {
    expect(grooveDepth("guillotine_drop_cut")).toBeGreaterThan(grooveDepth("single_spring_half"));
  });
});

describe("speedForge", () => {
  it("combo fuller flatter fastest forge", () => {
    expect(speedForge("combo_fuller_flatter")).toBeGreaterThan(speedForge("radius_set_curved"));
  });
});

describe("controlHit", () => {
  it("top bottom pair best control", () => {
    expect(controlHit("top_bottom_pair")).toBeGreaterThan(controlHit("single_spring_half"));
  });
});

describe("sizeRange", () => {
  it("combo fuller flatter widest range", () => {
    expect(sizeRange("combo_fuller_flatter")).toBeGreaterThan(sizeRange("guillotine_drop_cut"));
  });
});

describe("fullerCost", () => {
  it("combo fuller flatter most expensive", () => {
    expect(fullerCost("combo_fuller_flatter")).toBeGreaterThan(fullerCost("single_spring_half"));
  });
});

describe("selfCentering", () => {
  it("top bottom pair is self centering", () => {
    expect(selfCentering("top_bottom_pair")).toBe(true);
  });
  it("single spring half not self centering", () => {
    expect(selfCentering("single_spring_half")).toBe(false);
  });
});

describe("needsStriker", () => {
  it("guillotine drop cut needs striker", () => {
    expect(needsStriker("guillotine_drop_cut")).toBe(true);
  });
  it("top bottom pair no striker needed", () => {
    expect(needsStriker("top_bottom_pair")).toBe(false);
  });
});

describe("jawProfile", () => {
  it("combo fuller flatter uses swap jaw insert", () => {
    expect(jawProfile("combo_fuller_flatter")).toBe("swap_jaw_insert");
  });
});

describe("bestUse", () => {
  it("top bottom pair best for drawing out stock", () => {
    expect(bestUse("top_bottom_pair")).toBe("drawing_out_stock");
  });
});

describe("springFullers", () => {
  it("returns 5 types", () => {
    expect(springFullers()).toHaveLength(5);
  });
});
