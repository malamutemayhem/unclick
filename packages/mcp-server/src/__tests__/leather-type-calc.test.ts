import { describe, it, expect } from "vitest";
import {
  durabilityYears, softness, waterResistance,
  breathability, patinaRating, glossy,
  napped, bestApplication, pricePerSqFt, leatherTypes,
} from "../leather-type-calc.js";

describe("durabilityYears", () => {
  it("full grain lasts longest", () => {
    expect(durabilityYears("full_grain")).toBeGreaterThan(
      durabilityYears("bonded")
    );
  });
});

describe("softness", () => {
  it("suede is softest", () => {
    expect(softness("suede")).toBeGreaterThan(softness("bonded"));
  });
});

describe("waterResistance", () => {
  it("patent is most water resistant", () => {
    expect(waterResistance("patent")).toBeGreaterThan(
      waterResistance("suede")
    );
  });
});

describe("breathability", () => {
  it("full grain is most breathable", () => {
    expect(breathability("full_grain")).toBeGreaterThan(
      breathability("patent")
    );
  });
});

describe("patinaRating", () => {
  it("full grain develops best patina", () => {
    expect(patinaRating("full_grain")).toBeGreaterThan(
      patinaRating("bonded")
    );
  });
});

describe("glossy", () => {
  it("patent is glossy", () => {
    expect(glossy("patent")).toBe(true);
  });
  it("suede is not glossy", () => {
    expect(glossy("suede")).toBe(false);
  });
});

describe("napped", () => {
  it("suede is napped", () => {
    expect(napped("suede")).toBe(true);
  });
  it("full grain is not napped", () => {
    expect(napped("full_grain")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("full grain for boots", () => {
    expect(bestApplication("full_grain")).toBe("boots");
  });
});

describe("pricePerSqFt", () => {
  it("full grain costs most", () => {
    expect(pricePerSqFt("full_grain")).toBeGreaterThan(
      pricePerSqFt("bonded")
    );
  });
});

describe("leatherTypes", () => {
  it("returns 5 types", () => {
    expect(leatherTypes()).toHaveLength(5);
  });
});
