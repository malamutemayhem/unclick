import { describe, it, expect } from "vitest";
import {
  resolution, speed, linearity, glitchEnergy,
  dacCost, monotonic, forAudio, architecture,
  bestUse, dacConverters,
} from "../dac-converter-calc.js";

describe("resolution", () => {
  it("sigma delta dac best resolution", () => {
    expect(resolution("sigma_delta_dac")).toBeGreaterThan(resolution("pwm_filtered"));
  });
});

describe("speed", () => {
  it("current steering fastest speed", () => {
    expect(speed("current_steering")).toBeGreaterThan(speed("pwm_filtered"));
  });
});

describe("linearity", () => {
  it("sigma delta dac best linearity", () => {
    expect(linearity("sigma_delta_dac")).toBeGreaterThan(linearity("pwm_filtered"));
  });
});

describe("glitchEnergy", () => {
  it("sigma delta dac lowest glitch energy", () => {
    expect(glitchEnergy("sigma_delta_dac")).toBeGreaterThan(glitchEnergy("current_steering"));
  });
});

describe("dacCost", () => {
  it("current steering most expensive", () => {
    expect(dacCost("current_steering")).toBeGreaterThan(dacCost("pwm_filtered"));
  });
});

describe("monotonic", () => {
  it("resistor string is monotonic", () => {
    expect(monotonic("resistor_string")).toBe(true);
  });
  it("r2r ladder not monotonic", () => {
    expect(monotonic("r2r_ladder")).toBe(false);
  });
});

describe("forAudio", () => {
  it("sigma delta dac is for audio", () => {
    expect(forAudio("sigma_delta_dac")).toBe(true);
  });
  it("r2r ladder not for audio", () => {
    expect(forAudio("r2r_ladder")).toBe(false);
  });
});

describe("architecture", () => {
  it("current steering uses binary current switch", () => {
    expect(architecture("current_steering")).toBe("binary_current_switch");
  });
});

describe("bestUse", () => {
  it("sigma delta dac best for audio precision output", () => {
    expect(bestUse("sigma_delta_dac")).toBe("audio_precision_output");
  });
});

describe("dacConverters", () => {
  it("returns 5 types", () => {
    expect(dacConverters()).toHaveLength(5);
  });
});
