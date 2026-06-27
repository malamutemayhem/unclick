import { describe, it, expect } from "vitest";
import {
  wrinkleRemoval, heatUpSpeed, steamDuration, portability,
  steamerCost, sanitizes, needsHanger, steamMethod,
  bestUse, garmentSteamers,
} from "../garment-steamer-calc.js";

describe("wrinkleRemoval", () => {
  it("press style flat best wrinkle removal", () => {
    expect(wrinkleRemoval("press_style_flat")).toBeGreaterThan(wrinkleRemoval("handheld_travel_compact"));
  });
});

describe("heatUpSpeed", () => {
  it("fabric refresh spray fastest heat up", () => {
    expect(heatUpSpeed("fabric_refresh_spray")).toBeGreaterThan(heatUpSpeed("commercial_high_pressure"));
  });
});

describe("steamDuration", () => {
  it("commercial high pressure longest steam duration", () => {
    expect(steamDuration("commercial_high_pressure")).toBeGreaterThan(steamDuration("handheld_travel_compact"));
  });
});

describe("portability", () => {
  it("handheld travel compact most portable", () => {
    expect(portability("handheld_travel_compact")).toBeGreaterThan(portability("commercial_high_pressure"));
  });
});

describe("steamerCost", () => {
  it("commercial high pressure most expensive", () => {
    expect(steamerCost("commercial_high_pressure")).toBeGreaterThan(steamerCost("handheld_travel_compact"));
  });
});

describe("sanitizes", () => {
  it("upright standing pole sanitizes", () => {
    expect(sanitizes("upright_standing_pole")).toBe(true);
  });
  it("fabric refresh spray does not", () => {
    expect(sanitizes("fabric_refresh_spray")).toBe(false);
  });
});

describe("needsHanger", () => {
  it("handheld travel compact needs hanger", () => {
    expect(needsHanger("handheld_travel_compact")).toBe(true);
  });
  it("press style flat does not", () => {
    expect(needsHanger("press_style_flat")).toBe(false);
  });
});

describe("steamMethod", () => {
  it("commercial high pressure uses boiler high psi nozzle", () => {
    expect(steamMethod("commercial_high_pressure")).toBe("boiler_high_psi_nozzle");
  });
});

describe("bestUse", () => {
  it("handheld travel compact best for travel quick touchup", () => {
    expect(bestUse("handheld_travel_compact")).toBe("travel_quick_touchup");
  });
});

describe("garmentSteamers", () => {
  it("returns 5 types", () => {
    expect(garmentSteamers()).toHaveLength(5);
  });
});
