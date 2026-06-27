import { describe, it, expect } from "vitest";
import {
  efficiency, pressure, temperature, maintenance,
  phCost, expandable, forHvac, plate,
  bestUse, plateHeatTypes,
} from "../plate-heat-calc.js";

describe("efficiency", () => {
  it("gasketed highest efficiency", () => {
    expect(efficiency("gasketed_frame_standard")).toBeGreaterThan(efficiency("welded_wide_gap"));
  });
});

describe("pressure", () => {
  it("brazed highest pressure", () => {
    expect(pressure("brazed_copper_compact")).toBeGreaterThan(pressure("gasketed_frame_standard"));
  });
});

describe("temperature", () => {
  it("welded highest temperature", () => {
    expect(temperature("welded_wide_gap")).toBeGreaterThan(temperature("gasketed_frame_standard"));
  });
});

describe("maintenance", () => {
  it("gasketed easiest maintenance", () => {
    expect(maintenance("gasketed_frame_standard")).toBeGreaterThan(maintenance("brazed_copper_compact"));
  });
});

describe("phCost", () => {
  it("welded most expensive", () => {
    expect(phCost("welded_wide_gap")).toBeGreaterThan(phCost("brazed_copper_compact"));
  });
});

describe("expandable", () => {
  it("gasketed is expandable", () => {
    expect(expandable("gasketed_frame_standard")).toBe(true);
  });
  it("brazed not expandable", () => {
    expect(expandable("brazed_copper_compact")).toBe(false);
  });
});

describe("forHvac", () => {
  it("gasketed for hvac", () => {
    expect(forHvac("gasketed_frame_standard")).toBe(true);
  });
  it("welded not hvac", () => {
    expect(forHvac("welded_wide_gap")).toBe(false);
  });
});

describe("plate", () => {
  it("double wall uses leak detection", () => {
    expect(plate("double_wall_safety")).toBe("double_embossed_leak_detection");
  });
});

describe("bestUse", () => {
  it("brazed for refrigeration", () => {
    expect(bestUse("brazed_copper_compact")).toBe("refrigeration_heat_pump_economizer");
  });
});

describe("plateHeatTypes", () => {
  it("returns 5 types", () => {
    expect(plateHeatTypes()).toHaveLength(5);
  });
});
