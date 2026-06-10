import { describe, it, expect } from "vitest";
import {
  drawingPower, applicationMinutes, heatGeneration,
  prepTimeMinutes, reusable, skinSensitivity,
  traditionalUse, ingredientAvailability, costRating, poulticeTypes,
} from "../poultice-calc.js";

describe("drawingPower", () => {
  it("charcoal has strongest drawing power", () => {
    expect(drawingPower("charcoal")).toBeGreaterThan(
      drawingPower("bread")
    );
  });
});

describe("applicationMinutes", () => {
  it("bread applies longest", () => {
    expect(applicationMinutes("bread")).toBeGreaterThan(
      applicationMinutes("mustard")
    );
  });
});

describe("heatGeneration", () => {
  it("mustard generates most heat", () => {
    expect(heatGeneration("mustard")).toBeGreaterThan(
      heatGeneration("charcoal")
    );
  });
});

describe("prepTimeMinutes", () => {
  it("herbal takes longest to prepare", () => {
    expect(prepTimeMinutes("herbal")).toBeGreaterThan(
      prepTimeMinutes("clay")
    );
  });
});

describe("reusable", () => {
  it("clay is reusable", () => {
    expect(reusable("clay")).toBe(true);
  });
  it("bread is not", () => {
    expect(reusable("bread")).toBe(false);
  });
});

describe("skinSensitivity", () => {
  it("mustard is most irritating", () => {
    expect(skinSensitivity("mustard")).toBeGreaterThan(
      skinSensitivity("charcoal")
    );
  });
});

describe("traditionalUse", () => {
  it("mustard is for chest congestion", () => {
    expect(traditionalUse("mustard")).toBe("chest_congestion");
  });
});

describe("ingredientAvailability", () => {
  it("bread is most available", () => {
    expect(ingredientAvailability("bread")).toBeGreaterThan(
      ingredientAvailability("herbal")
    );
  });
});

describe("costRating", () => {
  it("herbal costs most", () => {
    expect(costRating("herbal")).toBeGreaterThan(
      costRating("bread")
    );
  });
});

describe("poulticeTypes", () => {
  it("returns 5 types", () => {
    expect(poulticeTypes()).toHaveLength(5);
  });
});
