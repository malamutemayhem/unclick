import { describe, it, expect } from "vitest";
import {
  pitchRange, dynamicRange, portabilityScore,
  learningCurve, orchestraCount, requiresBreath,
  sustainedTone, exampleInstrument, soundProduction, instrumentFamilies,
} from "../instrument-family-calc.js";

describe("pitchRange", () => {
  it("keyboard has widest range", () => {
    expect(pitchRange("keyboard")).toBeGreaterThan(
      pitchRange("percussion")
    );
  });
});

describe("dynamicRange", () => {
  it("percussion has most dynamic range", () => {
    expect(dynamicRange("percussion")).toBeGreaterThan(
      dynamicRange("woodwind")
    );
  });
});

describe("portabilityScore", () => {
  it("woodwind most portable", () => {
    expect(portabilityScore("woodwind")).toBeGreaterThan(
      portabilityScore("keyboard")
    );
  });
});

describe("learningCurve", () => {
  it("string hardest to learn", () => {
    expect(learningCurve("string")).toBeGreaterThan(
      learningCurve("percussion")
    );
  });
});

describe("orchestraCount", () => {
  it("strings most numerous in orchestra", () => {
    expect(orchestraCount("string")).toBeGreaterThan(
      orchestraCount("percussion")
    );
  });
});

describe("requiresBreath", () => {
  it("brass requires breath", () => {
    expect(requiresBreath("brass")).toBe(true);
  });
  it("string does not", () => {
    expect(requiresBreath("string")).toBe(false);
  });
});

describe("sustainedTone", () => {
  it("woodwind sustains tone", () => {
    expect(sustainedTone("woodwind")).toBe(true);
  });
  it("percussion does not", () => {
    expect(sustainedTone("percussion")).toBe(false);
  });
});

describe("exampleInstrument", () => {
  it("string example is violin", () => {
    expect(exampleInstrument("string")).toBe("violin");
  });
});

describe("soundProduction", () => {
  it("brass uses lip buzz", () => {
    expect(soundProduction("brass")).toBe("lip_buzz");
  });
});

describe("instrumentFamilies", () => {
  it("returns 5 families", () => {
    expect(instrumentFamilies()).toHaveLength(5);
  });
});
