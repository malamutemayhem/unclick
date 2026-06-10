import { describe, it, expect } from "vitest";
import {
  loopHeight, detailLevel, speedOutput, easeOfUse,
  needleCost, adjustableDepth, forRugMaking, needleGauge,
  bestProject, punchNeedles,
} from "../punch-needle-calc.js";

describe("loopHeight", () => {
  it("oxford rug large tallest loop height", () => {
    expect(loopHeight("oxford_rug_large")).toBeGreaterThan(loopHeight("mini_fine_detail"));
  });
});

describe("detailLevel", () => {
  it("mini fine detail best detail level", () => {
    expect(detailLevel("mini_fine_detail")).toBeGreaterThan(detailLevel("oxford_rug_large"));
  });
});

describe("speedOutput", () => {
  it("ultrapunch three strand fastest speed", () => {
    expect(speedOutput("ultrapunch_three_strand")).toBeGreaterThan(speedOutput("mini_fine_detail"));
  });
});

describe("easeOfUse", () => {
  it("ultrapunch three strand easiest to use", () => {
    expect(easeOfUse("ultrapunch_three_strand")).toBeGreaterThan(easeOfUse("mini_fine_detail"));
  });
});

describe("needleCost", () => {
  it("oxford rug large more expensive than russian hook", () => {
    expect(needleCost("oxford_rug_large")).toBeGreaterThan(needleCost("russian_hook_loop"));
  });
});

describe("adjustableDepth", () => {
  it("adjustable depth standard has adjustable depth", () => {
    expect(adjustableDepth("adjustable_depth_standard")).toBe(true);
  });
  it("mini fine detail does not have adjustable depth", () => {
    expect(adjustableDepth("mini_fine_detail")).toBe(false);
  });
});

describe("forRugMaking", () => {
  it("oxford rug large is for rug making", () => {
    expect(forRugMaking("oxford_rug_large")).toBe(true);
  });
  it("mini fine detail is not for rug making", () => {
    expect(forRugMaking("mini_fine_detail")).toBe(false);
  });
});

describe("needleGauge", () => {
  it("oxford rug large uses heavy gauge wide", () => {
    expect(needleGauge("oxford_rug_large")).toBe("heavy_gauge_wide");
  });
});

describe("bestProject", () => {
  it("mini fine detail best for miniature portrait", () => {
    expect(bestProject("mini_fine_detail")).toBe("miniature_portrait");
  });
});

describe("punchNeedles", () => {
  it("returns 5 types", () => {
    expect(punchNeedles()).toHaveLength(5);
  });
});
