import { describe, it, expect } from "vitest";
import {
  punchCapacity, precision, creativity, effortRequired,
  punchCost, hasGuide, confettiUsable, punchMechanism,
  bestUse, paperPunches,
} from "../paper-punch-calc.js";

describe("punchCapacity", () => {
  it("heavy duty stack highest capacity", () => {
    expect(punchCapacity("heavy_duty_stack")).toBeGreaterThan(punchCapacity("decorative_shape_craft"));
  });
});

describe("precision", () => {
  it("corner rounder trim most precise", () => {
    expect(precision("corner_rounder_trim")).toBeGreaterThan(precision("heavy_duty_stack"));
  });
});

describe("creativity", () => {
  it("decorative shape craft most creative", () => {
    expect(creativity("decorative_shape_craft")).toBeGreaterThan(creativity("single_hole_standard"));
  });
});

describe("effortRequired", () => {
  it("corner rounder trim least effort", () => {
    expect(effortRequired("corner_rounder_trim")).toBeGreaterThan(effortRequired("heavy_duty_stack"));
  });
});

describe("punchCost", () => {
  it("heavy duty stack most expensive", () => {
    expect(punchCost("heavy_duty_stack")).toBeGreaterThan(punchCost("single_hole_standard"));
  });
});

describe("hasGuide", () => {
  it("three hole binder has guide", () => {
    expect(hasGuide("three_hole_binder")).toBe(true);
  });
  it("single hole standard does not", () => {
    expect(hasGuide("single_hole_standard")).toBe(false);
  });
});

describe("confettiUsable", () => {
  it("decorative shape craft confetti usable", () => {
    expect(confettiUsable("decorative_shape_craft")).toBe(true);
  });
  it("corner rounder trim is not", () => {
    expect(confettiUsable("corner_rounder_trim")).toBe(false);
  });
});

describe("punchMechanism", () => {
  it("heavy duty stack uses lever arm compound gear", () => {
    expect(punchMechanism("heavy_duty_stack")).toBe("lever_arm_compound_gear");
  });
});

describe("bestUse", () => {
  it("three hole binder best for office filing binder", () => {
    expect(bestUse("three_hole_binder")).toBe("office_filing_binder");
  });
});

describe("paperPunches", () => {
  it("returns 5 types", () => {
    expect(paperPunches()).toHaveLength(5);
  });
});
