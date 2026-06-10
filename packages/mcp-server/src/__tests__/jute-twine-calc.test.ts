import { describe, it, expect } from "vitest";
import {
  fiberStrengthMpa, fiberLengthCm, lusterRating,
  moistureAbsorption, biodegradable, rettingDays,
  primaryUse, yieldKgPerHectare, costPerKg, juteGrades,
} from "../jute-twine-calc.js";

describe("fiberStrengthMpa", () => {
  it("tossa is strongest", () => {
    expect(fiberStrengthMpa("tossa")).toBeGreaterThan(
      fiberStrengthMpa("roselle")
    );
  });
});

describe("fiberLengthCm", () => {
  it("kenaf has longest fibers", () => {
    expect(fiberLengthCm("kenaf")).toBeGreaterThan(
      fiberLengthCm("roselle")
    );
  });
});

describe("lusterRating", () => {
  it("tossa has best luster", () => {
    expect(lusterRating("tossa")).toBeGreaterThan(
      lusterRating("roselle")
    );
  });
});

describe("moistureAbsorption", () => {
  it("white jute absorbs most", () => {
    expect(moistureAbsorption("white_jute")).toBeGreaterThan(
      moistureAbsorption("kenaf")
    );
  });
});

describe("biodegradable", () => {
  it("all jute is biodegradable", () => {
    expect(biodegradable("tossa")).toBe(true);
    expect(biodegradable("kenaf")).toBe(true);
  });
});

describe("rettingDays", () => {
  it("white jute takes longest to ret", () => {
    expect(rettingDays("white_jute")).toBeGreaterThan(
      rettingDays("kenaf")
    );
  });
});

describe("primaryUse", () => {
  it("tossa is for burlap sacking", () => {
    expect(primaryUse("tossa")).toBe("burlap_sacking");
  });
});

describe("yieldKgPerHectare", () => {
  it("kenaf yields most", () => {
    expect(yieldKgPerHectare("kenaf")).toBeGreaterThan(
      yieldKgPerHectare("roselle")
    );
  });
});

describe("costPerKg", () => {
  it("tossa costs most", () => {
    expect(costPerKg("tossa")).toBeGreaterThan(
      costPerKg("kenaf")
    );
  });
});

describe("juteGrades", () => {
  it("returns 5 grades", () => {
    expect(juteGrades()).toHaveLength(5);
  });
});
