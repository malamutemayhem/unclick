import { describe, it, expect } from "vitest";
import {
  capacityLiters, churnTimeMinutes, effortRequired,
  butterYieldPercent, cleanupEase, electricPowered,
  bestScale, textureQuality, costEstimate, churnTypes,
} from "../butter-churn-calc.js";

describe("capacityLiters", () => {
  it("barrel has largest capacity", () => {
    expect(capacityLiters("barrel")).toBeGreaterThan(
      capacityLiters("glass_jar")
    );
  });
});

describe("churnTimeMinutes", () => {
  it("barrel takes longest", () => {
    expect(churnTimeMinutes("barrel")).toBeGreaterThan(
      churnTimeMinutes("electric")
    );
  });
});

describe("effortRequired", () => {
  it("dash requires most effort", () => {
    expect(effortRequired("dash")).toBeGreaterThan(
      effortRequired("electric")
    );
  });
});

describe("butterYieldPercent", () => {
  it("electric has highest yield", () => {
    expect(butterYieldPercent("electric")).toBeGreaterThan(
      butterYieldPercent("glass_jar")
    );
  });
});

describe("cleanupEase", () => {
  it("glass jar is easiest to clean", () => {
    expect(cleanupEase("glass_jar")).toBeGreaterThan(
      cleanupEase("barrel")
    );
  });
});

describe("electricPowered", () => {
  it("electric is powered", () => {
    expect(electricPowered("electric")).toBe(true);
  });
  it("barrel is not", () => {
    expect(electricPowered("barrel")).toBe(false);
  });
});

describe("bestScale", () => {
  it("glass jar best for home kitchen", () => {
    expect(bestScale("glass_jar")).toBe("home_kitchen");
  });
});

describe("textureQuality", () => {
  it("paddle gives best texture", () => {
    expect(textureQuality("paddle")).toBeGreaterThan(
      textureQuality("glass_jar")
    );
  });
});

describe("costEstimate", () => {
  it("electric costs most", () => {
    expect(costEstimate("electric")).toBeGreaterThan(
      costEstimate("glass_jar")
    );
  });
});

describe("churnTypes", () => {
  it("returns 5 types", () => {
    expect(churnTypes()).toHaveLength(5);
  });
});
