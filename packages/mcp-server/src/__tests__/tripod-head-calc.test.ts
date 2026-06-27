import { describe, it, expect } from "vitest";
import {
  smoothness, precision, loadCapacity, setupSpeed,
  headCost, quickRelease, arcaSwissCompat, headMechanism,
  bestShot, tripodHeads,
} from "../tripod-head-calc.js";

describe("smoothness", () => {
  it("fluid video smooth smoothest", () => {
    expect(smoothness("fluid_video_smooth")).toBeGreaterThan(smoothness("geared_macro_precise"));
  });
});

describe("precision", () => {
  it("geared macro precise most precise", () => {
    expect(precision("geared_macro_precise")).toBeGreaterThan(precision("gimbal_telephoto"));
  });
});

describe("loadCapacity", () => {
  it("gimbal telephoto highest load capacity", () => {
    expect(loadCapacity("gimbal_telephoto")).toBeGreaterThan(loadCapacity("geared_macro_precise"));
  });
});

describe("setupSpeed", () => {
  it("ball head quick fastest setup", () => {
    expect(setupSpeed("ball_head_quick")).toBeGreaterThan(setupSpeed("geared_macro_precise"));
  });
});

describe("headCost", () => {
  it("gimbal telephoto most expensive", () => {
    expect(headCost("gimbal_telephoto")).toBeGreaterThan(headCost("pan_tilt_three_way"));
  });
});

describe("quickRelease", () => {
  it("all heads have quick release", () => {
    expect(quickRelease("ball_head_quick")).toBe(true);
    expect(quickRelease("geared_macro_precise")).toBe(true);
  });
});

describe("arcaSwissCompat", () => {
  it("ball head quick is arca swiss compatible", () => {
    expect(arcaSwissCompat("ball_head_quick")).toBe(true);
  });
  it("pan tilt three way is not", () => {
    expect(arcaSwissCompat("pan_tilt_three_way")).toBe(false);
  });
});

describe("headMechanism", () => {
  it("fluid video smooth uses hydraulic drag cartridge", () => {
    expect(headMechanism("fluid_video_smooth")).toBe("hydraulic_drag_cartridge");
  });
});

describe("bestShot", () => {
  it("gimbal telephoto best for wildlife sports telephoto", () => {
    expect(bestShot("gimbal_telephoto")).toBe("wildlife_sports_telephoto");
  });
});

describe("tripodHeads", () => {
  it("returns 5 types", () => {
    expect(tripodHeads()).toHaveLength(5);
  });
});
