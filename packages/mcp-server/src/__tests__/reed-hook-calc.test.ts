import { describe, it, expect } from "vitest";
import {
  threadingSpeed, dentAccess, handComfort, durability,
  hookCost, doubleEnded, forFineDent, hookMaterial,
  bestUse, reedHooks,
} from "../reed-hook-calc.js";

describe("threadingSpeed", () => {
  it("double end combo fastest threading", () => {
    expect(threadingSpeed("double_end_combo")).toBeGreaterThan(threadingSpeed("fine_wire_high_dent"));
  });
});

describe("dentAccess", () => {
  it("fine wire high dent best dent access", () => {
    expect(dentAccess("fine_wire_high_dent")).toBeGreaterThan(dentAccess("flat_wire_basic"));
  });
});

describe("handComfort", () => {
  it("ergonomic handle grip most comfortable", () => {
    expect(handComfort("ergonomic_handle_grip")).toBeGreaterThan(handComfort("fine_wire_high_dent"));
  });
});

describe("durability", () => {
  it("double end combo most durable", () => {
    expect(durability("double_end_combo")).toBeGreaterThan(durability("fine_wire_high_dent"));
  });
});

describe("hookCost", () => {
  it("double end combo more expensive", () => {
    expect(hookCost("double_end_combo")).toBeGreaterThan(hookCost("flat_wire_basic"));
  });
});

describe("doubleEnded", () => {
  it("double end combo is double ended", () => {
    expect(doubleEnded("double_end_combo")).toBe(true);
  });
  it("flat wire basic not double ended", () => {
    expect(doubleEnded("flat_wire_basic")).toBe(false);
  });
});

describe("forFineDent", () => {
  it("fine wire high dent is for fine dent", () => {
    expect(forFineDent("fine_wire_high_dent")).toBe(true);
  });
  it("bent tip sleyed not for fine dent", () => {
    expect(forFineDent("bent_tip_sleyed")).toBe(false);
  });
});

describe("hookMaterial", () => {
  it("flat wire basic uses stainless flat wire", () => {
    expect(hookMaterial("flat_wire_basic")).toBe("stainless_flat_wire");
  });
});

describe("bestUse", () => {
  it("bent tip sleyed best for quick sley pull", () => {
    expect(bestUse("bent_tip_sleyed")).toBe("quick_sley_pull");
  });
});

describe("reedHooks", () => {
  it("returns 5 types", () => {
    expect(reedHooks()).toHaveLength(5);
  });
});
