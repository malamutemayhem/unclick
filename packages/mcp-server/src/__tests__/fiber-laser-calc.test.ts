import { describe, it, expect } from "vitest";
import {
  power, beamQuality, pulseControl, wallPlugEfficiency,
  flCost, maintenance, forCutting, source,
  bestUse, fiberLaserTypes,
} from "../fiber-laser-calc.js";

describe("power", () => {
  it("continuous wave highest power", () => {
    expect(power("continuous_wave")).toBeGreaterThan(power("ultrafast_femtosecond"));
  });
});

describe("beamQuality", () => {
  it("ultrafast femtosecond and single mode mopa best beam quality", () => {
    expect(beamQuality("ultrafast_femtosecond")).toBeGreaterThan(beamQuality("continuous_wave"));
    expect(beamQuality("single_mode_mopa")).toBeGreaterThan(beamQuality("continuous_wave"));
  });
});

describe("pulseControl", () => {
  it("ultrafast femtosecond best pulse control", () => {
    expect(pulseControl("ultrafast_femtosecond")).toBeGreaterThan(pulseControl("continuous_wave"));
  });
});

describe("wallPlugEfficiency", () => {
  it("continuous wave most efficient", () => {
    expect(wallPlugEfficiency("continuous_wave")).toBeGreaterThan(wallPlugEfficiency("ultrafast_femtosecond"));
  });
});

describe("flCost", () => {
  it("ultrafast femtosecond most expensive", () => {
    expect(flCost("ultrafast_femtosecond")).toBeGreaterThan(flCost("pulsed_nanosecond"));
  });
});

describe("maintenance", () => {
  it("all types are maintenance free", () => {
    expect(maintenance("continuous_wave")).toBe(false);
    expect(maintenance("ultrafast_femtosecond")).toBe(false);
  });
});

describe("forCutting", () => {
  it("continuous wave for cutting", () => {
    expect(forCutting("continuous_wave")).toBe(true);
  });
  it("pulsed nanosecond not for cutting", () => {
    expect(forCutting("pulsed_nanosecond")).toBe(false);
  });
});

describe("source", () => {
  it("single mode mopa uses master oscillator power amplifier", () => {
    expect(source("single_mode_mopa")).toBe("master_oscillator_power_amplifier_single_mode_tunable_pulse");
  });
});

describe("bestUse", () => {
  it("ultrafast femtosecond for medical stent cutting", () => {
    expect(bestUse("ultrafast_femtosecond")).toBe("medical_stent_cutting_glass_drilling_cold_ablation_micro");
  });
});

describe("fiberLaserTypes", () => {
  it("returns 5 types", () => {
    expect(fiberLaserTypes()).toHaveLength(5);
  });
});
