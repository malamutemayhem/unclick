import { describe, it, expect } from "vitest";
import {
  frequencyHz, amplitudeMicroV, consciousnessLevel,
  relaxationScore, focusScore, duringDeepSleep,
  meditationRelated, associatedState, eegLocation, brainWaveTypes,
} from "../brain-wave-calc.js";

describe("frequencyHz", () => {
  it("gamma has highest frequency", () => {
    expect(frequencyHz("gamma")).toBeGreaterThan(
      frequencyHz("delta")
    );
  });
});

describe("amplitudeMicroV", () => {
  it("delta has highest amplitude", () => {
    expect(amplitudeMicroV("delta")).toBeGreaterThan(
      amplitudeMicroV("gamma")
    );
  });
});

describe("consciousnessLevel", () => {
  it("gamma most conscious", () => {
    expect(consciousnessLevel("gamma")).toBeGreaterThan(
      consciousnessLevel("delta")
    );
  });
});

describe("relaxationScore", () => {
  it("delta most relaxed", () => {
    expect(relaxationScore("delta")).toBeGreaterThan(
      relaxationScore("beta")
    );
  });
});

describe("focusScore", () => {
  it("gamma most focused", () => {
    expect(focusScore("gamma")).toBeGreaterThan(
      focusScore("delta")
    );
  });
});

describe("duringDeepSleep", () => {
  it("delta during deep sleep", () => {
    expect(duringDeepSleep("delta")).toBe(true);
  });
  it("beta is not", () => {
    expect(duringDeepSleep("beta")).toBe(false);
  });
});

describe("meditationRelated", () => {
  it("alpha is meditation related", () => {
    expect(meditationRelated("alpha")).toBe(true);
  });
  it("gamma is not", () => {
    expect(meditationRelated("gamma")).toBe(false);
  });
});

describe("associatedState", () => {
  it("gamma is peak focus", () => {
    expect(associatedState("gamma")).toBe("peak_focus");
  });
});

describe("eegLocation", () => {
  it("alpha detected in occipital", () => {
    expect(eegLocation("alpha")).toBe("occipital");
  });
});

describe("brainWaveTypes", () => {
  it("returns 5 types", () => {
    expect(brainWaveTypes()).toHaveLength(5);
  });
});
