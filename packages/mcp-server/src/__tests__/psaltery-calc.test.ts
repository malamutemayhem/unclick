import { describe, it, expect } from "vitest";
import {
  stringCount, stringLength, bridgeAngle, soundboardThicknessMm,
  tuningPinCount, hitchPinCount, soundholeDiameterCm,
  plectrumSize, resonanceFrequency, psalteryShapes,
} from "../psaltery-calc.js";

describe("stringCount", () => {
  it("octave = 13 strings", () => {
    expect(stringCount(261, 523)).toBe(13);
  });
  it("invalid range = 0", () => {
    expect(stringCount(500, 200)).toBe(0);
  });
});

describe("stringLength", () => {
  it("positive cm", () => {
    expect(stringLength(440, 50, 0.001)).toBeGreaterThan(0);
  });
  it("zero freq = 0", () => {
    expect(stringLength(0, 50, 0.001)).toBe(0);
  });
});

describe("bridgeAngle", () => {
  it("positive angle", () => {
    expect(bridgeAngle(10, 40, 30)).toBeGreaterThan(0);
  });
  it("zero width = 0", () => {
    expect(bridgeAngle(10, 40, 0)).toBe(0);
  });
});

describe("soundboardThicknessMm", () => {
  it("positive mm", () => {
    expect(soundboardThicknessMm(1000)).toBeGreaterThan(2);
  });
});

describe("tuningPinCount", () => {
  it("double the strings", () => {
    expect(tuningPinCount(13)).toBe(26);
  });
});

describe("hitchPinCount", () => {
  it("equals strings", () => {
    expect(hitchPinCount(13)).toBe(13);
  });
});

describe("soundholeDiameterCm", () => {
  it("positive cm", () => {
    expect(soundholeDiameterCm(1000)).toBeGreaterThan(0);
  });
});

describe("plectrumSize", () => {
  it("60% of spacing", () => {
    expect(plectrumSize(10)).toBe(6);
  });
});

describe("resonanceFrequency", () => {
  it("positive Hz", () => {
    expect(resonanceFrequency(40, 3)).toBeGreaterThan(0);
  });
  it("zero length = 0", () => {
    expect(resonanceFrequency(0, 3)).toBe(0);
  });
});

describe("psalteryShapes", () => {
  it("returns 5 shapes", () => {
    expect(psalteryShapes()).toHaveLength(5);
  });
});
