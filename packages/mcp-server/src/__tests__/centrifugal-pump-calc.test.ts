import { describe, it, expect } from "vitest";
import {
  efficiency, headRange, reliability, npshr,
  cpCost, sealless, forCorrosive, impellerType,
  bestUse, centrifugalPumpTypes,
} from "../centrifugal-pump-calc.js";

describe("efficiency", () => {
  it("between bearings highest efficiency", () => {
    expect(efficiency("between_bearings_split")).toBeGreaterThan(efficiency("mag_drive_sealless"));
  });
});

describe("headRange", () => {
  it("vertical turbine highest head range", () => {
    expect(headRange("vertical_turbine_deep")).toBeGreaterThan(headRange("submersible_wet_pit"));
  });
});

describe("reliability", () => {
  it("between bearings most reliable", () => {
    expect(reliability("between_bearings_split")).toBeGreaterThan(reliability("submersible_wet_pit"));
  });
});

describe("npshr", () => {
  it("vertical turbine best npshr", () => {
    expect(npshr("vertical_turbine_deep")).toBeGreaterThanOrEqual(npshr("submersible_wet_pit"));
  });
});

describe("cpCost", () => {
  it("vertical turbine expensive", () => {
    expect(cpCost("vertical_turbine_deep")).toBeGreaterThan(cpCost("end_suction_overhung"));
  });
});

describe("sealless", () => {
  it("mag drive is sealless", () => {
    expect(sealless("mag_drive_sealless")).toBe(true);
  });
  it("end suction not sealless", () => {
    expect(sealless("end_suction_overhung")).toBe(false);
  });
});

describe("forCorrosive", () => {
  it("mag drive for corrosive", () => {
    expect(forCorrosive("mag_drive_sealless")).toBe(true);
  });
  it("between bearings not for corrosive", () => {
    expect(forCorrosive("between_bearings_split")).toBe(false);
  });
});

describe("impellerType", () => {
  it("submersible uses vortex or channel", () => {
    expect(impellerType("submersible_wet_pit")).toBe("submersible_motor_vortex_or_channel_impeller");
  });
});

describe("bestUse", () => {
  it("end suction for general process", () => {
    expect(bestUse("end_suction_overhung")).toBe("general_process_water_transfer_hvac_booster");
  });
});

describe("centrifugalPumpTypes", () => {
  it("returns 5 types", () => {
    expect(centrifugalPumpTypes()).toHaveLength(5);
  });
});
