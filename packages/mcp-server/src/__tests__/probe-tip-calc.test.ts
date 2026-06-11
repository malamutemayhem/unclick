import { describe, it, expect } from "vitest";
import {
  bandwidth, precision, durability, safetyRating,
  probeCost, active, forScope, connectionType,
  bestUse, probeTips,
} from "../probe-tip-calc.js";

describe("bandwidth", () => {
  it("scope active fet highest bandwidth", () => {
    expect(bandwidth("scope_active_fet")).toBeGreaterThan(bandwidth("sharp_needle_fine"));
  });
});

describe("precision", () => {
  it("sharp needle fine most precise", () => {
    expect(precision("sharp_needle_fine")).toBeGreaterThan(precision("blunt_spring_loaded"));
  });
});

describe("durability", () => {
  it("blunt spring loaded most durable", () => {
    expect(durability("blunt_spring_loaded")).toBeGreaterThan(durability("sharp_needle_fine"));
  });
});

describe("safetyRating", () => {
  it("current probe clamp highest safety", () => {
    expect(safetyRating("current_probe_clamp")).toBeGreaterThan(safetyRating("sharp_needle_fine"));
  });
});

describe("probeCost", () => {
  it("scope active fet most expensive", () => {
    expect(probeCost("scope_active_fet")).toBeGreaterThan(probeCost("sharp_needle_fine"));
  });
});

describe("active", () => {
  it("scope active fet is active", () => {
    expect(active("scope_active_fet")).toBe(true);
  });
  it("scope passive 10x not active", () => {
    expect(active("scope_passive_10x")).toBe(false);
  });
});

describe("forScope", () => {
  it("scope passive 10x is for scope", () => {
    expect(forScope("scope_passive_10x")).toBe(true);
  });
  it("sharp needle fine not for scope", () => {
    expect(forScope("sharp_needle_fine")).toBe(false);
  });
});

describe("connectionType", () => {
  it("current probe clamp uses bnc hall effect", () => {
    expect(connectionType("current_probe_clamp")).toBe("bnc_hall_effect");
  });
});

describe("bestUse", () => {
  it("scope active fet best for high speed signal capture", () => {
    expect(bestUse("scope_active_fet")).toBe("high_speed_signal_capture");
  });
});

describe("probeTips", () => {
  it("returns 5 types", () => {
    expect(probeTips()).toHaveLength(5);
  });
});
