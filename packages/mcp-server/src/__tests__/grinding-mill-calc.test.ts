import { describe, it, expect } from "vitest";
import {
  fineness, capacity, efficiency, mediaWear,
  gmCost, autogenous, forCement, grinding,
  bestUse, grindingMillTypes,
} from "../grinding-mill-calc.js";

describe("fineness", () => {
  it("stirred media finest grind", () => {
    expect(fineness("stirred_media_isa")).toBeGreaterThan(fineness("rod_mill_coarse"));
  });
});

describe("capacity", () => {
  it("sag highest capacity", () => {
    expect(capacity("sag_semi_autogenous")).toBeGreaterThan(capacity("stirred_media_isa"));
  });
});

describe("efficiency", () => {
  it("vertical roller most efficient", () => {
    expect(efficiency("vertical_roller_vrm")).toBeGreaterThan(efficiency("ball_mill_tumbling"));
  });
});

describe("mediaWear", () => {
  it("vertical roller lowest media wear", () => {
    expect(mediaWear("vertical_roller_vrm")).toBeGreaterThan(mediaWear("stirred_media_isa"));
  });
});

describe("gmCost", () => {
  it("sag most expensive", () => {
    expect(gmCost("sag_semi_autogenous")).toBeGreaterThan(gmCost("ball_mill_tumbling"));
  });
});

describe("autogenous", () => {
  it("sag is autogenous", () => {
    expect(autogenous("sag_semi_autogenous")).toBe(true);
  });
  it("ball mill not autogenous", () => {
    expect(autogenous("ball_mill_tumbling")).toBe(false);
  });
});

describe("forCement", () => {
  it("ball mill for cement", () => {
    expect(forCement("ball_mill_tumbling")).toBe(true);
  });
  it("sag not for cement", () => {
    expect(forCement("sag_semi_autogenous")).toBe(false);
  });
});

describe("grinding", () => {
  it("stirred media uses ceramic bead", () => {
    expect(grinding("stirred_media_isa")).toBe("ceramic_bead_stirred_attrition");
  });
});

describe("bestUse", () => {
  it("rod mill best for open circuit coarse grind", () => {
    expect(bestUse("rod_mill_coarse")).toBe("open_circuit_coarse_grind_prep");
  });
});

describe("grindingMillTypes", () => {
  it("returns 5 types", () => {
    expect(grindingMillTypes()).toHaveLength(5);
  });
});
