import { describe, it, expect } from "vitest";
import {
  capacityPerAcre, constructionCost, userConvenience, retrievalTime,
  securityLevel, requiresAttendant, weatherProtected, revenueModel,
  bestLocation, parkingSystems,
} from "../parking-system-calc.js";

describe("capacityPerAcre", () => {
  it("automated highest capacity", () => {
    expect(capacityPerAcre("automated")).toBeGreaterThan(capacityPerAcre("surface_lot"));
  });
});

describe("constructionCost", () => {
  it("automated most expensive", () => {
    expect(constructionCost("automated")).toBeGreaterThan(constructionCost("surface_lot"));
  });
});

describe("userConvenience", () => {
  it("automated most convenient", () => {
    expect(userConvenience("automated")).toBeGreaterThan(userConvenience("underground"));
  });
});

describe("retrievalTime", () => {
  it("automated longest retrieval", () => {
    expect(retrievalTime("automated")).toBeGreaterThan(retrievalTime("surface_lot"));
  });
});

describe("securityLevel", () => {
  it("automated most secure", () => {
    expect(securityLevel("automated")).toBeGreaterThan(securityLevel("street_metered"));
  });
});

describe("requiresAttendant", () => {
  it("automated does not require attendant", () => {
    expect(requiresAttendant("automated")).toBe(false);
  });
  it("surface lot does not", () => {
    expect(requiresAttendant("surface_lot")).toBe(false);
  });
});

describe("weatherProtected", () => {
  it("multistory is weather protected", () => {
    expect(weatherProtected("multistory")).toBe(true);
  });
  it("surface lot is not", () => {
    expect(weatherProtected("surface_lot")).toBe(false);
  });
});

describe("revenueModel", () => {
  it("automated per use subscription", () => {
    expect(revenueModel("automated")).toBe("per_use_subscription");
  });
});

describe("bestLocation", () => {
  it("automated for dense downtown", () => {
    expect(bestLocation("automated")).toBe("dense_downtown");
  });
});

describe("parkingSystems", () => {
  it("returns 5 systems", () => {
    expect(parkingSystems()).toHaveLength(5);
  });
});
