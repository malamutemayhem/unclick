import { describe, it, expect } from "vitest";
import {
  surfaceFinish, throughput, dimensionalAccuracy, alloyRange,
  icCost, reusableMold, forAerospace, casterConfig,
  bestUse, investmentCasterTypes,
} from "../investment-caster-calc.js";

describe("surfaceFinish", () => {
  it("ceramic shell best surface finish", () => {
    expect(surfaceFinish("ceramic_shell")).toBeGreaterThan(surfaceFinish("lost_foam"));
  });
});

describe("throughput", () => {
  it("quick cast highest throughput", () => {
    expect(throughput("quick_cast")).toBeGreaterThan(throughput("ceramic_shell"));
  });
});

describe("dimensionalAccuracy", () => {
  it("ceramic shell best dimensional accuracy", () => {
    expect(dimensionalAccuracy("ceramic_shell")).toBeGreaterThan(dimensionalAccuracy("lost_foam"));
  });
});

describe("alloyRange", () => {
  it("lost wax widest alloy range", () => {
    expect(alloyRange("lost_wax")).toBeGreaterThan(alloyRange("plaster_mold"));
  });
});

describe("icCost", () => {
  it("ceramic shell most expensive", () => {
    expect(icCost("ceramic_shell")).toBeGreaterThan(icCost("lost_foam"));
  });
});

describe("reusableMold", () => {
  it("lost wax not reusable mold", () => {
    expect(reusableMold("lost_wax")).toBe(false);
  });
});

describe("forAerospace", () => {
  it("ceramic shell for aerospace", () => {
    expect(forAerospace("ceramic_shell")).toBe(true);
  });
  it("lost foam not for aerospace", () => {
    expect(forAerospace("lost_foam")).toBe(false);
  });
});

describe("casterConfig", () => {
  it("quick cast uses 3d print pattern rapid prototype", () => {
    expect(casterConfig("quick_cast")).toBe("quick_cast_investment_caster_3d_print_pattern_rapid_prototype");
  });
});

describe("bestUse", () => {
  it("lost wax for turbine blade superalloy precision", () => {
    expect(bestUse("lost_wax")).toBe("turbine_blade_lost_wax_investment_caster_superalloy_precision");
  });
});

describe("investmentCasterTypes", () => {
  it("returns 5 types", () => {
    expect(investmentCasterTypes()).toHaveLength(5);
  });
});
