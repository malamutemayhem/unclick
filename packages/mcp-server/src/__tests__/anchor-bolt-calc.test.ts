import { describe, it, expect } from "vitest";
import {
  pullout, shear, vibration, removability,
  abCost, expansionType, forConcrete, mechanism,
  bestUse, anchorBoltTypes,
} from "../anchor-bolt-calc.js";

describe("pullout", () => {
  it("chemical highest pullout", () => {
    expect(pullout("chemical_epoxy_adhesive_bond")).toBeGreaterThan(pullout("drop_in_flush_internal_thread"));
  });
});

describe("shear", () => {
  it("chemical highest shear", () => {
    expect(shear("chemical_epoxy_adhesive_bond")).toBeGreaterThan(shear("drop_in_flush_internal_thread"));
  });
});

describe("vibration", () => {
  it("cast in place best vibration resist", () => {
    expect(vibration("cast_in_place_j_bolt_embed")).toBeGreaterThan(vibration("sleeve_expansion_cone_pull"));
  });
});

describe("removability", () => {
  it("drop in most removable", () => {
    expect(removability("drop_in_flush_internal_thread")).toBeGreaterThan(removability("chemical_epoxy_adhesive_bond"));
  });
});

describe("abCost", () => {
  it("chemical most expensive", () => {
    expect(abCost("chemical_epoxy_adhesive_bond")).toBeGreaterThan(abCost("drop_in_flush_internal_thread"));
  });
});

describe("expansionType", () => {
  it("wedge is expansion type", () => {
    expect(expansionType("wedge_expansion_torque_set")).toBe(true);
  });
  it("chemical not expansion type", () => {
    expect(expansionType("chemical_epoxy_adhesive_bond")).toBe(false);
  });
});

describe("forConcrete", () => {
  it("all for concrete", () => {
    expect(forConcrete("wedge_expansion_torque_set")).toBe(true);
  });
});

describe("mechanism", () => {
  it("chemical uses resin capsule", () => {
    expect(mechanism("chemical_epoxy_adhesive_bond")).toBe("resin_capsule_chemical_cure_bond");
  });
});

describe("bestUse", () => {
  it("cast in place for foundation", () => {
    expect(bestUse("cast_in_place_j_bolt_embed")).toBe("foundation_column_base_plate_primary");
  });
});

describe("anchorBoltTypes", () => {
  it("returns 5 types", () => {
    expect(anchorBoltTypes()).toHaveLength(5);
  });
});
