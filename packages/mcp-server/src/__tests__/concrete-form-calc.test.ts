import { describe, it, expect } from "vitest";
import {
  reuses, speed, finish_, versatility,
  cfCost, modular, forWall, material,
  bestUse, concreteFormTypes,
} from "../concrete-form-calc.js";

describe("reuses", () => {
  it("steel gang form most reuses", () => {
    expect(reuses("steel_gang_form_wall")).toBeGreaterThan(reuses("plywood_panel_flat_slab"));
  });
});

describe("speed", () => {
  it("slip form fastest", () => {
    expect(speed("slip_form_continuous_pour")).toBeGreaterThan(speed("plywood_panel_flat_slab"));
  });
});

describe("finish_", () => {
  it("steel gang best finish", () => {
    expect(finish_("steel_gang_form_wall")).toBeGreaterThan(finish_("insulated_concrete_icf"));
  });
});

describe("versatility", () => {
  it("plywood most versatile", () => {
    expect(versatility("plywood_panel_flat_slab")).toBeGreaterThan(versatility("slip_form_continuous_pour"));
  });
});

describe("cfCost", () => {
  it("slip form most expensive", () => {
    expect(cfCost("slip_form_continuous_pour")).toBeGreaterThan(cfCost("plywood_panel_flat_slab"));
  });
});

describe("modular", () => {
  it("aluminum is modular", () => {
    expect(modular("aluminum_frame_modular")).toBe(true);
  });
  it("plywood not modular", () => {
    expect(modular("plywood_panel_flat_slab")).toBe(false);
  });
});

describe("forWall", () => {
  it("all for wall", () => {
    expect(forWall("steel_gang_form_wall")).toBe(true);
  });
});

describe("material", () => {
  it("icf uses eps foam", () => {
    expect(material("insulated_concrete_icf")).toBe("eps_foam_block_stay_in_place");
  });
});

describe("bestUse", () => {
  it("slip form for tall core", () => {
    expect(bestUse("slip_form_continuous_pour")).toBe("tall_core_silo_chimney_continuous");
  });
});

describe("concreteFormTypes", () => {
  it("returns 5 types", () => {
    expect(concreteFormTypes()).toHaveLength(5);
  });
});
