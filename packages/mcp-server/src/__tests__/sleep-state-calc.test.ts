import { describe, it, expect } from "vitest";
import {
  wakeTime, retention, peripheralActive, powerSave,
  slpCost, sramRetained, forBattery, wakeSource,
  bestUse, sleepStates,
} from "../sleep-state-calc.js";

describe("wakeTime", () => {
  it("run active fastest wake time", () => {
    expect(wakeTime("run_active")).toBeGreaterThan(wakeTime("standby_vbat"));
  });
});

describe("retention", () => {
  it("run active best retention", () => {
    expect(retention("run_active")).toBeGreaterThan(retention("standby_vbat"));
  });
});

describe("peripheralActive", () => {
  it("run active most peripherals active", () => {
    expect(peripheralActive("run_active")).toBeGreaterThan(peripheralActive("stop_retention"));
  });
});

describe("powerSave", () => {
  it("standby vbat most power saved", () => {
    expect(powerSave("standby_vbat")).toBeGreaterThan(powerSave("run_active"));
  });
});

describe("slpCost", () => {
  it("standby vbat most complex to implement", () => {
    expect(slpCost("standby_vbat")).toBeGreaterThan(slpCost("run_active"));
  });
});

describe("sramRetained", () => {
  it("stop retention sram is retained", () => {
    expect(sramRetained("stop_retention")).toBe(true);
  });
  it("standby vbat sram not retained", () => {
    expect(sramRetained("standby_vbat")).toBe(false);
  });
});

describe("forBattery", () => {
  it("stop retention for battery", () => {
    expect(forBattery("stop_retention")).toBe(true);
  });
  it("run active not for battery", () => {
    expect(forBattery("run_active")).toBe(false);
  });
});

describe("wakeSource", () => {
  it("standby vbat uses wakeup pin rtc alarm", () => {
    expect(wakeSource("standby_vbat")).toBe("wakeup_pin_rtc_alarm");
  });
});

describe("bestUse", () => {
  it("low power sleep best for periodic sensor sample", () => {
    expect(bestUse("low_power_sleep")).toBe("periodic_sensor_sample");
  });
});

describe("sleepStates", () => {
  it("returns 5 types", () => {
    expect(sleepStates()).toHaveLength(5);
  });
});
