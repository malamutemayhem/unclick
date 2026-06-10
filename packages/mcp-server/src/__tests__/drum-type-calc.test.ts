import { describe, it, expect } from "vitest";
import {
  diameterCm, pitchRange, volumeDb,
  attackSharpness, sustainMs, tunable,
  handPlayed, bestGenre, priceRange, drumTypes,
} from "../drum-type-calc.js";

describe("diameterCm", () => {
  it("timpani is largest", () => {
    expect(diameterCm("timpani")).toBeGreaterThan(
      diameterCm("snare")
    );
  });
});

describe("pitchRange", () => {
  it("timpani has widest pitch range", () => {
    expect(pitchRange("timpani")).toBeGreaterThan(
      pitchRange("bass")
    );
  });
});

describe("volumeDb", () => {
  it("bass is loudest", () => {
    expect(volumeDb("bass")).toBeGreaterThan(
      volumeDb("djembe")
    );
  });
});

describe("attackSharpness", () => {
  it("snare has sharpest attack", () => {
    expect(attackSharpness("snare")).toBeGreaterThan(
      attackSharpness("bass")
    );
  });
});

describe("sustainMs", () => {
  it("timpani sustains longest", () => {
    expect(sustainMs("timpani")).toBeGreaterThan(
      sustainMs("snare")
    );
  });
});

describe("tunable", () => {
  it("snare is tunable", () => {
    expect(tunable("snare")).toBe(true);
  });
  it("djembe is not", () => {
    expect(tunable("djembe")).toBe(false);
  });
});

describe("handPlayed", () => {
  it("djembe is hand played", () => {
    expect(handPlayed("djembe")).toBe(true);
  });
  it("snare is not", () => {
    expect(handPlayed("snare")).toBe(false);
  });
});

describe("bestGenre", () => {
  it("timpani for orchestral", () => {
    expect(bestGenre("timpani")).toBe("orchestral");
  });
});

describe("priceRange", () => {
  it("timpani is most expensive", () => {
    expect(priceRange("timpani")).toBeGreaterThan(
      priceRange("djembe")
    );
  });
});

describe("drumTypes", () => {
  it("returns 5 types", () => {
    expect(drumTypes()).toHaveLength(5);
  });
});
