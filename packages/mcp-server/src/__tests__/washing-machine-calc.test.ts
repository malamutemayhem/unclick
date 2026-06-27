import { describe, it, expect } from "vitest";
import {
  cleaningPower, waterEfficiency, fabricGentleness, loadCapacity,
  purchasePrice, stackable, requiresHookup, spinMethod,
  bestHousehold, washingMachines,
} from "../washing-machine-calc.js";

describe("cleaningPower", () => {
  it("front load highest cleaning", () => {
    expect(cleaningPower("front_load")).toBeGreaterThan(cleaningPower("combo_washer_dryer"));
  });
});

describe("waterEfficiency", () => {
  it("front load most water efficient", () => {
    expect(waterEfficiency("front_load")).toBeGreaterThan(waterEfficiency("top_load_agitator"));
  });
});

describe("fabricGentleness", () => {
  it("front load gentlest", () => {
    expect(fabricGentleness("front_load")).toBeGreaterThan(fabricGentleness("top_load_agitator"));
  });
});

describe("loadCapacity", () => {
  it("front load largest capacity", () => {
    expect(loadCapacity("front_load")).toBeGreaterThan(loadCapacity("portable"));
  });
});

describe("purchasePrice", () => {
  it("combo most expensive", () => {
    expect(purchasePrice("combo_washer_dryer")).toBeGreaterThan(purchasePrice("portable"));
  });
});

describe("stackable", () => {
  it("front load is stackable", () => {
    expect(stackable("front_load")).toBe(true);
  });
  it("top load agitator is not", () => {
    expect(stackable("top_load_agitator")).toBe(false);
  });
});

describe("requiresHookup", () => {
  it("front load requires hookup", () => {
    expect(requiresHookup("front_load")).toBe(true);
  });
  it("portable does not", () => {
    expect(requiresHookup("portable")).toBe(false);
  });
});

describe("spinMethod", () => {
  it("front load uses tumble drum", () => {
    expect(spinMethod("front_load")).toBe("tumble_horizontal_drum");
  });
});

describe("bestHousehold", () => {
  it("portable for dorm rv", () => {
    expect(bestHousehold("portable")).toBe("dorm_rv_small_space");
  });
});

describe("washingMachines", () => {
  it("returns 5 machines", () => {
    expect(washingMachines()).toHaveLength(5);
  });
});
