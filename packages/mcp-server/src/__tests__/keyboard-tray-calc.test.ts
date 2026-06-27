import { describe, it, expect } from "vitest";
import {
  ergonomicAngle, surfaceArea, adjustability, installEase,
  trayCost, noDrilling, hasMousePad, mountStyle,
  bestDesk, keyboardTrays,
} from "../keyboard-tray-calc.js";

describe("ergonomicAngle", () => {
  it("articulating arm swing best ergonomic angle", () => {
    expect(ergonomicAngle("articulating_arm_swing")).toBeGreaterThan(ergonomicAngle("clamp_on_desk_edge"));
  });
});

describe("surfaceArea", () => {
  it("standing desk riser most surface area", () => {
    expect(surfaceArea("standing_desk_riser")).toBeGreaterThan(surfaceArea("clamp_on_desk_edge"));
  });
});

describe("adjustability", () => {
  it("articulating arm swing most adjustable", () => {
    expect(adjustability("articulating_arm_swing")).toBeGreaterThan(adjustability("clamp_on_desk_edge"));
  });
});

describe("installEase", () => {
  it("standing desk riser easiest install", () => {
    expect(installEase("standing_desk_riser")).toBeGreaterThan(installEase("articulating_arm_swing"));
  });
});

describe("trayCost", () => {
  it("articulating arm swing most expensive", () => {
    expect(trayCost("articulating_arm_swing")).toBeGreaterThan(trayCost("clamp_on_desk_edge"));
  });
});

describe("noDrilling", () => {
  it("clamp on desk edge needs no drilling", () => {
    expect(noDrilling("clamp_on_desk_edge")).toBe(true);
  });
  it("undermount slide rail needs drilling", () => {
    expect(noDrilling("undermount_slide_rail")).toBe(false);
  });
});

describe("hasMousePad", () => {
  it("undermount slide rail has mouse pad", () => {
    expect(hasMousePad("undermount_slide_rail")).toBe(true);
  });
  it("clamp on desk edge has no mouse pad", () => {
    expect(hasMousePad("clamp_on_desk_edge")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("articulating arm swing uses arm pivot wall desk", () => {
    expect(mountStyle("articulating_arm_swing")).toBe("arm_pivot_wall_desk");
  });
});

describe("bestDesk", () => {
  it("clamp on desk edge best for rental no modify desk", () => {
    expect(bestDesk("clamp_on_desk_edge")).toBe("rental_no_modify_desk");
  });
});

describe("keyboardTrays", () => {
  it("returns 5 types", () => {
    expect(keyboardTrays()).toHaveLength(5);
  });
});
