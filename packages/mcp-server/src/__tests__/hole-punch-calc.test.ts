import { describe, it, expect } from "vitest";
import {
  sheetCapacity, punchEase, portability, holeAlignment,
  punchCost, hasGuide, confettiTray, mechanism,
  bestUse, holePunches,
} from "../hole-punch-calc.js";

describe("sheetCapacity", () => {
  it("electric auto punch most sheets", () => {
    expect(sheetCapacity("electric_auto_punch")).toBeGreaterThan(sheetCapacity("single_hole_portable"));
  });
});

describe("punchEase", () => {
  it("electric auto punch easiest to punch", () => {
    expect(punchEase("electric_auto_punch")).toBeGreaterThan(punchEase("three_hole_heavy_duty"));
  });
});

describe("portability", () => {
  it("single hole portable most portable", () => {
    expect(portability("single_hole_portable")).toBeGreaterThan(portability("electric_auto_punch"));
  });
});

describe("holeAlignment", () => {
  it("electric auto punch best alignment", () => {
    expect(holeAlignment("electric_auto_punch")).toBeGreaterThan(holeAlignment("single_hole_portable"));
  });
});

describe("punchCost", () => {
  it("electric auto punch most expensive", () => {
    expect(punchCost("electric_auto_punch")).toBeGreaterThan(punchCost("single_hole_portable"));
  });
});

describe("hasGuide", () => {
  it("three hole heavy duty has guide", () => {
    expect(hasGuide("three_hole_heavy_duty")).toBe(true);
  });
  it("single hole portable does not", () => {
    expect(hasGuide("single_hole_portable")).toBe(false);
  });
});

describe("confettiTray", () => {
  it("two hole standard has confetti tray", () => {
    expect(confettiTray("two_hole_standard")).toBe(true);
  });
  it("single hole portable does not", () => {
    expect(confettiTray("single_hole_portable")).toBe(false);
  });
});

describe("mechanism", () => {
  it("electric auto punch uses motor driven auto", () => {
    expect(mechanism("electric_auto_punch")).toBe("motor_driven_auto");
  });
});

describe("bestUse", () => {
  it("three hole heavy duty best for binder archive bulk", () => {
    expect(bestUse("three_hole_heavy_duty")).toBe("binder_archive_bulk");
  });
});

describe("holePunches", () => {
  it("returns 5 types", () => {
    expect(holePunches()).toHaveLength(5);
  });
});
