import { describe, it, expect } from "vitest";
import {
  accuracy, range, framerate, outdoor,
  dcCost, activeSensor, forRobotics, principle,
  bestUse, depthCameraTypes,
} from "../depth-camera-calc.js";

describe("accuracy", () => {
  it("structured light most accurate", () => {
    expect(accuracy("structured_light_ir")).toBeGreaterThan(accuracy("coded_aperture_single"));
  });
});

describe("range", () => {
  it("tof longest range", () => {
    expect(range("tof_time_of_flight")).toBeGreaterThan(range("structured_light_ir"));
  });
});

describe("framerate", () => {
  it("tof fastest framerate", () => {
    expect(framerate("tof_time_of_flight")).toBeGreaterThan(framerate("coded_aperture_single"));
  });
});

describe("outdoor", () => {
  it("stereo vision best outdoor", () => {
    expect(outdoor("stereo_vision_passive")).toBeGreaterThan(outdoor("structured_light_ir"));
  });
});

describe("dcCost", () => {
  it("tof most expensive", () => {
    expect(dcCost("tof_time_of_flight")).toBeGreaterThan(dcCost("coded_aperture_single"));
  });
});

describe("activeSensor", () => {
  it("structured light is active sensor", () => {
    expect(activeSensor("structured_light_ir")).toBe(true);
  });
  it("stereo vision not active sensor", () => {
    expect(activeSensor("stereo_vision_passive")).toBe(false);
  });
});

describe("forRobotics", () => {
  it("active stereo for robotics", () => {
    expect(forRobotics("active_stereo_ir_dot")).toBe(true);
  });
  it("coded aperture not for robotics", () => {
    expect(forRobotics("coded_aperture_single")).toBe(false);
  });
});

describe("principle", () => {
  it("stereo vision uses binocular disparity", () => {
    expect(principle("stereo_vision_passive")).toBe("binocular_disparity_matching");
  });
});

describe("bestUse", () => {
  it("coded aperture best for smartphone bokeh", () => {
    expect(bestUse("coded_aperture_single")).toBe("smartphone_portrait_bokeh_effect");
  });
});

describe("depthCameraTypes", () => {
  it("returns 5 types", () => {
    expect(depthCameraTypes()).toHaveLength(5);
  });
});
