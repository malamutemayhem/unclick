import { describe, it, expect } from "vitest";
import {
  designSizeCm, designSizeInch, fabricNeeded, totalStitchCount,
  threadLength, skeinsNeeded, stitchesPerHour, estimateHours,
  hoopSize, gridLines, colorChanges, backstitchLength,
  wasteFactor, aidasPerMeter, recommendedStrands, projectCost,
  stitchTypes,
} from "../embroidery-calc.js";

describe("designSizeCm", () => {
  it("converts stitches to cm", () => {
    expect(designSizeCm(140, 14)).toBeCloseTo(25.4, 0);
  });
});

describe("designSizeInch", () => {
  it("converts stitches to inches", () => {
    expect(designSizeInch(140, 14)).toBe(10);
  });
});

describe("fabricNeeded", () => {
  it("adds margin", () => {
    expect(fabricNeeded(25)).toBeGreaterThan(25);
  });
});

describe("totalStitchCount", () => {
  it("accounts for coverage", () => {
    expect(totalStitchCount(100, 100, 0.5)).toBe(5000);
  });
});

describe("threadLength", () => {
  it("positive length", () => {
    expect(threadLength(1000, 14, 2)).toBeGreaterThan(0);
  });
});

describe("skeinsNeeded", () => {
  it("rounds up", () => {
    expect(skeinsNeeded(10, 8)).toBe(2);
  });

  it("exact fit", () => {
    expect(skeinsNeeded(16, 8)).toBe(2);
  });
});

describe("stitchesPerHour", () => {
  it("cross stitch rate", () => {
    expect(stitchesPerHour("cross")).toBe(150);
  });

  it("backstitch faster than satin", () => {
    expect(stitchesPerHour("backstitch")).toBeGreaterThan(stitchesPerHour("satin"));
  });
});

describe("estimateHours", () => {
  it("positive hours", () => {
    expect(estimateHours(3000, "cross")).toBe(20);
  });
});

describe("hoopSize", () => {
  it("fits design with margin", () => {
    expect(hoopSize(15, 10)).toBeGreaterThanOrEqual(17);
  });
});

describe("gridLines", () => {
  it("counts grid intervals", () => {
    expect(gridLines(100, 10)).toBe(10);
  });
});

describe("colorChanges", () => {
  it("more colors = more changes", () => {
    expect(colorChanges(5)).toBeGreaterThan(colorChanges(3));
  });
});

describe("backstitchLength", () => {
  it("positive count", () => {
    expect(backstitchLength(100, 80)).toBeGreaterThan(0);
  });
});

describe("wasteFactor", () => {
  it("increases with starts/stops", () => {
    expect(wasteFactor(10, 20)).toBeGreaterThan(10);
  });
});

describe("aidasPerMeter", () => {
  it("higher count = more stitches per meter", () => {
    expect(aidasPerMeter(18)).toBeGreaterThan(aidasPerMeter(14));
  });
});

describe("recommendedStrands", () => {
  it("more strands for lower count", () => {
    expect(recommendedStrands(14)).toBeGreaterThan(recommendedStrands(28));
  });
});

describe("projectCost", () => {
  it("positive cost", () => {
    expect(projectCost(5, 2.5, 15, 0.2)).toBeGreaterThan(0);
  });
});

describe("stitchTypes", () => {
  it("returns 6 types", () => {
    expect(stitchTypes()).toHaveLength(6);
    expect(stitchTypes()).toContain("cross");
  });
});
