import { describe, it, expect } from "vitest";
import {
  napDensity, fabricSpeed, fiberDamage, surfaceSoftness,
  rmCost, bidirectional, forKnit, wireConfig,
  bestUse, raisingMachineTypes,
} from "../raising-machine-calc.js";

describe("napDensity", () => {
  it("planetary roller highest nap density", () => {
    expect(napDensity("planetary_roller")).toBeGreaterThan(napDensity("sueding_emerizing"));
  });
});

describe("fabricSpeed", () => {
  it("sueding emerizing fastest fabric speed", () => {
    expect(fabricSpeed("sueding_emerizing")).toBeGreaterThan(fabricSpeed("teasel_natural"));
  });
});

describe("fiberDamage", () => {
  it("teasel natural highest fiber damage rating", () => {
    expect(fiberDamage("teasel_natural")).toBeGreaterThan(fiberDamage("planetary_roller"));
  });
});

describe("surfaceSoftness", () => {
  it("sueding emerizing best surface softness", () => {
    expect(surfaceSoftness("sueding_emerizing")).toBeGreaterThan(surfaceSoftness("teasel_natural"));
  });
});

describe("rmCost", () => {
  it("planetary roller most expensive", () => {
    expect(rmCost("planetary_roller")).toBeGreaterThan(rmCost("teasel_natural"));
  });
});

describe("bidirectional", () => {
  it("double action wire is bidirectional", () => {
    expect(bidirectional("double_action_wire")).toBe(true);
  });
  it("single action wire not bidirectional", () => {
    expect(bidirectional("single_action_wire")).toBe(false);
  });
});

describe("forKnit", () => {
  it("planetary roller for knit", () => {
    expect(forKnit("planetary_roller")).toBe(true);
  });
  it("single action wire not for knit", () => {
    expect(forKnit("single_action_wire")).toBe(false);
  });
});

describe("wireConfig", () => {
  it("sueding emerizing uses abrasive coated roller", () => {
    expect(wireConfig("sueding_emerizing")).toBe("abrasive_coated_roller_sand_surface_fiber_peach_skin_effect");
  });
});

describe("bestUse", () => {
  it("teasel natural for wool cashmere luxury", () => {
    expect(bestUse("teasel_natural")).toBe("wool_cashmere_luxury_traditional_gentle_fiber_raising_craft");
  });
});

describe("raisingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(raisingMachineTypes()).toHaveLength(5);
  });
});
