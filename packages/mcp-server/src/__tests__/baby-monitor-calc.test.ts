import { describe, it, expect } from "vitest";
import {
  videoQuality, rangeDistance, batteryLife, setupEase,
  monitorCost, nightVision, twoWayAudio, connectType,
  bestUse, babyMonitors,
} from "../baby-monitor-calc.js";

describe("videoQuality", () => {
  it("smart breathing highest video quality", () => {
    expect(videoQuality("smart_breathing")).toBeGreaterThan(videoQuality("audio_only"));
  });
});

describe("rangeDistance", () => {
  it("video wifi longest range", () => {
    expect(rangeDistance("video_wifi")).toBeGreaterThan(rangeDistance("audio_only"));
  });
});

describe("batteryLife", () => {
  it("audio only longest battery life", () => {
    expect(batteryLife("audio_only")).toBeGreaterThan(batteryLife("wearable_sock"));
  });
});

describe("setupEase", () => {
  it("audio only easiest setup", () => {
    expect(setupEase("audio_only")).toBeGreaterThan(setupEase("smart_breathing"));
  });
});

describe("monitorCost", () => {
  it("wearable sock most expensive", () => {
    expect(monitorCost("wearable_sock")).toBeGreaterThan(monitorCost("audio_only"));
  });
});

describe("nightVision", () => {
  it("video wifi has night vision", () => {
    expect(nightVision("video_wifi")).toBe(true);
  });
  it("audio only does not", () => {
    expect(nightVision("audio_only")).toBe(false);
  });
});

describe("twoWayAudio", () => {
  it("audio only has two way audio", () => {
    expect(twoWayAudio("audio_only")).toBe(true);
  });
  it("wearable sock does not", () => {
    expect(twoWayAudio("wearable_sock")).toBe(false);
  });
});

describe("connectType", () => {
  it("video wifi uses home wifi cloud", () => {
    expect(connectType("video_wifi")).toBe("home_wifi_cloud");
  });
});

describe("bestUse", () => {
  it("wearable sock for oxygen heart rate sleep", () => {
    expect(bestUse("wearable_sock")).toBe("oxygen_heart_rate_sleep");
  });
});

describe("babyMonitors", () => {
  it("returns 5 types", () => {
    expect(babyMonitors()).toHaveLength(5);
  });
});
