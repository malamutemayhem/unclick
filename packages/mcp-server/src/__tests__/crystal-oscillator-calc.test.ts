import { describe, it, expect } from "vitest";
import {
  freqStability, accuracy, startupSpeed, tempRange,
  oscCost, programmable, forPrecision, packageType,
  bestUse, crystalOscillators,
} from "../crystal-oscillator-calc.js";

describe("freqStability", () => {
  it("ocxo oven controlled most stable", () => {
    expect(freqStability("ocxo_oven_controlled")).toBeGreaterThan(freqStability("ceramic_resonator"));
  });
});

describe("accuracy", () => {
  it("ocxo oven controlled most accurate", () => {
    expect(accuracy("ocxo_oven_controlled")).toBeGreaterThan(accuracy("quartz_through_hole"));
  });
});

describe("startupSpeed", () => {
  it("mems oscillator fastest startup", () => {
    expect(startupSpeed("mems_oscillator")).toBeGreaterThan(startupSpeed("ocxo_oven_controlled"));
  });
});

describe("tempRange", () => {
  it("ocxo oven controlled widest temp range", () => {
    expect(tempRange("ocxo_oven_controlled")).toBeGreaterThan(tempRange("ceramic_resonator"));
  });
});

describe("oscCost", () => {
  it("ocxo oven controlled most expensive", () => {
    expect(oscCost("ocxo_oven_controlled")).toBeGreaterThan(oscCost("ceramic_resonator"));
  });
});

describe("programmable", () => {
  it("mems oscillator is programmable", () => {
    expect(programmable("mems_oscillator")).toBe(true);
  });
  it("quartz through hole not programmable", () => {
    expect(programmable("quartz_through_hole")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("tcxo temp compensated is for precision", () => {
    expect(forPrecision("tcxo_temp_compensated")).toBe(true);
  });
  it("ceramic resonator not for precision", () => {
    expect(forPrecision("ceramic_resonator")).toBe(false);
  });
});

describe("packageType", () => {
  it("quartz through hole uses hc49 through hole", () => {
    expect(packageType("quartz_through_hole")).toBe("hc49_through_hole");
  });
});

describe("bestUse", () => {
  it("tcxo best for gps reference clock", () => {
    expect(bestUse("tcxo_temp_compensated")).toBe("gps_reference_clock");
  });
});

describe("crystalOscillators", () => {
  it("returns 5 types", () => {
    expect(crystalOscillators()).toHaveLength(5);
  });
});
