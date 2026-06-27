import { describe, it, expect } from "vitest";
import {
  warmSpeed, evenHeat, bottleFit, portability,
  warmerCost, defrostMode, autoShutoff, heatMethod,
  bestSetup, bottleWarmers,
} from "../bottle-warmer-calc.js";

describe("warmSpeed", () => {
  it("steam bath rapid fastest warm", () => {
    expect(warmSpeed("steam_bath_rapid")).toBeGreaterThan(warmSpeed("portable_usb"));
  });
});

describe("evenHeat", () => {
  it("water bath gentle most even heat", () => {
    expect(evenHeat("water_bath_gentle")).toBeGreaterThan(evenHeat("portable_usb"));
  });
});

describe("bottleFit", () => {
  it("water bath gentle best bottle fit", () => {
    expect(bottleFit("water_bath_gentle")).toBeGreaterThan(bottleFit("portable_usb"));
  });
});

describe("portability", () => {
  it("portable usb most portable", () => {
    expect(portability("portable_usb")).toBeGreaterThan(portability("steam_bath_rapid"));
  });
});

describe("warmerCost", () => {
  it("smart app control most expensive", () => {
    expect(warmerCost("smart_app_control")).toBeGreaterThan(warmerCost("portable_usb"));
  });
});

describe("defrostMode", () => {
  it("steam bath rapid has defrost mode", () => {
    expect(defrostMode("steam_bath_rapid")).toBe(true);
  });
  it("portable usb does not", () => {
    expect(defrostMode("portable_usb")).toBe(false);
  });
});

describe("autoShutoff", () => {
  it("smart app control has auto shutoff", () => {
    expect(autoShutoff("smart_app_control")).toBe(true);
  });
  it("water bath gentle does not", () => {
    expect(autoShutoff("water_bath_gentle")).toBe(false);
  });
});

describe("heatMethod", () => {
  it("portable usb uses heating sleeve wrap", () => {
    expect(heatMethod("portable_usb")).toBe("heating_sleeve_wrap");
  });
});

describe("bestSetup", () => {
  it("car adapter 12v for road trip car seat", () => {
    expect(bestSetup("car_adapter_12v")).toBe("road_trip_car_seat");
  });
});

describe("bottleWarmers", () => {
  it("returns 5 types", () => {
    expect(bottleWarmers()).toHaveLength(5);
  });
});
