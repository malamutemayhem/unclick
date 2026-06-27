import { describe, it, expect } from "vitest";
import {
  visibility, duration, aesthetic, maintenance,
  esCost, powered, forExterior, illumination,
  bestUse, exitSignTypes,
} from "../exit-sign-calc.js";

describe("visibility", () => {
  it("led most visible", () => {
    expect(visibility("led_battery_backup")).toBeGreaterThan(visibility("self_luminous_tritium"));
  });
});

describe("duration", () => {
  it("photoluminescent longest duration", () => {
    expect(duration("photoluminescent_glow")).toBeGreaterThan(duration("led_battery_backup"));
  });
});

describe("aesthetic", () => {
  it("edge lit best aesthetic", () => {
    expect(aesthetic("edge_lit_acrylic")).toBeGreaterThan(aesthetic("combo_exit_emergency"));
  });
});

describe("maintenance", () => {
  it("photoluminescent lowest maintenance", () => {
    expect(maintenance("photoluminescent_glow")).toBeGreaterThan(maintenance("led_battery_backup"));
  });
});

describe("esCost", () => {
  it("tritium most expensive", () => {
    expect(esCost("self_luminous_tritium")).toBeGreaterThan(esCost("led_battery_backup"));
  });
});

describe("powered", () => {
  it("led is powered", () => {
    expect(powered("led_battery_backup")).toBe(true);
  });
  it("photoluminescent not powered", () => {
    expect(powered("photoluminescent_glow")).toBe(false);
  });
});

describe("forExterior", () => {
  it("tritium for exterior", () => {
    expect(forExterior("self_luminous_tritium")).toBe(true);
  });
  it("led not for exterior", () => {
    expect(forExterior("led_battery_backup")).toBe(false);
  });
});

describe("illumination", () => {
  it("edge lit uses acrylic", () => {
    expect(illumination("edge_lit_acrylic")).toBe("led_edge_lit_clear_acrylic");
  });
});

describe("bestUse", () => {
  it("photoluminescent for stairwell", () => {
    expect(bestUse("photoluminescent_glow")).toBe("high_rise_stairwell_no_power");
  });
});

describe("exitSignTypes", () => {
  it("returns 5 types", () => {
    expect(exitSignTypes()).toHaveLength(5);
  });
});
