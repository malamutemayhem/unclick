import { describe, it, expect } from "vitest";
import {
  soundLevel, freqRange, sizeCompact, powerDraw,
  buzzerCost, selfOscillate, forAlarm, driveMethod,
  bestUse, piezoBuzzers,
} from "../piezo-buzzer-calc.js";

describe("soundLevel", () => {
  it("enclosed panel mount loudest", () => {
    expect(soundLevel("enclosed_panel_mount")).toBeGreaterThan(soundLevel("smd_surface_mount"));
  });
});

describe("freqRange", () => {
  it("transducer ext driver widest freq range", () => {
    expect(freqRange("transducer_ext_driver")).toBeGreaterThan(freqRange("active_dc_drive"));
  });
});

describe("sizeCompact", () => {
  it("smd surface mount most compact", () => {
    expect(sizeCompact("smd_surface_mount")).toBeGreaterThan(sizeCompact("enclosed_panel_mount"));
  });
});

describe("powerDraw", () => {
  it("smd surface mount lowest power draw", () => {
    expect(powerDraw("smd_surface_mount")).toBeGreaterThan(powerDraw("enclosed_panel_mount"));
  });
});

describe("buzzerCost", () => {
  it("enclosed panel mount most expensive", () => {
    expect(buzzerCost("enclosed_panel_mount")).toBeGreaterThan(buzzerCost("active_dc_drive"));
  });
});

describe("selfOscillate", () => {
  it("active dc drive self oscillates", () => {
    expect(selfOscillate("active_dc_drive")).toBe(true);
  });
  it("passive freq drive does not self oscillate", () => {
    expect(selfOscillate("passive_freq_drive")).toBe(false);
  });
});

describe("forAlarm", () => {
  it("enclosed panel mount is for alarm", () => {
    expect(forAlarm("enclosed_panel_mount")).toBe(true);
  });
  it("passive freq drive not for alarm", () => {
    expect(forAlarm("passive_freq_drive")).toBe(false);
  });
});

describe("driveMethod", () => {
  it("passive freq drive uses external square wave", () => {
    expect(driveMethod("passive_freq_drive")).toBe("external_square_wave");
  });
});

describe("bestUse", () => {
  it("transducer ext driver best for ultrasonic range emit", () => {
    expect(bestUse("transducer_ext_driver")).toBe("ultrasonic_range_emit");
  });
});

describe("piezoBuzzers", () => {
  it("returns 5 types", () => {
    expect(piezoBuzzers()).toHaveLength(5);
  });
});
