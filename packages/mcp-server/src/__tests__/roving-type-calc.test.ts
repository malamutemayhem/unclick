import { describe, it, expect } from "vitest";
import {
  feltAbility, colorRange, softness, structureHold,
  rovingCost, pureWool, forCore, fiberPrep,
  bestProject, rovingTypes,
} from "../roving-type-calc.js";

describe("feltAbility", () => {
  it("merino top fine best felting ability", () => {
    expect(feltAbility("merino_top_fine")).toBeGreaterThan(feltAbility("bamboo_silk_blend"));
  });
});

describe("colorRange", () => {
  it("merino top fine widest color range", () => {
    expect(colorRange("merino_top_fine")).toBeGreaterThan(colorRange("core_wool_bulk"));
  });
});

describe("softness", () => {
  it("merino top fine softest", () => {
    expect(softness("merino_top_fine")).toBeGreaterThan(softness("romney_batt_coarse"));
  });
});

describe("structureHold", () => {
  it("core wool bulk best structure hold", () => {
    expect(structureHold("core_wool_bulk")).toBeGreaterThan(structureHold("bamboo_silk_blend"));
  });
});

describe("rovingCost", () => {
  it("bamboo silk blend most expensive", () => {
    expect(rovingCost("bamboo_silk_blend")).toBeGreaterThan(rovingCost("core_wool_bulk"));
  });
});

describe("pureWool", () => {
  it("merino top fine is pure wool", () => {
    expect(pureWool("merino_top_fine")).toBe(true);
  });
  it("bamboo silk blend is not pure wool", () => {
    expect(pureWool("bamboo_silk_blend")).toBe(false);
  });
});

describe("forCore", () => {
  it("core wool bulk is for core", () => {
    expect(forCore("core_wool_bulk")).toBe(true);
  });
  it("merino top fine is not for core", () => {
    expect(forCore("merino_top_fine")).toBe(false);
  });
});

describe("fiberPrep", () => {
  it("corriedale roving medium uses carded roving loose", () => {
    expect(fiberPrep("corriedale_roving_medium")).toBe("carded_roving_loose");
  });
});

describe("bestProject", () => {
  it("core wool bulk best for armature fill bulk", () => {
    expect(bestProject("core_wool_bulk")).toBe("armature_fill_bulk");
  });
});

describe("rovingTypes", () => {
  it("returns 5 types", () => {
    expect(rovingTypes()).toHaveLength(5);
  });
});
