import { describe, it, expect } from "vitest";
import {
  rideComfort, handlingPrecision, loadCapacity,
  packagingSpace, complexityLevel, adjustable,
  independent, commonUsage, maintenanceCost, suspensionTypes,
} from "../suspension-type-calc.js";

describe("rideComfort", () => {
  it("air is most comfortable", () => {
    expect(rideComfort("air")).toBeGreaterThan(
      rideComfort("solid_axle")
    );
  });
});

describe("handlingPrecision", () => {
  it("double wishbone is most precise", () => {
    expect(handlingPrecision("double_wishbone")).toBeGreaterThan(
      handlingPrecision("solid_axle")
    );
  });
});

describe("loadCapacity", () => {
  it("solid axle handles most load", () => {
    expect(loadCapacity("solid_axle")).toBeGreaterThan(
      loadCapacity("macpherson")
    );
  });
});

describe("packagingSpace", () => {
  it("macpherson uses least space", () => {
    expect(packagingSpace("macpherson")).toBeGreaterThan(
      packagingSpace("double_wishbone")
    );
  });
});

describe("complexityLevel", () => {
  it("multi link is most complex", () => {
    expect(complexityLevel("multi_link")).toBeGreaterThan(
      complexityLevel("solid_axle")
    );
  });
});

describe("adjustable", () => {
  it("air is adjustable", () => {
    expect(adjustable("air")).toBe(true);
  });
  it("macpherson is not", () => {
    expect(adjustable("macpherson")).toBe(false);
  });
});

describe("independent", () => {
  it("double wishbone is independent", () => {
    expect(independent("double_wishbone")).toBe(true);
  });
  it("solid axle is not", () => {
    expect(independent("solid_axle")).toBe(false);
  });
});

describe("commonUsage", () => {
  it("solid axle for trucks", () => {
    expect(commonUsage("solid_axle")).toBe("truck");
  });
});

describe("maintenanceCost", () => {
  it("air costs most to maintain", () => {
    expect(maintenanceCost("air")).toBeGreaterThan(
      maintenanceCost("solid_axle")
    );
  });
});

describe("suspensionTypes", () => {
  it("returns 5 types", () => {
    expect(suspensionTypes()).toHaveLength(5);
  });
});
