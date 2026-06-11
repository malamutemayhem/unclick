import { describe, it, expect } from "vitest";
import {
  pressureCapacity, speedLimit, lifetime, leakage,
  ffCost, contactFree, forVacuum, design,
  bestUse, ferrofluidSealTypes,
} from "../ferrofluid-seal-calc.js";

describe("pressureCapacity", () => {
  it("hermetic vacuum highest pressure", () => {
    expect(pressureCapacity("hermetic_vacuum")).toBeGreaterThan(pressureCapacity("single_stage_standard"));
  });
});

describe("speedLimit", () => {
  it("single stage highest speed", () => {
    expect(speedLimit("single_stage_standard")).toBeGreaterThanOrEqual(speedLimit("rotary_feedthrough"));
  });
});

describe("lifetime", () => {
  it("hermetic vacuum longest lifetime", () => {
    expect(lifetime("hermetic_vacuum")).toBeGreaterThan(lifetime("multi_stage_high_press"));
  });
});

describe("leakage", () => {
  it("hermetic vacuum best leakage", () => {
    expect(leakage("hermetic_vacuum")).toBeGreaterThanOrEqual(leakage("multi_stage_high_press"));
  });
});

describe("ffCost", () => {
  it("hermetic vacuum most expensive", () => {
    expect(ffCost("hermetic_vacuum")).toBeGreaterThan(ffCost("single_stage_standard"));
  });
});

describe("contactFree", () => {
  it("all ferrofluid seals are contact free", () => {
    expect(contactFree("single_stage_standard")).toBe(true);
  });
});

describe("forVacuum", () => {
  it("hermetic vacuum for vacuum", () => {
    expect(forVacuum("hermetic_vacuum")).toBe(true);
  });
  it("single stage not for vacuum", () => {
    expect(forVacuum("single_stage_standard")).toBe(false);
  });
});

describe("design", () => {
  it("rotary feedthrough uses flanged unit", () => {
    expect(design("rotary_feedthrough")).toBe("flanged_feedthrough_unit_shaft_pass_through");
  });
});

describe("bestUse", () => {
  it("hermetic vacuum for particle accelerator", () => {
    expect(bestUse("hermetic_vacuum")).toBe("particle_accelerator_space_sim_zero_leak_uhv");
  });
});

describe("ferrofluidSealTypes", () => {
  it("returns 5 types", () => {
    expect(ferrofluidSealTypes()).toHaveLength(5);
  });
});
