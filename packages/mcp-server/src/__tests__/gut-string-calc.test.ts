import { describe, it, expect } from "vitest";
import {
  tensileStrengthMpa, diameterMm, brightnessRating,
  warmthRating, humiditySensitivity, stretchPercent,
  processingDays, bestForInstrument, costPerMeter, gutStringAnimals,
} from "../gut-string-calc.js";

describe("tensileStrengthMpa", () => {
  it("cat gut is strongest", () => {
    expect(tensileStrengthMpa("cat")).toBeGreaterThan(
      tensileStrengthMpa("hog")
    );
  });
});

describe("diameterMm", () => {
  it("cattle is thickest", () => {
    expect(diameterMm("cattle")).toBeGreaterThan(
      diameterMm("cat")
    );
  });
});

describe("brightnessRating", () => {
  it("cat is brightest", () => {
    expect(brightnessRating("cat")).toBeGreaterThan(
      brightnessRating("hog")
    );
  });
});

describe("warmthRating", () => {
  it("hog is warmest", () => {
    expect(warmthRating("hog")).toBeGreaterThan(
      warmthRating("cat")
    );
  });
});

describe("humiditySensitivity", () => {
  it("cat is most humidity sensitive", () => {
    expect(humiditySensitivity("cat")).toBeGreaterThan(
      humiditySensitivity("hog")
    );
  });
});

describe("stretchPercent", () => {
  it("cat stretches most", () => {
    expect(stretchPercent("cat")).toBeGreaterThan(
      stretchPercent("hog")
    );
  });
});

describe("processingDays", () => {
  it("cattle takes longest", () => {
    expect(processingDays("cattle")).toBeGreaterThan(
      processingDays("cat")
    );
  });
});

describe("bestForInstrument", () => {
  it("sheep is best for violin", () => {
    expect(bestForInstrument("sheep")).toBe("violin");
  });
});

describe("costPerMeter", () => {
  it("cat is most expensive", () => {
    expect(costPerMeter("cat")).toBeGreaterThan(
      costPerMeter("hog")
    );
  });
});

describe("gutStringAnimals", () => {
  it("returns 5 animals", () => {
    expect(gutStringAnimals()).toHaveLength(5);
  });
});
