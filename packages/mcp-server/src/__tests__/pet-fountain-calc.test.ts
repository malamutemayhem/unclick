import { describe, it, expect } from "vitest";
import {
  waterFreshness, capacity, quietOperation, cleanEase,
  fountainCost, hasFilter, needsPower, basinMaterial,
  bestPet, petFountains,
} from "../pet-fountain-calc.js";

describe("waterFreshness", () => {
  it("stainless multi stream freshest water", () => {
    expect(waterFreshness("stainless_multi_stream")).toBeGreaterThan(waterFreshness("gravity_flow_basic"));
  });
});

describe("capacity", () => {
  it("outdoor solar powered biggest capacity", () => {
    expect(capacity("outdoor_solar_powered")).toBeGreaterThan(capacity("plastic_flower_top"));
  });
});

describe("quietOperation", () => {
  it("gravity flow basic quietest", () => {
    expect(quietOperation("gravity_flow_basic")).toBeGreaterThan(quietOperation("outdoor_solar_powered"));
  });
});

describe("cleanEase", () => {
  it("gravity flow basic easiest to clean", () => {
    expect(cleanEase("gravity_flow_basic")).toBeGreaterThan(cleanEase("outdoor_solar_powered"));
  });
});

describe("fountainCost", () => {
  it("outdoor solar powered most expensive", () => {
    expect(fountainCost("outdoor_solar_powered")).toBeGreaterThan(fountainCost("gravity_flow_basic"));
  });
});

describe("hasFilter", () => {
  it("ceramic circulating has filter", () => {
    expect(hasFilter("ceramic_circulating")).toBe(true);
  });
  it("gravity flow basic does not", () => {
    expect(hasFilter("gravity_flow_basic")).toBe(false);
  });
});

describe("needsPower", () => {
  it("stainless multi stream needs power", () => {
    expect(needsPower("stainless_multi_stream")).toBe(true);
  });
  it("gravity flow basic does not", () => {
    expect(needsPower("gravity_flow_basic")).toBe(false);
  });
});

describe("basinMaterial", () => {
  it("ceramic circulating uses glazed ceramic basin", () => {
    expect(basinMaterial("ceramic_circulating")).toBe("glazed_ceramic_basin");
  });
});

describe("bestPet", () => {
  it("plastic flower top best for curious cat kitten", () => {
    expect(bestPet("plastic_flower_top")).toBe("curious_cat_kitten");
  });
});

describe("petFountains", () => {
  it("returns 5 types", () => {
    expect(petFountains()).toHaveLength(5);
  });
});
