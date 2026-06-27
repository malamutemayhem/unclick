import { describe, it, expect } from "vitest";
import {
  positionCount, actuationEase, cycleLife, sizeCompact,
  switchCost, surfaceMount, tamperResist, actuatorType,
  bestUse, dipSwitches,
} from "../dip-switch-calc.js";

describe("positionCount", () => {
  it("rotary hex encode highest position count", () => {
    expect(positionCount("rotary_hex_encode")).toBeGreaterThan(positionCount("slide_4pos_standard"));
  });
});

describe("actuationEase", () => {
  it("piano 8pos easiest actuation", () => {
    expect(actuationEase("piano_8pos_inline")).toBeGreaterThan(actuationEase("recessed_tamper_proof"));
  });
});

describe("cycleLife", () => {
  it("recessed tamper proof longest cycle life", () => {
    expect(cycleLife("recessed_tamper_proof")).toBeGreaterThan(cycleLife("slide_4pos_standard"));
  });
});

describe("sizeCompact", () => {
  it("smd half pitch most compact", () => {
    expect(sizeCompact("smd_half_pitch")).toBeGreaterThan(sizeCompact("piano_8pos_inline"));
  });
});

describe("switchCost", () => {
  it("recessed tamper proof most expensive", () => {
    expect(switchCost("recessed_tamper_proof")).toBeGreaterThan(switchCost("slide_4pos_standard"));
  });
});

describe("surfaceMount", () => {
  it("smd half pitch is surface mount", () => {
    expect(surfaceMount("smd_half_pitch")).toBe(true);
  });
  it("slide 4pos not surface mount", () => {
    expect(surfaceMount("slide_4pos_standard")).toBe(false);
  });
});

describe("tamperResist", () => {
  it("recessed tamper proof is tamper resistant", () => {
    expect(tamperResist("recessed_tamper_proof")).toBe(true);
  });
  it("rotary hex encode not tamper resistant", () => {
    expect(tamperResist("rotary_hex_encode")).toBe(false);
  });
});

describe("actuatorType", () => {
  it("rotary hex encode uses rotary dial hex", () => {
    expect(actuatorType("rotary_hex_encode")).toBe("rotary_dial_hex");
  });
});

describe("bestUse", () => {
  it("recessed tamper proof best for security setting lock", () => {
    expect(bestUse("recessed_tamper_proof")).toBe("security_setting_lock");
  });
});

describe("dipSwitches", () => {
  it("returns 5 types", () => {
    expect(dipSwitches()).toHaveLength(5);
  });
});
