import { describe, it, expect } from "vitest";
import {
  thicknessMm, bracingPattern, resonantFrequencyHz, projectionRating,
  responsiveness, carveRequired, grainLinesPerCm, breakInPeriodMonths,
  costEstimate, soundboardShapes,
} from "../soundboard-calc.js";

describe("thicknessMm", () => {
  it("piano soundboard is thickest", () => {
    expect(thicknessMm("piano_flat")).toBeGreaterThan(
      thicknessMm("oud_bent")
    );
  });
});

describe("bracingPattern", () => {
  it("guitar uses x brace", () => {
    expect(bracingPattern("guitar_flat")).toBe("x_brace");
  });
});

describe("resonantFrequencyHz", () => {
  it("violin has highest resonant frequency", () => {
    expect(resonantFrequencyHz("violin_arched")).toBeGreaterThan(
      resonantFrequencyHz("piano_flat")
    );
  });
});

describe("projectionRating", () => {
  it("piano projects most", () => {
    expect(projectionRating("piano_flat")).toBeGreaterThan(
      projectionRating("dulcimer_flat")
    );
  });
});

describe("responsiveness", () => {
  it("violin is most responsive", () => {
    expect(responsiveness("violin_arched")).toBeGreaterThan(
      responsiveness("piano_flat")
    );
  });
});

describe("carveRequired", () => {
  it("violin requires carving", () => {
    expect(carveRequired("violin_arched")).toBe(true);
  });
  it("guitar does not require carving", () => {
    expect(carveRequired("guitar_flat")).toBe(false);
  });
});

describe("grainLinesPerCm", () => {
  it("violin needs finest grain", () => {
    expect(grainLinesPerCm("violin_arched")).toBeGreaterThan(
      grainLinesPerCm("piano_flat")
    );
  });
});

describe("breakInPeriodMonths", () => {
  it("violin needs longest break in", () => {
    expect(breakInPeriodMonths("violin_arched")).toBeGreaterThan(
      breakInPeriodMonths("dulcimer_flat")
    );
  });
});

describe("costEstimate", () => {
  it("piano soundboard is most expensive", () => {
    expect(costEstimate("piano_flat")).toBeGreaterThan(
      costEstimate("dulcimer_flat")
    );
  });
});

describe("soundboardShapes", () => {
  it("returns 5 shapes", () => {
    expect(soundboardShapes()).toHaveLength(5);
  });
});
