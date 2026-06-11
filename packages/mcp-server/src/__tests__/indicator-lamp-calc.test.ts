import { describe, it, expect } from "vitest";
import {
  brightness, efficiency, viewAngle, sizeCompact,
  ledCost, multiColor, visible, packageType,
  bestUse, indicatorLamps,
} from "../indicator-lamp-calc.js";

describe("brightness", () => {
  it("high power 1w star brightest", () => {
    expect(brightness("high_power_1w_star")).toBeGreaterThan(brightness("infrared_emitter_940"));
  });
});

describe("efficiency", () => {
  it("smd 0805 chip most efficient", () => {
    expect(efficiency("smd_0805_chip")).toBeGreaterThan(efficiency("rgb_common_cathode"));
  });
});

describe("viewAngle", () => {
  it("high power 1w star widest view angle", () => {
    expect(viewAngle("high_power_1w_star")).toBeGreaterThan(viewAngle("infrared_emitter_940"));
  });
});

describe("sizeCompact", () => {
  it("smd 0805 chip most compact", () => {
    expect(sizeCompact("smd_0805_chip")).toBeGreaterThan(sizeCompact("high_power_1w_star"));
  });
});

describe("ledCost", () => {
  it("high power 1w star most expensive", () => {
    expect(ledCost("high_power_1w_star")).toBeGreaterThan(ledCost("led_5mm_through_hole"));
  });
});

describe("multiColor", () => {
  it("rgb common cathode is multi color", () => {
    expect(multiColor("rgb_common_cathode")).toBe(true);
  });
  it("led 5mm through hole not multi color", () => {
    expect(multiColor("led_5mm_through_hole")).toBe(false);
  });
});

describe("visible", () => {
  it("led 5mm through hole is visible", () => {
    expect(visible("led_5mm_through_hole")).toBe(true);
  });
  it("infrared emitter 940 not visible", () => {
    expect(visible("infrared_emitter_940")).toBe(false);
  });
});

describe("packageType", () => {
  it("rgb common cathode uses t1 3 4 4pin rgb", () => {
    expect(packageType("rgb_common_cathode")).toBe("t1_3_4_4pin_rgb");
  });
});

describe("bestUse", () => {
  it("high power 1w star best for flashlight illumination", () => {
    expect(bestUse("high_power_1w_star")).toBe("flashlight_illumination");
  });
});

describe("indicatorLamps", () => {
  it("returns 5 types", () => {
    expect(indicatorLamps()).toHaveLength(5);
  });
});
