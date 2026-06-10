import { describe, it, expect } from "vitest";
import {
  setupTimeMinutes, pressureDistribution, maxFormSizeCm, reusable,
  adjustability, typeHighTolerance, weightKg, skillLevelRequired,
  costEstimate, lockupMethods,
} from "../chase-lockup-calc.js";

describe("setupTimeMinutes", () => {
  it("magnetic is fastest to set up", () => {
    expect(setupTimeMinutes("magnetic")).toBeLessThan(
      setupTimeMinutes("furniture")
    );
  });
});

describe("pressureDistribution", () => {
  it("magnetic distributes pressure best", () => {
    expect(pressureDistribution("magnetic")).toBeGreaterThan(
      pressureDistribution("photopolymer")
    );
  });
});

describe("maxFormSizeCm", () => {
  it("furniture handles largest forms", () => {
    expect(maxFormSizeCm("furniture")).toBeGreaterThan(
      maxFormSizeCm("reglet")
    );
  });
});

describe("reusable", () => {
  it("quoin is reusable", () => {
    expect(reusable("quoin")).toBe(true);
  });
  it("photopolymer is not reusable", () => {
    expect(reusable("photopolymer")).toBe(false);
  });
});

describe("adjustability", () => {
  it("quoin is most adjustable", () => {
    expect(adjustability("quoin")).toBeGreaterThan(
      adjustability("photopolymer")
    );
  });
});

describe("typeHighTolerance", () => {
  it("photopolymer has tightest tolerance", () => {
    expect(typeHighTolerance("photopolymer")).toBeLessThan(
      typeHighTolerance("furniture")
    );
  });
});

describe("weightKg", () => {
  it("magnetic is heaviest", () => {
    expect(weightKg("magnetic")).toBeGreaterThan(
      weightKg("photopolymer")
    );
  });
});

describe("skillLevelRequired", () => {
  it("furniture requires most skill", () => {
    expect(skillLevelRequired("furniture")).toBeGreaterThan(
      skillLevelRequired("magnetic")
    );
  });
});

describe("costEstimate", () => {
  it("magnetic is most expensive", () => {
    expect(costEstimate("magnetic")).toBeGreaterThan(
      costEstimate("photopolymer")
    );
  });
});

describe("lockupMethods", () => {
  it("returns 5 methods", () => {
    expect(lockupMethods()).toHaveLength(5);
  });
});
