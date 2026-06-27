import { describe, it, expect } from "vitest";
import {
  potSize, soilMix, wateringFrequency, fertilizingSchedule,
  pruningMonth, repottingInterval, wireSize, wireLength,
  wireRemovalWeeks, treeHeight, sunlightHours, winterProtection,
  maturityYears, bonsaiStyles,
} from "../bonsai-calc.js";

describe("potSize", () => {
  it("scales with trunk", () => {
    expect(potSize(5).widthCm).toBe(30);
  });
});

describe("soilMix", () => {
  it("more akadama for deciduous", () => {
    expect(soilMix("maple").akadama).toBeGreaterThan(soilMix("pine").akadama);
  });
});

describe("wateringFrequency", () => {
  it("daily in summer", () => {
    expect(wateringFrequency("juniper", "summer")).toContain("daily");
  });
});

describe("fertilizingSchedule", () => {
  it("active months > 0", () => {
    expect(fertilizingSchedule("maple").monthsActive).toBeGreaterThan(0);
  });
});

describe("pruningMonth", () => {
  it("ficus has many months", () => {
    expect(pruningMonth("ficus").length).toBeGreaterThan(pruningMonth("azalea").length);
  });
});

describe("repottingInterval", () => {
  it("yearly for young trees", () => {
    expect(repottingInterval("maple", 3)).toBe(1);
  });

  it("longer for conifers", () => {
    expect(repottingInterval("pine", 10)).toBeGreaterThan(repottingInterval("maple", 10));
  });
});

describe("wireSize", () => {
  it("1/3 of branch diameter", () => {
    expect(wireSize(6)).toBeCloseTo(2, 0);
  });
});

describe("wireLength", () => {
  it("1.5x branch length", () => {
    expect(wireLength(20)).toBe(30);
  });
});

describe("wireRemovalWeeks", () => {
  it("ficus fastest", () => {
    expect(wireRemovalWeeks("ficus")).toBeLessThan(wireRemovalWeeks("pine"));
  });
});

describe("treeHeight", () => {
  it("cascade is shortest relative to pot", () => {
    expect(treeHeight("cascade", 30)).toBeLessThan(treeHeight("formal_upright", 30));
  });
});

describe("sunlightHours", () => {
  it("positive hours", () => {
    expect(sunlightHours("juniper")).toBeGreaterThan(0);
  });
});

describe("winterProtection", () => {
  it("ficus needs no winter protection indoors", () => {
    expect(winterProtection("ficus")).toBe(false);
  });

  it("juniper needs protection", () => {
    expect(winterProtection("juniper")).toBe(true);
  });
});

describe("maturityYears", () => {
  it("ficus is fastest", () => {
    expect(maturityYears("ficus")).toBeLessThan(maturityYears("pine"));
  });
});

describe("bonsaiStyles", () => {
  it("returns 6 styles", () => {
    expect(bonsaiStyles()).toHaveLength(6);
  });
});
