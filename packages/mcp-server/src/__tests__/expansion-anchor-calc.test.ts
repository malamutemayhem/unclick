import { describe, it, expect } from "vitest";
import {
  pullout, shear, edgeDistance, installEase,
  eaCost, removable, forCracked, mechanism,
  bestUse, expansionAnchorTypes,
} from "../expansion-anchor-calc.js";

describe("pullout", () => {
  it("undercut highest pullout", () => {
    expect(pullout("undercut_mechanical_drill")).toBeGreaterThan(pullout("toggle_bolt_hollow_wall"));
  });
});

describe("shear", () => {
  it("undercut highest shear", () => {
    expect(shear("undercut_mechanical_drill")).toBeGreaterThan(shear("self_tapping_concrete_screw"));
  });
});

describe("edgeDistance", () => {
  it("toggle bolt best edge distance", () => {
    expect(edgeDistance("toggle_bolt_hollow_wall")).toBeGreaterThan(edgeDistance("torque_controlled_wedge"));
  });
});

describe("installEase", () => {
  it("self tapping easiest install", () => {
    expect(installEase("self_tapping_concrete_screw")).toBeGreaterThan(installEase("undercut_mechanical_drill"));
  });
});

describe("eaCost", () => {
  it("undercut most expensive", () => {
    expect(eaCost("undercut_mechanical_drill")).toBeGreaterThan(eaCost("toggle_bolt_hollow_wall"));
  });
});

describe("removable", () => {
  it("self tapping is removable", () => {
    expect(removable("self_tapping_concrete_screw")).toBe(true);
  });
  it("wedge not removable", () => {
    expect(removable("torque_controlled_wedge")).toBe(false);
  });
});

describe("forCracked", () => {
  it("undercut for cracked concrete", () => {
    expect(forCracked("undercut_mechanical_drill")).toBe(true);
  });
  it("toggle bolt not for cracked", () => {
    expect(forCracked("toggle_bolt_hollow_wall")).toBe(false);
  });
});

describe("mechanism", () => {
  it("toggle bolt uses wing spread", () => {
    expect(mechanism("toggle_bolt_hollow_wall")).toBe("toggle_wing_spread_behind_wall");
  });
});

describe("bestUse", () => {
  it("undercut for seismic critical", () => {
    expect(bestUse("undercut_mechanical_drill")).toBe("seismic_critical_safety_anchor");
  });
});

describe("expansionAnchorTypes", () => {
  it("returns 5 types", () => {
    expect(expansionAnchorTypes()).toHaveLength(5);
  });
});
