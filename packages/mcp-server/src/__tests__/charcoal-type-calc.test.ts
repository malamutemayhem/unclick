import { describe, it, expect } from "vitest";
import {
  burnTempCelsius, burnTimeHours, ashPercent,
  smokeLevel, sparkLevel, reusable,
  carbonPercent, bestUse, costPerKg, charcoalTypes,
} from "../charcoal-type-calc.js";

describe("burnTempCelsius", () => {
  it("binchotan burns hottest", () => {
    expect(burnTempCelsius("binchotan")).toBeGreaterThan(
      burnTempCelsius("briquette")
    );
  });
});

describe("burnTimeHours", () => {
  it("binchotan burns longest", () => {
    expect(burnTimeHours("binchotan")).toBeGreaterThan(
      burnTimeHours("bamboo")
    );
  });
});

describe("ashPercent", () => {
  it("briquette produces most ash", () => {
    expect(ashPercent("briquette")).toBeGreaterThan(
      ashPercent("binchotan")
    );
  });
});

describe("smokeLevel", () => {
  it("briquette produces most smoke", () => {
    expect(smokeLevel("briquette")).toBeGreaterThan(
      smokeLevel("binchotan")
    );
  });
});

describe("sparkLevel", () => {
  it("bamboo sparks most", () => {
    expect(sparkLevel("bamboo")).toBeGreaterThan(
      sparkLevel("binchotan")
    );
  });
});

describe("reusable", () => {
  it("binchotan is reusable", () => {
    expect(reusable("binchotan")).toBe(true);
  });
  it("lump hardwood is not", () => {
    expect(reusable("lump_hardwood")).toBe(false);
  });
});

describe("carbonPercent", () => {
  it("binchotan has most carbon", () => {
    expect(carbonPercent("binchotan")).toBeGreaterThan(
      carbonPercent("briquette")
    );
  });
});

describe("bestUse", () => {
  it("binchotan is best for yakitori", () => {
    expect(bestUse("binchotan")).toBe("yakitori");
  });
});

describe("costPerKg", () => {
  it("binchotan is most expensive", () => {
    expect(costPerKg("binchotan")).toBeGreaterThan(
      costPerKg("briquette")
    );
  });
});

describe("charcoalTypes", () => {
  it("returns 5 types", () => {
    expect(charcoalTypes()).toHaveLength(5);
  });
});
