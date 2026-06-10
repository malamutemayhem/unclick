import { describe, it, expect } from "vitest";
import {
  particleSize, coverageEven, controlArea, easeOfUse,
  sifterCost, forDetail, stackable, meshType,
  bestUse, enamelSifters,
} from "../enamel-sifter-calc.js";

describe("particleSize", () => {
  it("mesh 325 fine finest particle size", () => {
    expect(particleSize("mesh_325_fine")).toBeGreaterThan(particleSize("mesh_80_coarse"));
  });
});

describe("coverageEven", () => {
  it("mesh 325 fine most even coverage", () => {
    expect(coverageEven("mesh_325_fine")).toBeGreaterThan(coverageEven("mesh_80_coarse"));
  });
});

describe("controlArea", () => {
  it("mini cup sifter best area control", () => {
    expect(controlArea("mini_cup_sifter")).toBeGreaterThan(controlArea("mesh_80_coarse"));
  });
});

describe("easeOfUse", () => {
  it("salt shaker sprinkle easiest to use", () => {
    expect(easeOfUse("salt_shaker_sprinkle")).toBeGreaterThan(easeOfUse("mesh_325_fine"));
  });
});

describe("sifterCost", () => {
  it("mesh 325 fine more expensive", () => {
    expect(sifterCost("mesh_325_fine")).toBeGreaterThan(sifterCost("mesh_80_coarse"));
  });
});

describe("forDetail", () => {
  it("mini cup sifter is for detail", () => {
    expect(forDetail("mini_cup_sifter")).toBe(true);
  });
  it("mesh 80 coarse not for detail", () => {
    expect(forDetail("mesh_80_coarse")).toBe(false);
  });
});

describe("stackable", () => {
  it("mesh 80 coarse is stackable", () => {
    expect(stackable("mesh_80_coarse")).toBe(true);
  });
  it("mini cup sifter not stackable", () => {
    expect(stackable("mini_cup_sifter")).toBe(false);
  });
});

describe("meshType", () => {
  it("mesh 80 coarse uses woven wire 80", () => {
    expect(meshType("mesh_80_coarse")).toBe("woven_wire_80");
  });
});

describe("bestUse", () => {
  it("mesh 325 fine best for smooth base coat", () => {
    expect(bestUse("mesh_325_fine")).toBe("smooth_base_coat");
  });
});

describe("enamelSifters", () => {
  it("returns 5 types", () => {
    expect(enamelSifters()).toHaveLength(5);
  });
});
