import { describe, it, expect } from "vitest";
import {
  sensitivity, falseAlarm, speed, coverage,
  fdCost, addressable, forCleanRoom, sensing,
  bestUse, fireDetects,
} from "../fire-detect-calc.js";

describe("sensitivity", () => {
  it("aspirating vesda most sensitive", () => {
    expect(sensitivity("aspirating_vesda_pipe")).toBeGreaterThan(sensitivity("heat_rate_of_rise"));
  });
});

describe("falseAlarm", () => {
  it("aspirating vesda lowest false alarm", () => {
    expect(falseAlarm("aspirating_vesda_pipe")).toBeGreaterThan(falseAlarm("ionization_smoke_point"));
  });
});

describe("speed", () => {
  it("flame ir uv fastest", () => {
    expect(speed("flame_ir_uv_optical")).toBeGreaterThan(speed("heat_rate_of_rise"));
  });
});

describe("coverage", () => {
  it("aspirating vesda best coverage", () => {
    expect(coverage("aspirating_vesda_pipe")).toBeGreaterThan(coverage("ionization_smoke_point"));
  });
});

describe("fdCost", () => {
  it("aspirating vesda most expensive", () => {
    expect(fdCost("aspirating_vesda_pipe")).toBeGreaterThan(fdCost("ionization_smoke_point"));
  });
});

describe("addressable", () => {
  it("photoelectric is addressable", () => {
    expect(addressable("photoelectric_smoke_scatter")).toBe(true);
  });
  it("ionization not addressable", () => {
    expect(addressable("ionization_smoke_point")).toBe(false);
  });
});

describe("forCleanRoom", () => {
  it("aspirating vesda for clean room", () => {
    expect(forCleanRoom("aspirating_vesda_pipe")).toBe(true);
  });
  it("ionization not for clean room", () => {
    expect(forCleanRoom("ionization_smoke_point")).toBe(false);
  });
});

describe("sensing", () => {
  it("flame uses dual band ir uv sensor", () => {
    expect(sensing("flame_ir_uv_optical")).toBe("dual_band_ir_uv_sensor");
  });
});

describe("bestUse", () => {
  it("aspirating vesda best for data center cleanroom", () => {
    expect(bestUse("aspirating_vesda_pipe")).toBe("data_center_cleanroom_early_warn");
  });
});

describe("fireDetects", () => {
  it("returns 5 types", () => {
    expect(fireDetects()).toHaveLength(5);
  });
});
