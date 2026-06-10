import { describe, it, expect } from "vitest";
import {
  holePrecision, easeOfUse, sizeRange, leatherThickness,
  punchCost, needsMallet, multiSize, punchShape,
  bestProject, leatherPunches,
} from "../leather-punch-calc.js";

describe("holePrecision", () => {
  it("screw punch adjustable most precise", () => {
    expect(holePrecision("screw_punch_adjustable")).toBeGreaterThan(holePrecision("oblong_slot_belt"));
  });
});

describe("easeOfUse", () => {
  it("rotary wheel multi easiest to use", () => {
    expect(easeOfUse("rotary_wheel_multi")).toBeGreaterThan(easeOfUse("drive_punch_single"));
  });
});

describe("sizeRange", () => {
  it("rotary wheel multi widest size range", () => {
    expect(sizeRange("rotary_wheel_multi")).toBeGreaterThan(sizeRange("drive_punch_single"));
  });
});

describe("leatherThickness", () => {
  it("drive punch single handles thickest leather", () => {
    expect(leatherThickness("drive_punch_single")).toBeGreaterThan(leatherThickness("rotary_wheel_multi"));
  });
});

describe("punchCost", () => {
  it("screw punch adjustable most expensive", () => {
    expect(punchCost("screw_punch_adjustable")).toBeGreaterThan(punchCost("drive_punch_single"));
  });
});

describe("needsMallet", () => {
  it("drive punch single needs mallet", () => {
    expect(needsMallet("drive_punch_single")).toBe(true);
  });
  it("rotary wheel multi needs no mallet", () => {
    expect(needsMallet("rotary_wheel_multi")).toBe(false);
  });
});

describe("multiSize", () => {
  it("rotary wheel multi has multi size", () => {
    expect(multiSize("rotary_wheel_multi")).toBe(true);
  });
  it("drive punch single has no multi size", () => {
    expect(multiSize("drive_punch_single")).toBe(false);
  });
});

describe("punchShape", () => {
  it("oblong slot belt uses oval slot blade", () => {
    expect(punchShape("oblong_slot_belt")).toBe("oval_slot_blade");
  });
});

describe("bestProject", () => {
  it("rotary wheel multi best for belt strap hole", () => {
    expect(bestProject("rotary_wheel_multi")).toBe("belt_strap_hole");
  });
});

describe("leatherPunches", () => {
  it("returns 5 types", () => {
    expect(leatherPunches()).toHaveLength(5);
  });
});
