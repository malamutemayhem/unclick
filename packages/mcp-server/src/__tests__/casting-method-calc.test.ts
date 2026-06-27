import { describe, it, expect } from "vitest";
import {
  surfaceFinish, tolerance, volume, complexity,
  caCost, reusableMold, forPrototype, mold,
  bestUse, castingMethods,
} from "../casting-method-calc.js";

describe("surfaceFinish", () => {
  it("investment lost wax best surface finish", () => {
    expect(surfaceFinish("investment_lost_wax")).toBeGreaterThan(surfaceFinish("sand_green_mold"));
  });
});

describe("tolerance", () => {
  it("investment lost wax best tolerance", () => {
    expect(tolerance("investment_lost_wax")).toBeGreaterThan(tolerance("sand_green_mold"));
  });
});

describe("volume", () => {
  it("die high pressure highest volume", () => {
    expect(volume("die_high_pressure")).toBeGreaterThan(volume("investment_lost_wax"));
  });
});

describe("complexity", () => {
  it("investment lost wax most complex", () => {
    expect(complexity("investment_lost_wax")).toBeGreaterThan(complexity("continuous_strand_slab"));
  });
});

describe("caCost", () => {
  it("continuous strand most expensive", () => {
    expect(caCost("continuous_strand_slab")).toBeGreaterThan(caCost("sand_green_mold"));
  });
});

describe("reusableMold", () => {
  it("die has reusable mold", () => {
    expect(reusableMold("die_high_pressure")).toBe(true);
  });
  it("sand not reusable mold", () => {
    expect(reusableMold("sand_green_mold")).toBe(false);
  });
});

describe("forPrototype", () => {
  it("sand for prototype", () => {
    expect(forPrototype("sand_green_mold")).toBe(true);
  });
  it("die not for prototype", () => {
    expect(forPrototype("die_high_pressure")).toBe(false);
  });
});

describe("mold", () => {
  it("investment uses ceramic shell wax pattern", () => {
    expect(mold("investment_lost_wax")).toBe("ceramic_shell_wax_pattern");
  });
});

describe("bestUse", () => {
  it("die best for aluminum housing mass produce", () => {
    expect(bestUse("die_high_pressure")).toBe("aluminum_housing_mass_produce");
  });
});

describe("castingMethods", () => {
  it("returns 5 types", () => {
    expect(castingMethods()).toHaveLength(5);
  });
});
