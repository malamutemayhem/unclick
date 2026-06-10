import { describe, it, expect } from "vitest";
import {
  stringCount, pitchRangeOctaves, volumeProjection,
  learningDifficulty, sustainSeconds, bowed,
  fretted, bestGenre, averagePriceUsd, stringInstruments,
} from "../string-instrument-calc.js";

describe("stringCount", () => {
  it("harp has most strings", () => {
    expect(stringCount("harp")).toBeGreaterThan(
      stringCount("guitar")
    );
  });
});

describe("pitchRangeOctaves", () => {
  it("harp has widest range", () => {
    expect(pitchRangeOctaves("harp")).toBeGreaterThan(
      pitchRangeOctaves("banjo")
    );
  });
});

describe("volumeProjection", () => {
  it("cello projects most", () => {
    expect(volumeProjection("cello")).toBeGreaterThan(
      volumeProjection("guitar")
    );
  });
});

describe("learningDifficulty", () => {
  it("violin is hardest to learn", () => {
    expect(learningDifficulty("violin")).toBeGreaterThan(
      learningDifficulty("guitar")
    );
  });
});

describe("sustainSeconds", () => {
  it("violin sustains longest", () => {
    expect(sustainSeconds("violin")).toBeGreaterThan(
      sustainSeconds("banjo")
    );
  });
});

describe("bowed", () => {
  it("violin is bowed", () => {
    expect(bowed("violin")).toBe(true);
  });
  it("guitar is not", () => {
    expect(bowed("guitar")).toBe(false);
  });
});

describe("fretted", () => {
  it("guitar is fretted", () => {
    expect(fretted("guitar")).toBe(true);
  });
  it("harp is not", () => {
    expect(fretted("harp")).toBe(false);
  });
});

describe("bestGenre", () => {
  it("banjo for bluegrass", () => {
    expect(bestGenre("banjo")).toBe("bluegrass");
  });
});

describe("averagePriceUsd", () => {
  it("harp is most expensive", () => {
    expect(averagePriceUsd("harp")).toBeGreaterThan(
      averagePriceUsd("guitar")
    );
  });
});

describe("stringInstruments", () => {
  it("returns 5 types", () => {
    expect(stringInstruments()).toHaveLength(5);
  });
});
