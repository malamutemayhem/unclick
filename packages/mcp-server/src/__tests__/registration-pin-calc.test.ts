import { describe, it, expect } from "vitest";
import {
  alignAccuracy, setupSpeed, repeatability, versatility,
  pinCost, reusable, forMultiColor, mountMethod,
  bestProcess, registrationPins,
} from "../registration-pin-calc.js";

describe("alignAccuracy", () => {
  it("ternes burton tabs best align accuracy", () => {
    expect(alignAccuracy("ternes_burton_tabs")).toBeGreaterThan(alignAccuracy("needle_point_poke"));
  });
});

describe("setupSpeed", () => {
  it("magnetic plate hold fastest setup", () => {
    expect(setupSpeed("magnetic_plate_hold")).toBeGreaterThan(setupSpeed("kento_wood_block"));
  });
});

describe("repeatability", () => {
  it("ternes burton tabs best repeatability", () => {
    expect(repeatability("ternes_burton_tabs")).toBeGreaterThan(repeatability("needle_point_poke"));
  });
});

describe("versatility", () => {
  it("needle point poke most versatile", () => {
    expect(versatility("needle_point_poke")).toBeGreaterThan(versatility("kento_wood_block"));
  });
});

describe("pinCost", () => {
  it("hinge bar clamp more expensive than kento wood", () => {
    expect(pinCost("hinge_bar_clamp")).toBeGreaterThan(pinCost("kento_wood_block"));
  });
});

describe("reusable", () => {
  it("ternes burton tabs is reusable", () => {
    expect(reusable("ternes_burton_tabs")).toBe(true);
  });
  it("needle point poke is not reusable", () => {
    expect(reusable("needle_point_poke")).toBe(false);
  });
});

describe("forMultiColor", () => {
  it("kento wood block is for multi color", () => {
    expect(forMultiColor("kento_wood_block")).toBe(true);
  });
  it("needle point poke is not for multi color", () => {
    expect(forMultiColor("needle_point_poke")).toBe(false);
  });
});

describe("mountMethod", () => {
  it("kento wood block uses carved block corner", () => {
    expect(mountMethod("kento_wood_block")).toBe("carved_block_corner");
  });
});

describe("bestProcess", () => {
  it("ternes burton tabs best for screen print edition", () => {
    expect(bestProcess("ternes_burton_tabs")).toBe("screen_print_edition");
  });
});

describe("registrationPins", () => {
  it("returns 5 types", () => {
    expect(registrationPins()).toHaveLength(5);
  });
});
