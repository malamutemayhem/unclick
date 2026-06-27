import { describe, it, expect } from "vitest";
import {
  juiceYieldPercent, tanninLevel, acidityPercent, specificGravity,
  fermentationTempCelsius, fermentationWeeks, rackingCount, estimatedAbv,
  costPerLiter, appleTypes,
} from "../cider-calc.js";

describe("juiceYieldPercent", () => {
  it("sweet yields most juice", () => {
    expect(juiceYieldPercent("sweet")).toBeGreaterThan(
      juiceYieldPercent("bittersharp")
    );
  });
});

describe("tanninLevel", () => {
  it("bittersweet has highest tannin", () => {
    expect(tanninLevel("bittersweet")).toBeGreaterThan(tanninLevel("sharp"));
  });
});

describe("acidityPercent", () => {
  it("sharp is most acidic", () => {
    expect(acidityPercent("sharp")).toBeGreaterThan(
      acidityPercent("sweet")
    );
  });
});

describe("specificGravity", () => {
  it("sweet has highest gravity", () => {
    expect(specificGravity("sweet")).toBeGreaterThan(
      specificGravity("sharp")
    );
  });
});

describe("fermentationTempCelsius", () => {
  it("returns 12", () => {
    expect(fermentationTempCelsius()).toBe(12);
  });
});

describe("fermentationWeeks", () => {
  it("returns 6", () => {
    expect(fermentationWeeks()).toBe(6);
  });
});

describe("rackingCount", () => {
  it("returns 2", () => {
    expect(rackingCount()).toBe(2);
  });
});

describe("estimatedAbv", () => {
  it("sweet has highest ABV", () => {
    expect(estimatedAbv("sweet")).toBeGreaterThan(estimatedAbv("sharp"));
  });
});

describe("costPerLiter", () => {
  it("bittersharp is most expensive", () => {
    expect(costPerLiter("bittersharp")).toBeGreaterThan(
      costPerLiter("sharp")
    );
  });
});

describe("appleTypes", () => {
  it("returns 5 types", () => {
    expect(appleTypes()).toHaveLength(5);
  });
});
