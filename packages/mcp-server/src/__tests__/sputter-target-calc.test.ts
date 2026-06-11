import { describe, it, expect } from "vitest";
import {
  utilization, throughput, filmPurity, targetLife,
  stCost, reactive, forInsulator, targetConfig,
  bestUse, sputterTargetTypes,
} from "../sputter-target-calc.js";

describe("utilization", () => {
  it("rotary target best utilization", () => {
    expect(utilization("rotary_target")).toBeGreaterThan(utilization("planar_dc"));
  });
});

describe("throughput", () => {
  it("rotary target highest throughput", () => {
    expect(throughput("rotary_target")).toBeGreaterThan(throughput("compound_target"));
  });
});

describe("filmPurity", () => {
  it("compound target best film purity", () => {
    expect(filmPurity("compound_target")).toBeGreaterThan(filmPurity("planar_dc"));
  });
});

describe("targetLife", () => {
  it("rotary target best target life", () => {
    expect(targetLife("rotary_target")).toBeGreaterThan(targetLife("compound_target"));
  });
});

describe("stCost", () => {
  it("compound target most expensive", () => {
    expect(stCost("compound_target")).toBeGreaterThan(stCost("planar_dc"));
  });
});

describe("reactive", () => {
  it("planar rf is reactive", () => {
    expect(reactive("planar_rf")).toBe(true);
  });
  it("planar dc not reactive", () => {
    expect(reactive("planar_dc")).toBe(false);
  });
});

describe("forInsulator", () => {
  it("planar rf for insulator", () => {
    expect(forInsulator("planar_rf")).toBe(true);
  });
  it("planar dc not for insulator", () => {
    expect(forInsulator("planar_dc")).toBe(false);
  });
});

describe("targetConfig", () => {
  it("conical uses focused deposition step coverage via fill", () => {
    expect(targetConfig("conical_target")).toBe("conical_sputter_target_focused_deposition_step_coverage_via_fill");
  });
});

describe("bestUse", () => {
  it("rotary for large area inline glass coat", () => {
    expect(bestUse("rotary_target")).toBe("large_area_rotary_sputter_target_inline_glass_coat_high_utilize");
  });
});

describe("sputterTargetTypes", () => {
  it("returns 5 types", () => {
    expect(sputterTargetTypes()).toHaveLength(5);
  });
});
