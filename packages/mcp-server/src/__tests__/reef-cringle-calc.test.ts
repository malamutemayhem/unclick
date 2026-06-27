import { describe, it, expect } from "vitest";
import {
  holdStrength, chafResist, speedMake, loadRange,
  cringleCost, pressed, handWorked, ringStyle,
  bestUse, reefCringles,
} from "../reef-cringle-calc.js";

describe("holdStrength", () => {
  it("seized thimble strong strongest hold", () => {
    expect(holdStrength("seized_thimble_strong")).toBeGreaterThan(holdStrength("soft_eye_splice"));
  });
});

describe("chafResist", () => {
  it("seized thimble strong best chafe resist", () => {
    expect(chafResist("seized_thimble_strong")).toBeGreaterThan(chafResist("soft_eye_splice"));
  });
});

describe("speedMake", () => {
  it("pressed ring fast fastest make", () => {
    expect(speedMake("pressed_ring_fast")).toBeGreaterThan(speedMake("hand_worked_standard"));
  });
});

describe("loadRange", () => {
  it("hydraulic press heavy widest load range", () => {
    expect(loadRange("hydraulic_press_heavy")).toBeGreaterThan(loadRange("soft_eye_splice"));
  });
});

describe("cringleCost", () => {
  it("hydraulic press heavy most expensive", () => {
    expect(cringleCost("hydraulic_press_heavy")).toBeGreaterThan(cringleCost("soft_eye_splice"));
  });
});

describe("pressed", () => {
  it("pressed ring fast is pressed", () => {
    expect(pressed("pressed_ring_fast")).toBe(true);
  });
  it("hand worked standard not pressed", () => {
    expect(pressed("hand_worked_standard")).toBe(false);
  });
});

describe("handWorked", () => {
  it("hand worked standard is hand worked", () => {
    expect(handWorked("hand_worked_standard")).toBe(true);
  });
  it("pressed ring fast not hand worked", () => {
    expect(handWorked("pressed_ring_fast")).toBe(false);
  });
});

describe("ringStyle", () => {
  it("seized thimble strong uses thimble seize wrap", () => {
    expect(ringStyle("seized_thimble_strong")).toBe("thimble_seize_wrap");
  });
});

describe("bestUse", () => {
  it("hand worked standard best for traditional reef eye", () => {
    expect(bestUse("hand_worked_standard")).toBe("traditional_reef_eye");
  });
});

describe("reefCringles", () => {
  it("returns 5 types", () => {
    expect(reefCringles()).toHaveLength(5);
  });
});
