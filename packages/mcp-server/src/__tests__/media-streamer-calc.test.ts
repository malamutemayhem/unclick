import { describe, it, expect } from "vitest";
import {
  appLibrary, videoQuality, remoteInterface, setupEase,
  streamerCost, voiceControl, localMedia, connectivity,
  bestViewer, mediaStreamers,
} from "../media-streamer-calc.js";

describe("appLibrary", () => {
  it("streaming box largest app library", () => {
    expect(appLibrary("streaming_box")).toBeGreaterThan(appLibrary("game_console_app"));
  });
});

describe("videoQuality", () => {
  it("htpc mini pc best video quality", () => {
    expect(videoQuality("htpc_mini_pc")).toBeGreaterThan(videoQuality("hdmi_stick"));
  });
});

describe("remoteInterface", () => {
  it("streaming box best remote interface", () => {
    expect(remoteInterface("streaming_box")).toBeGreaterThan(remoteInterface("htpc_mini_pc"));
  });
});

describe("setupEase", () => {
  it("hdmi stick easiest setup", () => {
    expect(setupEase("hdmi_stick")).toBeGreaterThan(setupEase("htpc_mini_pc"));
  });
});

describe("streamerCost", () => {
  it("game console app most expensive", () => {
    expect(streamerCost("game_console_app")).toBeGreaterThan(streamerCost("hdmi_stick"));
  });
});

describe("voiceControl", () => {
  it("streaming box has voice control", () => {
    expect(voiceControl("streaming_box")).toBe(true);
  });
  it("htpc mini pc does not", () => {
    expect(voiceControl("htpc_mini_pc")).toBe(false);
  });
});

describe("localMedia", () => {
  it("htpc mini pc supports local media", () => {
    expect(localMedia("htpc_mini_pc")).toBe(true);
  });
  it("hdmi stick does not", () => {
    expect(localMedia("hdmi_stick")).toBe(false);
  });
});

describe("connectivity", () => {
  it("htpc mini pc uses full io usb ethernet", () => {
    expect(connectivity("htpc_mini_pc")).toBe("full_io_usb_ethernet");
  });
});

describe("bestViewer", () => {
  it("streaming box for primary living room", () => {
    expect(bestViewer("streaming_box")).toBe("primary_living_room");
  });
});

describe("mediaStreamers", () => {
  it("returns 5 types", () => {
    expect(mediaStreamers()).toHaveLength(5);
  });
});
