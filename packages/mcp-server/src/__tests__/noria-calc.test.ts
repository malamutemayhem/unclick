import { describe, it, expect } from "vitest";
import {
  wheelDiameterMeters, bucketsCount, liftHeightMeters,
  flowRateLitersPerMin, powerSource, maintenanceFrequencyWeeks,
  buildComplexity, selfPowered, costEstimate, noriaTypes,
} from "../noria-calc.js";

describe("wheelDiameterMeters", () => {
  it("stream driven has largest wheel", () => {
    expect(wheelDiameterMeters("stream_driven")).toBeGreaterThan(
      wheelDiameterMeters("hand_cranked")
    );
  });
});

describe("bucketsCount", () => {
  it("stream driven has most buckets", () => {
    expect(bucketsCount("stream_driven")).toBeGreaterThan(
      bucketsCount("hand_cranked")
    );
  });
});

describe("liftHeightMeters", () => {
  it("stream driven lifts highest", () => {
    expect(liftHeightMeters("stream_driven")).toBeGreaterThan(
      liftHeightMeters("hand_cranked")
    );
  });
});

describe("flowRateLitersPerMin", () => {
  it("stream driven has highest flow", () => {
    expect(flowRateLitersPerMin("stream_driven")).toBeGreaterThan(
      flowRateLitersPerMin("hand_cranked")
    );
  });
});

describe("powerSource", () => {
  it("stream driven uses river current", () => {
    expect(powerSource("stream_driven")).toBe("river_current");
  });
});

describe("maintenanceFrequencyWeeks", () => {
  it("modern replica needs least maintenance", () => {
    expect(maintenanceFrequencyWeeks("modern_replica")).toBeGreaterThan(
      maintenanceFrequencyWeeks("animal_powered")
    );
  });
});

describe("buildComplexity", () => {
  it("stream driven is most complex", () => {
    expect(buildComplexity("stream_driven")).toBeGreaterThan(
      buildComplexity("hand_cranked")
    );
  });
});

describe("selfPowered", () => {
  it("stream driven is self powered", () => {
    expect(selfPowered("stream_driven")).toBe(true);
  });
  it("hand cranked is not", () => {
    expect(selfPowered("hand_cranked")).toBe(false);
  });
});

describe("costEstimate", () => {
  it("modern replica is most expensive", () => {
    expect(costEstimate("modern_replica")).toBeGreaterThan(
      costEstimate("hand_cranked")
    );
  });
});

describe("noriaTypes", () => {
  it("returns 5 types", () => {
    expect(noriaTypes()).toHaveLength(5);
  });
});
