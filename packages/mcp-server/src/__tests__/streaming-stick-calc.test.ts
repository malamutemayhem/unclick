import { describe, it, expect } from "vitest";
import {
  videoQuality, appSelection, responseSpeed, easeOfUse,
  stickCost, voiceControl, supportsGaming, connectivity,
  bestSetup, streamingSticks,
} from "../streaming-stick-calc.js";

describe("videoQuality", () => {
  it("four k hdr premium best video quality", () => {
    expect(videoQuality("four_k_hdr_premium")).toBeGreaterThan(videoQuality("basic_hd_budget"));
  });
});

describe("appSelection", () => {
  it("android tv open widest app selection", () => {
    expect(appSelection("android_tv_open")).toBeGreaterThan(appSelection("gaming_cloud_stream"));
  });
});

describe("responseSpeed", () => {
  it("gaming cloud stream fastest response", () => {
    expect(responseSpeed("gaming_cloud_stream")).toBeGreaterThan(responseSpeed("basic_hd_budget"));
  });
});

describe("easeOfUse", () => {
  it("basic hd budget easiest to use", () => {
    expect(easeOfUse("basic_hd_budget")).toBeGreaterThan(easeOfUse("android_tv_open"));
  });
});

describe("stickCost", () => {
  it("gaming cloud stream most expensive", () => {
    expect(stickCost("gaming_cloud_stream")).toBeGreaterThan(stickCost("basic_hd_budget"));
  });
});

describe("voiceControl", () => {
  it("four k hdr premium has voice control", () => {
    expect(voiceControl("four_k_hdr_premium")).toBe(true);
  });
  it("gaming cloud stream has no voice control", () => {
    expect(voiceControl("gaming_cloud_stream")).toBe(false);
  });
});

describe("supportsGaming", () => {
  it("gaming cloud stream supports gaming", () => {
    expect(supportsGaming("gaming_cloud_stream")).toBe(true);
  });
  it("basic hd budget does not support gaming", () => {
    expect(supportsGaming("basic_hd_budget")).toBe(false);
  });
});

describe("connectivity", () => {
  it("four k hdr premium uses hdmi wifi6 bluetooth", () => {
    expect(connectivity("four_k_hdr_premium")).toBe("hdmi_wifi6_bluetooth");
  });
});

describe("bestSetup", () => {
  it("travel portable hotel best for hotel rv portable", () => {
    expect(bestSetup("travel_portable_hotel")).toBe("hotel_rv_portable");
  });
});

describe("streamingSticks", () => {
  it("returns 5 types", () => {
    expect(streamingSticks()).toHaveLength(5);
  });
});
