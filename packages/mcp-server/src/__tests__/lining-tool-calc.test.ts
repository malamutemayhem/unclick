import { describe, it, expect } from "vitest";
import {
  lineConsist, spacingEven, speedCover, patternRange,
  liningCost, multiLine, forPattern, lineCount,
  bestUse, liningTools,
} from "../lining-tool-calc.js";

describe("lineConsist", () => {
  it("single line standard most consistent line", () => {
    expect(lineConsist("single_line_standard")).toBeGreaterThan(lineConsist("multiple_line_comb"));
  });
});

describe("spacingEven", () => {
  it("crosshatch grid tool most even spacing", () => {
    expect(spacingEven("crosshatch_grid_tool")).toBeGreaterThan(spacingEven("spiral_line_rose"));
  });
});

describe("speedCover", () => {
  it("multiple line comb fastest cover", () => {
    expect(speedCover("multiple_line_comb")).toBeGreaterThan(speedCover("single_line_standard"));
  });
});

describe("patternRange", () => {
  it("spiral line rose widest pattern range", () => {
    expect(patternRange("spiral_line_rose")).toBeGreaterThan(patternRange("double_line_parallel"));
  });
});

describe("liningCost", () => {
  it("spiral line rose most expensive", () => {
    expect(liningCost("spiral_line_rose")).toBeGreaterThan(liningCost("single_line_standard"));
  });
});

describe("multiLine", () => {
  it("multiple line comb is multi line", () => {
    expect(multiLine("multiple_line_comb")).toBe(true);
  });
  it("single line standard not multi line", () => {
    expect(multiLine("single_line_standard")).toBe(false);
  });
});

describe("forPattern", () => {
  it("crosshatch grid tool is for pattern", () => {
    expect(forPattern("crosshatch_grid_tool")).toBe(true);
  });
  it("single line standard not for pattern", () => {
    expect(forPattern("single_line_standard")).toBe(false);
  });
});

describe("lineCount", () => {
  it("spiral line rose uses spiral single arc", () => {
    expect(lineCount("spiral_line_rose")).toBe("spiral_single_arc");
  });
});

describe("bestUse", () => {
  it("crosshatch grid tool best for crosshatch texture", () => {
    expect(bestUse("crosshatch_grid_tool")).toBe("crosshatch_texture");
  });
});

describe("liningTools", () => {
  it("returns 5 types", () => {
    expect(liningTools()).toHaveLength(5);
  });
});
