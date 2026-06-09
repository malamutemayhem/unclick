import { describe, it, expect } from "vitest";
import {
  waterRatio, compactStrength, towerHeight, wallThickness,
  sandVolumeLiters, bucketsFull, moatDepth, moatWidth,
  archSpan, buildTime, tideWindow, toolsNeeded,
  competitionScore, structureTypes,
} from "../sandcastle-calc.js";

describe("waterRatio", () => {
  it("beach sand ratio is 0.08", () => {
    expect(waterRatio("beach")).toBe(0.08);
  });
});

describe("compactStrength", () => {
  it("optimal at 0.08", () => {
    expect(compactStrength(0.08)).toBe("optimal");
  });
  it("too dry is poor", () => {
    expect(compactStrength(0.03)).toContain("poor");
  });
});

describe("towerHeight", () => {
  it("positive cm", () => {
    expect(towerHeight(10)).toBeGreaterThan(0);
  });
});

describe("wallThickness", () => {
  it("40% of height", () => {
    expect(wallThickness(10)).toBe(4);
  });
});

describe("sandVolumeLiters", () => {
  it("positive liters", () => {
    expect(sandVolumeLiters(30, 30, 20)).toBeGreaterThan(0);
  });
});

describe("bucketsFull", () => {
  it("rounds up", () => {
    expect(bucketsFull(25, 10)).toBe(3);
  });
});

describe("moatDepth", () => {
  it("30% of wall height", () => {
    expect(moatDepth(20)).toBe(6);
  });
});

describe("moatWidth", () => {
  it("positive cm", () => {
    expect(moatWidth(20)).toBeGreaterThan(0);
  });
});

describe("archSpan", () => {
  it("wider than height", () => {
    expect(archSpan(10)).toBeGreaterThan(10);
  });
});

describe("buildTime", () => {
  it("positive minutes", () => {
    expect(buildTime(3, 2)).toBeGreaterThan(0);
  });
});

describe("tideWindow", () => {
  it("less than high tide hours", () => {
    expect(tideWindow(5)).toBeLessThan(5);
  });
  it("returns 0 when tide too soon", () => {
    expect(tideWindow(1)).toBe(0);
  });
});

describe("toolsNeeded", () => {
  it("always includes bucket and shovel", () => {
    const tools = toolsNeeded(1);
    expect(tools).toContain("bucket");
    expect(tools).toContain("shovel");
  });
  it("more tools for complex builds", () => {
    expect(toolsNeeded(5).length).toBeGreaterThan(toolsNeeded(1).length);
  });
});

describe("competitionScore", () => {
  it("positive score", () => {
    expect(competitionScore(5, 5, 5)).toBeGreaterThan(0);
  });
});

describe("structureTypes", () => {
  it("returns 6 types", () => {
    expect(structureTypes()).toHaveLength(6);
  });
});
