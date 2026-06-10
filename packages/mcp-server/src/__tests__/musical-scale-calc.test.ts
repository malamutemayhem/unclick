import { describe, it, expect } from "vitest";
import {
  noteCount, moodBrightness, versatility,
  learningDifficulty, improvisationScore, diatonic,
  containsBlueNote, commonGenre, intervalPattern, scaleTypes,
} from "../musical-scale-calc.js";

describe("noteCount", () => {
  it("chromatic has most notes", () => {
    expect(noteCount("chromatic")).toBeGreaterThan(
      noteCount("pentatonic")
    );
  });
});

describe("moodBrightness", () => {
  it("major is brightest", () => {
    expect(moodBrightness("major")).toBeGreaterThan(
      moodBrightness("minor")
    );
  });
});

describe("versatility", () => {
  it("chromatic most versatile", () => {
    expect(versatility("chromatic")).toBeGreaterThan(
      versatility("blues")
    );
  });
});

describe("learningDifficulty", () => {
  it("chromatic hardest to learn", () => {
    expect(learningDifficulty("chromatic")).toBeGreaterThan(
      learningDifficulty("pentatonic")
    );
  });
});

describe("improvisationScore", () => {
  it("pentatonic best for improv", () => {
    expect(improvisationScore("pentatonic")).toBeGreaterThan(
      improvisationScore("chromatic")
    );
  });
});

describe("diatonic", () => {
  it("major is diatonic", () => {
    expect(diatonic("major")).toBe(true);
  });
  it("blues is not", () => {
    expect(diatonic("blues")).toBe(false);
  });
});

describe("containsBlueNote", () => {
  it("blues contains blue note", () => {
    expect(containsBlueNote("blues")).toBe(true);
  });
  it("major does not", () => {
    expect(containsBlueNote("major")).toBe(false);
  });
});

describe("commonGenre", () => {
  it("pentatonic for rock", () => {
    expect(commonGenre("pentatonic")).toBe("rock");
  });
});

describe("intervalPattern", () => {
  it("major pattern is WWHWWWH", () => {
    expect(intervalPattern("major")).toBe("WWHWWWH");
  });
});

describe("scaleTypes", () => {
  it("returns 5 types", () => {
    expect(scaleTypes()).toHaveLength(5);
  });
});
