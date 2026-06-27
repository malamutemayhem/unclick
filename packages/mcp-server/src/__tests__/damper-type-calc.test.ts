import { describe, it, expect } from "vitest";
import {
  control, leakage, pressure, reliability,
  dmCost, motorized, forVav, blade,
  bestUse, damperTypes,
} from "../damper-type-calc.js";

describe("control", () => {
  it("opposed blade best control", () => {
    expect(control("opposed_blade_rectangular")).toBeGreaterThan(control("fire_damper_fusible_link"));
  });
});

describe("leakage", () => {
  it("smoke damper lowest leakage rating", () => {
    expect(leakage("smoke_damper_motorized_ul")).toBeGreaterThan(leakage("butterfly_round_single_blade"));
  });
});

describe("pressure", () => {
  it("fire damper highest pressure rating", () => {
    expect(pressure("fire_damper_fusible_link")).toBeGreaterThan(pressure("butterfly_round_single_blade"));
  });
});

describe("reliability", () => {
  it("fire damper most reliable", () => {
    expect(reliability("fire_damper_fusible_link")).toBeGreaterThan(reliability("parallel_blade_rectangular"));
  });
});

describe("dmCost", () => {
  it("smoke damper most expensive", () => {
    expect(dmCost("smoke_damper_motorized_ul")).toBeGreaterThan(dmCost("butterfly_round_single_blade"));
  });
});

describe("motorized", () => {
  it("opposed blade is motorized", () => {
    expect(motorized("opposed_blade_rectangular")).toBe(true);
  });
  it("butterfly not motorized", () => {
    expect(motorized("butterfly_round_single_blade")).toBe(false);
  });
});

describe("forVav", () => {
  it("opposed blade for vav", () => {
    expect(forVav("opposed_blade_rectangular")).toBe(true);
  });
  it("parallel blade not for vav", () => {
    expect(forVav("parallel_blade_rectangular")).toBe(false);
  });
});

describe("blade", () => {
  it("fire damper uses curtain blade fusible", () => {
    expect(blade("fire_damper_fusible_link")).toBe("curtain_blade_fusible_link_spring");
  });
});

describe("bestUse", () => {
  it("opposed blade for vav terminal", () => {
    expect(bestUse("opposed_blade_rectangular")).toBe("vav_terminal_modulating_flow_control");
  });
});

describe("damperTypes", () => {
  it("returns 5 types", () => {
    expect(damperTypes()).toHaveLength(5);
  });
});
