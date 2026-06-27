import { describe, it, expect } from "vitest";
import {
  seatingComfort, durability, maintenance, aestheticCharm,
  benchCost, moveable, rotResistant, benchMaterial,
  bestSetting, gardenBenches,
} from "../garden-bench-calc.js";

describe("seatingComfort", () => {
  it("teak classic most comfortable seating", () => {
    expect(seatingComfort("teak_classic")).toBeGreaterThan(seatingComfort("stone_concrete"));
  });
});

describe("durability", () => {
  it("stone concrete most durable", () => {
    expect(durability("stone_concrete")).toBeGreaterThan(durability("recycled_plastic"));
  });
});

describe("maintenance", () => {
  it("recycled plastic lowest maintenance", () => {
    expect(maintenance("recycled_plastic")).toBeGreaterThan(maintenance("cast_iron_wood_slat"));
  });
});

describe("aestheticCharm", () => {
  it("teak classic most aesthetic charm", () => {
    expect(aestheticCharm("teak_classic")).toBeGreaterThan(aestheticCharm("recycled_plastic"));
  });
});

describe("benchCost", () => {
  it("teak classic most expensive", () => {
    expect(benchCost("teak_classic")).toBeGreaterThan(benchCost("recycled_plastic"));
  });
});

describe("moveable", () => {
  it("teak classic is moveable", () => {
    expect(moveable("teak_classic")).toBe(true);
  });
  it("stone concrete is not", () => {
    expect(moveable("stone_concrete")).toBe(false);
  });
});

describe("rotResistant", () => {
  it("teak classic is rot resistant", () => {
    expect(rotResistant("teak_classic")).toBe(true);
  });
  it("cast iron wood slat is not", () => {
    expect(rotResistant("cast_iron_wood_slat")).toBe(false);
  });
});

describe("benchMaterial", () => {
  it("recycled plastic uses hdpe recycled lumber", () => {
    expect(benchMaterial("recycled_plastic")).toBe("hdpe_recycled_lumber");
  });
});

describe("bestSetting", () => {
  it("stone concrete best for zen garden permanent", () => {
    expect(bestSetting("stone_concrete")).toBe("zen_garden_permanent");
  });
});

describe("gardenBenches", () => {
  it("returns 5 types", () => {
    expect(gardenBenches()).toHaveLength(5);
  });
});
