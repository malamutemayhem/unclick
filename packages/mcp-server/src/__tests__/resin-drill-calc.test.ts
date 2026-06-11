import { describe, it, expect } from "vitest";
import {
  holePrecision, speedDrill, chipFree, sizeRange,
  drillCost, powered, forFine, bitStyle,
  bestUse, resinDrills,
} from "../resin-drill-calc.js";

describe("holePrecision", () => {
  it("drill press precision most precise hole", () => {
    expect(holePrecision("drill_press_precision")).toBeGreaterThan(holePrecision("step_bit_graduated"));
  });
});

describe("speedDrill", () => {
  it("tile saw wet fastest drill", () => {
    expect(speedDrill("rotary_tool_speed")).toBeGreaterThan(speedDrill("pin_vise_hand"));
  });
});

describe("chipFree", () => {
  it("diamond bit fine most chip free", () => {
    expect(chipFree("diamond_bit_fine")).toBeGreaterThan(chipFree("rotary_tool_speed"));
  });
});

describe("sizeRange", () => {
  it("step bit graduated widest size range", () => {
    expect(sizeRange("step_bit_graduated")).toBeGreaterThan(sizeRange("diamond_bit_fine"));
  });
});

describe("drillCost", () => {
  it("drill press precision most expensive", () => {
    expect(drillCost("drill_press_precision")).toBeGreaterThan(drillCost("pin_vise_hand"));
  });
});

describe("powered", () => {
  it("rotary tool speed is powered", () => {
    expect(powered("rotary_tool_speed")).toBe(true);
  });
  it("pin vise hand not powered", () => {
    expect(powered("pin_vise_hand")).toBe(false);
  });
});

describe("forFine", () => {
  it("diamond bit fine is for fine", () => {
    expect(forFine("diamond_bit_fine")).toBe(true);
  });
  it("rotary tool speed not for fine", () => {
    expect(forFine("rotary_tool_speed")).toBe(false);
  });
});

describe("bitStyle", () => {
  it("step bit graduated uses conical step flute", () => {
    expect(bitStyle("step_bit_graduated")).toBe("conical_step_flute");
  });
});

describe("bestUse", () => {
  it("pin vise hand best for small hole hand drill", () => {
    expect(bestUse("pin_vise_hand")).toBe("small_hole_hand_drill");
  });
});

describe("resinDrills", () => {
  it("returns 5 types", () => {
    expect(resinDrills()).toHaveLength(5);
  });
});
