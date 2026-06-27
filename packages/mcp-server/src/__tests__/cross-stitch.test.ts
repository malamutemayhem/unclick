import { describe, it, expect } from "vitest";
import {
  stitchesPerCm, designSizeCm, fabricNeeded, totalStitches,
  threadLength, skeinsNeeded, recommendedStrands, estimateHours,
  hoopSize, gridLines, backstitchLength, colorCount,
  framingCost, washingTemp, fabricCounts,
} from "../cross-stitch.js";

describe("stitchesPerCm", () => {
  it("higher count = more stitches", () => {
    expect(stitchesPerCm(28)).toBeGreaterThan(stitchesPerCm(14));
  });
});

describe("designSizeCm", () => {
  it("smaller on higher count", () => {
    expect(designSizeCm(100, 28)).toBeLessThan(designSizeCm(100, 14));
  });
});

describe("fabricNeeded", () => {
  it("positive m2", () => {
    expect(fabricNeeded(100, 80, 14)).toBeGreaterThan(0);
  });
});

describe("totalStitches", () => {
  it("less than full grid", () => {
    expect(totalStitches(100, 80)).toBeLessThan(100 * 80);
  });
});

describe("threadLength", () => {
  it("positive meters", () => {
    expect(threadLength(5000, 14)).toBeGreaterThan(0);
  });
});

describe("skeinsNeeded", () => {
  it("rounds up", () => {
    expect(skeinsNeeded(9)).toBe(2);
  });
});

describe("recommendedStrands", () => {
  it("more for coarse fabric", () => {
    expect(recommendedStrands(11)).toBeGreaterThan(recommendedStrands(28));
  });
});

describe("estimateHours", () => {
  it("positive hours", () => {
    expect(estimateHours(5000)).toBeGreaterThan(0);
  });
});

describe("hoopSize", () => {
  it("fits design plus margin", () => {
    expect(hoopSize(12, 10)).toBeGreaterThanOrEqual(14);
  });
});

describe("gridLines", () => {
  it("positive counts", () => {
    const g = gridLines(100, 80);
    expect(g.horizontal).toBe(8);
    expect(g.vertical).toBe(10);
  });
});

describe("backstitchLength", () => {
  it("positive cm", () => {
    expect(backstitchLength(20, 5)).toBeGreaterThan(0);
  });
});

describe("colorCount", () => {
  it("counts unique colors", () => {
    expect(colorCount(["red", "blue", "red", "green"])).toBe(3);
  });
});

describe("framingCost", () => {
  it("positive cost", () => {
    expect(framingCost(20, 25)).toBeGreaterThan(0);
  });
});

describe("washingTemp", () => {
  it("cold for fine fabric", () => {
    expect(washingTemp(28)).toBeLessThan(washingTemp(14));
  });
});

describe("fabricCounts", () => {
  it("returns 6 counts", () => {
    expect(fabricCounts()).toHaveLength(6);
  });
});
