import { describe, it, expect } from "vitest";
import {
  rangeResolution, maxRange, accuracy, penetration,
  sensorCost, wideband, forAutomotive, waveform,
  bestUse, radarSensors,
} from "../radar-sensor-calc.js";

describe("rangeResolution", () => {
  it("uwb impulse radar best range resolution", () => {
    expect(rangeResolution("uwb_impulse_radar")).toBeGreaterThan(rangeResolution("doppler_cw_motion"));
  });
});

describe("maxRange", () => {
  it("fmcw 77ghz auto longest max range", () => {
    expect(maxRange("fmcw_77ghz_auto")).toBeGreaterThan(maxRange("uwb_impulse_radar"));
  });
});

describe("accuracy", () => {
  it("fmcw 77ghz auto most accurate", () => {
    expect(accuracy("fmcw_77ghz_auto")).toBeGreaterThan(accuracy("doppler_cw_motion"));
  });
});

describe("penetration", () => {
  it("uwb impulse radar best penetration", () => {
    expect(penetration("uwb_impulse_radar")).toBeGreaterThan(penetration("fmcw_77ghz_auto"));
  });
});

describe("sensorCost", () => {
  it("fmcw 77ghz auto most expensive", () => {
    expect(sensorCost("fmcw_77ghz_auto")).toBeGreaterThan(sensorCost("doppler_cw_motion"));
  });
});

describe("wideband", () => {
  it("fmcw 24ghz is wideband", () => {
    expect(wideband("fmcw_24ghz")).toBe(true);
  });
  it("doppler cw motion not wideband", () => {
    expect(wideband("doppler_cw_motion")).toBe(false);
  });
});

describe("forAutomotive", () => {
  it("fmcw 77ghz auto is for automotive", () => {
    expect(forAutomotive("fmcw_77ghz_auto")).toBe(true);
  });
  it("fmcw 24ghz not for automotive", () => {
    expect(forAutomotive("fmcw_24ghz")).toBe(false);
  });
});

describe("waveform", () => {
  it("doppler cw motion uses cw single tone", () => {
    expect(waveform("doppler_cw_motion")).toBe("cw_single_tone");
  });
});

describe("bestUse", () => {
  it("fmcw 77ghz auto best for adaptive cruise control", () => {
    expect(bestUse("fmcw_77ghz_auto")).toBe("adaptive_cruise_control");
  });
});

describe("radarSensors", () => {
  it("returns 5 types", () => {
    expect(radarSensors()).toHaveLength(5);
  });
});
