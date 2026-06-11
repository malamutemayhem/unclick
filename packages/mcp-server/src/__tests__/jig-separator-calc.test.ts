import { describe, it, expect } from "vitest";
import {
  recovery, capacity, selectivity, waterUse,
  jsCost, continuous, forHeavy, pulsion,
  bestUse, jigSeparatorTypes,
} from "../jig-separator-calc.js";

describe("recovery", () => {
  it("centrifugal jig highest recovery", () => {
    expect(recovery("centrifugal_jig_fine")).toBeGreaterThan(recovery("pan_american_plunger"));
  });
});

describe("capacity", () => {
  it("inline pressure jig highest capacity", () => {
    expect(capacity("inline_pressure_jig")).toBeGreaterThan(capacity("centrifugal_jig_fine"));
  });
});

describe("selectivity", () => {
  it("centrifugal jig best selectivity", () => {
    expect(selectivity("centrifugal_jig_fine")).toBeGreaterThan(selectivity("piston_jig_heavy"));
  });
});

describe("waterUse", () => {
  it("pan american highest water use", () => {
    expect(waterUse("pan_american_plunger")).toBeGreaterThan(waterUse("inline_pressure_jig"));
  });
});

describe("jsCost", () => {
  it("centrifugal jig most expensive", () => {
    expect(jsCost("centrifugal_jig_fine")).toBeGreaterThan(jsCost("pan_american_plunger"));
  });
});

describe("continuous", () => {
  it("all jigs are continuous", () => {
    expect(continuous("diaphragm_jig_standard")).toBe(true);
    expect(continuous("centrifugal_jig_fine")).toBe(true);
  });
});

describe("forHeavy", () => {
  it("piston jig for heavy minerals", () => {
    expect(forHeavy("piston_jig_heavy")).toBe(true);
  });
  it("diaphragm jig not for heavy", () => {
    expect(forHeavy("diaphragm_jig_standard")).toBe(false);
  });
});

describe("pulsion", () => {
  it("inline pressure uses enclosed screen pulse", () => {
    expect(pulsion("inline_pressure_jig")).toBe("inline_pressure_screen_pulse_enclosed");
  });
});

describe("bestUse", () => {
  it("centrifugal jig for fine gold recovery", () => {
    expect(bestUse("centrifugal_jig_fine")).toBe("fine_gold_tin_tungsten_gravity_recover");
  });
});

describe("jigSeparatorTypes", () => {
  it("returns 5 types", () => {
    expect(jigSeparatorTypes()).toHaveLength(5);
  });
});
