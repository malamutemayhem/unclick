import { describe, it, expect } from "vitest";
import {
  blendSmooth, inkPickup, controlFine, cleanEase,
  toolCost, replaceable, reusable, padShape,
  bestUse, blendingTools,
} from "../blending-tool-calc.js";

describe("blendSmooth", () => {
  it("blending pan pastel smoothest blend", () => {
    expect(blendSmooth("blending_pan_pastel")).toBeGreaterThan(blendSmooth("mini_ink_apply"));
  });
});

describe("inkPickup", () => {
  it("mini ink apply best ink pickup", () => {
    expect(inkPickup("mini_ink_apply")).toBeGreaterThan(inkPickup("brush_flat_sweep"));
  });
});

describe("controlFine", () => {
  it("mini ink apply finest control", () => {
    expect(controlFine("mini_ink_apply")).toBeGreaterThan(controlFine("sponge_wedge_soft"));
  });
});

describe("cleanEase", () => {
  it("blending pan pastel easiest to clean", () => {
    expect(cleanEase("blending_pan_pastel")).toBeGreaterThan(cleanEase("mini_ink_apply"));
  });
});

describe("toolCost", () => {
  it("blending pan pastel most expensive", () => {
    expect(toolCost("blending_pan_pastel")).toBeGreaterThan(toolCost("foam_round_dab"));
  });
});

describe("replaceable", () => {
  it("foam round dab is replaceable", () => {
    expect(replaceable("foam_round_dab")).toBe(true);
  });
  it("brush flat sweep not replaceable", () => {
    expect(replaceable("brush_flat_sweep")).toBe(false);
  });
});

describe("reusable", () => {
  it("brush flat sweep is reusable", () => {
    expect(reusable("brush_flat_sweep")).toBe(true);
  });
  it("sponge wedge soft not reusable", () => {
    expect(reusable("sponge_wedge_soft")).toBe(false);
  });
});

describe("padShape", () => {
  it("foam round dab uses round dome foam", () => {
    expect(padShape("foam_round_dab")).toBe("round_dome_foam");
  });
});

describe("bestUse", () => {
  it("mini ink apply best for small area detail", () => {
    expect(bestUse("mini_ink_apply")).toBe("small_area_detail");
  });
});

describe("blendingTools", () => {
  it("returns 5 types", () => {
    expect(blendingTools()).toHaveLength(5);
  });
});
