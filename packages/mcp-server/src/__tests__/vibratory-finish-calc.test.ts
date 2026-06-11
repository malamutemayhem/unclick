import { describe, it, expect } from "vitest";
import {
  finishQuality, throughput, mediaRange, partGentleness,
  vfCost_, continuous, forDeburr, finishConfig,
  bestUse, vibratoryFinishTypes,
} from "../vibratory-finish-calc.js";

describe("finishQuality", () => {
  it("centrifugal barrel best finish quality", () => {
    expect(finishQuality("centrifugal_barrel")).toBeGreaterThan(finishQuality("linear_flow_vib"));
  });
});

describe("throughput", () => {
  it("centrifugal disc highest throughput", () => {
    expect(throughput("centrifugal_disc")).toBeGreaterThan(throughput("centrifugal_barrel"));
  });
});

describe("mediaRange", () => {
  it("tub trough best media range", () => {
    expect(mediaRange("tub_trough_vib")).toBeGreaterThan(mediaRange("centrifugal_barrel"));
  });
});

describe("partGentleness", () => {
  it("linear flow best part gentleness", () => {
    expect(partGentleness("linear_flow_vib")).toBeGreaterThan(partGentleness("centrifugal_barrel"));
  });
});

describe("vfCost_", () => {
  it("centrifugal barrel most expensive", () => {
    expect(vfCost_("centrifugal_barrel")).toBeGreaterThan(vfCost_("round_bowl_vib"));
  });
});

describe("continuous", () => {
  it("tub trough is continuous", () => {
    expect(continuous("tub_trough_vib")).toBe(true);
  });
  it("round bowl not continuous", () => {
    expect(continuous("round_bowl_vib")).toBe(false);
  });
});

describe("forDeburr", () => {
  it("round bowl for deburr", () => {
    expect(forDeburr("round_bowl_vib")).toBe(true);
  });
  it("centrifugal barrel not for deburr", () => {
    expect(forDeburr("centrifugal_barrel")).toBe(false);
  });
});

describe("finishConfig", () => {
  it("centrifugal disc uses high speed rotate fast cut short cycle", () => {
    expect(finishConfig("centrifugal_disc")).toBe("centrifugal_disc_finisher_high_speed_rotate_fast_cut_short_cycle");
  });
});

describe("bestUse", () => {
  it("centrifugal barrel for jewelry high energy mirror polish", () => {
    expect(bestUse("centrifugal_barrel")).toBe("jewelry_centrifugal_barrel_finisher_high_energy_mirror_polish");
  });
});

describe("vibratoryFinishTypes", () => {
  it("returns 5 types", () => {
    expect(vibratoryFinishTypes()).toHaveLength(5);
  });
});
