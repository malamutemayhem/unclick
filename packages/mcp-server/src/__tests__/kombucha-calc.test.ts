import { describe, it, expect } from "vitest";
import {
  teaAmount, sugarAmount, starterLiquid, waterAmount,
  fermentTemp, firstFermentDays, secondFermentDays,
  carbonationPressure, bottlesNeeded, flavorAmount,
  sugarPerBottle, phTarget, alcoholEstimate, scobyHealth,
  brewCycle, costPerLiter, batchScale, flavorCategories,
} from "../kombucha-calc.js";

describe("teaAmount", () => {
  it("8g per liter", () => {
    expect(teaAmount(4)).toBe(32);
  });
});

describe("sugarAmount", () => {
  it("70g per liter", () => {
    expect(sugarAmount(4)).toBe(280);
  });
});

describe("starterLiquid", () => {
  it("10% of batch in ml", () => {
    expect(starterLiquid(4)).toBe(400);
  });
});

describe("waterAmount", () => {
  it("batch minus starter", () => {
    expect(waterAmount(4, 400)).toBe(3600);
  });
});

describe("fermentTemp", () => {
  it("ideal is 24C", () => {
    expect(fermentTemp().ideal).toBe(24);
  });
});

describe("firstFermentDays", () => {
  it("shorter when warmer", () => {
    expect(firstFermentDays(28)).toBeLessThan(firstFermentDays(20));
  });
});

describe("secondFermentDays", () => {
  it("2-4 days", () => {
    expect(secondFermentDays().min).toBe(2);
    expect(secondFermentDays().max).toBe(4);
  });
});

describe("carbonationPressure", () => {
  it("positive pressure", () => {
    expect(carbonationPressure(4, 24)).toBeGreaterThan(0);
  });
});

describe("bottlesNeeded", () => {
  it("rounds up", () => {
    expect(bottlesNeeded(3000, 500)).toBe(6);
  });
});

describe("flavorAmount", () => {
  it("fruit has most", () => {
    expect(flavorAmount(500, "fruit")).toBeGreaterThan(flavorAmount(500, "spice"));
  });
});

describe("sugarPerBottle", () => {
  it("4g per tsp", () => {
    expect(sugarPerBottle(500)).toBe(4);
  });
});

describe("phTarget", () => {
  it("ready at 3.0", () => {
    expect(phTarget().ready).toBe(3);
  });
});

describe("alcoholEstimate", () => {
  it("low ABV", () => {
    const abv = alcoholEstimate(280, 4000);
    expect(abv).toBeGreaterThan(0);
    expect(abv).toBeLessThan(5);
  });
});

describe("scobyHealth", () => {
  it("healthy for normal scoby", () => {
    expect(scobyHealth(1, "cream")).toBe("healthy");
  });

  it("contaminated if green", () => {
    expect(scobyHealth(1, "green")).toBe("contaminated");
  });
});

describe("brewCycle", () => {
  it("has multiple steps", () => {
    expect(brewCycle().stepDays.length).toBeGreaterThan(3);
  });
});

describe("costPerLiter", () => {
  it("positive cost", () => {
    expect(costPerLiter(0.05, 0.002, 4)).toBeGreaterThan(0);
  });
});

describe("batchScale", () => {
  it("doubles ingredient for double batch", () => {
    expect(batchScale(4, 8, 32)).toBe(64);
  });
});

describe("flavorCategories", () => {
  it("returns 5 categories", () => {
    expect(flavorCategories()).toHaveLength(5);
    expect(flavorCategories()).toContain("fruit");
  });
});
