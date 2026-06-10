import { describe, it, expect } from "vitest";
import {
  throughputKgPerHour, chaffRemovalPercent, grainLossPercent,
  windDependence, operatorsNeeded, skillLevel,
  dustExposure, portability, costEstimate, winnowingMethods,
} from "../winnowing-calc.js";

describe("throughputKgPerHour", () => {
  it("fanning mill has highest throughput", () => {
    expect(throughputKgPerHour("fanning_mill")).toBeGreaterThan(
      throughputKgPerHour("hand_toss")
    );
  });
});

describe("chaffRemovalPercent", () => {
  it("fanning mill removes most chaff", () => {
    expect(chaffRemovalPercent("fanning_mill")).toBeGreaterThan(
      chaffRemovalPercent("hand_toss")
    );
  });
});

describe("grainLossPercent", () => {
  it("hand toss loses most grain", () => {
    expect(grainLossPercent("hand_toss")).toBeGreaterThan(
      grainLossPercent("fanning_mill")
    );
  });
});

describe("windDependence", () => {
  it("hand toss depends on wind", () => {
    expect(windDependence("hand_toss")).toBe(true);
  });
  it("fanning mill does not", () => {
    expect(windDependence("fanning_mill")).toBe(false);
  });
});

describe("operatorsNeeded", () => {
  it("wind tunnel needs most operators", () => {
    expect(operatorsNeeded("wind_tunnel")).toBeGreaterThan(
      operatorsNeeded("hand_toss")
    );
  });
});

describe("skillLevel", () => {
  it("hand toss needs most skill", () => {
    expect(skillLevel("hand_toss")).toBeGreaterThan(
      skillLevel("fanning_mill")
    );
  });
});

describe("dustExposure", () => {
  it("hand toss has most dust exposure", () => {
    expect(dustExposure("hand_toss")).toBeGreaterThan(
      dustExposure("fanning_mill")
    );
  });
});

describe("portability", () => {
  it("hand toss is portable", () => {
    expect(portability("hand_toss")).toBe(true);
  });
  it("fanning mill is not", () => {
    expect(portability("fanning_mill")).toBe(false);
  });
});

describe("costEstimate", () => {
  it("fanning mill is most expensive", () => {
    expect(costEstimate("fanning_mill")).toBeGreaterThan(
      costEstimate("hand_toss")
    );
  });
});

describe("winnowingMethods", () => {
  it("returns 5 methods", () => {
    expect(winnowingMethods()).toHaveLength(5);
  });
});
