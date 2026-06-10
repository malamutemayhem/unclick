import { describe, it, expect } from "vitest";
import {
  nibFit, handComfort, writeAngle, buildQuality,
  holderCost, isOblique, adjustable, gripMaterial,
  bestStyle, nibHolders,
} from "../nib-holder-calc.js";

describe("nibFit", () => {
  it("universal adjustable ring best nib fit", () => {
    expect(nibFit("universal_adjustable_ring")).toBeGreaterThan(nibFit("speedball_cork_student"));
  });
});

describe("handComfort", () => {
  it("ergonomic rubber grip most comfortable", () => {
    expect(handComfort("ergonomic_rubber_grip")).toBeGreaterThan(handComfort("speedball_cork_student"));
  });
});

describe("writeAngle", () => {
  it("oblique flange copper best write angle", () => {
    expect(writeAngle("oblique_flange_copper")).toBeGreaterThan(writeAngle("straight_wood_classic"));
  });
});

describe("buildQuality", () => {
  it("oblique flange copper best build quality", () => {
    expect(buildQuality("oblique_flange_copper")).toBeGreaterThan(buildQuality("speedball_cork_student"));
  });
});

describe("holderCost", () => {
  it("oblique flange copper most expensive", () => {
    expect(holderCost("oblique_flange_copper")).toBeGreaterThan(holderCost("straight_wood_classic"));
  });
});

describe("isOblique", () => {
  it("oblique flange copper is oblique", () => {
    expect(isOblique("oblique_flange_copper")).toBe(true);
  });
  it("straight wood classic is not oblique", () => {
    expect(isOblique("straight_wood_classic")).toBe(false);
  });
});

describe("adjustable", () => {
  it("universal adjustable ring is adjustable", () => {
    expect(adjustable("universal_adjustable_ring")).toBe(true);
  });
  it("straight wood classic is not adjustable", () => {
    expect(adjustable("straight_wood_classic")).toBe(false);
  });
});

describe("gripMaterial", () => {
  it("ergonomic rubber grip uses soft rubber contour", () => {
    expect(gripMaterial("ergonomic_rubber_grip")).toBe("soft_rubber_contour");
  });
});

describe("bestStyle", () => {
  it("oblique flange copper best for copperplate script", () => {
    expect(bestStyle("oblique_flange_copper")).toBe("copperplate_script");
  });
});

describe("nibHolders", () => {
  it("returns 5 types", () => {
    expect(nibHolders()).toHaveLength(5);
  });
});
