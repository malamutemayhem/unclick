import { describe, it, expect } from "vitest";
import {
  clearFacePercent, minBoardWidthInches, minBoardLengthFeet,
  knotAllowance, priceMultiplier, furnitureSuitable,
  typicalUse, wastePercent, availabilityRating, lumberGrades,
} from "../lumber-grade-calc.js";

describe("clearFacePercent", () => {
  it("FAS has highest clear face", () => {
    expect(clearFacePercent("FAS")).toBeGreaterThan(
      clearFacePercent("no1_common")
    );
  });
});

describe("minBoardWidthInches", () => {
  it("FAS requires widest boards", () => {
    expect(minBoardWidthInches("FAS")).toBeGreaterThan(
      minBoardWidthInches("no1_common")
    );
  });
});

describe("minBoardLengthFeet", () => {
  it("FAS requires longest boards", () => {
    expect(minBoardLengthFeet("FAS")).toBeGreaterThan(
      minBoardLengthFeet("no2_common")
    );
  });
});

describe("knotAllowance", () => {
  it("no3 common allows most knots", () => {
    expect(knotAllowance("no3_common")).toBeGreaterThan(
      knotAllowance("FAS")
    );
  });
});

describe("priceMultiplier", () => {
  it("FAS is most expensive", () => {
    expect(priceMultiplier("FAS")).toBeGreaterThan(
      priceMultiplier("no3_common")
    );
  });
});

describe("furnitureSuitable", () => {
  it("FAS is suitable for furniture", () => {
    expect(furnitureSuitable("FAS")).toBe(true);
  });
  it("no3 common is not", () => {
    expect(furnitureSuitable("no3_common")).toBe(false);
  });
});

describe("typicalUse", () => {
  it("FAS is for fine furniture", () => {
    expect(typicalUse("FAS")).toBe("fine_furniture");
  });
});

describe("wastePercent", () => {
  it("no3 common has most waste", () => {
    expect(wastePercent("no3_common")).toBeGreaterThan(
      wastePercent("FAS")
    );
  });
});

describe("availabilityRating", () => {
  it("no3 common is most available", () => {
    expect(availabilityRating("no3_common")).toBeGreaterThan(
      availabilityRating("FAS")
    );
  });
});

describe("lumberGrades", () => {
  it("returns 5 grades", () => {
    expect(lumberGrades()).toHaveLength(5);
  });
});
