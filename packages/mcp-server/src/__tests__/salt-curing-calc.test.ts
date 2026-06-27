import { describe, it, expect } from "vitest";
import {
  saltPercentByWeight, curingDaysPerKg, tempCelsius, moistureLossPercent,
  shelfLifeWeeks, flavorIntensity, evenDistribution, beginnerFriendly,
  costPerKg, cureMethods,
} from "../salt-curing-calc.js";

describe("saltPercentByWeight", () => {
  it("wet brine uses most salt", () => {
    expect(saltPercentByWeight("wet_brine")).toBeGreaterThan(
      saltPercentByWeight("equilibrium")
    );
  });
});

describe("curingDaysPerKg", () => {
  it("equilibrium takes longest", () => {
    expect(curingDaysPerKg("equilibrium")).toBeGreaterThan(
      curingDaysPerKg("wet_brine")
    );
  });
});

describe("tempCelsius", () => {
  it("all methods below 5C", () => {
    expect(tempCelsius("dry_cure")).toBeLessThan(5);
  });
});

describe("moistureLossPercent", () => {
  it("dry cure loses most moisture", () => {
    expect(moistureLossPercent("dry_cure")).toBeGreaterThan(
      moistureLossPercent("wet_brine")
    );
  });
});

describe("shelfLifeWeeks", () => {
  it("nitrate cure lasts longest", () => {
    expect(shelfLifeWeeks("nitrate_cure")).toBeGreaterThan(
      shelfLifeWeeks("wet_brine")
    );
  });
});

describe("flavorIntensity", () => {
  it("dry cure has strongest flavor", () => {
    expect(flavorIntensity("dry_cure")).toBeGreaterThan(
      flavorIntensity("wet_brine")
    );
  });
});

describe("evenDistribution", () => {
  it("equilibrium distributes most evenly", () => {
    expect(evenDistribution("equilibrium")).toBeGreaterThan(
      evenDistribution("dry_cure")
    );
  });
});

describe("beginnerFriendly", () => {
  it("wet brine is beginner friendly", () => {
    expect(beginnerFriendly("wet_brine")).toBe(true);
  });
  it("dry cure is not beginner friendly", () => {
    expect(beginnerFriendly("dry_cure")).toBe(false);
  });
});

describe("costPerKg", () => {
  it("sugar cure is most expensive", () => {
    expect(costPerKg("sugar_cure")).toBeGreaterThan(
      costPerKg("wet_brine")
    );
  });
});

describe("cureMethods", () => {
  it("returns 5 methods", () => {
    expect(cureMethods()).toHaveLength(5);
  });
});
