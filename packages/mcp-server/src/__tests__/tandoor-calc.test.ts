import { describe, it, expect } from "vitest";
import {
  maxTempCelsius, heatupTimeMinutes, smokeFlavorRating,
  tempConsistency, fuelCostRating, indoorSafe,
  ashProduction, authenticity, costEstimate, tandoorFuels,
} from "../tandoor-calc.js";

describe("maxTempCelsius", () => {
  it("charcoal is hottest", () => {
    expect(maxTempCelsius("charcoal")).toBeGreaterThan(
      maxTempCelsius("electric")
    );
  });
});

describe("heatupTimeMinutes", () => {
  it("dung cake takes longest", () => {
    expect(heatupTimeMinutes("dung_cake")).toBeGreaterThan(
      heatupTimeMinutes("electric")
    );
  });
});

describe("smokeFlavorRating", () => {
  it("wood has most smoke flavor", () => {
    expect(smokeFlavorRating("wood")).toBeGreaterThan(
      smokeFlavorRating("gas")
    );
  });
});

describe("tempConsistency", () => {
  it("electric is most consistent", () => {
    expect(tempConsistency("electric")).toBeGreaterThan(
      tempConsistency("dung_cake")
    );
  });
});

describe("fuelCostRating", () => {
  it("electric costs most", () => {
    expect(fuelCostRating("electric")).toBeGreaterThan(
      fuelCostRating("dung_cake")
    );
  });
});

describe("indoorSafe", () => {
  it("electric is indoor safe", () => {
    expect(indoorSafe("electric")).toBe(true);
  });
  it("charcoal is not", () => {
    expect(indoorSafe("charcoal")).toBe(false);
  });
});

describe("ashProduction", () => {
  it("dung cake produces most ash", () => {
    expect(ashProduction("dung_cake")).toBeGreaterThan(
      ashProduction("charcoal")
    );
  });
});

describe("authenticity", () => {
  it("dung cake is most authentic", () => {
    expect(authenticity("dung_cake")).toBeGreaterThan(
      authenticity("electric")
    );
  });
});

describe("costEstimate", () => {
  it("gas is most expensive", () => {
    expect(costEstimate("gas")).toBeGreaterThan(
      costEstimate("dung_cake")
    );
  });
});

describe("tandoorFuels", () => {
  it("returns 5 fuels", () => {
    expect(tandoorFuels()).toHaveLength(5);
  });
});
