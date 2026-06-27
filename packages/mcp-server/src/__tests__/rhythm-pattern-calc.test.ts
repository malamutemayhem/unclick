import { describe, it, expect } from "vitest";
import {
  predictability, danceDifficulty, grooveFeel,
  expressiveness, metronomeDependence, strictTempo,
  accentOnBeat, bestGenre, notationComplexity, rhythmPatterns,
} from "../rhythm-pattern-calc.js";

describe("predictability", () => {
  it("straight most predictable", () => {
    expect(predictability("straight")).toBeGreaterThan(
      predictability("rubato")
    );
  });
});

describe("danceDifficulty", () => {
  it("polyrhythm hardest to dance to", () => {
    expect(danceDifficulty("polyrhythm")).toBeGreaterThan(
      danceDifficulty("straight")
    );
  });
});

describe("grooveFeel", () => {
  it("swing best groove feel", () => {
    expect(grooveFeel("swing")).toBeGreaterThan(
      grooveFeel("rubato")
    );
  });
});

describe("expressiveness", () => {
  it("rubato most expressive", () => {
    expect(expressiveness("rubato")).toBeGreaterThan(
      expressiveness("straight")
    );
  });
});

describe("metronomeDependence", () => {
  it("straight most metronome dependent", () => {
    expect(metronomeDependence("straight")).toBeGreaterThan(
      metronomeDependence("rubato")
    );
  });
});

describe("strictTempo", () => {
  it("swing has strict tempo", () => {
    expect(strictTempo("swing")).toBe(true);
  });
  it("rubato does not", () => {
    expect(strictTempo("rubato")).toBe(false);
  });
});

describe("accentOnBeat", () => {
  it("straight accents on beat", () => {
    expect(accentOnBeat("straight")).toBe(true);
  });
  it("syncopated does not", () => {
    expect(accentOnBeat("syncopated")).toBe(false);
  });
});

describe("bestGenre", () => {
  it("swing for jazz blues", () => {
    expect(bestGenre("swing")).toBe("jazz_blues");
  });
});

describe("notationComplexity", () => {
  it("polyrhythm uses multiple meters", () => {
    expect(notationComplexity("polyrhythm")).toBe("multiple_meters");
  });
});

describe("rhythmPatterns", () => {
  it("returns 5 patterns", () => {
    expect(rhythmPatterns()).toHaveLength(5);
  });
});
