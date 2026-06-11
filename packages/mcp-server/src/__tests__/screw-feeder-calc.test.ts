import { describe, it, expect } from "vitest";
import {
  feedAccuracy, throughput, materialRange, bridgeBreak,
  sfCost, enclosed, forCohesive, feederConfig,
  bestUse, screwFeederTypes,
} from "../screw-feeder-calc.js";

describe("feedAccuracy", () => {
  it("metering screw best feed accuracy", () => {
    expect(feedAccuracy("metering_screw")).toBeGreaterThan(feedAccuracy("flexible_screw"));
  });
});

describe("throughput", () => {
  it("shaftless screw highest throughput", () => {
    expect(throughput("shaftless_screw")).toBeGreaterThan(throughput("metering_screw"));
  });
});

describe("materialRange", () => {
  it("twin screw best material range", () => {
    expect(materialRange("twin_screw_feed")).toBeGreaterThan(materialRange("metering_screw"));
  });
});

describe("bridgeBreak", () => {
  it("shaftless screw best bridge break", () => {
    expect(bridgeBreak("shaftless_screw")).toBeGreaterThan(bridgeBreak("flexible_screw"));
  });
});

describe("sfCost", () => {
  it("twin screw most expensive", () => {
    expect(sfCost("twin_screw_feed")).toBeGreaterThan(sfCost("flexible_screw"));
  });
});

describe("enclosed", () => {
  it("single screw is enclosed", () => {
    expect(enclosed("single_screw_feed")).toBe(true);
  });
  it("all types are enclosed", () => {
    expect(enclosed("shaftless_screw")).toBe(true);
  });
});

describe("forCohesive", () => {
  it("twin screw for cohesive", () => {
    expect(forCohesive("twin_screw_feed")).toBe(true);
  });
  it("single screw not for cohesive", () => {
    expect(forCohesive("single_screw_feed")).toBe(false);
  });
});

describe("feederConfig", () => {
  it("flexible screw uses spiral in tube route any angle compact", () => {
    expect(feederConfig("flexible_screw")).toBe("flexible_screw_feeder_spiral_in_tube_route_any_angle_compact");
  });
});

describe("bestUse", () => {
  it("metering screw for pigment dose gravimetric precise color add", () => {
    expect(bestUse("metering_screw")).toBe("pigment_dose_metering_screw_feeder_gravimetric_precise_color_add");
  });
});

describe("screwFeederTypes", () => {
  it("returns 5 types", () => {
    expect(screwFeederTypes()).toHaveLength(5);
  });
});
