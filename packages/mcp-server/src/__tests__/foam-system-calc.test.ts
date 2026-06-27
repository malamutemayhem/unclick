import { describe, it, expect } from "vitest";
import {
  knockdown, burnback, environmental, versatility,
  fsCost, fluorineFree, forFuelSpill, concentrate,
  bestUse, foamSystemTypes,
} from "../foam-system-calc.js";

describe("knockdown", () => {
  it("afff best knockdown", () => {
    expect(knockdown("afff_proportioner_balanced")).toBeGreaterThan(knockdown("high_expansion_generator"));
  });
});

describe("burnback", () => {
  it("afff best burnback", () => {
    expect(burnback("afff_proportioner_balanced")).toBeGreaterThan(burnback("fluorine_free_f3_foam"));
  });
});

describe("environmental", () => {
  it("f3 best environmental", () => {
    expect(environmental("fluorine_free_f3_foam")).toBeGreaterThan(environmental("afff_proportioner_balanced"));
  });
});

describe("versatility", () => {
  it("ar afff most versatile", () => {
    expect(versatility("ar_afff_alcohol_resistant")).toBeGreaterThan(versatility("high_expansion_generator"));
  });
});

describe("fsCost", () => {
  it("f3 most expensive", () => {
    expect(fsCost("fluorine_free_f3_foam")).toBeGreaterThan(fsCost("class_a_compressed_air"));
  });
});

describe("fluorineFree", () => {
  it("f3 is fluorine free", () => {
    expect(fluorineFree("fluorine_free_f3_foam")).toBe(true);
  });
  it("afff not fluorine free", () => {
    expect(fluorineFree("afff_proportioner_balanced")).toBe(false);
  });
});

describe("forFuelSpill", () => {
  it("afff for fuel spill", () => {
    expect(forFuelSpill("afff_proportioner_balanced")).toBe(true);
  });
  it("class a not fuel spill", () => {
    expect(forFuelSpill("class_a_compressed_air")).toBe(false);
  });
});

describe("concentrate", () => {
  it("high expansion uses 1000:1 ratio", () => {
    expect(concentrate("high_expansion_generator")).toBe("high_expansion_1000_1_ratio");
  });
});

describe("bestUse", () => {
  it("f3 for sensitive site", () => {
    expect(bestUse("fluorine_free_f3_foam")).toBe("environmentally_sensitive_site");
  });
});

describe("foamSystemTypes", () => {
  it("returns 5 types", () => {
    expect(foamSystemTypes()).toHaveLength(5);
  });
});
