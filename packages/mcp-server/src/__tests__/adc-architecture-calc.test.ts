import { describe, it, expect } from "vitest";
import {
  speed, resolution, powerDraw, latency,
  archCost, differential, forAudio, topology,
  bestUse, adcArchitectures,
} from "../adc-architecture-calc.js";

describe("speed", () => {
  it("flash parallel fastest", () => {
    expect(speed("flash_parallel")).toBeGreaterThan(speed("sigma_delta_over"));
  });
});

describe("resolution", () => {
  it("sigma delta over highest resolution", () => {
    expect(resolution("sigma_delta_over")).toBeGreaterThan(resolution("flash_parallel"));
  });
});

describe("powerDraw", () => {
  it("flash parallel highest power draw", () => {
    expect(powerDraw("flash_parallel")).toBeGreaterThan(powerDraw("dual_slope_integ"));
  });
});

describe("latency", () => {
  it("flash parallel lowest latency", () => {
    expect(latency("flash_parallel")).toBeGreaterThan(latency("dual_slope_integ"));
  });
});

describe("archCost", () => {
  it("flash parallel most expensive", () => {
    expect(archCost("flash_parallel")).toBeGreaterThan(archCost("dual_slope_integ"));
  });
});

describe("differential", () => {
  it("sar successive is differential", () => {
    expect(differential("sar_successive")).toBe(true);
  });
  it("flash parallel not differential", () => {
    expect(differential("flash_parallel")).toBe(false);
  });
});

describe("forAudio", () => {
  it("sigma delta over is for audio", () => {
    expect(forAudio("sigma_delta_over")).toBe(true);
  });
  it("flash parallel not for audio", () => {
    expect(forAudio("flash_parallel")).toBe(false);
  });
});

describe("topology", () => {
  it("sigma delta over uses modulator decimator", () => {
    expect(topology("sigma_delta_over")).toBe("modulator_decimator");
  });
});

describe("bestUse", () => {
  it("flash parallel best for oscilloscope frontend", () => {
    expect(bestUse("flash_parallel")).toBe("oscilloscope_frontend");
  });
});

describe("adcArchitectures", () => {
  it("returns 5 types", () => {
    expect(adcArchitectures()).toHaveLength(5);
  });
});
