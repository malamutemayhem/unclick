import { describe, it, expect } from "vitest";
import {
  gradeNumber, meltValue, premiumPercent, populationEstimate,
  rarityScale, slabDimensions, storageTubeCapacity, albumPages,
  insurancePremium, authenticityCheck, edgeType, yearRange,
  coinGrades,
} from "../coin-collect.js";

describe("gradeNumber", () => {
  it("MS is 65", () => {
    expect(gradeNumber("MS")).toBe(65);
  });
});

describe("meltValue", () => {
  it("positive value", () => {
    expect(meltValue(31.1, 0.999, 2000)).toBeGreaterThan(0);
  });
});

describe("premiumPercent", () => {
  it("positive for above melt", () => {
    expect(premiumPercent(3000, 2000)).toBeGreaterThan(0);
  });

  it("0 for no melt value", () => {
    expect(premiumPercent(100, 0)).toBe(0);
  });
});

describe("populationEstimate", () => {
  it("less than mintage", () => {
    expect(populationEstimate(1000000, 0.1)).toBeLessThan(1000000);
  });
});

describe("rarityScale", () => {
  it("common for many", () => {
    expect(rarityScale(50000)).toBe("common");
  });

  it("very rare for few", () => {
    expect(rarityScale(50)).toBe("very rare");
  });
});

describe("slabDimensions", () => {
  it("larger than coin", () => {
    const slab = slabDimensions(30);
    expect(slab.widthMm).toBeGreaterThan(30);
    expect(slab.heightMm).toBeGreaterThan(30);
  });
});

describe("storageTubeCapacity", () => {
  it("positive count", () => {
    expect(storageTubeCapacity(2, 100)).toBe(50);
  });
});

describe("albumPages", () => {
  it("rounds up", () => {
    expect(albumPages(25)).toBe(2);
  });
});

describe("insurancePremium", () => {
  it("fraction of value", () => {
    expect(insurancePremium(10000)).toBeLessThan(10000);
  });
});

describe("authenticityCheck", () => {
  it("true within tolerance", () => {
    expect(authenticityCheck(8.05, 8.0)).toBe(true);
  });

  it("false outside tolerance", () => {
    expect(authenticityCheck(8.5, 8.0)).toBe(false);
  });
});

describe("edgeType", () => {
  it("reeded for modern", () => {
    expect(edgeType("modern")).toBe("reeded");
  });
});

describe("yearRange", () => {
  it("inclusive count", () => {
    expect(yearRange(1900, 1909)).toBe(10);
  });
});

describe("coinGrades", () => {
  it("returns 9 grades", () => {
    expect(coinGrades()).toHaveLength(9);
  });
});
