import { describe, it, expect } from "vitest";
import {
  noteCount, emotionalBrightness, versatility,
  beginnerFriendly, tensionLevel, containsBlueNote,
  symmetrical, commonGenre, intervalPattern, scaleTypes,
} from "../scale-type-calc.js";

describe("noteCount", () => {
  it("chromatic has most notes", () => {
    expect(noteCount("chromatic")).toBeGreaterThan(
      noteCount("pentatonic")
    );
  });
});

describe("emotionalBrightness", () => {
  it("major brightest", () => {
    expect(emotionalBrightness("major")).toBeGreaterThan(
      emotionalBrightness("minor_natural")
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

describe("beginnerFriendly", () => {
  it("pentatonic most beginner friendly", () => {
    expect(beginnerFriendly("pentatonic")).toBeGreaterThan(
      beginnerFriendly("chromatic")
    );
  });
});

describe("tensionLevel", () => {
  it("chromatic most tension", () => {
    expect(tensionLevel("chromatic")).toBeGreaterThan(
      tensionLevel("pentatonic")
    );
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

describe("symmetrical", () => {
  it("chromatic is symmetrical", () => {
    expect(symmetrical("chromatic")).toBe(true);
  });
  it("major is not", () => {
    expect(symmetrical("major")).toBe(false);
  });
});

describe("commonGenre", () => {
  it("blues for blues and jazz", () => {
    expect(commonGenre("blues")).toBe("blues_jazz");
  });
});

describe("intervalPattern", () => {
  it("major follows W W H W W W H", () => {
    expect(intervalPattern("major")).toBe("W_W_H_W_W_W_H");
  });
});

describe("scaleTypes", () => {
  it("returns 5 types", () => {
    expect(scaleTypes()).toHaveLength(5);
  });
});
