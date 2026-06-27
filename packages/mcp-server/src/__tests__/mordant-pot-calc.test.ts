import { describe, it, expect } from "vitest";
import {
  heatEven, chemSafe, capacity, durability,
  mordantCost, reactive, forIron, potMaterial,
  bestUse, mordantPots,
} from "../mordant-pot-calc.js";

describe("heatEven", () => {
  it("copper kettle reactive most even heat", () => {
    expect(heatEven("copper_kettle_reactive")).toBeGreaterThan(heatEven("enamel_coat_safe"));
  });
});

describe("chemSafe", () => {
  it("stainless steel inert safest chemistry", () => {
    expect(chemSafe("stainless_steel_inert")).toBeGreaterThan(chemSafe("iron_cast_sadden"));
  });
});

describe("capacity", () => {
  it("iron cast sadden highest capacity", () => {
    expect(capacity("iron_cast_sadden")).toBeGreaterThan(capacity("enamel_coat_safe"));
  });
});

describe("durability", () => {
  it("stainless steel inert most durable", () => {
    expect(durability("stainless_steel_inert")).toBeGreaterThan(durability("enamel_coat_safe"));
  });
});

describe("mordantCost", () => {
  it("copper kettle reactive most expensive", () => {
    expect(mordantCost("copper_kettle_reactive")).toBeGreaterThan(mordantCost("aluminum_light_alum"));
  });
});

describe("reactive", () => {
  it("copper kettle reactive is reactive", () => {
    expect(reactive("copper_kettle_reactive")).toBe(true);
  });
  it("stainless steel inert not reactive", () => {
    expect(reactive("stainless_steel_inert")).toBe(false);
  });
});

describe("forIron", () => {
  it("iron cast sadden is for iron", () => {
    expect(forIron("iron_cast_sadden")).toBe(true);
  });
  it("copper kettle reactive not for iron", () => {
    expect(forIron("copper_kettle_reactive")).toBe(false);
  });
});

describe("potMaterial", () => {
  it("enamel coat safe uses enamel steel coat", () => {
    expect(potMaterial("enamel_coat_safe")).toBe("enamel_steel_coat");
  });
});

describe("bestUse", () => {
  it("stainless steel inert best for general mordant bath", () => {
    expect(bestUse("stainless_steel_inert")).toBe("general_mordant_bath");
  });
});

describe("mordantPots", () => {
  it("returns 5 types", () => {
    expect(mordantPots()).toHaveLength(5);
  });
});
