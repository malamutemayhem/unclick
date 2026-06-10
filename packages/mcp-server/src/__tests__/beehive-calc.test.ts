import { describe, it, expect } from "vitest";
import {
  frameCount, internalVolumeLiters, broodBoxCount, inspectionFrequencyDays,
  winterSurvivalPercent, honeyYieldKg, beginnerFriendly, weightEmptyKg,
  costEstimate, hiveTypes,
} from "../beehive-calc.js";

describe("frameCount", () => {
  it("top bar has most frames", () => {
    expect(frameCount("top_bar")).toBeGreaterThan(frameCount("langstroth"));
  });
  it("skep has no frames", () => {
    expect(frameCount("skep")).toBe(0);
  });
});

describe("internalVolumeLiters", () => {
  it("top bar is largest", () => {
    expect(internalVolumeLiters("top_bar")).toBeGreaterThan(
      internalVolumeLiters("langstroth")
    );
  });
});

describe("broodBoxCount", () => {
  it("langstroth has 2 brood boxes", () => {
    expect(broodBoxCount("langstroth")).toBe(2);
  });
});

describe("inspectionFrequencyDays", () => {
  it("langstroth inspected most often", () => {
    expect(inspectionFrequencyDays("langstroth")).toBeLessThan(
      inspectionFrequencyDays("skep")
    );
  });
});

describe("winterSurvivalPercent", () => {
  it("warre has best winter survival", () => {
    expect(winterSurvivalPercent("warre")).toBeGreaterThan(
      winterSurvivalPercent("skep")
    );
  });
});

describe("honeyYieldKg", () => {
  it("langstroth yields most honey", () => {
    expect(honeyYieldKg("langstroth")).toBeGreaterThan(
      honeyYieldKg("skep")
    );
  });
});

describe("beginnerFriendly", () => {
  it("flow is most beginner friendly", () => {
    expect(beginnerFriendly("flow")).toBeGreaterThan(
      beginnerFriendly("skep")
    );
  });
});

describe("weightEmptyKg", () => {
  it("flow is heaviest", () => {
    expect(weightEmptyKg("flow")).toBeGreaterThan(weightEmptyKg("skep"));
  });
});

describe("costEstimate", () => {
  it("flow is most expensive", () => {
    expect(costEstimate("flow")).toBeGreaterThan(costEstimate("skep"));
  });
});

describe("hiveTypes", () => {
  it("returns 5 types", () => {
    expect(hiveTypes()).toHaveLength(5);
  });
});
