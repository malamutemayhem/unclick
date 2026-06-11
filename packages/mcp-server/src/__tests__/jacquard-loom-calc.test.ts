import { describe, it, expect } from "vitest";
import {
  patternComplexity, throughput, fabricQuality, hookCapacity,
  jlCost, electronic, forBrocade, loomConfig,
  bestUse, jacquardLoomTypes,
} from "../jacquard-loom-calc.js";

describe("patternComplexity", () => {
  it("electronic jacquard best pattern complexity", () => {
    expect(patternComplexity("electronic_jacquard")).toBeGreaterThan(patternComplexity("mechanical_jacquard"));
  });
});

describe("throughput", () => {
  it("double lift highest throughput", () => {
    expect(throughput("double_lift")).toBeGreaterThan(throughput("mechanical_jacquard"));
  });
});

describe("fabricQuality", () => {
  it("carpet jacquard best fabric quality", () => {
    expect(fabricQuality("carpet_jacquard")).toBeGreaterThan(fabricQuality("double_lift"));
  });
});

describe("hookCapacity", () => {
  it("electronic jacquard best hook capacity", () => {
    expect(hookCapacity("electronic_jacquard")).toBeGreaterThanOrEqual(hookCapacity("carpet_jacquard"));
  });
});

describe("jlCost", () => {
  it("carpet jacquard most expensive", () => {
    expect(jlCost("carpet_jacquard")).toBeGreaterThan(jlCost("mechanical_jacquard"));
  });
});

describe("electronic", () => {
  it("electronic jacquard is electronic", () => {
    expect(electronic("electronic_jacquard")).toBe(true);
  });
  it("mechanical jacquard not electronic", () => {
    expect(electronic("mechanical_jacquard")).toBe(false);
  });
});

describe("forBrocade", () => {
  it("mechanical jacquard for brocade", () => {
    expect(forBrocade("mechanical_jacquard")).toBe(true);
  });
  it("carpet jacquard not for brocade", () => {
    expect(forBrocade("carpet_jacquard")).toBe(false);
  });
});

describe("loomConfig", () => {
  it("open shed uses full shed opening clear insertion", () => {
    expect(loomConfig("open_shed")).toBe("open_shed_jacquard_loom_full_shed_opening_clear_insertion_path");
  });
});

describe("bestUse", () => {
  it("carpet jacquard for complex pile pattern axminster", () => {
    expect(bestUse("carpet_jacquard")).toBe("carpet_mill_jacquard_loom_complex_pile_pattern_axminster_wilton");
  });
});

describe("jacquardLoomTypes", () => {
  it("returns 5 types", () => {
    expect(jacquardLoomTypes()).toHaveLength(5);
  });
});
