import { describe, it, expect } from "vitest";
import {
  sapValueNaOH, lyeGrams, waterGrams, traceMoistureRating,
  hardnessRating, latherQuality, cureTimeWeeks, shelfLifeMonths,
  costPerBar, soapOils,
} from "../cold-process-soap-calc.js";

describe("sapValueNaOH", () => {
  it("coconut has highest SAP value", () => {
    expect(sapValueNaOH("coconut")).toBeGreaterThan(
      sapValueNaOH("olive")
    );
  });
});

describe("lyeGrams", () => {
  it("more oil needs more lye", () => {
    expect(lyeGrams(1000, "olive", 5)).toBeGreaterThan(
      lyeGrams(500, "olive", 5)
    );
  });
});

describe("waterGrams", () => {
  it("more lye needs more water", () => {
    expect(waterGrams(100)).toBeGreaterThan(waterGrams(50));
  });
});

describe("traceMoistureRating", () => {
  it("coconut traces fastest", () => {
    expect(traceMoistureRating("coconut")).toBeGreaterThan(
      traceMoistureRating("olive")
    );
  });
});

describe("hardnessRating", () => {
  it("coconut is hardest", () => {
    expect(hardnessRating("coconut")).toBeGreaterThan(
      hardnessRating("castor")
    );
  });
});

describe("latherQuality", () => {
  it("coconut lathers best", () => {
    expect(latherQuality("coconut")).toBeGreaterThan(
      latherQuality("olive")
    );
  });
});

describe("cureTimeWeeks", () => {
  it("returns 6", () => {
    expect(cureTimeWeeks()).toBe(6);
  });
});

describe("shelfLifeMonths", () => {
  it("coconut lasts longest", () => {
    expect(shelfLifeMonths("coconut")).toBeGreaterThan(
      shelfLifeMonths("castor")
    );
  });
});

describe("costPerBar", () => {
  it("shea butter is most expensive", () => {
    expect(costPerBar("shea_butter")).toBeGreaterThan(
      costPerBar("palm")
    );
  });
});

describe("soapOils", () => {
  it("returns 5 oils", () => {
    expect(soapOils()).toHaveLength(5);
  });
});
