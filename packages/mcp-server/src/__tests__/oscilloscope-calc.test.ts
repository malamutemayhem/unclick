import { describe, it, expect } from "vitest";
import {
  bandwidth, sampleRate, channelCount, portability,
  scopeCost, digital, portable, triggerType,
  bestUse, oscilloscopes,
} from "../oscilloscope-calc.js";

describe("bandwidth", () => {
  it("mixed signal mso highest bandwidth", () => {
    expect(bandwidth("mixed_signal_mso")).toBeGreaterThan(bandwidth("analog_bench_classic"));
  });
});

describe("sampleRate", () => {
  it("mixed signal mso highest sample rate", () => {
    expect(sampleRate("mixed_signal_mso")).toBeGreaterThan(sampleRate("analog_bench_classic"));
  });
});

describe("channelCount", () => {
  it("mixed signal mso most channels", () => {
    expect(channelCount("mixed_signal_mso")).toBeGreaterThan(channelCount("usb_portable_scope"));
  });
});

describe("portability", () => {
  it("handheld field scope most portable", () => {
    expect(portability("handheld_field_scope")).toBeGreaterThan(portability("mixed_signal_mso"));
  });
});

describe("scopeCost", () => {
  it("mixed signal mso most expensive", () => {
    expect(scopeCost("mixed_signal_mso")).toBeGreaterThan(scopeCost("analog_bench_classic"));
  });
});

describe("digital", () => {
  it("digital storage std is digital", () => {
    expect(digital("digital_storage_std")).toBe(true);
  });
  it("analog bench classic not digital", () => {
    expect(digital("analog_bench_classic")).toBe(false);
  });
});

describe("portable", () => {
  it("usb portable scope is portable", () => {
    expect(portable("usb_portable_scope")).toBe(true);
  });
  it("digital storage std not portable", () => {
    expect(portable("digital_storage_std")).toBe(false);
  });
});

describe("triggerType", () => {
  it("mixed signal mso uses protocol decode trigger", () => {
    expect(triggerType("mixed_signal_mso")).toBe("protocol_decode_trigger");
  });
});

describe("bestUse", () => {
  it("handheld field scope best for field service test", () => {
    expect(bestUse("handheld_field_scope")).toBe("field_service_test");
  });
});

describe("oscilloscopes", () => {
  it("returns 5 types", () => {
    expect(oscilloscopes()).toHaveLength(5);
  });
});
