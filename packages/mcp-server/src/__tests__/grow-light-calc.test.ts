import { describe, it, expect } from "vitest";
import {
  parOutput, energyEfficiency, heatGeneration, lifespanHours,
  purchasePrice, spectrumTunable, requiresBallast, spectrumProfile,
  bestGrowPhase, growLights,
} from "../grow-light-calc.js";

describe("parOutput", () => {
  it("led full spectrum highest par", () => {
    expect(parOutput("led_full_spectrum")).toBeGreaterThan(parOutput("fluorescent_t5"));
  });
});

describe("energyEfficiency", () => {
  it("led full spectrum most efficient", () => {
    expect(energyEfficiency("led_full_spectrum")).toBeGreaterThan(energyEfficiency("hps"));
  });
});

describe("heatGeneration", () => {
  it("hps most heat", () => {
    expect(heatGeneration("hps")).toBeGreaterThan(heatGeneration("led_full_spectrum"));
  });
});

describe("lifespanHours", () => {
  it("led full spectrum longest lifespan", () => {
    expect(lifespanHours("led_full_spectrum")).toBeGreaterThan(lifespanHours("hps"));
  });
});

describe("purchasePrice", () => {
  it("plasma most expensive", () => {
    expect(purchasePrice("plasma")).toBeGreaterThan(purchasePrice("fluorescent_t5"));
  });
});

describe("spectrumTunable", () => {
  it("led full spectrum is tunable", () => {
    expect(spectrumTunable("led_full_spectrum")).toBe(true);
  });
  it("hps is not", () => {
    expect(spectrumTunable("hps")).toBe(false);
  });
});

describe("requiresBallast", () => {
  it("hps requires ballast", () => {
    expect(requiresBallast("hps")).toBe(true);
  });
  it("led full spectrum does not", () => {
    expect(requiresBallast("led_full_spectrum")).toBe(false);
  });
});

describe("spectrumProfile", () => {
  it("hps is red orange 2100k", () => {
    expect(spectrumProfile("hps")).toBe("red_orange_2100k");
  });
});

describe("bestGrowPhase", () => {
  it("led for all stages commercial", () => {
    expect(bestGrowPhase("led_full_spectrum")).toBe("all_stages_commercial");
  });
});

describe("growLights", () => {
  it("returns 5 lights", () => {
    expect(growLights()).toHaveLength(5);
  });
});
