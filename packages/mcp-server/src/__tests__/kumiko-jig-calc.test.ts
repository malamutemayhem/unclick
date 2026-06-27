import { describe, it, expect } from "vitest";
import {
  angleAccuracy, repeatPrecision, setupSpeed, patternRange,
  jigCost, adjustable, forComplex, jigStyle,
  bestUse, kumikoJigs,
} from "../kumiko-jig-calc.js";

describe("angleAccuracy", () => {
  it("cutting guide precise most accurate angle", () => {
    expect(angleAccuracy("cutting_guide_precise")).toBeGreaterThan(angleAccuracy("assembly_board_flat"));
  });
});

describe("repeatPrecision", () => {
  it("spacing template even most precise repeat", () => {
    expect(repeatPrecision("spacing_template_even")).toBeGreaterThan(repeatPrecision("angle_jig_standard"));
  });
});

describe("setupSpeed", () => {
  it("spacing template even fastest setup", () => {
    expect(setupSpeed("spacing_template_even")).toBeGreaterThan(setupSpeed("pattern_master_complex"));
  });
});

describe("patternRange", () => {
  it("pattern master complex widest pattern range", () => {
    expect(patternRange("pattern_master_complex")).toBeGreaterThan(patternRange("spacing_template_even"));
  });
});

describe("jigCost", () => {
  it("pattern master complex most expensive", () => {
    expect(jigCost("pattern_master_complex")).toBeGreaterThan(jigCost("spacing_template_even"));
  });
});

describe("adjustable", () => {
  it("cutting guide precise is adjustable", () => {
    expect(adjustable("cutting_guide_precise")).toBe(true);
  });
  it("angle jig standard not adjustable", () => {
    expect(adjustable("angle_jig_standard")).toBe(false);
  });
});

describe("forComplex", () => {
  it("pattern master complex is for complex", () => {
    expect(forComplex("pattern_master_complex")).toBe(true);
  });
  it("angle jig standard not for complex", () => {
    expect(forComplex("angle_jig_standard")).toBe(false);
  });
});

describe("jigStyle", () => {
  it("pattern master complex uses multi angle system", () => {
    expect(jigStyle("pattern_master_complex")).toBe("multi_angle_system");
  });
});

describe("bestUse", () => {
  it("angle jig standard best for general angle cut", () => {
    expect(bestUse("angle_jig_standard")).toBe("general_angle_cut");
  });
});

describe("kumikoJigs", () => {
  it("returns 5 types", () => {
    expect(kumikoJigs()).toHaveLength(5);
  });
});
