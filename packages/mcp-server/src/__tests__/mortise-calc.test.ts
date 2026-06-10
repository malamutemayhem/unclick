import { describe, it, expect } from "vitest";
import {
  mortiseWidthMm, mortiseDepthMm, tenonLengthMm, tenonThicknessMm,
  shoulderCountPerSide, drawboreDiameterMm, drawboreOffsetMm,
  glueSurfaceAreaCm2, cuttingTimeMinutes, jointStrengthRating, mortiseTypes,
} from "../mortise-calc.js";

describe("mortiseWidthMm", () => {
  it("slightly larger than tenon", () => {
    expect(mortiseWidthMm(10)).toBe(10.5);
  });
});

describe("mortiseDepthMm", () => {
  it("through = full thickness", () => {
    expect(mortiseDepthMm(30, "through")).toBe(30);
  });
  it("blind is shallower", () => {
    expect(mortiseDepthMm(30, "blind")).toBeLessThan(30);
  });
  it("haunched is 75%", () => {
    expect(mortiseDepthMm(40, "haunched")).toBe(30);
  });
});

describe("tenonLengthMm", () => {
  it("1mm less than mortise depth", () => {
    expect(tenonLengthMm(30)).toBe(29);
  });
});

describe("tenonThicknessMm", () => {
  it("one third of stock", () => {
    expect(tenonThicknessMm(30)).toBe(10);
  });
});

describe("shoulderCountPerSide", () => {
  it("haunched has 2 shoulders", () => {
    expect(shoulderCountPerSide("haunched")).toBe(2);
  });
  it("through has 1 shoulder", () => {
    expect(shoulderCountPerSide("through")).toBe(1);
  });
});

describe("drawboreDiameterMm", () => {
  it("30% of tenon thickness", () => {
    expect(drawboreDiameterMm(10)).toBe(3);
  });
});

describe("drawboreOffsetMm", () => {
  it("15% of tenon thickness", () => {
    expect(drawboreOffsetMm(10)).toBe(1.5);
  });
});

describe("glueSurfaceAreaCm2", () => {
  it("positive area", () => {
    expect(glueSurfaceAreaCm2(10, 20, 29)).toBeGreaterThan(0);
  });
});

describe("cuttingTimeMinutes", () => {
  it("beginner takes longest", () => {
    expect(cuttingTimeMinutes("drawbored", "beginner")).toBeGreaterThan(
      cuttingTimeMinutes("drawbored", "expert")
    );
  });
  it("drawbored takes longer than blind", () => {
    expect(cuttingTimeMinutes("drawbored", "intermediate")).toBeGreaterThan(
      cuttingTimeMinutes("blind", "intermediate")
    );
  });
});

describe("jointStrengthRating", () => {
  it("drawbored strongest", () => {
    expect(jointStrengthRating("drawbored")).toBeGreaterThan(jointStrengthRating("blind"));
  });
});

describe("mortiseTypes", () => {
  it("returns 5 types", () => {
    expect(mortiseTypes()).toHaveLength(5);
  });
});
