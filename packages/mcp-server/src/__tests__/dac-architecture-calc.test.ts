import { describe, it, expect } from "vitest";
import {
  resolution, speed, glitch, linearity,
  dacCost, monotonic, forAudio, technique,
  bestUse, dacArchitectures,
} from "../dac-architecture-calc.js";

describe("resolution", () => {
  it("sigma delta 1bit highest resolution", () => {
    expect(resolution("sigma_delta_1bit")).toBeGreaterThan(resolution("binary_weighted_r2r"));
  });
});

describe("speed", () => {
  it("current steering fastest", () => {
    expect(speed("current_steering")).toBeGreaterThan(speed("sigma_delta_1bit"));
  });
});

describe("glitch", () => {
  it("sigma delta 1bit lowest glitch", () => {
    expect(glitch("sigma_delta_1bit")).toBeGreaterThan(glitch("binary_weighted_r2r"));
  });
});

describe("linearity", () => {
  it("sigma delta 1bit best linearity", () => {
    expect(linearity("sigma_delta_1bit")).toBeGreaterThan(linearity("binary_weighted_r2r"));
  });
});

describe("dacCost", () => {
  it("current steering most expensive", () => {
    expect(dacCost("current_steering")).toBeGreaterThan(dacCost("pwm_filtered"));
  });
});

describe("monotonic", () => {
  it("segmented thermometer is monotonic", () => {
    expect(monotonic("segmented_thermometer")).toBe(true);
  });
  it("binary weighted r2r not monotonic", () => {
    expect(monotonic("binary_weighted_r2r")).toBe(false);
  });
});

describe("forAudio", () => {
  it("sigma delta 1bit is for audio", () => {
    expect(forAudio("sigma_delta_1bit")).toBe(true);
  });
  it("current steering not for audio", () => {
    expect(forAudio("current_steering")).toBe(false);
  });
});

describe("technique", () => {
  it("current steering uses switched current cell", () => {
    expect(technique("current_steering")).toBe("switched_current_cell");
  });
});

describe("bestUse", () => {
  it("sigma delta 1bit best for hi fi audio output", () => {
    expect(bestUse("sigma_delta_1bit")).toBe("hi_fi_audio_output");
  });
});

describe("dacArchitectures", () => {
  it("returns 5 types", () => {
    expect(dacArchitectures()).toHaveLength(5);
  });
});
