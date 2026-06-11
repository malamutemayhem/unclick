import { describe, it, expect } from "vitest";
import {
  bandwidth, sampleRate, memoryDepth, channels,
  oscCost, isolated, forEmbedded, acquisition,
  bestUse, oscilloscopeTypes,
} from "../oscilloscope-type-calc.js";

describe("bandwidth", () => {
  it("sampling equivalent time highest bandwidth", () => {
    expect(bandwidth("sampling_equivalent_time")).toBeGreaterThan(bandwidth("usb_portable_scope"));
  });
});

describe("sampleRate", () => {
  it("sampling equivalent time highest sample rate", () => {
    expect(sampleRate("sampling_equivalent_time")).toBeGreaterThan(sampleRate("dso_digital_storage"));
  });
});

describe("memoryDepth", () => {
  it("dpo digital phosphor deepest memory", () => {
    expect(memoryDepth("dpo_digital_phosphor")).toBeGreaterThan(memoryDepth("sampling_equivalent_time"));
  });
});

describe("channels", () => {
  it("mso mixed signal most channels", () => {
    expect(channels("mso_mixed_signal")).toBeGreaterThan(channels("sampling_equivalent_time"));
  });
});

describe("oscCost", () => {
  it("sampling equivalent time most expensive", () => {
    expect(oscCost("sampling_equivalent_time")).toBeGreaterThan(oscCost("usb_portable_scope"));
  });
});

describe("isolated", () => {
  it("sampling equivalent time is isolated", () => {
    expect(isolated("sampling_equivalent_time")).toBe(true);
  });
  it("dso digital storage not isolated", () => {
    expect(isolated("dso_digital_storage")).toBe(false);
  });
});

describe("forEmbedded", () => {
  it("mso mixed signal for embedded", () => {
    expect(forEmbedded("mso_mixed_signal")).toBe(true);
  });
  it("dpo digital phosphor not for embedded", () => {
    expect(forEmbedded("dpo_digital_phosphor")).toBe(false);
  });
});

describe("acquisition", () => {
  it("dpo digital phosphor uses intensity graded persist", () => {
    expect(acquisition("dpo_digital_phosphor")).toBe("intensity_graded_persist");
  });
});

describe("bestUse", () => {
  it("mso mixed signal best for protocol decode debug", () => {
    expect(bestUse("mso_mixed_signal")).toBe("protocol_decode_debug");
  });
});

describe("oscilloscopeTypes", () => {
  it("returns 5 types", () => {
    expect(oscilloscopeTypes()).toHaveLength(5);
  });
});
