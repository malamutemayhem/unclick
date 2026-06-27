import { describe, it, expect } from "vitest";
import {
  blendSmooth, coverageEven, controlFine, cleanEase,
  blendCost, brush, velvet, tipType,
  bestUse, inkBlendings,
} from "../ink-blending-calc.js";

describe("blendSmooth", () => {
  it("velvet tool smooth smoothest blend", () => {
    expect(blendSmooth("velvet_tool_smooth")).toBeGreaterThan(blendSmooth("sponge_dauber_quick"));
  });
});

describe("coverageEven", () => {
  it("velvet tool smooth most even coverage", () => {
    expect(coverageEven("velvet_tool_smooth")).toBeGreaterThan(coverageEven("mini_round_detail"));
  });
});

describe("controlFine", () => {
  it("mini round detail finest control", () => {
    expect(controlFine("mini_round_detail")).toBeGreaterThan(controlFine("sponge_dauber_quick"));
  });
});

describe("cleanEase", () => {
  it("blending brush soft easiest clean", () => {
    expect(cleanEase("blending_brush_soft")).toBeGreaterThan(cleanEase("velvet_tool_smooth"));
  });
});

describe("blendCost", () => {
  it("velvet tool smooth most expensive", () => {
    expect(blendCost("velvet_tool_smooth")).toBeGreaterThan(blendCost("sponge_dauber_quick"));
  });
});

describe("brush", () => {
  it("blending brush soft is brush", () => {
    expect(brush("blending_brush_soft")).toBe(true);
  });
  it("foam applicator standard not brush", () => {
    expect(brush("foam_applicator_standard")).toBe(false);
  });
});

describe("velvet", () => {
  it("velvet tool smooth is velvet", () => {
    expect(velvet("velvet_tool_smooth")).toBe(true);
  });
  it("foam applicator standard not velvet", () => {
    expect(velvet("foam_applicator_standard")).toBe(false);
  });
});

describe("tipType", () => {
  it("velvet tool smooth uses velvet pad surface", () => {
    expect(tipType("velvet_tool_smooth")).toBe("velvet_pad_surface");
  });
});

describe("bestUse", () => {
  it("foam applicator standard best for general ink blend", () => {
    expect(bestUse("foam_applicator_standard")).toBe("general_ink_blend");
  });
});

describe("inkBlendings", () => {
  it("returns 5 types", () => {
    expect(inkBlendings()).toHaveLength(5);
  });
});
