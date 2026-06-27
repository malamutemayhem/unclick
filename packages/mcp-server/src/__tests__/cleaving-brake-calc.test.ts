import { describe, it, expect } from "vitest";
import {
  splitEven, speedCleave, controlGuide, materialRange,
  brakeCost, adjustable, forRound, clampStyle,
  bestUse, cleavingBrakes,
} from "../cleaving-brake-calc.js";

describe("splitEven", () => {
  it("adjustable fence guide most even split", () => {
    expect(splitEven("adjustable_fence_guide")).toBeGreaterThan(splitEven("spring_clamp_hold"));
  });
});

describe("speedCleave", () => {
  it("three way splitter fastest cleave", () => {
    expect(speedCleave("three_way_splitter")).toBeGreaterThan(speedCleave("flat_shave_horse"));
  });
});

describe("controlGuide", () => {
  it("adjustable fence guide best control", () => {
    expect(controlGuide("adjustable_fence_guide")).toBeGreaterThan(controlGuide("three_way_splitter"));
  });
});

describe("materialRange", () => {
  it("adjustable fence guide widest range", () => {
    expect(materialRange("adjustable_fence_guide")).toBeGreaterThan(materialRange("four_way_quarter"));
  });
});

describe("brakeCost", () => {
  it("flat shave horse most expensive", () => {
    expect(brakeCost("flat_shave_horse")).toBeGreaterThan(brakeCost("spring_clamp_hold"));
  });
});

describe("adjustable", () => {
  it("adjustable fence guide is adjustable", () => {
    expect(adjustable("adjustable_fence_guide")).toBe(true);
  });
  it("three way splitter not adjustable", () => {
    expect(adjustable("three_way_splitter")).toBe(false);
  });
});

describe("forRound", () => {
  it("three way splitter is for round", () => {
    expect(forRound("three_way_splitter")).toBe(true);
  });
  it("flat shave horse not for round", () => {
    expect(forRound("flat_shave_horse")).toBe(false);
  });
});

describe("clampStyle", () => {
  it("flat shave horse uses foot pedal clamp", () => {
    expect(clampStyle("flat_shave_horse")).toBe("foot_pedal_clamp");
  });
});

describe("bestUse", () => {
  it("adjustable fence guide best for precise width split", () => {
    expect(bestUse("adjustable_fence_guide")).toBe("precise_width_split");
  });
});

describe("cleavingBrakes", () => {
  it("returns 5 types", () => {
    expect(cleavingBrakes()).toHaveLength(5);
  });
});
