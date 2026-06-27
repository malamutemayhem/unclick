import { describe, it, expect } from "vitest";
import {
  fireRating, leakage, reliability, maintenance,
  fmCost, motorized, forSmoke, mechanism,
  bestUse, fireDamperTypes,
} from "../fire-damper-calc.js";

describe("fireRating", () => {
  it("combination fire smoke highest rating", () => {
    expect(fireRating("combination_fire_smoke")).toBeGreaterThan(fireRating("intumescent_passive"));
  });
});

describe("leakage", () => {
  it("intumescent passive lowest leakage", () => {
    expect(leakage("intumescent_passive")).toBeGreaterThan(leakage("curtain_blade_gravity"));
  });
});

describe("reliability", () => {
  it("intumescent passive most reliable", () => {
    expect(reliability("intumescent_passive")).toBeGreaterThan(reliability("combination_fire_smoke"));
  });
});

describe("maintenance", () => {
  it("intumescent passive lowest maintenance", () => {
    expect(maintenance("intumescent_passive")).toBeGreaterThan(maintenance("combination_fire_smoke"));
  });
});

describe("fmCost", () => {
  it("combination fire smoke most expensive", () => {
    expect(fmCost("combination_fire_smoke")).toBeGreaterThan(fmCost("curtain_blade_gravity"));
  });
});

describe("motorized", () => {
  it("combination fire smoke is motorized", () => {
    expect(motorized("combination_fire_smoke")).toBe(true);
  });
  it("curtain blade not motorized", () => {
    expect(motorized("curtain_blade_gravity")).toBe(false);
  });
});

describe("forSmoke", () => {
  it("combination for smoke control", () => {
    expect(forSmoke("combination_fire_smoke")).toBe(true);
  });
  it("curtain blade not for smoke", () => {
    expect(forSmoke("curtain_blade_gravity")).toBe(false);
  });
});

describe("mechanism", () => {
  it("intumescent uses expanding material", () => {
    expect(mechanism("intumescent_passive")).toBe("intumescent_material_expand_seal_heat");
  });
});

describe("bestUse", () => {
  it("corridor damper for hospital", () => {
    expect(bestUse("corridor_damper_rated")).toBe("hospital_corridor_ceiling_code_required");
  });
});

describe("fireDamperTypes", () => {
  it("returns 5 types", () => {
    expect(fireDamperTypes()).toHaveLength(5);
  });
});
