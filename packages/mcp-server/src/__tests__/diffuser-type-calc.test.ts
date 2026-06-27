import { describe, it, expect } from "vitest";
import {
  throw_, spread, induction, noise,
  dfCost, adjustable, forVav, pattern,
  bestUse, diffuserTypes,
} from "../diffuser-type-calc.js";

describe("throw_", () => {
  it("slot linear longest throw", () => {
    expect(throw_("slot_linear_continuous")).toBeGreaterThan(throw_("displacement_floor_low_vel"));
  });
});

describe("spread", () => {
  it("round ceiling widest spread", () => {
    expect(spread("round_ceiling_radial_vane")).toBeGreaterThan(spread("displacement_floor_low_vel"));
  });
});

describe("induction", () => {
  it("swirl jet highest induction", () => {
    expect(induction("swirl_jet_high_induction")).toBeGreaterThan(induction("displacement_floor_low_vel"));
  });
});

describe("noise", () => {
  it("swirl jet noisiest", () => {
    expect(noise("swirl_jet_high_induction")).toBeGreaterThan(noise("displacement_floor_low_vel"));
  });
});

describe("dfCost", () => {
  it("displacement most expensive", () => {
    expect(dfCost("displacement_floor_low_vel")).toBeGreaterThan(dfCost("square_ceiling_multi_cone"));
  });
});

describe("adjustable", () => {
  it("square ceiling is adjustable", () => {
    expect(adjustable("square_ceiling_multi_cone")).toBe(true);
  });
  it("slot not adjustable", () => {
    expect(adjustable("slot_linear_continuous")).toBe(false);
  });
});

describe("forVav", () => {
  it("square ceiling for vav", () => {
    expect(forVav("square_ceiling_multi_cone")).toBe(true);
  });
  it("swirl not for vav", () => {
    expect(forVav("swirl_jet_high_induction")).toBe(false);
  });
});

describe("pattern", () => {
  it("displacement uses low velocity upward", () => {
    expect(pattern("displacement_floor_low_vel")).toBe("low_velocity_upward_stratify");
  });
});

describe("bestUse", () => {
  it("square ceiling for office classroom", () => {
    expect(bestUse("square_ceiling_multi_cone")).toBe("office_classroom_standard_ceiling");
  });
});

describe("diffuserTypes", () => {
  it("returns 5 types", () => {
    expect(diffuserTypes()).toHaveLength(5);
  });
});
