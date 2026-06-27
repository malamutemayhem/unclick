import { describe, it, expect } from "vitest";
import {
  audioFidelity, powerEfficiency, heatGeneration, outputPower,
  costLevel, solidState, portableSuitable, bestApplication,
  distortionCharacter, amplifierClasses,
} from "../amplifier-class-calc.js";

describe("audioFidelity", () => {
  it("class a highest fidelity", () => {
    expect(audioFidelity("class_a")).toBeGreaterThan(audioFidelity("class_d"));
  });
});

describe("powerEfficiency", () => {
  it("class d most efficient", () => {
    expect(powerEfficiency("class_d")).toBeGreaterThan(powerEfficiency("class_a"));
  });
});

describe("heatGeneration", () => {
  it("class a generates most heat", () => {
    expect(heatGeneration("class_a")).toBeGreaterThan(heatGeneration("class_d"));
  });
});

describe("outputPower", () => {
  it("class h highest output", () => {
    expect(outputPower("class_h")).toBeGreaterThan(outputPower("class_a"));
  });
});

describe("costLevel", () => {
  it("tube most expensive", () => {
    expect(costLevel("tube")).toBeGreaterThan(costLevel("class_d"));
  });
});

describe("solidState", () => {
  it("class d is solid state", () => {
    expect(solidState("class_d")).toBe(true);
  });
  it("tube is not", () => {
    expect(solidState("tube")).toBe(false);
  });
});

describe("portableSuitable", () => {
  it("class d is portable suitable", () => {
    expect(portableSuitable("class_d")).toBe(true);
  });
  it("class a is not", () => {
    expect(portableSuitable("class_a")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("tube for guitar vintage hifi", () => {
    expect(bestApplication("tube")).toBe("guitar_vintage_hifi");
  });
});

describe("distortionCharacter", () => {
  it("tube has warm even harmonic", () => {
    expect(distortionCharacter("tube")).toBe("warm_even_harmonic");
  });
});

describe("amplifierClasses", () => {
  it("returns 5 classes", () => {
    expect(amplifierClasses()).toHaveLength(5);
  });
});
