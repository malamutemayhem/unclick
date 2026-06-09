import { describe, it, expect } from "vitest";
import {
  scovilleRating, heatLevel, dilutionRatio, vinegarPercent,
  fermentationDays, saltBrinePercent, yieldMl, bottlesNeeded,
  shelfLifeMonths, capsaicinMg, blendShu, labelWarning, pepperTypes,
} from "../hot-sauce-calc.js";

describe("scovilleRating", () => {
  it("reaper is hottest", () => {
    expect(scovilleRating("reaper")).toBeGreaterThan(scovilleRating("habanero"));
  });
  it("jalapeno is 5000 SHU", () => {
    expect(scovilleRating("jalapeno")).toBe(5000);
  });
});

describe("heatLevel", () => {
  it("low SHU is mild", () => {
    expect(heatLevel(1000)).toBe("mild");
  });
  it("high SHU is superhot", () => {
    expect(heatLevel(2000000)).toBe("superhot");
  });
});

describe("dilutionRatio", () => {
  it("10:1 ratio", () => {
    expect(dilutionRatio(100000, 10000)).toBe(10);
  });
  it("zero target returns 0", () => {
    expect(dilutionRatio(100000, 0)).toBe(0);
  });
});

describe("vinegarPercent", () => {
  it("low pH needs more vinegar", () => {
    expect(vinegarPercent(2.3)).toBeGreaterThan(vinegarPercent(3.8));
  });
});

describe("fermentationDays", () => {
  it("ghost pepper takes 14 days", () => {
    expect(fermentationDays("ghost")).toBe(14);
  });
  it("jalapeno takes 5 days", () => {
    expect(fermentationDays("jalapeno")).toBe(5);
  });
});

describe("saltBrinePercent", () => {
  it("lacto ferment needs 3.5%", () => {
    expect(saltBrinePercent("lacto")).toBe(3.5);
  });
  it("vinegar only needs 0%", () => {
    expect(saltBrinePercent("vinegar_only")).toBe(0);
  });
});

describe("yieldMl", () => {
  it("positive ml", () => {
    expect(yieldMl(500, 200)).toBeGreaterThan(0);
  });
});

describe("bottlesNeeded", () => {
  it("rounds up", () => {
    expect(bottlesNeeded(400, 150)).toBe(3);
  });
});

describe("shelfLifeMonths", () => {
  it("vinegar extends life", () => {
    expect(shelfLifeMonths(true, false)).toBeGreaterThan(shelfLifeMonths(false, false));
  });
});

describe("capsaicinMg", () => {
  it("positive mg", () => {
    expect(capsaicinMg(100000, 150)).toBeGreaterThan(0);
  });
});

describe("blendShu", () => {
  it("weighted average", () => {
    const blend = blendShu([
      { shu: 5000, grams: 100 },
      { shu: 300000, grams: 100 },
    ]);
    expect(blend).toBe(152500);
  });
  it("empty returns 0", () => {
    expect(blendShu([])).toBe(0);
  });
});

describe("labelWarning", () => {
  it("mild needs no warning", () => {
    expect(labelWarning(1000)).toBe("none needed");
  });
  it("superhot gets extreme warning", () => {
    expect(labelWarning(1000000)).toContain("extreme");
  });
});

describe("pepperTypes", () => {
  it("returns 7 types", () => {
    expect(pepperTypes()).toHaveLength(7);
  });
});
