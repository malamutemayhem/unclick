import { describe, it, expect } from "vitest";
import {
  videoQuality, fieldOfView, nightVision, installEase,
  camCost, twoWayAudio, batteryPowered, storageMethod,
  bestEntry, doorbellCams,
} from "../doorbell-cam-calc.js";

describe("videoQuality", () => {
  it("floodlight combo best video", () => {
    expect(videoQuality("floodlight_combo")).toBeGreaterThan(videoQuality("peephole_cam"));
  });
});

describe("fieldOfView", () => {
  it("floodlight combo widest view", () => {
    expect(fieldOfView("floodlight_combo")).toBeGreaterThan(fieldOfView("peephole_cam"));
  });
});

describe("nightVision", () => {
  it("floodlight combo best night vision", () => {
    expect(nightVision("floodlight_combo")).toBeGreaterThan(nightVision("video_intercom"));
  });
});

describe("installEase", () => {
  it("peephole cam easiest install", () => {
    expect(installEase("peephole_cam")).toBeGreaterThan(installEase("wired_hd"));
  });
});

describe("camCost", () => {
  it("floodlight combo most expensive", () => {
    expect(camCost("floodlight_combo")).toBeGreaterThan(camCost("peephole_cam"));
  });
});

describe("twoWayAudio", () => {
  it("wired hd has two way audio", () => {
    expect(twoWayAudio("wired_hd")).toBe(true);
  });
  it("peephole cam does not", () => {
    expect(twoWayAudio("peephole_cam")).toBe(false);
  });
});

describe("batteryPowered", () => {
  it("battery wireless is battery powered", () => {
    expect(batteryPowered("battery_wireless")).toBe(true);
  });
  it("wired hd is not", () => {
    expect(batteryPowered("wired_hd")).toBe(false);
  });
});

describe("storageMethod", () => {
  it("peephole cam uses micro sd internal", () => {
    expect(storageMethod("peephole_cam")).toBe("micro_sd_internal");
  });
});

describe("bestEntry", () => {
  it("battery wireless for rental apartment easy", () => {
    expect(bestEntry("battery_wireless")).toBe("rental_apartment_easy");
  });
});

describe("doorbellCams", () => {
  it("returns 5 types", () => {
    expect(doorbellCams()).toHaveLength(5);
  });
});
