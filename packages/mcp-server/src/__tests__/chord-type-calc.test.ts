import { describe, it, expect } from "vitest";
import {
  noteCountInChord, tension, stabilityLevel,
  usageFrequency, colorfulness, consonant,
  symmetrical, commonGenre, intervalStructure, chordTypes,
} from "../chord-type-calc.js";

describe("noteCountInChord", () => {
  it("seventh has 4 notes", () => {
    expect(noteCountInChord("seventh")).toBe(4);
  });
  it("major has 3 notes", () => {
    expect(noteCountInChord("major")).toBe(3);
  });
});

describe("tension", () => {
  it("diminished has most tension", () => {
    expect(tension("diminished")).toBeGreaterThan(
      tension("major")
    );
  });
});

describe("stabilityLevel", () => {
  it("major is most stable", () => {
    expect(stabilityLevel("major")).toBeGreaterThan(
      stabilityLevel("augmented")
    );
  });
});

describe("usageFrequency", () => {
  it("major used most", () => {
    expect(usageFrequency("major")).toBeGreaterThan(
      usageFrequency("augmented")
    );
  });
});

describe("colorfulness", () => {
  it("augmented most colorful", () => {
    expect(colorfulness("augmented")).toBeGreaterThan(
      colorfulness("major")
    );
  });
});

describe("consonant", () => {
  it("major is consonant", () => {
    expect(consonant("major")).toBe(true);
  });
  it("diminished is not", () => {
    expect(consonant("diminished")).toBe(false);
  });
});

describe("symmetrical", () => {
  it("diminished is symmetrical", () => {
    expect(symmetrical("diminished")).toBe(true);
  });
  it("major is not", () => {
    expect(symmetrical("major")).toBe(false);
  });
});

describe("commonGenre", () => {
  it("seventh common in blues", () => {
    expect(commonGenre("seventh")).toBe("blues");
  });
});

describe("intervalStructure", () => {
  it("major is M3 P5", () => {
    expect(intervalStructure("major")).toBe("M3_P5");
  });
});

describe("chordTypes", () => {
  it("returns 5 types", () => {
    expect(chordTypes()).toHaveLength(5);
  });
});
