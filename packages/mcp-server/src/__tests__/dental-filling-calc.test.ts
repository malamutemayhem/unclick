import { describe, it, expect } from "vitest";
import {
  durabilityYears, aestheticMatch, costLevel, biocompatibility,
  wearResistance, mercuryFree, toothColored, bestLocation,
  bondingMethod, dentalFillings,
} from "../dental-filling-calc.js";

describe("durabilityYears", () => {
  it("gold most durable", () => {
    expect(durabilityYears("gold")).toBeGreaterThan(durabilityYears("glass_ionomer"));
  });
});

describe("aestheticMatch", () => {
  it("ceramic best aesthetic match", () => {
    expect(aestheticMatch("ceramic")).toBeGreaterThan(aestheticMatch("amalgam"));
  });
});

describe("costLevel", () => {
  it("gold most expensive", () => {
    expect(costLevel("gold")).toBeGreaterThan(costLevel("amalgam"));
  });
});

describe("biocompatibility", () => {
  it("gold most biocompatible", () => {
    expect(biocompatibility("gold")).toBeGreaterThan(biocompatibility("amalgam"));
  });
});

describe("wearResistance", () => {
  it("gold best wear resistance", () => {
    expect(wearResistance("gold")).toBeGreaterThan(wearResistance("composite"));
  });
});

describe("mercuryFree", () => {
  it("composite is mercury free", () => {
    expect(mercuryFree("composite")).toBe(true);
  });
  it("amalgam contains mercury", () => {
    expect(mercuryFree("amalgam")).toBe(false);
  });
});

describe("toothColored", () => {
  it("ceramic is tooth colored", () => {
    expect(toothColored("ceramic")).toBe(true);
  });
  it("gold is not tooth colored", () => {
    expect(toothColored("gold")).toBe(false);
  });
});

describe("bestLocation", () => {
  it("amalgam best for posterior molars", () => {
    expect(bestLocation("amalgam")).toBe("posterior_molars");
  });
});

describe("bondingMethod", () => {
  it("composite uses adhesive bonding", () => {
    expect(bondingMethod("composite")).toBe("adhesive_bonding");
  });
});

describe("dentalFillings", () => {
  it("returns 5 types", () => {
    expect(dentalFillings()).toHaveLength(5);
  });
});
