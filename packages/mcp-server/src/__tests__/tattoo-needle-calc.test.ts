import { describe, it, expect } from "vitest";
import {
  lineDefinition, shadingAbility, colorPacking, skinTrauma,
  versatility, suitableForFill, singlePassCoverage, bestUseCase,
  needleConfig, tattooNeedles,
} from "../tattoo-needle-calc.js";

describe("lineDefinition", () => {
  it("round liner best line definition", () => {
    expect(lineDefinition("round_liner")).toBeGreaterThan(lineDefinition("magnum"));
  });
});

describe("shadingAbility", () => {
  it("magnum best shading", () => {
    expect(shadingAbility("magnum")).toBeGreaterThan(shadingAbility("round_liner"));
  });
});

describe("colorPacking", () => {
  it("magnum best color packing", () => {
    expect(colorPacking("magnum")).toBeGreaterThan(colorPacking("round_liner"));
  });
});

describe("skinTrauma", () => {
  it("magnum most trauma", () => {
    expect(skinTrauma("magnum")).toBeGreaterThan(skinTrauma("round_liner"));
  });
});

describe("versatility", () => {
  it("curved magnum most versatile", () => {
    expect(versatility("curved_magnum")).toBeGreaterThan(versatility("flat"));
  });
});

describe("suitableForFill", () => {
  it("magnum suitable for fill", () => {
    expect(suitableForFill("magnum")).toBe(true);
  });
  it("round liner not suitable", () => {
    expect(suitableForFill("round_liner")).toBe(false);
  });
});

describe("singlePassCoverage", () => {
  it("magnum single pass", () => {
    expect(singlePassCoverage("magnum")).toBe(true);
  });
  it("round shader not single pass", () => {
    expect(singlePassCoverage("round_shader")).toBe(false);
  });
});

describe("bestUseCase", () => {
  it("round liner for fine lines", () => {
    expect(bestUseCase("round_liner")).toBe("fine_lines_detail");
  });
});

describe("needleConfig", () => {
  it("magnum is stacked double row", () => {
    expect(needleConfig("magnum")).toBe("stacked_double_row");
  });
});

describe("tattooNeedles", () => {
  it("returns 5 needles", () => {
    expect(tattooNeedles()).toHaveLength(5);
  });
});
