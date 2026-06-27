import { describe, it, expect } from "vitest";
import {
  height, visual, sound, windResist,
  fnCost, adjustable, forIndoor, pattern,
  bestUse, fountainNozzleTypes,
} from "../fountain-nozzle-calc.js";

describe("height", () => {
  it("single jet tallest", () => {
    expect(height("single_jet_vertical")).toBeGreaterThan(height("cascade_tier_waterfall"));
  });
});

describe("visual", () => {
  it("laminar best visual", () => {
    expect(visual("laminar_crystal_clear")).toBeGreaterThan(visual("single_jet_vertical"));
  });
});

describe("sound", () => {
  it("cascade best sound", () => {
    expect(sound("cascade_tier_waterfall")).toBeGreaterThan(sound("laminar_crystal_clear"));
  });
});

describe("windResist", () => {
  it("cascade best wind resistance", () => {
    expect(windResist("cascade_tier_waterfall")).toBeGreaterThan(windResist("single_jet_vertical"));
  });
});

describe("fnCost", () => {
  it("laminar most expensive", () => {
    expect(fnCost("laminar_crystal_clear")).toBeGreaterThan(fnCost("single_jet_vertical"));
  });
});

describe("adjustable", () => {
  it("single jet is adjustable", () => {
    expect(adjustable("single_jet_vertical")).toBe(true);
  });
  it("laminar not adjustable", () => {
    expect(adjustable("laminar_crystal_clear")).toBe(false);
  });
});

describe("forIndoor", () => {
  it("cascade for indoor", () => {
    expect(forIndoor("cascade_tier_waterfall")).toBe(true);
  });
  it("single jet not indoor", () => {
    expect(forIndoor("single_jet_vertical")).toBe(false);
  });
});

describe("pattern", () => {
  it("laminar uses crystal arc", () => {
    expect(pattern("laminar_crystal_clear")).toBe("laminar_flow_crystal_arc_led");
  });
});

describe("bestUse", () => {
  it("foam for park aeration", () => {
    expect(bestUse("foam_aerating_frothy")).toBe("park_pond_aeration_display");
  });
});

describe("fountainNozzleTypes", () => {
  it("returns 5 types", () => {
    expect(fountainNozzleTypes()).toHaveLength(5);
  });
});
