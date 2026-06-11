import { describe, it, expect } from "vitest";
import {
  insertionRate, fabricWidth, yarnRange, patternComplexity,
  lwCost, shuttleless, forHeavyFabric, weftInsertion,
  bestUse, loomWeavingTypes,
} from "../loom-weaving-calc.js";

describe("insertionRate", () => {
  it("air jet fastest insertion rate", () => {
    expect(insertionRate("air_jet")).toBeGreaterThan(insertionRate("jacquard_dobby"));
  });
});

describe("fabricWidth", () => {
  it("projectile widest fabric width", () => {
    expect(fabricWidth("projectile")).toBeGreaterThan(fabricWidth("water_jet"));
  });
});

describe("yarnRange", () => {
  it("rapier widest yarn range", () => {
    expect(yarnRange("rapier")).toBeGreaterThan(yarnRange("water_jet"));
  });
});

describe("patternComplexity", () => {
  it("jacquard dobby most complex patterns", () => {
    expect(patternComplexity("jacquard_dobby")).toBeGreaterThan(patternComplexity("air_jet"));
  });
});

describe("lwCost", () => {
  it("jacquard dobby most expensive", () => {
    expect(lwCost("jacquard_dobby")).toBeGreaterThan(lwCost("water_jet"));
  });
});

describe("shuttleless", () => {
  it("all types are shuttleless", () => {
    expect(shuttleless("air_jet")).toBe(true);
    expect(shuttleless("rapier")).toBe(true);
  });
});

describe("forHeavyFabric", () => {
  it("rapier for heavy fabric", () => {
    expect(forHeavyFabric("rapier")).toBe(true);
  });
  it("air jet not for heavy fabric", () => {
    expect(forHeavyFabric("air_jet")).toBe(false);
  });
});

describe("weftInsertion", () => {
  it("water jet uses fine water stream", () => {
    expect(weftInsertion("water_jet")).toBe("fine_water_jet_stream_carry_hydrophobic_yarn_across_shed");
  });
});

describe("bestUse", () => {
  it("jacquard dobby for brocade tapestry", () => {
    expect(bestUse("jacquard_dobby")).toBe("brocade_damask_tapestry_complex_pattern_decorative_label");
  });
});

describe("loomWeavingTypes", () => {
  it("returns 5 types", () => {
    expect(loomWeavingTypes()).toHaveLength(5);
  });
});
