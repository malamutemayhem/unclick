import { describe, it, expect } from "vitest";
import {
  visibility, configurable, brightness, durability,
  towerCost, audible, multiColor, signalMethod,
  bestUse, signalTowers,
} from "../signal-tower-calc.js";

describe("visibility", () => {
  it("flash strobe xenon most visible", () => {
    expect(visibility("flash_strobe_xenon")).toBeGreaterThan(visibility("steady_dome_single"));
  });
});

describe("configurable", () => {
  it("led modular stack most configurable", () => {
    expect(configurable("led_modular_stack")).toBeGreaterThan(configurable("steady_dome_single"));
  });
});

describe("brightness", () => {
  it("flash strobe xenon brightest", () => {
    expect(brightness("flash_strobe_xenon")).toBeGreaterThan(brightness("steady_dome_single"));
  });
});

describe("durability", () => {
  it("steady dome single most durable", () => {
    expect(durability("steady_dome_single")).toBeGreaterThan(durability("flash_strobe_xenon"));
  });
});

describe("towerCost", () => {
  it("multi color rgb smart most expensive", () => {
    expect(towerCost("multi_color_rgb_smart")).toBeGreaterThan(towerCost("steady_dome_single"));
  });
});

describe("audible", () => {
  it("led modular stack is audible", () => {
    expect(audible("led_modular_stack")).toBe(true);
  });
  it("rotating beacon not audible", () => {
    expect(audible("rotating_beacon_single")).toBe(false);
  });
});

describe("multiColor", () => {
  it("multi color rgb smart is multi color", () => {
    expect(multiColor("multi_color_rgb_smart")).toBe(true);
  });
  it("flash strobe xenon not multi color", () => {
    expect(multiColor("flash_strobe_xenon")).toBe(false);
  });
});

describe("signalMethod", () => {
  it("rotating beacon uses rotating mirror lamp", () => {
    expect(signalMethod("rotating_beacon_single")).toBe("rotating_mirror_lamp");
  });
});

describe("bestUse", () => {
  it("led modular stack best for cnc machine status", () => {
    expect(bestUse("led_modular_stack")).toBe("cnc_machine_status");
  });
});

describe("signalTowers", () => {
  it("returns 5 types", () => {
    expect(signalTowers()).toHaveLength(5);
  });
});
