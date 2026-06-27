import { describe, it, expect } from "vitest";
import {
  pitDepthCm, cookingHours, heatingMedium,
  servingsTypical, prepTimeHours, steamBased,
  smokeContribution, culturalOrigin, difficultyRating, earthOvenMethods,
} from "../earth-oven-calc.js";

describe("pitDepthCm", () => {
  it("imu has deepest pit", () => {
    expect(pitDepthCm("imu")).toBeGreaterThan(
      pitDepthCm("clambake")
    );
  });
});

describe("cookingHours", () => {
  it("imu cooks longest", () => {
    expect(cookingHours("imu")).toBeGreaterThan(
      cookingHours("clambake")
    );
  });
});

describe("heatingMedium", () => {
  it("imu uses lava rocks", () => {
    expect(heatingMedium("imu")).toBe("lava_rocks");
  });
});

describe("servingsTypical", () => {
  it("imu serves most people", () => {
    expect(servingsTypical("imu")).toBeGreaterThan(
      servingsTypical("pachamanca")
    );
  });
});

describe("prepTimeHours", () => {
  it("imu needs most prep", () => {
    expect(prepTimeHours("imu")).toBeGreaterThan(
      prepTimeHours("pachamanca")
    );
  });
});

describe("steamBased", () => {
  it("hangi is steam based", () => {
    expect(steamBased("hangi")).toBe(true);
  });
  it("imu is not", () => {
    expect(steamBased("imu")).toBe(false);
  });
});

describe("smokeContribution", () => {
  it("barbacoa has most smoke", () => {
    expect(smokeContribution("barbacoa")).toBeGreaterThan(
      smokeContribution("pachamanca")
    );
  });
});

describe("culturalOrigin", () => {
  it("hangi is maori", () => {
    expect(culturalOrigin("hangi")).toBe("maori");
  });
});

describe("difficultyRating", () => {
  it("imu is hardest", () => {
    expect(difficultyRating("imu")).toBeGreaterThan(
      difficultyRating("clambake")
    );
  });
});

describe("earthOvenMethods", () => {
  it("returns 5 methods", () => {
    expect(earthOvenMethods()).toHaveLength(5);
  });
});
