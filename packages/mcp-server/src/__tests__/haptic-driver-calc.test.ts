import { describe, it, expect } from "vitest";
import {
  responseTime, bandwidth, force, powerDraw,
  hapticCost, waveformControl, forPhone, actuator,
  bestUse, hapticDrivers,
} from "../haptic-driver-calc.js";

describe("responseTime", () => {
  it("piezo ceramic fastest response", () => {
    expect(responseTime("piezo_ceramic")).toBeGreaterThan(responseTime("erm_eccentric_mass"));
  });
});

describe("bandwidth", () => {
  it("piezo ceramic widest bandwidth", () => {
    expect(bandwidth("piezo_ceramic")).toBeGreaterThan(bandwidth("erm_eccentric_mass"));
  });
});

describe("force", () => {
  it("voice coil hd highest force", () => {
    expect(force("voice_coil_hd")).toBeGreaterThan(force("electroactive_polymer"));
  });
});

describe("powerDraw", () => {
  it("piezo ceramic lowest power draw", () => {
    expect(powerDraw("piezo_ceramic")).toBeGreaterThan(powerDraw("voice_coil_hd"));
  });
});

describe("hapticCost", () => {
  it("electroactive polymer most expensive", () => {
    expect(hapticCost("electroactive_polymer")).toBeGreaterThan(hapticCost("erm_eccentric_mass"));
  });
});

describe("waveformControl", () => {
  it("lra linear res has waveform control", () => {
    expect(waveformControl("lra_linear_res")).toBe(true);
  });
  it("erm eccentric mass no waveform control", () => {
    expect(waveformControl("erm_eccentric_mass")).toBe(false);
  });
});

describe("forPhone", () => {
  it("lra linear res is for phone", () => {
    expect(forPhone("lra_linear_res")).toBe(true);
  });
  it("erm eccentric mass not for phone", () => {
    expect(forPhone("erm_eccentric_mass")).toBe(false);
  });
});

describe("actuator", () => {
  it("piezo ceramic uses pzt bending disc", () => {
    expect(actuator("piezo_ceramic")).toBe("pzt_bending_disc");
  });
});

describe("bestUse", () => {
  it("lra linear res best for phone taptic engine", () => {
    expect(bestUse("lra_linear_res")).toBe("phone_taptic_engine");
  });
});

describe("hapticDrivers", () => {
  it("returns 5 types", () => {
    expect(hapticDrivers()).toHaveLength(5);
  });
});
