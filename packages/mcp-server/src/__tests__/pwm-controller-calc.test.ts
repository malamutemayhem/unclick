import { describe, it, expect } from "vitest";
import {
  transientResponse, stability, efficiency, noiseImmunity,
  controlCost, currentLimit, forMultiphase, modulation,
  bestUse, pwmControllers,
} from "../pwm-controller-calc.js";

describe("transientResponse", () => {
  it("hysteretic bang fastest transient response", () => {
    expect(transientResponse("hysteretic_bang")).toBeGreaterThan(transientResponse("voltage_mode_vm"));
  });
});

describe("stability", () => {
  it("average current acm best stability", () => {
    expect(stability("average_current_acm")).toBeGreaterThan(stability("hysteretic_bang"));
  });
});

describe("efficiency", () => {
  it("constant on time best efficiency", () => {
    expect(efficiency("constant_on_time")).toBeGreaterThan(efficiency("hysteretic_bang"));
  });
});

describe("noiseImmunity", () => {
  it("voltage mode vm best noise immunity", () => {
    expect(noiseImmunity("voltage_mode_vm")).toBeGreaterThan(noiseImmunity("hysteretic_bang"));
  });
});

describe("controlCost", () => {
  it("average current acm most expensive", () => {
    expect(controlCost("average_current_acm")).toBeGreaterThan(controlCost("voltage_mode_vm"));
  });
});

describe("currentLimit", () => {
  it("current mode peak has current limit", () => {
    expect(currentLimit("current_mode_peak")).toBe(true);
  });
  it("voltage mode vm no current limit", () => {
    expect(currentLimit("voltage_mode_vm")).toBe(false);
  });
});

describe("forMultiphase", () => {
  it("current mode peak is for multiphase", () => {
    expect(forMultiphase("current_mode_peak")).toBe(true);
  });
  it("voltage mode vm not for multiphase", () => {
    expect(forMultiphase("voltage_mode_vm")).toBe(false);
  });
});

describe("modulation", () => {
  it("hysteretic bang uses variable freq hysteresis", () => {
    expect(modulation("hysteretic_bang")).toBe("variable_freq_hysteresis");
  });
});

describe("bestUse", () => {
  it("constant on time best for high current cpu vr", () => {
    expect(bestUse("constant_on_time")).toBe("high_current_cpu_vr");
  });
});

describe("pwmControllers", () => {
  it("returns 5 types", () => {
    expect(pwmControllers()).toHaveLength(5);
  });
});
