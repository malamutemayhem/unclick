import { describe, it, expect } from "vitest";
import {
  windSpeedMPerSec, separationRateKgPerHour, chaffLossPercent,
  cleanlinessRating, dropHeightCm, passesRequired, toolWeightKg,
  laborersNeeded, costEstimate, winnowMethods,
} from "../winnow-calc.js";

describe("windSpeedMPerSec", () => {
  it("wind tunnel has highest speed", () => {
    expect(windSpeedMPerSec("wind_tunnel")).toBeGreaterThan(windSpeedMPerSec("fan"));
  });
  it("sieve has no wind", () => {
    expect(windSpeedMPerSec("sieve")).toBe(0);
  });
});

describe("separationRateKgPerHour", () => {
  it("wind tunnel is fastest", () => {
    expect(separationRateKgPerHour("wind_tunnel")).toBeGreaterThan(
      separationRateKgPerHour("fan")
    );
  });
});

describe("chaffLossPercent", () => {
  it("wind tunnel loses least chaff", () => {
    expect(chaffLossPercent("wind_tunnel")).toBeLessThan(chaffLossPercent("sieve"));
  });
});

describe("cleanlinessRating", () => {
  it("wind tunnel cleanest", () => {
    expect(cleanlinessRating("wind_tunnel")).toBeGreaterThan(cleanlinessRating("basket"));
  });
});

describe("dropHeightCm", () => {
  it("tossing has highest drop", () => {
    expect(dropHeightCm("tossing")).toBeGreaterThan(dropHeightCm("sieve"));
  });
});

describe("passesRequired", () => {
  it("wind tunnel needs fewest passes", () => {
    expect(passesRequired("wind_tunnel")).toBeLessThan(passesRequired("basket"));
  });
});

describe("toolWeightKg", () => {
  it("wind tunnel is heaviest", () => {
    expect(toolWeightKg("wind_tunnel")).toBeGreaterThan(toolWeightKg("fan"));
  });
});

describe("laborersNeeded", () => {
  it("tossing needs 2 people", () => {
    expect(laborersNeeded("tossing")).toBe(2);
  });
});

describe("costEstimate", () => {
  it("wind tunnel is most expensive", () => {
    expect(costEstimate("wind_tunnel")).toBeGreaterThan(costEstimate("tossing"));
  });
});

describe("winnowMethods", () => {
  it("returns 5 methods", () => {
    expect(winnowMethods()).toHaveLength(5);
  });
});
