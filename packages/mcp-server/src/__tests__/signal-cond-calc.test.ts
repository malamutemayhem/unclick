import { describe, it, expect } from "vitest";
import {
  accuracy, dynamicRange, noiseReject, bandwidth,
  condCost, isolated, forBridge, signalPath,
  bestUse, signalConds,
} from "../signal-cond-calc.js";

describe("accuracy", () => {
  it("wheatstone bridge best accuracy", () => {
    expect(accuracy("wheatstone_bridge")).toBeGreaterThan(accuracy("filter_active_lpf"));
  });
});

describe("dynamicRange", () => {
  it("programmable gain widest dynamic range", () => {
    expect(dynamicRange("programmable_gain")).toBeGreaterThan(dynamicRange("isolation_amplifier"));
  });
});

describe("noiseReject", () => {
  it("isolation amplifier best noise reject", () => {
    expect(noiseReject("isolation_amplifier")).toBeGreaterThan(noiseReject("charge_amplifier"));
  });
});

describe("bandwidth", () => {
  it("charge amplifier widest bandwidth", () => {
    expect(bandwidth("charge_amplifier")).toBeGreaterThan(bandwidth("filter_active_lpf"));
  });
});

describe("condCost", () => {
  it("isolation amplifier most expensive", () => {
    expect(condCost("isolation_amplifier")).toBeGreaterThan(condCost("filter_active_lpf"));
  });
});

describe("isolated", () => {
  it("isolation amplifier is isolated", () => {
    expect(isolated("isolation_amplifier")).toBe(true);
  });
  it("wheatstone bridge not isolated", () => {
    expect(isolated("wheatstone_bridge")).toBe(false);
  });
});

describe("forBridge", () => {
  it("wheatstone bridge is for bridge", () => {
    expect(forBridge("wheatstone_bridge")).toBe(true);
  });
  it("charge amplifier not for bridge", () => {
    expect(forBridge("charge_amplifier")).toBe(false);
  });
});

describe("signalPath", () => {
  it("programmable gain uses switched gain resistor", () => {
    expect(signalPath("programmable_gain")).toBe("switched_gain_resistor");
  });
});

describe("bestUse", () => {
  it("filter active lpf best for anti alias before adc", () => {
    expect(bestUse("filter_active_lpf")).toBe("anti_alias_before_adc");
  });
});

describe("signalConds", () => {
  it("returns 5 types", () => {
    expect(signalConds()).toHaveLength(5);
  });
});
