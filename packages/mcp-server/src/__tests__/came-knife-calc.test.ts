import { describe, it, expect } from "vitest";
import {
  cutClean, controlGuide, speedCut, bladeLife,
  knifeCost, heated, replaceable, bladeStyle,
  bestUse, cameKnives,
} from "../came-knife-calc.js";

describe("cutClean", () => {
  it("heated blade clean cleanest cut", () => {
    expect(cutClean("heated_blade_clean")).toBeGreaterThan(cutClean("serrated_blade_zinc"));
  });
});

describe("controlGuide", () => {
  it("curved blade lead best control guide", () => {
    expect(controlGuide("curved_blade_lead")).toBeGreaterThan(controlGuide("utility_blade_swap"));
  });
});

describe("speedCut", () => {
  it("serrated blade zinc fastest cut", () => {
    expect(speedCut("serrated_blade_zinc")).toBeGreaterThan(speedCut("curved_blade_lead"));
  });
});

describe("bladeLife", () => {
  it("utility blade swap longest blade life", () => {
    expect(bladeLife("utility_blade_swap")).toBeGreaterThan(bladeLife("heated_blade_clean"));
  });
});

describe("knifeCost", () => {
  it("heated blade clean most expensive", () => {
    expect(knifeCost("heated_blade_clean")).toBeGreaterThan(knifeCost("utility_blade_swap"));
  });
});

describe("heated", () => {
  it("heated blade clean is heated", () => {
    expect(heated("heated_blade_clean")).toBe(true);
  });
  it("straight blade standard not heated", () => {
    expect(heated("straight_blade_standard")).toBe(false);
  });
});

describe("replaceable", () => {
  it("utility blade swap is replaceable", () => {
    expect(replaceable("utility_blade_swap")).toBe(true);
  });
  it("straight blade standard not replaceable", () => {
    expect(replaceable("straight_blade_standard")).toBe(false);
  });
});

describe("bladeStyle", () => {
  it("curved blade lead uses curved rocker edge", () => {
    expect(bladeStyle("curved_blade_lead")).toBe("curved_rocker_edge");
  });
});

describe("bestUse", () => {
  it("straight blade standard best for general came cut", () => {
    expect(bestUse("straight_blade_standard")).toBe("general_came_cut");
  });
});

describe("cameKnives", () => {
  it("returns 5 types", () => {
    expect(cameKnives()).toHaveLength(5);
  });
});
