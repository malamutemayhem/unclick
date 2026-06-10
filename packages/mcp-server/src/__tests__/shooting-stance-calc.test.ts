import { describe, it, expect } from "vitest";
import {
  stability, consistency, stringClearance, comfortLevel,
  learningEase, beginnerRecommended, usedInCompetition,
  bodyAlignment, bestFor, shootingStances,
} from "../shooting-stance-calc.js";

describe("stability", () => {
  it("natural most stable", () => {
    expect(stability("natural")).toBeGreaterThan(stability("oblique"));
  });
});

describe("consistency", () => {
  it("square most consistent", () => {
    expect(consistency("square")).toBeGreaterThan(consistency("oblique"));
  });
});

describe("stringClearance", () => {
  it("open best string clearance", () => {
    expect(stringClearance("open")).toBeGreaterThan(stringClearance("closed"));
  });
});

describe("comfortLevel", () => {
  it("natural most comfortable", () => {
    expect(comfortLevel("natural")).toBeGreaterThan(comfortLevel("closed"));
  });
});

describe("learningEase", () => {
  it("square easiest to learn", () => {
    expect(learningEase("square")).toBeGreaterThan(learningEase("oblique"));
  });
});

describe("beginnerRecommended", () => {
  it("square recommended for beginners", () => {
    expect(beginnerRecommended("square")).toBe(true);
  });
  it("oblique not recommended", () => {
    expect(beginnerRecommended("oblique")).toBe(false);
  });
});

describe("usedInCompetition", () => {
  it("all stances used in competition", () => {
    for (const s of shootingStances()) {
      expect(usedInCompetition(s)).toBe(true);
    }
  });
});

describe("bodyAlignment", () => {
  it("square is perpendicular to target", () => {
    expect(bodyAlignment("square")).toBe("perpendicular_to_target");
  });
});

describe("bestFor", () => {
  it("open best for string clearance", () => {
    expect(bestFor("open")).toBe("string_clearance");
  });
});

describe("shootingStances", () => {
  it("returns 5 stances", () => {
    expect(shootingStances()).toHaveLength(5);
  });
});
