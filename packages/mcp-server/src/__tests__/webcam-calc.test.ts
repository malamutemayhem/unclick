import { describe, it, expect } from "vitest";
import {
  videoQuality, lowLightPerf, fieldOfView, setupEase,
  webcamCost, hasMic, privacyShutter, sensorType,
  bestUse, webcams,
} from "../webcam-calc.js";

describe("videoQuality", () => {
  it("4k auto focus pro best video quality", () => {
    expect(videoQuality("4k_auto_focus_pro")).toBeGreaterThan(videoQuality("built_in_laptop_basic"));
  });
});

describe("lowLightPerf", () => {
  it("streaming ring light best low light", () => {
    expect(lowLightPerf("streaming_ring_light")).toBeGreaterThan(lowLightPerf("built_in_laptop_basic"));
  });
});

describe("fieldOfView", () => {
  it("conference wide angle widest field of view", () => {
    expect(fieldOfView("conference_wide_angle")).toBeGreaterThan(fieldOfView("hd_1080p_clip_mount"));
  });
});

describe("setupEase", () => {
  it("built in laptop basic easiest setup", () => {
    expect(setupEase("built_in_laptop_basic")).toBeGreaterThan(setupEase("conference_wide_angle"));
  });
});

describe("webcamCost", () => {
  it("4k auto focus pro most expensive", () => {
    expect(webcamCost("4k_auto_focus_pro")).toBeGreaterThan(webcamCost("hd_1080p_clip_mount"));
  });
});

describe("hasMic", () => {
  it("hd 1080p clip mount has mic", () => {
    expect(hasMic("hd_1080p_clip_mount")).toBe(true);
  });
  it("streaming ring light does not", () => {
    expect(hasMic("streaming_ring_light")).toBe(false);
  });
});

describe("privacyShutter", () => {
  it("4k auto focus pro has privacy shutter", () => {
    expect(privacyShutter("4k_auto_focus_pro")).toBe(true);
  });
  it("built in laptop basic does not", () => {
    expect(privacyShutter("built_in_laptop_basic")).toBe(false);
  });
});

describe("sensorType", () => {
  it("conference wide angle uses wide cmos 120 degree", () => {
    expect(sensorType("conference_wide_angle")).toBe("wide_cmos_120_degree");
  });
});

describe("bestUse", () => {
  it("hd 1080p clip mount best for work from home meeting", () => {
    expect(bestUse("hd_1080p_clip_mount")).toBe("work_from_home_meeting");
  });
});

describe("webcams", () => {
  it("returns 5 types", () => {
    expect(webcams()).toHaveLength(5);
  });
});
