import { describe, it, expect } from "vitest";
import {
  brightness, lifeSpan, powerDraw, visibility,
  lightCost, lowVoltage, sealed, lampType,
  bestUse, pilotLights,
} from "../pilot-light-calc.js";

describe("brightness", () => {
  it("led panel mount brightest", () => {
    expect(brightness("led_panel_mount")).toBeGreaterThan(brightness("neon_indicator_120v"));
  });
});

describe("lifeSpan", () => {
  it("led panel mount longest life span", () => {
    expect(lifeSpan("led_panel_mount")).toBeGreaterThan(lifeSpan("incandescent_bayonet"));
  });
});

describe("powerDraw", () => {
  it("led panel mount lowest power draw", () => {
    expect(powerDraw("led_panel_mount")).toBeGreaterThan(powerDraw("incandescent_bayonet"));
  });
});

describe("visibility", () => {
  it("flush mount sealed best visibility", () => {
    expect(visibility("flush_mount_sealed")).toBeGreaterThan(visibility("fiber_optic_remote"));
  });
});

describe("lightCost", () => {
  it("fiber optic remote most expensive", () => {
    expect(lightCost("fiber_optic_remote")).toBeGreaterThan(lightCost("incandescent_bayonet"));
  });
});

describe("lowVoltage", () => {
  it("led panel mount is low voltage", () => {
    expect(lowVoltage("led_panel_mount")).toBe(true);
  });
  it("neon indicator 120v not low voltage", () => {
    expect(lowVoltage("neon_indicator_120v")).toBe(false);
  });
});

describe("sealed", () => {
  it("flush mount sealed is sealed", () => {
    expect(sealed("flush_mount_sealed")).toBe(true);
  });
  it("led panel mount not sealed", () => {
    expect(sealed("led_panel_mount")).toBe(false);
  });
});

describe("lampType", () => {
  it("fiber optic remote uses fiber bundle transmit", () => {
    expect(lampType("fiber_optic_remote")).toBe("fiber_bundle_transmit");
  });
});

describe("bestUse", () => {
  it("neon indicator best for mains power present", () => {
    expect(bestUse("neon_indicator_120v")).toBe("mains_power_present");
  });
});

describe("pilotLights", () => {
  it("returns 5 types", () => {
    expect(pilotLights()).toHaveLength(5);
  });
});
