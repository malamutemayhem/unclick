import { describe, it, expect } from "vitest";
import {
  pumpSpeed, throughput, compression, startupTime,
  tpCost, oilFree, forCorrosive, pumpConfig,
  bestUse, turboPumpTypes,
} from "../turbo-pump-calc.js";

describe("pumpSpeed", () => {
  it("mag bearing best pump speed", () => {
    expect(pumpSpeed("mag_bearing_turbo")).toBeGreaterThan(pumpSpeed("drag_stage_turbo"));
  });
});

describe("throughput", () => {
  it("wide range highest throughput", () => {
    expect(throughput("wide_range_turbo")).toBeGreaterThan(throughput("drag_stage_turbo"));
  });
});

describe("compression", () => {
  it("drag stage best compression", () => {
    expect(compression("drag_stage_turbo")).toBeGreaterThan(compression("wide_range_turbo"));
  });
});

describe("startupTime", () => {
  it("mag bearing best startup time", () => {
    expect(startupTime("mag_bearing_turbo")).toBeGreaterThan(startupTime("wide_range_turbo"));
  });
});

describe("tpCost", () => {
  it("mag bearing most expensive", () => {
    expect(tpCost("mag_bearing_turbo")).toBeGreaterThan(tpCost("drag_stage_turbo"));
  });
});

describe("oilFree", () => {
  it("mag bearing is oil free", () => {
    expect(oilFree("mag_bearing_turbo")).toBe(true);
  });
  it("compound turbo not oil free", () => {
    expect(oilFree("compound_turbo")).toBe(false);
  });
});

describe("forCorrosive", () => {
  it("mag bearing for corrosive", () => {
    expect(forCorrosive("mag_bearing_turbo")).toBe(true);
  });
  it("compound turbo not for corrosive", () => {
    expect(forCorrosive("compound_turbo")).toBe(false);
  });
});

describe("pumpConfig", () => {
  it("wide range uses integrated drag rough to high vacuum", () => {
    expect(pumpConfig("wide_range_turbo")).toBe("wide_range_turbo_pump_integrated_drag_rough_to_high_vacuum");
  });
});

describe("bestUse", () => {
  it("split flow for diff pump multiple inlet mass spec beam", () => {
    expect(bestUse("split_flow_turbo")).toBe("diff_pump_split_flow_turbo_pump_multiple_inlet_mass_spec_beam");
  });
});

describe("turboPumpTypes", () => {
  it("returns 5 types", () => {
    expect(turboPumpTypes()).toHaveLength(5);
  });
});
