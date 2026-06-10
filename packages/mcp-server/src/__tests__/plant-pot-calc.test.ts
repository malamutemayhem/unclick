import { describe, it, expect } from "vitest";
import {
  drainage, rootHealth, aestheticAppeal, weightEmpty,
  potCost, frostProof, reusable, potMaterial,
  bestPlant, plantPots,
} from "../plant-pot-calc.js";

describe("drainage", () => {
  it("terracotta classic best drainage", () => {
    expect(drainage("terracotta_classic")).toBeGreaterThan(drainage("self_watering_reservoir"));
  });
});

describe("rootHealth", () => {
  it("fabric grow bag best root health", () => {
    expect(rootHealth("fabric_grow_bag")).toBeGreaterThan(rootHealth("concrete_modern"));
  });
});

describe("aestheticAppeal", () => {
  it("ceramic glazed most aesthetic", () => {
    expect(aestheticAppeal("ceramic_glazed")).toBeGreaterThan(aestheticAppeal("fabric_grow_bag"));
  });
});

describe("weightEmpty", () => {
  it("fabric grow bag lightest", () => {
    expect(weightEmpty("fabric_grow_bag")).toBeGreaterThan(weightEmpty("concrete_modern"));
  });
});

describe("potCost", () => {
  it("concrete modern most expensive", () => {
    expect(potCost("concrete_modern")).toBeGreaterThan(potCost("fabric_grow_bag"));
  });
});

describe("frostProof", () => {
  it("concrete modern is frost proof", () => {
    expect(frostProof("concrete_modern")).toBe(true);
  });
  it("terracotta classic is not", () => {
    expect(frostProof("terracotta_classic")).toBe(false);
  });
});

describe("reusable", () => {
  it("all pots are reusable", () => {
    expect(reusable("terracotta_classic")).toBe(true);
    expect(reusable("fabric_grow_bag")).toBe(true);
  });
});

describe("potMaterial", () => {
  it("terracotta classic uses fired clay porous", () => {
    expect(potMaterial("terracotta_classic")).toBe("fired_clay_porous");
  });
});

describe("bestPlant", () => {
  it("fabric grow bag best for vegetable tomato potato", () => {
    expect(bestPlant("fabric_grow_bag")).toBe("vegetable_tomato_potato");
  });
});

describe("plantPots", () => {
  it("returns 5 types", () => {
    expect(plantPots()).toHaveLength(5);
  });
});
