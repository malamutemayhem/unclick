import { describe, it, expect } from "vitest";
import {
  noteCount, consonance, tension,
  usageFrequency, voiceLeadingPull, containsTritone,
  symmetricalStructure, emotionalCharacter, intervalStructure, chordQualities,
} from "../chord-quality-calc.js";

describe("noteCount", () => {
  it("dominant_7th has 4 notes", () => {
    expect(noteCount("dominant_7th")).toBe(4);
  });
  it("major_triad has 3 notes", () => {
    expect(noteCount("major_triad")).toBe(3);
  });
});

describe("consonance", () => {
  it("major_triad most consonant", () => {
    expect(consonance("major_triad")).toBeGreaterThan(
      consonance("diminished")
    );
  });
});

describe("tension", () => {
  it("diminished most tense", () => {
    expect(tension("diminished")).toBeGreaterThan(
      tension("major_triad")
    );
  });
});

describe("usageFrequency", () => {
  it("major_triad most used", () => {
    expect(usageFrequency("major_triad")).toBeGreaterThan(
      usageFrequency("augmented")
    );
  });
});

describe("voiceLeadingPull", () => {
  it("diminished strongest pull", () => {
    expect(voiceLeadingPull("diminished")).toBeGreaterThan(
      voiceLeadingPull("major_triad")
    );
  });
});

describe("containsTritone", () => {
  it("dominant_7th contains tritone", () => {
    expect(containsTritone("dominant_7th")).toBe(true);
  });
  it("major_triad does not", () => {
    expect(containsTritone("major_triad")).toBe(false);
  });
});

describe("symmetricalStructure", () => {
  it("augmented is symmetrical", () => {
    expect(symmetricalStructure("augmented")).toBe(true);
  });
  it("major_triad is not", () => {
    expect(symmetricalStructure("major_triad")).toBe(false);
  });
});

describe("emotionalCharacter", () => {
  it("minor_triad is sad reflective", () => {
    expect(emotionalCharacter("minor_triad")).toBe("sad_reflective");
  });
});

describe("intervalStructure", () => {
  it("major_triad is M3 m3", () => {
    expect(intervalStructure("major_triad")).toBe("M3_m3");
  });
});

describe("chordQualities", () => {
  it("returns 5 qualities", () => {
    expect(chordQualities()).toHaveLength(5);
  });
});
