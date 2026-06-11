import { describe, it, expect } from "vitest";
import {
  powerEff, eventRate, neuronCount, learningCapable,
  neuroCost, onlineLearning, forRobotics, substrate,
  bestUse, neuromorphicChips,
} from "../neuromorphic-chip-calc.js";

describe("powerEff", () => {
  it("memristor crossbar best power efficiency", () => {
    expect(powerEff("memristor_crossbar")).toBeGreaterThan(powerEff("photonic_neural"));
  });
});

describe("eventRate", () => {
  it("photonic neural highest event rate", () => {
    expect(eventRate("photonic_neural")).toBeGreaterThan(eventRate("spiking_mixed_signal"));
  });
});

describe("neuronCount", () => {
  it("spiking digital highest neuron count", () => {
    expect(neuronCount("spiking_digital")).toBeGreaterThan(neuronCount("photonic_neural"));
  });
});

describe("learningCapable", () => {
  it("memristor crossbar most learning capable", () => {
    expect(learningCapable("memristor_crossbar")).toBeGreaterThan(learningCapable("photonic_neural"));
  });
});

describe("neuroCost", () => {
  it("photonic neural most expensive", () => {
    expect(neuroCost("photonic_neural")).toBeGreaterThan(neuroCost("reservoir_compute"));
  });
});

describe("onlineLearning", () => {
  it("spiking digital supports online learning", () => {
    expect(onlineLearning("spiking_digital")).toBe(true);
  });
  it("photonic neural no online learning", () => {
    expect(onlineLearning("photonic_neural")).toBe(false);
  });
});

describe("forRobotics", () => {
  it("spiking mixed signal for robotics", () => {
    expect(forRobotics("spiking_mixed_signal")).toBe(true);
  });
  it("memristor crossbar not for robotics", () => {
    expect(forRobotics("memristor_crossbar")).toBe(false);
  });
});

describe("substrate", () => {
  it("photonic neural uses mzi mesh coherent", () => {
    expect(substrate("photonic_neural")).toBe("mzi_mesh_coherent");
  });
});

describe("bestUse", () => {
  it("reservoir compute best for time series anomaly", () => {
    expect(bestUse("reservoir_compute")).toBe("time_series_anomaly");
  });
});

describe("neuromorphicChips", () => {
  it("returns 5 types", () => {
    expect(neuromorphicChips()).toHaveLength(5);
  });
});
