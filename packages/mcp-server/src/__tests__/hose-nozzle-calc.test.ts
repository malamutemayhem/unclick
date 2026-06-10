import { describe, it, expect } from "vitest";
import {
  sprayPower, patternRange, comfort, gentleness,
  nozzleCost, lockOnSpray, adjustableFlow, sprayMechanism,
  bestTask, hoseNozzles,
} from "../hose-nozzle-calc.js";

describe("sprayPower", () => {
  it("turbo jet high pressure most spray power", () => {
    expect(sprayPower("turbo_jet_high_pressure")).toBeGreaterThan(sprayPower("watering_wand_long_reach"));
  });
});

describe("patternRange", () => {
  it("fireman twist adjust best pattern range", () => {
    expect(patternRange("fireman_twist_adjust")).toBeGreaterThan(patternRange("turbo_jet_high_pressure"));
  });
});

describe("comfort", () => {
  it("watering wand long reach most comfortable", () => {
    expect(comfort("watering_wand_long_reach")).toBeGreaterThan(comfort("turbo_jet_high_pressure"));
  });
});

describe("gentleness", () => {
  it("watering wand long reach most gentle", () => {
    expect(gentleness("watering_wand_long_reach")).toBeGreaterThan(gentleness("turbo_jet_high_pressure"));
  });
});

describe("nozzleCost", () => {
  it("turbo jet high pressure most expensive", () => {
    expect(nozzleCost("turbo_jet_high_pressure")).toBeGreaterThan(nozzleCost("pistol_grip_trigger"));
  });
});

describe("lockOnSpray", () => {
  it("pistol grip trigger has lock on spray", () => {
    expect(lockOnSpray("pistol_grip_trigger")).toBe(true);
  });
  it("fan spray flat pattern has no lock on spray", () => {
    expect(lockOnSpray("fan_spray_flat_pattern")).toBe(false);
  });
});

describe("adjustableFlow", () => {
  it("fireman twist adjust has adjustable flow", () => {
    expect(adjustableFlow("fireman_twist_adjust")).toBe(true);
  });
  it("turbo jet high pressure has no adjustable flow", () => {
    expect(adjustableFlow("turbo_jet_high_pressure")).toBe(false);
  });
});

describe("sprayMechanism", () => {
  it("turbo jet high pressure uses turbine rotating head", () => {
    expect(sprayMechanism("turbo_jet_high_pressure")).toBe("turbine_rotating_head");
  });
});

describe("bestTask", () => {
  it("watering wand long reach best for hanging basket delicate", () => {
    expect(bestTask("watering_wand_long_reach")).toBe("hanging_basket_delicate");
  });
});

describe("hoseNozzles", () => {
  it("returns 5 types", () => {
    expect(hoseNozzles()).toHaveLength(5);
  });
});
