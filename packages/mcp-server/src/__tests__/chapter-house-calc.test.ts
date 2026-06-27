import { describe, it, expect } from "vitest";
import {
  diameterM, floorAreaM2, seatCount, centralPillarRequired,
  vaultRibCount, windowCount, wallHeightM, acousticQuality,
  stoneVolumeM3, constructionYears, chapterHousePlans,
} from "../chapter-house-calc.js";

describe("diameterM", () => {
  it("positive diameter", () => {
    expect(diameterM(30)).toBeGreaterThan(0);
  });
});

describe("floorAreaM2", () => {
  it("positive area", () => {
    expect(floorAreaM2(12, "octagonal")).toBeGreaterThan(0);
  });
  it("circular area", () => {
    expect(floorAreaM2(10, "circular")).toBeGreaterThan(0);
  });
});

describe("seatCount", () => {
  it("monks plus 2", () => {
    expect(seatCount(30)).toBe(32);
  });
});

describe("centralPillarRequired", () => {
  it("rectangular does not need pillar", () => {
    expect(centralPillarRequired("rectangular")).toBe(false);
  });
  it("octagonal needs pillar", () => {
    expect(centralPillarRequired("octagonal")).toBe(true);
  });
});

describe("vaultRibCount", () => {
  it("octagonal has 8 ribs", () => {
    expect(vaultRibCount("octagonal")).toBe(8);
  });
});

describe("windowCount", () => {
  it("decagonal has most", () => {
    expect(windowCount("decagonal")).toBeGreaterThan(windowCount("rectangular"));
  });
});

describe("wallHeightM", () => {
  it("positive height", () => {
    expect(wallHeightM(12)).toBeGreaterThan(3);
  });
});

describe("acousticQuality", () => {
  it("circular best", () => {
    expect(acousticQuality("circular")).toBeGreaterThan(acousticQuality("rectangular"));
  });
});

describe("stoneVolumeM3", () => {
  it("positive volume", () => {
    expect(stoneVolumeM3(80, 10)).toBeGreaterThan(0);
  });
});

describe("constructionYears", () => {
  it("at least 1", () => {
    expect(constructionYears(30)).toBe(1);
  });
});

describe("chapterHousePlans", () => {
  it("returns 5 plans", () => {
    expect(chapterHousePlans()).toHaveLength(5);
  });
});
