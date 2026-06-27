import { describe, it, expect } from "vitest";
import {
  brightness, colorAccuracy, glareReduction, deskFootprint,
  lampCost, dimmable, colorTemp, lightSource,
  bestDesk, deskLamps,
} from "../desk-lamp-calc.js";

describe("brightness", () => {
  it("architect swing brightest", () => {
    expect(brightness("architect_swing")).toBeGreaterThan(brightness("clip_on_usb"));
  });
});

describe("colorAccuracy", () => {
  it("monitor light bar best color accuracy", () => {
    expect(colorAccuracy("monitor_light_bar")).toBeGreaterThan(colorAccuracy("clip_on_usb"));
  });
});

describe("glareReduction", () => {
  it("monitor light bar best glare reduction", () => {
    expect(glareReduction("monitor_light_bar")).toBeGreaterThan(glareReduction("clip_on_usb"));
  });
});

describe("deskFootprint", () => {
  it("led task larger footprint than monitor bar", () => {
    expect(deskFootprint("led_task")).toBeGreaterThan(deskFootprint("monitor_light_bar"));
  });
});

describe("lampCost", () => {
  it("monitor light bar most expensive", () => {
    expect(lampCost("monitor_light_bar")).toBeGreaterThan(lampCost("clip_on_usb"));
  });
});

describe("dimmable", () => {
  it("led task is dimmable", () => {
    expect(dimmable("led_task")).toBe(true);
  });
  it("clip on usb is not", () => {
    expect(dimmable("clip_on_usb")).toBe(false);
  });
});

describe("colorTemp", () => {
  it("monitor light bar has color temp", () => {
    expect(colorTemp("monitor_light_bar")).toBe(true);
  });
  it("architect swing does not", () => {
    expect(colorTemp("architect_swing")).toBe(false);
  });
});

describe("lightSource", () => {
  it("monitor light bar uses asymmetric led bar", () => {
    expect(lightSource("monitor_light_bar")).toBe("asymmetric_led_bar");
  });
});

describe("bestDesk", () => {
  it("clip on usb for travel laptop only", () => {
    expect(bestDesk("clip_on_usb")).toBe("travel_laptop_only");
  });
});

describe("deskLamps", () => {
  it("returns 5 types", () => {
    expect(deskLamps()).toHaveLength(5);
  });
});
