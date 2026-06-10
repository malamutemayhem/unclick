import { describe, it, expect } from "vitest";
import {
  volume, tonePleasant, compactSize, easeOfUse,
  bellCost, needsBattery, weatherproof, bellMaterial,
  bestRide, bikeBells,
} from "../bike-bell-calc.js";

describe("volume", () => {
  it("electronic horn loud highest volume", () => {
    expect(volume("electronic_horn_loud")).toBeGreaterThan(volume("mini_flick_compact"));
  });
});

describe("tonePleasant", () => {
  it("classic dome ding most pleasant tone", () => {
    expect(tonePleasant("classic_dome_ding")).toBeGreaterThan(tonePleasant("electronic_horn_loud"));
  });
});

describe("compactSize", () => {
  it("mini flick compact most compact", () => {
    expect(compactSize("mini_flick_compact")).toBeGreaterThan(compactSize("electronic_horn_loud"));
  });
});

describe("easeOfUse", () => {
  it("mini flick compact easiest to use", () => {
    expect(easeOfUse("mini_flick_compact")).toBeGreaterThan(easeOfUse("bear_bell_trail"));
  });
});

describe("bellCost", () => {
  it("electronic horn loud most expensive", () => {
    expect(bellCost("electronic_horn_loud")).toBeGreaterThan(bellCost("classic_dome_ding"));
  });
});

describe("needsBattery", () => {
  it("electronic horn loud needs battery", () => {
    expect(needsBattery("electronic_horn_loud")).toBe(true);
  });
  it("classic dome ding does not", () => {
    expect(needsBattery("classic_dome_ding")).toBe(false);
  });
});

describe("weatherproof", () => {
  it("classic dome ding is weatherproof", () => {
    expect(weatherproof("classic_dome_ding")).toBe(true);
  });
  it("electronic horn loud is not", () => {
    expect(weatherproof("electronic_horn_loud")).toBe(false);
  });
});

describe("bellMaterial", () => {
  it("classic dome ding uses brass chrome plated", () => {
    expect(bellMaterial("classic_dome_ding")).toBe("brass_chrome_plated");
  });
});

describe("bestRide", () => {
  it("electronic horn loud best for urban traffic safety", () => {
    expect(bestRide("electronic_horn_loud")).toBe("urban_traffic_safety");
  });
});

describe("bikeBells", () => {
  it("returns 5 types", () => {
    expect(bikeBells()).toHaveLength(5);
  });
});
