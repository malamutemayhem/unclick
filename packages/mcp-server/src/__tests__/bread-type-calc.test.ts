import { describe, it, expect } from "vitest";
import {
  hydrationPercent, crustThickness, fermentationHours,
  openCrumb, shelfLifeDays, enriched,
  naturalLeaven, originCountry, bestPairing, breadTypes,
} from "../bread-type-calc.js";

describe("hydrationPercent", () => {
  it("ciabatta has highest hydration", () => {
    expect(hydrationPercent("ciabatta")).toBeGreaterThan(
      hydrationPercent("brioche")
    );
  });
});

describe("crustThickness", () => {
  it("baguette has thickest crust", () => {
    expect(crustThickness("baguette")).toBeGreaterThan(
      crustThickness("brioche")
    );
  });
});

describe("fermentationHours", () => {
  it("sourdough ferments longest", () => {
    expect(fermentationHours("sourdough")).toBeGreaterThan(
      fermentationHours("brioche")
    );
  });
});

describe("openCrumb", () => {
  it("ciabatta has most open crumb", () => {
    expect(openCrumb("ciabatta")).toBeGreaterThan(
      openCrumb("brioche")
    );
  });
});

describe("shelfLifeDays", () => {
  it("rye lasts longest", () => {
    expect(shelfLifeDays("rye")).toBeGreaterThan(
      shelfLifeDays("baguette")
    );
  });
});

describe("enriched", () => {
  it("brioche is enriched", () => {
    expect(enriched("brioche")).toBe(true);
  });
  it("sourdough is not", () => {
    expect(enriched("sourdough")).toBe(false);
  });
});

describe("naturalLeaven", () => {
  it("sourdough uses natural leaven", () => {
    expect(naturalLeaven("sourdough")).toBe(true);
  });
  it("baguette does not", () => {
    expect(naturalLeaven("baguette")).toBe(false);
  });
});

describe("originCountry", () => {
  it("ciabatta from italy", () => {
    expect(originCountry("ciabatta")).toBe("italy");
  });
});

describe("bestPairing", () => {
  it("sourdough pairs with soup", () => {
    expect(bestPairing("sourdough")).toBe("soup");
  });
});

describe("breadTypes", () => {
  it("returns 5 types", () => {
    expect(breadTypes()).toHaveLength(5);
  });
});
