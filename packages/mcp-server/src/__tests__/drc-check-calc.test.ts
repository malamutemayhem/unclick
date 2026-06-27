import { describe, it, expect } from "vitest";
import {
  criticalLevel, frequency, autoFix, impactSeverity,
  checkSpeed, blocking, forSignoff, ruleCategory,
  bestUse, drcChecks,
} from "../drc-check-calc.js";

describe("criticalLevel", () => {
  it("clearance spacing most critical", () => {
    expect(criticalLevel("clearance_spacing")).toBeGreaterThan(criticalLevel("silkscreen_overlap"));
  });
});

describe("frequency", () => {
  it("clearance spacing most frequent", () => {
    expect(frequency("clearance_spacing")).toBeGreaterThan(frequency("copper_pour_connect"));
  });
});

describe("autoFix", () => {
  it("silkscreen overlap most auto fixable", () => {
    expect(autoFix("silkscreen_overlap")).toBeGreaterThan(autoFix("drill_annular_ring"));
  });
});

describe("impactSeverity", () => {
  it("clearance spacing highest impact", () => {
    expect(impactSeverity("clearance_spacing")).toBeGreaterThan(impactSeverity("silkscreen_overlap"));
  });
});

describe("checkSpeed", () => {
  it("silkscreen overlap fastest check", () => {
    expect(checkSpeed("silkscreen_overlap")).toBeGreaterThan(checkSpeed("copper_pour_connect"));
  });
});

describe("blocking", () => {
  it("clearance spacing is blocking", () => {
    expect(blocking("clearance_spacing")).toBe(true);
  });
  it("silkscreen overlap not blocking", () => {
    expect(blocking("silkscreen_overlap")).toBe(false);
  });
});

describe("forSignoff", () => {
  it("trace width min is for signoff", () => {
    expect(forSignoff("trace_width_min")).toBe(true);
  });
  it("copper pour connect not for signoff", () => {
    expect(forSignoff("copper_pour_connect")).toBe(false);
  });
});

describe("ruleCategory", () => {
  it("clearance spacing is electrical clearance", () => {
    expect(ruleCategory("clearance_spacing")).toBe("electrical_clearance");
  });
});

describe("bestUse", () => {
  it("silkscreen overlap best for clean board labeling", () => {
    expect(bestUse("silkscreen_overlap")).toBe("clean_board_labeling");
  });
});

describe("drcChecks", () => {
  it("returns 5 types", () => {
    expect(drcChecks()).toHaveLength(5);
  });
});
