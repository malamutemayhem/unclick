import { describe, it, expect } from "vitest";
import {
  viewAngle, imageClarity, nightVision, installEase,
  peepholeCost, needsPower, recordsVideo, lensType,
  bestDoor, peepholes,
} from "../peephole-calc.js";

describe("viewAngle", () => {
  it("smart wifi camera widest view angle", () => {
    expect(viewAngle("smart_wifi_camera")).toBeGreaterThan(viewAngle("fiber_optic_tube"));
  });
});

describe("imageClarity", () => {
  it("smart wifi camera clearest image", () => {
    expect(imageClarity("smart_wifi_camera")).toBeGreaterThan(imageClarity("optical_wide_angle"));
  });
});

describe("nightVision", () => {
  it("smart wifi camera best night vision", () => {
    expect(nightVision("smart_wifi_camera")).toBeGreaterThan(nightVision("digital_screen"));
  });
});

describe("installEase", () => {
  it("optical wide angle easiest install", () => {
    expect(installEase("optical_wide_angle")).toBeGreaterThan(installEase("smart_wifi_camera"));
  });
});

describe("peepholeCost", () => {
  it("smart wifi camera most expensive", () => {
    expect(peepholeCost("smart_wifi_camera")).toBeGreaterThan(peepholeCost("optical_wide_angle"));
  });
});

describe("needsPower", () => {
  it("digital screen needs power", () => {
    expect(needsPower("digital_screen")).toBe(true);
  });
  it("optical wide angle does not", () => {
    expect(needsPower("optical_wide_angle")).toBe(false);
  });
});

describe("recordsVideo", () => {
  it("smart wifi camera records video", () => {
    expect(recordsVideo("smart_wifi_camera")).toBe(true);
  });
  it("digital screen does not", () => {
    expect(recordsVideo("digital_screen")).toBe(false);
  });
});

describe("lensType", () => {
  it("optical wide angle uses fisheye glass 200deg", () => {
    expect(lensType("optical_wide_angle")).toBe("fisheye_glass_200deg");
  });
});

describe("bestDoor", () => {
  it("digital screen best for elderly accessible home", () => {
    expect(bestDoor("digital_screen")).toBe("elderly_accessible_home");
  });
});

describe("peepholes", () => {
  it("returns 5 types", () => {
    expect(peepholes()).toHaveLength(5);
  });
});
