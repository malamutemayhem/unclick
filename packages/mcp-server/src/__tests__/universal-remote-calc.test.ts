import { describe, it, expect } from "vitest";
import {
  deviceSupport, easeOfSetup, easeOfUse, customization,
  remoteCost, needsWifi, hasScreen, signalType,
  bestSetup, universalRemotes,
} from "../universal-remote-calc.js";

describe("deviceSupport", () => {
  it("smart hub wifi app widest device support", () => {
    expect(deviceSupport("smart_hub_wifi_app")).toBeGreaterThan(deviceSupport("simple_senior_large_button"));
  });
});

describe("easeOfSetup", () => {
  it("simple senior large button easiest setup", () => {
    expect(easeOfSetup("simple_senior_large_button")).toBeGreaterThan(easeOfSetup("touchscreen_color_lcd"));
  });
});

describe("easeOfUse", () => {
  it("simple senior large button easiest to use", () => {
    expect(easeOfUse("simple_senior_large_button")).toBeGreaterThan(easeOfUse("touchscreen_color_lcd"));
  });
});

describe("customization", () => {
  it("smart hub wifi app most customizable", () => {
    expect(customization("smart_hub_wifi_app")).toBeGreaterThan(customization("infrared_basic_multidevice"));
  });
});

describe("remoteCost", () => {
  it("touchscreen color lcd most expensive", () => {
    expect(remoteCost("touchscreen_color_lcd")).toBeGreaterThan(remoteCost("infrared_basic_multidevice"));
  });
});

describe("needsWifi", () => {
  it("smart hub wifi app needs wifi", () => {
    expect(needsWifi("smart_hub_wifi_app")).toBe(true);
  });
  it("infrared basic multidevice does not need wifi", () => {
    expect(needsWifi("infrared_basic_multidevice")).toBe(false);
  });
});

describe("hasScreen", () => {
  it("touchscreen color lcd has screen", () => {
    expect(hasScreen("touchscreen_color_lcd")).toBe(true);
  });
  it("smart hub wifi app has no screen", () => {
    expect(hasScreen("smart_hub_wifi_app")).toBe(false);
  });
});

describe("signalType", () => {
  it("smart hub wifi app uses wifi bluetooth ir hub", () => {
    expect(signalType("smart_hub_wifi_app")).toBe("wifi_bluetooth_ir_hub");
  });
});

describe("bestSetup", () => {
  it("simple senior large button best for elderly accessibility", () => {
    expect(bestSetup("simple_senior_large_button")).toBe("elderly_accessibility");
  });
});

describe("universalRemotes", () => {
  it("returns 5 types", () => {
    expect(universalRemotes()).toHaveLength(5);
  });
});
