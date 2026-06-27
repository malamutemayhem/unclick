import { describe, it, expect } from "vitest";
import {
  contactForce, wireRange, vibrationResist, insertSpeed,
  blockCost, toolFree, forPanel, clampMethod,
  bestUse, terminalBlocks,
} from "../terminal-block-calc.js";

describe("contactForce", () => {
  it("barrier strip highest contact force", () => {
    expect(contactForce("barrier_strip_high_v")).toBeGreaterThan(contactForce("pluggable_header_pcb"));
  });
});

describe("wireRange", () => {
  it("barrier strip widest wire range", () => {
    expect(wireRange("barrier_strip_high_v")).toBeGreaterThan(wireRange("pluggable_header_pcb"));
  });
});

describe("vibrationResist", () => {
  it("spring cage best vibration resistance", () => {
    expect(vibrationResist("spring_cage_push_in")).toBeGreaterThan(vibrationResist("pluggable_header_pcb"));
  });
});

describe("insertSpeed", () => {
  it("spring cage fastest insert", () => {
    expect(insertSpeed("spring_cage_push_in")).toBeGreaterThan(insertSpeed("barrier_strip_high_v"));
  });
});

describe("blockCost", () => {
  it("din rail mount most expensive", () => {
    expect(blockCost("din_rail_mount_feed")).toBeGreaterThan(blockCost("screw_clamp_standard"));
  });
});

describe("toolFree", () => {
  it("spring cage is tool free", () => {
    expect(toolFree("spring_cage_push_in")).toBe(true);
  });
  it("screw clamp not tool free", () => {
    expect(toolFree("screw_clamp_standard")).toBe(false);
  });
});

describe("forPanel", () => {
  it("barrier strip is for panel", () => {
    expect(forPanel("barrier_strip_high_v")).toBe(true);
  });
  it("screw clamp not for panel", () => {
    expect(forPanel("screw_clamp_standard")).toBe(false);
  });
});

describe("clampMethod", () => {
  it("spring cage uses stainless spring cage", () => {
    expect(clampMethod("spring_cage_push_in")).toBe("stainless_spring_cage");
  });
});

describe("bestUse", () => {
  it("din rail mount best for industrial plc wiring", () => {
    expect(bestUse("din_rail_mount_feed")).toBe("industrial_plc_wiring");
  });
});

describe("terminalBlocks", () => {
  it("returns 5 types", () => {
    expect(terminalBlocks()).toHaveLength(5);
  });
});
