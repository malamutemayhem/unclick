import { describe, it, expect } from "vitest";
import {
  concentrationPercent, preparationHours, phLevel,
  hardSoap, historicalAvailability, consistencyRating,
  safetyRisk, bestProduct, costPerKg, lyeSources,
} from "../lye-water-calc.js";

describe("concentrationPercent", () => {
  it("sodium hydroxide is most concentrated", () => {
    expect(concentrationPercent("sodium_hydroxide")).toBeGreaterThan(
      concentrationPercent("wood_ash")
    );
  });
});

describe("preparationHours", () => {
  it("wood ash takes longest", () => {
    expect(preparationHours("wood_ash")).toBeGreaterThan(
      preparationHours("sodium_hydroxide")
    );
  });
});

describe("phLevel", () => {
  it("sodium hydroxide has highest pH", () => {
    expect(phLevel("sodium_hydroxide")).toBeGreaterThan(
      phLevel("wood_ash")
    );
  });
});

describe("hardSoap", () => {
  it("sodium hydroxide makes hard soap", () => {
    expect(hardSoap("sodium_hydroxide")).toBe(true);
  });
  it("wood ash does not", () => {
    expect(hardSoap("wood_ash")).toBe(false);
  });
});

describe("historicalAvailability", () => {
  it("wood ash was historically available", () => {
    expect(historicalAvailability("wood_ash")).toBe(true);
  });
  it("sodium hydroxide was not", () => {
    expect(historicalAvailability("sodium_hydroxide")).toBe(false);
  });
});

describe("consistencyRating", () => {
  it("sodium hydroxide is most consistent", () => {
    expect(consistencyRating("sodium_hydroxide")).toBeGreaterThan(
      consistencyRating("wood_ash")
    );
  });
});

describe("safetyRisk", () => {
  it("sodium hydroxide has highest safety risk", () => {
    expect(safetyRisk("sodium_hydroxide")).toBeGreaterThan(
      safetyRisk("wood_ash")
    );
  });
});

describe("bestProduct", () => {
  it("potassium hydroxide is best for liquid soap", () => {
    expect(bestProduct("potassium_hydroxide")).toBe("liquid_soap");
  });
});

describe("costPerKg", () => {
  it("potassium hydroxide costs most", () => {
    expect(costPerKg("potassium_hydroxide")).toBeGreaterThan(
      costPerKg("wood_ash")
    );
  });
});

describe("lyeSources", () => {
  it("returns 5 sources", () => {
    expect(lyeSources()).toHaveLength(5);
  });
});
