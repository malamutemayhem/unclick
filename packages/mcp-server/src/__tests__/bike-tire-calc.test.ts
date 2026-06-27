import { describe, it, expect } from "vitest";
import {
  rollingResistance, tractionOffroad, punctureProtection, rideComfort,
  tireCost, requiresTube, reflectiveStrip, treadPattern,
  bestRiding, bikeTires,
} from "../bike-tire-calc.js";

describe("rollingResistance", () => {
  it("road slick lowest resistance", () => {
    expect(rollingResistance("road_slick")).toBeGreaterThan(rollingResistance("mtb_aggressive"));
  });
});

describe("tractionOffroad", () => {
  it("mtb aggressive best traction", () => {
    expect(tractionOffroad("mtb_aggressive")).toBeGreaterThan(tractionOffroad("road_slick"));
  });
});

describe("punctureProtection", () => {
  it("commuter puncture best protection", () => {
    expect(punctureProtection("commuter_puncture")).toBeGreaterThan(punctureProtection("road_slick"));
  });
});

describe("rideComfort", () => {
  it("tubeless setup most comfortable", () => {
    expect(rideComfort("tubeless_setup")).toBeGreaterThan(rideComfort("road_slick"));
  });
});

describe("tireCost", () => {
  it("tubeless setup most expensive", () => {
    expect(tireCost("tubeless_setup")).toBeGreaterThan(tireCost("commuter_puncture"));
  });
});

describe("requiresTube", () => {
  it("road slick requires tube", () => {
    expect(requiresTube("road_slick")).toBe(true);
  });
  it("tubeless setup does not", () => {
    expect(requiresTube("tubeless_setup")).toBe(false);
  });
});

describe("reflectiveStrip", () => {
  it("commuter puncture has reflective strip", () => {
    expect(reflectiveStrip("commuter_puncture")).toBe(true);
  });
  it("road slick does not", () => {
    expect(reflectiveStrip("road_slick")).toBe(false);
  });
});

describe("treadPattern", () => {
  it("mtb aggressive uses deep lug paddle sidewall", () => {
    expect(treadPattern("mtb_aggressive")).toBe("deep_lug_paddle_sidewall");
  });
});

describe("bestRiding", () => {
  it("gravel knobby for mixed surface adventure", () => {
    expect(bestRiding("gravel_knobby")).toBe("mixed_surface_adventure");
  });
});

describe("bikeTires", () => {
  it("returns 5 types", () => {
    expect(bikeTires()).toHaveLength(5);
  });
});
