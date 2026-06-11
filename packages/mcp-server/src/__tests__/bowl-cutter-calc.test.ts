import { describe, it, expect } from "vitest";
import {
  emulsionQuality, throughput, temperatureControl, particleFineness,
  bcCost, vacuum_capable, forFrankfurt, cutterConfig,
  bestUse, bowlCutterTypes,
} from "../bowl-cutter-calc.js";

describe("emulsionQuality", () => {
  it("vacuum cutter best emulsion quality", () => {
    expect(emulsionQuality("vacuum_cutter")).toBeGreaterThan(emulsionQuality("mini_tabletop"));
  });
});

describe("throughput", () => {
  it("high speed highest throughput", () => {
    expect(throughput("high_speed")).toBeGreaterThan(throughput("mini_tabletop"));
  });
});

describe("temperatureControl", () => {
  it("cooking cutter best temperature control", () => {
    expect(temperatureControl("cooking_cutter")).toBeGreaterThan(temperatureControl("mini_tabletop"));
  });
});

describe("particleFineness", () => {
  it("high speed finest particle", () => {
    expect(particleFineness("high_speed")).toBeGreaterThan(particleFineness("standard_cutter"));
  });
});

describe("bcCost", () => {
  it("cooking cutter most expensive", () => {
    expect(bcCost("cooking_cutter")).toBeGreaterThan(bcCost("mini_tabletop"));
  });
});

describe("vacuum_capable", () => {
  it("vacuum cutter is vacuum capable", () => {
    expect(vacuum_capable("vacuum_cutter")).toBe(true);
  });
  it("standard cutter not vacuum capable", () => {
    expect(vacuum_capable("standard_cutter")).toBe(false);
  });
});

describe("forFrankfurt", () => {
  it("vacuum cutter for frankfurt", () => {
    expect(forFrankfurt("vacuum_cutter")).toBe(true);
  });
  it("cooking cutter not for frankfurt", () => {
    expect(forFrankfurt("cooking_cutter")).toBe(false);
  });
});

describe("cutterConfig", () => {
  it("high speed uses fast knife rpm ultra fine", () => {
    expect(cutterConfig("high_speed")).toBe("high_speed_bowl_cutter_fast_knife_rpm_ultra_fine_particle_cut");
  });
});

describe("bestUse", () => {
  it("cooking cutter for processed cheese emulsify cook", () => {
    expect(bestUse("cooking_cutter")).toBe("processed_cheese_cooking_cutter_emulsify_cook_blend_one_step");
  });
});

describe("bowlCutterTypes", () => {
  it("returns 5 types", () => {
    expect(bowlCutterTypes()).toHaveLength(5);
  });
});
