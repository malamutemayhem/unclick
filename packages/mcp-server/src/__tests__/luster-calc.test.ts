import { describe, it, expect } from "vitest";
import {
  firingTempCelsius, applicationCoats, dryingTimeMinutes, coverageMlPerM2,
  reflectivityPercent, durabilityRating, foodSafe, ventilationRequired,
  costPerMl, lusterTypes,
} from "../luster-calc.js";

describe("firingTempCelsius", () => {
  it("gold fires hottest", () => {
    expect(firingTempCelsius("gold")).toBeGreaterThan(
      firingTempCelsius("bismuth")
    );
  });
});

describe("applicationCoats", () => {
  it("mother of pearl needs most coats", () => {
    expect(applicationCoats("mother_of_pearl")).toBeGreaterThan(
      applicationCoats("gold")
    );
  });
});

describe("dryingTimeMinutes", () => {
  it("mother of pearl dries slowest", () => {
    expect(dryingTimeMinutes("mother_of_pearl")).toBeGreaterThan(
      dryingTimeMinutes("gold")
    );
  });
});

describe("coverageMlPerM2", () => {
  it("gold uses least material", () => {
    expect(coverageMlPerM2("gold")).toBeLessThan(
      coverageMlPerM2("mother_of_pearl")
    );
  });
});

describe("reflectivityPercent", () => {
  it("silver is most reflective", () => {
    expect(reflectivityPercent("silver")).toBeGreaterThan(
      reflectivityPercent("bismuth")
    );
  });
});

describe("durabilityRating", () => {
  it("gold is most durable", () => {
    expect(durabilityRating("gold")).toBeGreaterThan(
      durabilityRating("bismuth")
    );
  });
});

describe("foodSafe", () => {
  it("gold is food safe", () => {
    expect(foodSafe("gold")).toBe(true);
  });
  it("copper is not food safe", () => {
    expect(foodSafe("copper")).toBe(false);
  });
});

describe("ventilationRequired", () => {
  it("returns true", () => {
    expect(ventilationRequired()).toBe(true);
  });
});

describe("costPerMl", () => {
  it("gold is most expensive", () => {
    expect(costPerMl("gold")).toBeGreaterThan(costPerMl("bismuth"));
  });
});

describe("lusterTypes", () => {
  it("returns 5 types", () => {
    expect(lusterTypes()).toHaveLength(5);
  });
});
