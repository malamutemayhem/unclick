import { describe, it, expect } from "vitest";
import {
  cableCapacity, accessibility, ventilation, installEase,
  ductCost, slotted, forPanel, mountMethod,
  bestUse, wireDucts,
} from "../wire-duct-calc.js";

describe("cableCapacity", () => {
  it("wide slot power highest cable capacity", () => {
    expect(cableCapacity("wide_slot_power")).toBeGreaterThan(cableCapacity("round_corner_raceway"));
  });
});

describe("accessibility", () => {
  it("narrow finger dense most accessible", () => {
    expect(accessibility("narrow_finger_dense")).toBeGreaterThan(accessibility("solid_wall_enclosed"));
  });
});

describe("ventilation", () => {
  it("narrow finger dense best ventilation", () => {
    expect(ventilation("narrow_finger_dense")).toBeGreaterThan(ventilation("solid_wall_enclosed"));
  });
});

describe("installEase", () => {
  it("round corner raceway easiest install", () => {
    expect(installEase("round_corner_raceway")).toBeGreaterThan(installEase("wide_slot_power"));
  });
});

describe("ductCost", () => {
  it("wide slot power most expensive", () => {
    expect(ductCost("wide_slot_power")).toBeGreaterThan(ductCost("round_corner_raceway"));
  });
});

describe("slotted", () => {
  it("slotted pvc panel is slotted", () => {
    expect(slotted("slotted_pvc_panel")).toBe(true);
  });
  it("solid wall enclosed not slotted", () => {
    expect(slotted("solid_wall_enclosed")).toBe(false);
  });
});

describe("forPanel", () => {
  it("slotted pvc panel is for panel", () => {
    expect(forPanel("slotted_pvc_panel")).toBe(true);
  });
  it("round corner raceway not for panel", () => {
    expect(forPanel("round_corner_raceway")).toBe(false);
  });
});

describe("mountMethod", () => {
  it("round corner raceway uses adhesive surface", () => {
    expect(mountMethod("round_corner_raceway")).toBe("adhesive_surface");
  });
});

describe("bestUse", () => {
  it("narrow finger dense best for plc dense signal wire", () => {
    expect(bestUse("narrow_finger_dense")).toBe("plc_dense_signal_wire");
  });
});

describe("wireDucts", () => {
  it("returns 5 types", () => {
    expect(wireDucts()).toHaveLength(5);
  });
});
