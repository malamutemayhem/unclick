import { describe, it, expect } from "vitest";
import {
  impedance, freqRange, currentHandle, sizeCompact,
  beadCost, removable, forPcb, mountMethod,
  bestUse, ferriteBeads,
} from "../ferrite-bead-calc.js";

describe("impedance", () => {
  it("toroid core wound highest impedance", () => {
    expect(impedance("toroid_core_wound")).toBeGreaterThan(impedance("flat_cable_clip"));
  });
});

describe("freqRange", () => {
  it("smd chip widest freq range", () => {
    expect(freqRange("smd_chip_0603")).toBeGreaterThan(freqRange("toroid_core_wound"));
  });
});

describe("currentHandle", () => {
  it("toroid core wound highest current handle", () => {
    expect(currentHandle("toroid_core_wound")).toBeGreaterThan(currentHandle("smd_chip_0603"));
  });
});

describe("sizeCompact", () => {
  it("smd chip most compact", () => {
    expect(sizeCompact("smd_chip_0603")).toBeGreaterThan(sizeCompact("toroid_core_wound"));
  });
});

describe("beadCost", () => {
  it("toroid core wound most expensive", () => {
    expect(beadCost("toroid_core_wound")).toBeGreaterThan(beadCost("smd_chip_0603"));
  });
});

describe("removable", () => {
  it("snap on cable clamp is removable", () => {
    expect(removable("snap_on_cable_clamp")).toBe(true);
  });
  it("smd chip not removable", () => {
    expect(removable("smd_chip_0603")).toBe(false);
  });
});

describe("forPcb", () => {
  it("smd chip is for pcb", () => {
    expect(forPcb("smd_chip_0603")).toBe(true);
  });
  it("snap on cable clamp not for pcb", () => {
    expect(forPcb("snap_on_cable_clamp")).toBe(false);
  });
});

describe("mountMethod", () => {
  it("snap on cable clamp uses snap clamp cable", () => {
    expect(mountMethod("snap_on_cable_clamp")).toBe("snap_clamp_cable");
  });
});

describe("bestUse", () => {
  it("smd chip best for power line emi filter", () => {
    expect(bestUse("smd_chip_0603")).toBe("power_line_emi_filter");
  });
});

describe("ferriteBeads", () => {
  it("returns 5 types", () => {
    expect(ferriteBeads()).toHaveLength(5);
  });
});
