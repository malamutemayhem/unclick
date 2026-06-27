import { describe, it, expect } from "vitest";
import {
  speed, precision, complexity, changeover,
  rfCost, servo, forStructural, tooling,
  bestUse, rollFormingTypes,
} from "../roll-forming-calc.js";

describe("speed", () => {
  it("standard inline fastest", () => {
    expect(speed("standard_inline_profile")).toBeGreaterThan(speed("flexible_roll_servo"));
  });
});

describe("precision", () => {
  it("flexible roll most precise", () => {
    expect(precision("flexible_roll_servo")).toBeGreaterThan(precision("post_cut_flying_shear"));
  });
});

describe("complexity", () => {
  it("flexible roll most complex profiles", () => {
    expect(complexity("flexible_roll_servo")).toBeGreaterThan(complexity("standard_inline_profile"));
  });
});

describe("changeover", () => {
  it("flexible roll fastest changeover", () => {
    expect(changeover("flexible_roll_servo")).toBeGreaterThan(changeover("standard_inline_profile"));
  });
});

describe("rfCost", () => {
  it("flexible roll most expensive", () => {
    expect(rfCost("flexible_roll_servo")).toBeGreaterThan(rfCost("standard_inline_profile"));
  });
});

describe("servo", () => {
  it("flexible roll has servo", () => {
    expect(servo("flexible_roll_servo")).toBe(true);
  });
  it("standard inline no servo", () => {
    expect(servo("standard_inline_profile")).toBe(false);
  });
});

describe("forStructural", () => {
  it("standard inline for structural", () => {
    expect(forStructural("standard_inline_profile")).toBe(true);
  });
  it("flexible roll not for structural", () => {
    expect(forStructural("flexible_roll_servo")).toBe(false);
  });
});

describe("tooling", () => {
  it("rafted uses cassette quick change", () => {
    expect(tooling("rafted_quick_change")).toBe("cassette_raft_quick_change_set");
  });
});

describe("bestUse", () => {
  it("standard for c channel purlin", () => {
    expect(bestUse("standard_inline_profile")).toBe("c_channel_z_purlin_roof_panel");
  });
});

describe("rollFormingTypes", () => {
  it("returns 5 types", () => {
    expect(rollFormingTypes()).toHaveLength(5);
  });
});
