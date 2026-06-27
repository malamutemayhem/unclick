import { describe, it, expect } from "vitest";
import {
  designDetail, easeOfUse, repeatAbility, fillCoverage,
  templateCost, needsTemplate, freeHand, templateMaterial,
  bestUse, quiltTemplates,
} from "../quilt-template-calc.js";

describe("designDetail", () => {
  it("feather scroll flow most detail", () => {
    expect(designDetail("feather_scroll_flow")).toBeGreaterThan(designDetail("echo_outline_follow"));
  });
});

describe("easeOfUse", () => {
  it("crosshatch grid line easiest", () => {
    expect(easeOfUse("crosshatch_grid_line")).toBeGreaterThan(easeOfUse("feather_scroll_flow"));
  });
});

describe("repeatAbility", () => {
  it("crosshatch grid line most repeatable", () => {
    expect(repeatAbility("crosshatch_grid_line")).toBeGreaterThan(repeatAbility("stipple_meander_free"));
  });
});

describe("fillCoverage", () => {
  it("stipple meander free best fill coverage", () => {
    expect(fillCoverage("stipple_meander_free")).toBeGreaterThan(fillCoverage("echo_outline_follow"));
  });
});

describe("templateCost", () => {
  it("feather scroll flow most expensive", () => {
    expect(templateCost("feather_scroll_flow")).toBeGreaterThan(templateCost("stipple_meander_free"));
  });
});

describe("needsTemplate", () => {
  it("feather scroll flow needs template", () => {
    expect(needsTemplate("feather_scroll_flow")).toBe(true);
  });
  it("stipple meander free does not need template", () => {
    expect(needsTemplate("stipple_meander_free")).toBe(false);
  });
});

describe("freeHand", () => {
  it("stipple meander free is freehand", () => {
    expect(freeHand("stipple_meander_free")).toBe(true);
  });
  it("crosshatch grid line is not freehand", () => {
    expect(freeHand("crosshatch_grid_line")).toBe(false);
  });
});

describe("templateMaterial", () => {
  it("clamshell arc repeat uses acrylic arc template", () => {
    expect(templateMaterial("clamshell_arc_repeat")).toBe("acrylic_arc_template");
  });
});

describe("bestUse", () => {
  it("crosshatch grid line best for background fill even", () => {
    expect(bestUse("crosshatch_grid_line")).toBe("background_fill_even");
  });
});

describe("quiltTemplates", () => {
  it("returns 5 types", () => {
    expect(quiltTemplates()).toHaveLength(5);
  });
});
