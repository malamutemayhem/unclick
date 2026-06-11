import { describe, it, expect } from "vitest";
import {
  tactileFeel, cycleLife, actuationForce, sizeCompact,
  switchCost, surfaceMount, sealed, capStyle,
  bestUse, tactileSwitches,
} from "../tactile-switch-calc.js";

describe("tactileFeel", () => {
  it("illuminated led cap best tactile feel", () => {
    expect(tactileFeel("illuminated_led_cap")).toBeGreaterThan(tactileFeel("smd_3x3_low_profile"));
  });
});

describe("cycleLife", () => {
  it("sealed ip67 outdoor longest cycle life", () => {
    expect(cycleLife("sealed_ip67_outdoor")).toBeGreaterThan(cycleLife("illuminated_led_cap"));
  });
});

describe("actuationForce", () => {
  it("sealed ip67 outdoor highest actuation force", () => {
    expect(actuationForce("sealed_ip67_outdoor")).toBeGreaterThan(actuationForce("smd_3x3_low_profile"));
  });
});

describe("sizeCompact", () => {
  it("smd 3x3 most compact", () => {
    expect(sizeCompact("smd_3x3_low_profile")).toBeGreaterThan(sizeCompact("illuminated_led_cap"));
  });
});

describe("switchCost", () => {
  it("sealed ip67 outdoor most expensive", () => {
    expect(switchCost("sealed_ip67_outdoor")).toBeGreaterThan(switchCost("standard_6mm_thru"));
  });
});

describe("surfaceMount", () => {
  it("smd 3x3 is surface mount", () => {
    expect(surfaceMount("smd_3x3_low_profile")).toBe(true);
  });
  it("standard 6mm not surface mount", () => {
    expect(surfaceMount("standard_6mm_thru")).toBe(false);
  });
});

describe("sealed", () => {
  it("sealed ip67 outdoor is sealed", () => {
    expect(sealed("sealed_ip67_outdoor")).toBe(true);
  });
  it("standard 6mm not sealed", () => {
    expect(sealed("standard_6mm_thru")).toBe(false);
  });
});

describe("capStyle", () => {
  it("illuminated led cap uses transparent led lens", () => {
    expect(capStyle("illuminated_led_cap")).toBe("transparent_led_lens");
  });
});

describe("bestUse", () => {
  it("smd 3x3 best for phone side button", () => {
    expect(bestUse("smd_3x3_low_profile")).toBe("phone_side_button");
  });
});

describe("tactileSwitches", () => {
  it("returns 5 types", () => {
    expect(tactileSwitches()).toHaveLength(5);
  });
});
