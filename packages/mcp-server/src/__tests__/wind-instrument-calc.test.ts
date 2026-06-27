import { describe, it, expect } from "vitest";
import {
  pitchRangeOctaves, airPressureRequired, volumeProjection,
  learningDifficulty, reedCount, brass,
  transposing, bestGenre, averagePriceUsd, windInstruments,
} from "../wind-instrument-calc.js";

describe("pitchRangeOctaves", () => {
  it("clarinet has widest range", () => {
    expect(pitchRangeOctaves("clarinet")).toBeGreaterThan(
      pitchRangeOctaves("flute")
    );
  });
});

describe("airPressureRequired", () => {
  it("oboe needs most air pressure", () => {
    expect(airPressureRequired("oboe")).toBeGreaterThan(
      airPressureRequired("flute")
    );
  });
});

describe("volumeProjection", () => {
  it("tuba projects most", () => {
    expect(volumeProjection("tuba")).toBeGreaterThan(
      volumeProjection("flute")
    );
  });
});

describe("learningDifficulty", () => {
  it("oboe is hardest", () => {
    expect(learningDifficulty("oboe")).toBeGreaterThan(
      learningDifficulty("clarinet")
    );
  });
});

describe("reedCount", () => {
  it("oboe is double reed", () => {
    expect(reedCount("oboe")).toBe(2);
  });
  it("flute has no reed", () => {
    expect(reedCount("flute")).toBe(0);
  });
});

describe("brass", () => {
  it("trumpet is brass", () => {
    expect(brass("trumpet")).toBe(true);
  });
  it("clarinet is not", () => {
    expect(brass("clarinet")).toBe(false);
  });
});

describe("transposing", () => {
  it("clarinet is transposing", () => {
    expect(transposing("clarinet")).toBe(true);
  });
  it("oboe is not", () => {
    expect(transposing("oboe")).toBe(false);
  });
});

describe("bestGenre", () => {
  it("clarinet for jazz", () => {
    expect(bestGenre("clarinet")).toBe("jazz");
  });
});

describe("averagePriceUsd", () => {
  it("tuba is most expensive", () => {
    expect(averagePriceUsd("tuba")).toBeGreaterThan(
      averagePriceUsd("clarinet")
    );
  });
});

describe("windInstruments", () => {
  it("returns 5 types", () => {
    expect(windInstruments()).toHaveLength(5);
  });
});
