import { describe, it, expect } from "vitest";
import {
  concentrationRange, fragranceOilMl, carrierMl, noteBalance,
  idealBalance, noteMlBreakdown, longevityHours, sillageRating,
  macerateWeeks, dropsToMl, mlToDrops, dilutionPercent,
  batchScale, costPerMl, sprayCount, concentrations,
} from "../perfume-calc.js";

describe("concentrationRange", () => {
  it("parfum 20-30%", () => {
    expect(concentrationRange("parfum").min).toBe(20);
    expect(concentrationRange("parfum").max).toBe(30);
  });

  it("edc lower than edp", () => {
    expect(concentrationRange("edc").max).toBeLessThan(concentrationRange("edp").min);
  });
});

describe("fragranceOilMl", () => {
  it("20% of 50ml = 10ml", () => {
    expect(fragranceOilMl(50, 20)).toBe(10);
  });
});

describe("carrierMl", () => {
  it("complement of fragrance", () => {
    expect(carrierMl(50, 20)).toBe(40);
  });
});

describe("noteBalance", () => {
  it("sums by type", () => {
    const notes = [
      { name: "lemon", type: "top" as const, percentOfBlend: 30 },
      { name: "rose", type: "middle" as const, percentOfBlend: 50 },
      { name: "musk", type: "base" as const, percentOfBlend: 20 },
    ];
    const bal = noteBalance(notes);
    expect(bal.top).toBe(30);
    expect(bal.middle).toBe(50);
    expect(bal.base).toBe(20);
  });
});

describe("idealBalance", () => {
  it("sums to 100", () => {
    const b = idealBalance();
    expect(b.top + b.middle + b.base).toBe(100);
  });
});

describe("noteMlBreakdown", () => {
  it("calculates ml per note", () => {
    const notes = [
      { name: "bergamot", type: "top" as const, percentOfBlend: 50 },
      { name: "sandalwood", type: "base" as const, percentOfBlend: 50 },
    ];
    const breakdown = noteMlBreakdown(notes, 10);
    expect(breakdown[0].ml).toBe(5);
  });
});

describe("longevityHours", () => {
  it("parfum lasts longest", () => {
    expect(longevityHours("parfum").max).toBeGreaterThan(longevityHours("edt").max);
  });
});

describe("sillageRating", () => {
  it("strong at high concentration", () => {
    expect(sillageRating(25)).toBe("strong");
  });

  it("intimate at low concentration", () => {
    expect(sillageRating(2)).toBe("intimate");
  });
});

describe("macerateWeeks", () => {
  it("parfum needs most time", () => {
    expect(macerateWeeks("parfum")).toBeGreaterThan(macerateWeeks("edt"));
  });
});

describe("dropsToMl", () => {
  it("20 drops = 1ml", () => {
    expect(dropsToMl(20)).toBe(1);
  });
});

describe("mlToDrops", () => {
  it("1ml = 20 drops", () => {
    expect(mlToDrops(1)).toBe(20);
  });
});

describe("dilutionPercent", () => {
  it("50/50 = 50%", () => {
    expect(dilutionPercent(5, 5)).toBe(50);
  });

  it("0 for no liquid", () => {
    expect(dilutionPercent(0, 0)).toBe(0);
  });
});

describe("batchScale", () => {
  it("doubles ingredient for double batch", () => {
    expect(batchScale(50, 100, 10)).toBe(20);
  });
});

describe("costPerMl", () => {
  it("weighted average", () => {
    const ingredients = [
      { ml: 10, pricePerMl: 2 },
      { ml: 40, pricePerMl: 0.5 },
    ];
    expect(costPerMl(ingredients)).toBe(0.8);
  });
});

describe("sprayCount", () => {
  it("50ml = 500 sprays", () => {
    expect(sprayCount(50)).toBe(500);
  });
});

describe("concentrations", () => {
  it("returns 5 types", () => {
    expect(concentrations()).toHaveLength(5);
    expect(concentrations()).toContain("edp");
  });
});
