import { describe, it, expect } from "vitest";
import {
  speed, durability, stretch, noiseLevel,
  stringCost, lowCreep, servingIncluded, fiberMaterial,
  bestBow, bowStrings,
} from "../bow-string-calc.js";

describe("speed", () => {
  it("trophy 8190 speed fastest", () => {
    expect(speed("trophy_8190_speed")).toBeGreaterThan(speed("dacron_b50_traditional"));
  });
});

describe("durability", () => {
  it("bcyx blend hybrid most durable", () => {
    expect(durability("bcyx_blend_hybrid")).toBeGreaterThan(durability("flemish_twist_handmade"));
  });
});

describe("stretch", () => {
  it("dacron b50 traditional most stretch", () => {
    expect(stretch("dacron_b50_traditional")).toBeGreaterThan(stretch("trophy_8190_speed"));
  });
});

describe("noiseLevel", () => {
  it("trophy 8190 speed noisiest", () => {
    expect(noiseLevel("trophy_8190_speed")).toBeGreaterThan(noiseLevel("dacron_b50_traditional"));
  });
});

describe("stringCost", () => {
  it("trophy 8190 speed most expensive", () => {
    expect(stringCost("trophy_8190_speed")).toBeGreaterThan(stringCost("dacron_b50_traditional"));
  });
});

describe("lowCreep", () => {
  it("fastflight plus dyneema has low creep", () => {
    expect(lowCreep("fastflight_plus_dyneema")).toBe(true);
  });
  it("dacron b50 traditional does not", () => {
    expect(lowCreep("dacron_b50_traditional")).toBe(false);
  });
});

describe("servingIncluded", () => {
  it("dacron b50 traditional includes serving", () => {
    expect(servingIncluded("dacron_b50_traditional")).toBe(true);
  });
  it("flemish twist handmade does not", () => {
    expect(servingIncluded("flemish_twist_handmade")).toBe(false);
  });
});

describe("fiberMaterial", () => {
  it("fastflight plus dyneema uses dyneema sk75 ultra", () => {
    expect(fiberMaterial("fastflight_plus_dyneema")).toBe("dyneema_sk75_ultra");
  });
});

describe("bestBow", () => {
  it("trophy 8190 speed best for compound speed target", () => {
    expect(bestBow("trophy_8190_speed")).toBe("compound_speed_target");
  });
});

describe("bowStrings", () => {
  it("returns 5 types", () => {
    expect(bowStrings()).toHaveLength(5);
  });
});
