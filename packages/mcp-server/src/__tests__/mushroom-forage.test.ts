import { describe, it, expect } from "vitest";
import {
  peakSeason, habitatType, sporePrintColor, dryingTempC,
  dryingHours, driedWeight, rehydrationRatio, shelfLifeDays,
  toxicityWarning, yieldPerHour, marketValuePerKg, cookingMethod,
  mushroomTypes,
} from "../mushroom-forage.js";

describe("peakSeason", () => {
  it("morels in spring", () => {
    expect(peakSeason("morel")).toBe("spring");
  });
  it("chanterelle in summer", () => {
    expect(peakSeason("chanterelle")).toBe("summer");
  });
});

describe("habitatType", () => {
  it("returns string", () => {
    expect(habitatType("oyster")).toContain("log");
  });
});

describe("sporePrintColor", () => {
  it("returns color", () => {
    expect(typeof sporePrintColor("porcini")).toBe("string");
  });
});

describe("dryingTempC", () => {
  it("between 45 and 65", () => {
    expect(dryingTempC("morel")).toBeGreaterThanOrEqual(45);
    expect(dryingTempC("morel")).toBeLessThanOrEqual(65);
  });
});

describe("dryingHours", () => {
  it("thicker = longer", () => {
    expect(dryingHours(10)).toBeGreaterThan(dryingHours(3));
  });
});

describe("driedWeight", () => {
  it("10% of fresh", () => {
    expect(driedWeight(1000)).toBe(100);
  });
});

describe("rehydrationRatio", () => {
  it("is 8x", () => {
    expect(rehydrationRatio()).toBe(8);
  });
});

describe("shelfLifeDays", () => {
  it("dried lasts 365 days", () => {
    expect(shelfLifeDays(true)).toBe(365);
  });
  it("fresh lasts 7 days", () => {
    expect(shelfLifeDays(false)).toBe(7);
  });
});

describe("toxicityWarning", () => {
  it("includes warning text", () => {
    expect(toxicityWarning()).toContain("Never");
  });
});

describe("yieldPerHour", () => {
  it("expert yields most", () => {
    expect(yieldPerHour("expert")).toBeGreaterThan(yieldPerHour("beginner"));
  });
});

describe("marketValuePerKg", () => {
  it("morel most expensive", () => {
    expect(marketValuePerKg("morel")).toBeGreaterThan(marketValuePerKg("oyster"));
  });
});

describe("cookingMethod", () => {
  it("returns suggestion", () => {
    expect(typeof cookingMethod("lions_mane")).toBe("string");
  });
});

describe("mushroomTypes", () => {
  it("returns 7 types", () => {
    expect(mushroomTypes()).toHaveLength(7);
  });
});
