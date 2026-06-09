import { describe, it, expect } from "vitest";
import {
  juiceYield, specificGravity, potentialAbv, tanninLevel,
  acidLevel, blendRatio, fermentationTempC, fermentationWeeks,
  sulfiteAmount, yeastAmount, bottleCount, primingSugar,
  agingMonths, ciderStyles,
} from "../cider-making.js";

describe("juiceYield", () => {
  it("60% of weight", () => {
    expect(juiceYield(10)).toBe(6);
  });
});

describe("specificGravity", () => {
  it("above 1 for positive brix", () => {
    expect(specificGravity(12)).toBeGreaterThan(1);
  });
});

describe("potentialAbv", () => {
  it("positive for OG > FG", () => {
    expect(potentialAbv(1.050, 1.000)).toBeGreaterThan(0);
  });
});

describe("tanninLevel", () => {
  it("bittersweet = high", () => {
    expect(tanninLevel("bittersweet")).toBe("high");
  });
  it("sweet = low", () => {
    expect(tanninLevel("sweet")).toBe("low");
  });
});

describe("acidLevel", () => {
  it("sharp = high", () => {
    expect(acidLevel("sharp")).toBe("high");
  });
});

describe("blendRatio", () => {
  it("totals 100%", () => {
    const r = blendRatio();
    expect(r.bittersweet + r.sharp + r.sweet).toBe(100);
  });
});

describe("fermentationTempC", () => {
  it("ice cider is below freezing", () => {
    expect(fermentationTempC("ice").max).toBeLessThanOrEqual(0);
  });
});

describe("fermentationWeeks", () => {
  it("ice takes longest", () => {
    expect(fermentationWeeks("ice")).toBeGreaterThan(fermentationWeeks("dry"));
  });
});

describe("sulfiteAmount", () => {
  it("positive grams", () => {
    expect(sulfiteAmount(23)).toBeGreaterThan(0);
  });
});

describe("yeastAmount", () => {
  it("~5g per 23L", () => {
    expect(yeastAmount(23)).toBeCloseTo(5, 0);
  });
});

describe("bottleCount", () => {
  it("20L = 40 x 500ml", () => {
    expect(bottleCount(20)).toBe(40);
  });
});

describe("primingSugar", () => {
  it("still = 0", () => {
    expect(primingSugar(20, "still")).toBe(0);
  });
  it("sparkling > petillant", () => {
    expect(primingSugar(20, "sparkling")).toBeGreaterThan(primingSugar(20, "petillant"));
  });
});

describe("agingMonths", () => {
  it("ice ages longest", () => {
    expect(agingMonths("ice")).toBeGreaterThan(agingMonths("dry"));
  });
});

describe("ciderStyles", () => {
  it("returns 5 styles", () => {
    expect(ciderStyles()).toHaveLength(5);
  });
});
