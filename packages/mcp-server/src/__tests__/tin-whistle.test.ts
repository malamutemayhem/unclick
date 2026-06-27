import { describe, it, expect } from "vitest";
import {
  tubeLength, boreDiameter, holeCount, holeSpacing, holeDiameter,
  fippleGap, windowLength, fundamentalFreq, octaveRange,
  breathPressure, crossFingering, materialBrightness, whistleKeys,
} from "../tin-whistle.js";

describe("tubeLength", () => {
  it("D shorter than C", () => {
    expect(tubeLength("D")).toBeLessThan(tubeLength("C"));
  });
});

describe("boreDiameter", () => {
  it("C widest", () => {
    expect(boreDiameter("C")).toBeGreaterThan(boreDiameter("Bb"));
  });
});

describe("holeCount", () => {
  it("always 6", () => {
    expect(holeCount()).toBe(6);
  });
});

describe("holeSpacing", () => {
  it("positive spacing", () => {
    expect(holeSpacing(330)).toBeGreaterThan(0);
  });
});

describe("holeDiameter", () => {
  it("increases with index", () => {
    expect(holeDiameter(12, 5)).toBeGreaterThan(holeDiameter(12, 0));
  });
});

describe("fippleGap", () => {
  it("small fraction of bore", () => {
    expect(fippleGap(12)).toBeLessThan(1);
  });
});

describe("windowLength", () => {
  it("80% of bore", () => {
    expect(windowLength(12)).toBeCloseTo(9.6, 1);
  });
});

describe("fundamentalFreq", () => {
  it("D = 587 Hz", () => {
    expect(fundamentalFreq("D")).toBe(587);
  });
});

describe("octaveRange", () => {
  it("is 2", () => {
    expect(octaveRange()).toBe(2);
  });
});

describe("breathPressure", () => {
  it("octave 1 = gentle", () => {
    expect(breathPressure(1)).toBe("gentle");
  });
  it("octave 2 = firm", () => {
    expect(breathPressure(2)).toBe("firm");
  });
});

describe("crossFingering", () => {
  it("F# needs cross", () => {
    expect(crossFingering("F#")).toBe(true);
  });
  it("D does not", () => {
    expect(crossFingering("D")).toBe(false);
  });
});

describe("materialBrightness", () => {
  it("nickel brightest", () => {
    expect(materialBrightness("nickel")).toBeGreaterThan(materialBrightness("polymer"));
  });
});

describe("whistleKeys", () => {
  it("returns 6 keys", () => {
    expect(whistleKeys()).toHaveLength(6);
  });
});
