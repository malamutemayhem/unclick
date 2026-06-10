import { describe, it, expect } from "vitest";
import {
  noteCount, moodBrightness, versatility,
  improvisationFriendly, learningDifficulty, hasBlueNote,
  symmetrical, bestGenre, intervalPattern, musicScales,
} from "../music-scale-calc.js";

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
  it("chromatic is most versatile", () => {
    expect(versatility("chromatic")).toBeGreaterThan(
      versatility("blues")
    );
  });
});

describe("improvisationFriendly", () => {
  it("pentatonic is most improv friendly", () => {
    expect(improvisationFriendly("pentatonic")).toBeGreaterThan(
      improvisationFriendly("chromatic")
    );
  });
});

describe("learningDifficulty", () => {
  it("chromatic is hardest to learn", () => {
    expect(learningDifficulty("chromatic")).toBeGreaterThan(
      learningDifficulty("pentatonic")
    );
  });
});

describe("hasBlueNote", () => {
  it("blues has blue note", () => {
    expect(hasBlueNote("blues")).toBe(true);
  });
  it("major does not", () => {
    expect(hasBlueNote("major")).toBe(false);
  });
});

describe("symmetrical", () => {
  it("chromatic is symmetrical", () => {
    expect(symmetrical("chromatic")).toBe(true);
  });
  it("major is not", () => {
    expect(symmetrical("major")).toBe(false);
  });
});

describe("bestGenre", () => {
  it("blues for blues jazz", () => {
    expect(bestGenre("blues")).toBe("blues_jazz");
  });
});

describe("intervalPattern", () => {
  it("major has WWHWWWH pattern", () => {
    expect(intervalPattern("major")).toBe("WWHWWWH");
  });
});

describe("musicScales", () => {
  it("returns 5 types", () => {
    expect(musicScales()).toHaveLength(5);
  });
});
