import { describe, it, expect } from "vitest";
import {
  cutClean, edgeHold, sharpenEase, depthControl,
  knifeCost, replaceable, forSkiving, bevelStyle,
  bestUse, ploughKnives,
} from "../plough-knife-calc.js";

describe("cutClean", () => {
  it("single bevel standard cleanest cut", () => {
    expect(cutClean("single_bevel_standard")).toBeGreaterThan(cutClean("replaceable_blade_swap"));
  });
});

describe("edgeHold", () => {
  it("carbide tip long best edge hold", () => {
    expect(edgeHold("carbide_tip_long")).toBeGreaterThan(edgeHold("replaceable_blade_swap"));
  });
});

describe("sharpenEase", () => {
  it("replaceable blade swap easiest sharpen", () => {
    expect(sharpenEase("replaceable_blade_swap")).toBeGreaterThan(sharpenEase("carbide_tip_long"));
  });
});

describe("depthControl", () => {
  it("skiving thin edge best depth control", () => {
    expect(depthControl("skiving_thin_edge")).toBeGreaterThan(depthControl("double_bevel_center"));
  });
});

describe("knifeCost", () => {
  it("carbide tip long most expensive", () => {
    expect(knifeCost("carbide_tip_long")).toBeGreaterThan(knifeCost("single_bevel_standard"));
  });
});

describe("replaceable", () => {
  it("replaceable blade swap is replaceable", () => {
    expect(replaceable("replaceable_blade_swap")).toBe(true);
  });
  it("single bevel standard not replaceable", () => {
    expect(replaceable("single_bevel_standard")).toBe(false);
  });
});

describe("forSkiving", () => {
  it("skiving thin edge is for skiving", () => {
    expect(forSkiving("skiving_thin_edge")).toBe(true);
  });
  it("single bevel standard not for skiving", () => {
    expect(forSkiving("single_bevel_standard")).toBe(false);
  });
});

describe("bevelStyle", () => {
  it("carbide tip long uses carbide insert tip", () => {
    expect(bevelStyle("carbide_tip_long")).toBe("carbide_insert_tip");
  });
});

describe("bestUse", () => {
  it("skiving thin edge best for leather cover skive", () => {
    expect(bestUse("skiving_thin_edge")).toBe("leather_cover_skive");
  });
});

describe("ploughKnives", () => {
  it("returns 5 types", () => {
    expect(ploughKnives()).toHaveLength(5);
  });
});
