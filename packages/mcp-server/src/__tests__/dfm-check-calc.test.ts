import { describe, it, expect } from "vitest";
import {
  coverage, accuracy, ruleDepth, reportDetail,
  checkCost, automated, forProduction, checkFocus,
  bestUse, dfmChecks,
} from "../dfm-check-calc.js";

describe("coverage", () => {
  it("advanced fabrication best coverage", () => {
    expect(coverage("advanced_fabrication")).toBeGreaterThan(coverage("basic_rule_check"));
  });
});

describe("accuracy", () => {
  it("advanced fabrication best accuracy", () => {
    expect(accuracy("advanced_fabrication")).toBeGreaterThan(accuracy("basic_rule_check"));
  });
});

describe("ruleDepth", () => {
  it("advanced fabrication deepest rules", () => {
    expect(ruleDepth("advanced_fabrication")).toBeGreaterThan(ruleDepth("basic_rule_check"));
  });
});

describe("reportDetail", () => {
  it("testability dft most detailed report", () => {
    expect(reportDetail("testability_dft")).toBeGreaterThan(reportDetail("basic_rule_check"));
  });
});

describe("checkCost", () => {
  it("thermal reliability most expensive", () => {
    expect(checkCost("thermal_reliability")).toBeGreaterThan(checkCost("basic_rule_check"));
  });
});

describe("automated", () => {
  it("basic rule check is automated", () => {
    expect(automated("basic_rule_check")).toBe(true);
  });
  it("thermal reliability not automated", () => {
    expect(automated("thermal_reliability")).toBe(false);
  });
});

describe("forProduction", () => {
  it("advanced fabrication is for production", () => {
    expect(forProduction("advanced_fabrication")).toBe(true);
  });
  it("basic rule check not for production", () => {
    expect(forProduction("basic_rule_check")).toBe(false);
  });
});

describe("checkFocus", () => {
  it("testability dft focuses on test point probe access", () => {
    expect(checkFocus("testability_dft")).toBe("test_point_probe_access");
  });
});

describe("bestUse", () => {
  it("basic rule check best for quick prototype screen", () => {
    expect(bestUse("basic_rule_check")).toBe("quick_prototype_screen");
  });
});

describe("dfmChecks", () => {
  it("returns 5 types", () => {
    expect(dfmChecks()).toHaveLength(5);
  });
});
