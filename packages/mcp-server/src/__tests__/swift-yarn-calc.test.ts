import { describe, it, expect } from "vitest";
import {
  windSmooth, adjustRange, stability, spaceCompact,
  swiftCost, powered, floorStand, mountStyle,
  bestUse, swiftYarns,
} from "../swift-yarn-calc.js";

describe("windSmooth", () => {
  it("electric swift motor smoothest wind", () => {
    expect(windSmooth("electric_swift_motor")).toBeGreaterThan(windSmooth("vertical_swift_compact"));
  });
});

describe("adjustRange", () => {
  it("umbrella swift standard widest adjust range", () => {
    expect(adjustRange("umbrella_swift_standard")).toBeGreaterThan(adjustRange("vertical_swift_compact"));
  });
});

describe("stability", () => {
  it("squirrel cage floor most stable", () => {
    expect(stability("squirrel_cage_floor")).toBeGreaterThan(stability("vertical_swift_compact"));
  });
});

describe("spaceCompact", () => {
  it("vertical swift compact most compact", () => {
    expect(spaceCompact("vertical_swift_compact")).toBeGreaterThan(spaceCompact("squirrel_cage_floor"));
  });
});

describe("swiftCost", () => {
  it("electric swift motor most expensive", () => {
    expect(swiftCost("electric_swift_motor")).toBeGreaterThan(swiftCost("vertical_swift_compact"));
  });
});

describe("powered", () => {
  it("electric swift motor is powered", () => {
    expect(powered("electric_swift_motor")).toBe(true);
  });
  it("umbrella swift standard not powered", () => {
    expect(powered("umbrella_swift_standard")).toBe(false);
  });
});

describe("floorStand", () => {
  it("squirrel cage floor is floor stand", () => {
    expect(floorStand("squirrel_cage_floor")).toBe(true);
  });
  it("umbrella swift standard not floor stand", () => {
    expect(floorStand("umbrella_swift_standard")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("electric swift motor uses motorized table mount", () => {
    expect(mountStyle("electric_swift_motor")).toBe("motorized_table_mount");
  });
});

describe("bestUse", () => {
  it("umbrella swift standard best for general skein wind", () => {
    expect(bestUse("umbrella_swift_standard")).toBe("general_skein_wind");
  });
});

describe("swiftYarns", () => {
  it("returns 5 types", () => {
    expect(swiftYarns()).toHaveLength(5);
  });
});
