import { describe, it, expect } from "vitest";
import {
  videoResolution, nightVision, fieldOfView, weatherResistance,
  camCost, twoWayAudio, localStorage, connectionType,
  bestLocation, securityCams,
} from "../security-cam-calc.js";

describe("videoResolution", () => {
  it("ptz dome highest resolution", () => {
    expect(videoResolution("ptz_dome")).toBeGreaterThan(videoResolution("indoor_wifi"));
  });
});

describe("nightVision", () => {
  it("ptz dome best night vision", () => {
    expect(nightVision("ptz_dome")).toBeGreaterThan(nightVision("indoor_wifi"));
  });
});

describe("fieldOfView", () => {
  it("ptz dome widest field of view", () => {
    expect(fieldOfView("ptz_dome")).toBeGreaterThan(fieldOfView("outdoor_poe"));
  });
});

describe("weatherResistance", () => {
  it("outdoor poe most weather resistant", () => {
    expect(weatherResistance("outdoor_poe")).toBeGreaterThan(weatherResistance("indoor_wifi"));
  });
});

describe("camCost", () => {
  it("ptz dome most expensive", () => {
    expect(camCost("ptz_dome")).toBeGreaterThan(camCost("indoor_wifi"));
  });
});

describe("twoWayAudio", () => {
  it("doorbell cam has two way audio", () => {
    expect(twoWayAudio("doorbell_cam")).toBe(true);
  });
  it("outdoor poe does not", () => {
    expect(twoWayAudio("outdoor_poe")).toBe(false);
  });
});

describe("localStorage", () => {
  it("outdoor poe has local storage", () => {
    expect(localStorage("outdoor_poe")).toBe(true);
  });
  it("doorbell cam does not", () => {
    expect(localStorage("doorbell_cam")).toBe(false);
  });
});

describe("connectionType", () => {
  it("outdoor poe uses poe ethernet cat6", () => {
    expect(connectionType("outdoor_poe")).toBe("poe_ethernet_cat6");
  });
});

describe("bestLocation", () => {
  it("floodlight cam for backyard dark alley", () => {
    expect(bestLocation("floodlight_cam")).toBe("backyard_dark_alley");
  });
});

describe("securityCams", () => {
  it("returns 5 types", () => {
    expect(securityCams()).toHaveLength(5);
  });
});
