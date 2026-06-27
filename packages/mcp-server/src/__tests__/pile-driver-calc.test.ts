import { describe, it, expect } from "vitest";
import {
  force, speed, noise, depth,
  pdCost, lowNoise, forSheet, mechanism,
  bestUse, pileDriverTypes,
} from "../pile-driver-calc.js";

describe("force", () => {
  it("hydraulic impact highest force", () => {
    expect(force("hydraulic_impact_ram")).toBeGreaterThan(force("press_in_silent_hydraulic"));
  });
});

describe("speed", () => {
  it("vibratory fastest", () => {
    expect(speed("vibratory_oscillator_clamp")).toBeGreaterThan(speed("drop_hammer_gravity_fall"));
  });
});

describe("noise", () => {
  it("press in quietest", () => {
    expect(noise("press_in_silent_hydraulic")).toBeGreaterThan(noise("diesel_hammer_combustion"));
  });
});

describe("depth", () => {
  it("hydraulic deepest", () => {
    expect(depth("hydraulic_impact_ram")).toBeGreaterThan(depth("drop_hammer_gravity_fall"));
  });
});

describe("pdCost", () => {
  it("hydraulic most expensive", () => {
    expect(pdCost("hydraulic_impact_ram")).toBeGreaterThan(pdCost("drop_hammer_gravity_fall"));
  });
});

describe("lowNoise", () => {
  it("press in is low noise", () => {
    expect(lowNoise("press_in_silent_hydraulic")).toBe(true);
  });
  it("diesel not low noise", () => {
    expect(lowNoise("diesel_hammer_combustion")).toBe(false);
  });
});

describe("forSheet", () => {
  it("vibratory for sheet pile", () => {
    expect(forSheet("vibratory_oscillator_clamp")).toBe(true);
  });
  it("diesel not for sheet", () => {
    expect(forSheet("diesel_hammer_combustion")).toBe(false);
  });
});

describe("mechanism", () => {
  it("press in uses hydraulic press", () => {
    expect(mechanism("press_in_silent_hydraulic")).toBe("hydraulic_press_reaction_pile");
  });
});

describe("bestUse", () => {
  it("drop hammer for simple pile", () => {
    expect(bestUse("drop_hammer_gravity_fall")).toBe("simple_timber_small_concrete_pile");
  });
});

describe("pileDriverTypes", () => {
  it("returns 5 types", () => {
    expect(pileDriverTypes()).toHaveLength(5);
  });
});
