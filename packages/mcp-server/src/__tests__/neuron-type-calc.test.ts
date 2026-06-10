import { describe, it, expect } from "vitest";
import {
  firingRateHz, axonLengthCm, dendriteBranching,
  myelinationLevel, signalSpeedMs, myelinated,
  localCircuit, primaryLocation, neurotransmitterUsed, neuronTypes,
} from "../neuron-type-calc.js";

describe("firingRateHz", () => {
  it("interneurons fire fastest", () => {
    expect(firingRateHz("interneuron")).toBeGreaterThan(
      firingRateHz("pyramidal")
    );
  });
});

describe("axonLengthCm", () => {
  it("motor neurons have longest axons", () => {
    expect(axonLengthCm("motor")).toBeGreaterThan(
      axonLengthCm("interneuron")
    );
  });
});

describe("dendriteBranching", () => {
  it("purkinje has most branching", () => {
    expect(dendriteBranching("purkinje")).toBeGreaterThan(
      dendriteBranching("sensory")
    );
  });
});

describe("myelinationLevel", () => {
  it("motor neurons most myelinated", () => {
    expect(myelinationLevel("motor")).toBeGreaterThan(
      myelinationLevel("interneuron")
    );
  });
});

describe("signalSpeedMs", () => {
  it("motor neurons fastest signal", () => {
    expect(signalSpeedMs("motor")).toBeGreaterThan(
      signalSpeedMs("purkinje")
    );
  });
});

describe("myelinated", () => {
  it("motor is myelinated", () => {
    expect(myelinated("motor")).toBe(true);
  });
  it("interneuron is not", () => {
    expect(myelinated("interneuron")).toBe(false);
  });
});

describe("localCircuit", () => {
  it("interneuron is local circuit", () => {
    expect(localCircuit("interneuron")).toBe(true);
  });
  it("motor is not", () => {
    expect(localCircuit("motor")).toBe(false);
  });
});

describe("primaryLocation", () => {
  it("purkinje in cerebellum", () => {
    expect(primaryLocation("purkinje")).toBe("cerebellum");
  });
});

describe("neurotransmitterUsed", () => {
  it("motor uses acetylcholine", () => {
    expect(neurotransmitterUsed("motor")).toBe("acetylcholine");
  });
});

describe("neuronTypes", () => {
  it("returns 5 types", () => {
    expect(neuronTypes()).toHaveLength(5);
  });
});
