import { describe, it, expect } from "vitest";
import {
  waveIntensity, ropeDurability, gripFeel, indoorSafe,
  ropeCost, waterResistant, shedsFiber, coreMaterial,
  bestWorkout, battleRopes,
} from "../battle-rope-calc.js";

describe("waveIntensity", () => {
  it("weighted core most intense waves", () => {
    expect(waveIntensity("weighted_core")).toBeGreaterThan(waveIntensity("elastic_bungee"));
  });
});

describe("ropeDurability", () => {
  it("nylon coated most durable", () => {
    expect(ropeDurability("nylon_coated")).toBeGreaterThan(ropeDurability("manila_natural"));
  });
});

describe("gripFeel", () => {
  it("nylon coated best grip feel", () => {
    expect(gripFeel("nylon_coated")).toBeGreaterThan(gripFeel("manila_natural"));
  });
});

describe("indoorSafe", () => {
  it("nylon coated safest indoors", () => {
    expect(indoorSafe("nylon_coated")).toBeGreaterThan(indoorSafe("manila_natural"));
  });
});

describe("ropeCost", () => {
  it("weighted core most expensive", () => {
    expect(ropeCost("weighted_core")).toBeGreaterThan(ropeCost("manila_natural"));
  });
});

describe("waterResistant", () => {
  it("poly dacron is water resistant", () => {
    expect(waterResistant("poly_dacron")).toBe(true);
  });
  it("manila natural is not", () => {
    expect(waterResistant("manila_natural")).toBe(false);
  });
});

describe("shedsFiber", () => {
  it("manila natural sheds fiber", () => {
    expect(shedsFiber("manila_natural")).toBe(true);
  });
  it("poly dacron does not", () => {
    expect(shedsFiber("poly_dacron")).toBe(false);
  });
});

describe("coreMaterial", () => {
  it("weighted core uses steel chain inner fill", () => {
    expect(coreMaterial("weighted_core")).toBe("steel_chain_inner_fill");
  });
});

describe("bestWorkout", () => {
  it("poly dacron for crossfit gym standard", () => {
    expect(bestWorkout("poly_dacron")).toBe("crossfit_gym_standard");
  });
});

describe("battleRopes", () => {
  it("returns 5 types", () => {
    expect(battleRopes()).toHaveLength(5);
  });
});
