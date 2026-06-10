import { describe, it, expect } from "vitest";
import {
  brightness, batteryDuration, beamDistance, weightGrams,
  lampCost, usbRechargeable, hasRedMode, ledType,
  bestActivity, headlamps,
} from "../headlamp-calc.js";

describe("brightness", () => {
  it("high lumen spot brightest", () => {
    expect(brightness("high_lumen_spot")).toBeGreaterThan(brightness("red_light_preserve"));
  });
});

describe("batteryDuration", () => {
  it("red light preserve longest battery", () => {
    expect(batteryDuration("red_light_preserve")).toBeGreaterThan(batteryDuration("high_lumen_spot"));
  });
});

describe("beamDistance", () => {
  it("high lumen spot farthest beam", () => {
    expect(beamDistance("high_lumen_spot")).toBeGreaterThan(beamDistance("red_light_preserve"));
  });
});

describe("weightGrams", () => {
  it("high lumen spot heaviest", () => {
    expect(weightGrams("high_lumen_spot")).toBeGreaterThan(weightGrams("red_light_preserve"));
  });
});

describe("lampCost", () => {
  it("high lumen spot most expensive", () => {
    expect(lampCost("high_lumen_spot")).toBeGreaterThan(lampCost("basic_led"));
  });
});

describe("usbRechargeable", () => {
  it("rechargeable usb is rechargeable", () => {
    expect(usbRechargeable("rechargeable_usb")).toBe(true);
  });
  it("basic led is not", () => {
    expect(usbRechargeable("basic_led")).toBe(false);
  });
});

describe("hasRedMode", () => {
  it("red light preserve has red mode", () => {
    expect(hasRedMode("red_light_preserve")).toBe(true);
  });
  it("basic led does not", () => {
    expect(hasRedMode("basic_led")).toBe(false);
  });
});

describe("ledType", () => {
  it("high lumen spot uses osram boost hx thrower", () => {
    expect(ledType("high_lumen_spot")).toBe("osram_boost_hx_thrower");
  });
});

describe("bestActivity", () => {
  it("red light preserve for astronomy night vision", () => {
    expect(bestActivity("red_light_preserve")).toBe("astronomy_night_vision");
  });
});

describe("headlamps", () => {
  it("returns 5 types", () => {
    expect(headlamps()).toHaveLength(5);
  });
});
