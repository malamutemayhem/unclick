import { describe, it, expect } from "vitest";
import {
  weightKg, faceHardnessHrc, reboundPercent,
  hornCount, hardyHole, portability,
  bestProject, noiseLevel, costEstimate, anvilTypes,
} from "../anvil-type-calc.js";

describe("weightKg", () => {
  it("london pattern is heaviest", () => {
    expect(weightKg("london_pattern")).toBeGreaterThan(
      weightKg("jeweler")
    );
  });
});

describe("faceHardnessHrc", () => {
  it("jeweler anvil is hardest", () => {
    expect(faceHardnessHrc("jeweler")).toBeGreaterThan(
      faceHardnessHrc("stake")
    );
  });
});

describe("reboundPercent", () => {
  it("london pattern has best rebound", () => {
    expect(reboundPercent("london_pattern")).toBeGreaterThan(
      reboundPercent("stake")
    );
  });
});

describe("hornCount", () => {
  it("double horn has 2 horns", () => {
    expect(hornCount("double_horn")).toBe(2);
  });
});

describe("hardyHole", () => {
  it("london pattern has hardy hole", () => {
    expect(hardyHole("london_pattern")).toBe(true);
  });
  it("jeweler has no hardy hole", () => {
    expect(hardyHole("jeweler")).toBe(false);
  });
});

describe("portability", () => {
  it("jeweler is most portable", () => {
    expect(portability("jeweler")).toBeGreaterThan(
      portability("london_pattern")
    );
  });
});

describe("bestProject", () => {
  it("farrier best for horseshoes", () => {
    expect(bestProject("farrier")).toBe("horseshoes");
  });
});

describe("noiseLevel", () => {
  it("london pattern is loudest", () => {
    expect(noiseLevel("london_pattern")).toBeGreaterThan(
      noiseLevel("jeweler")
    );
  });
});

describe("costEstimate", () => {
  it("london pattern costs most", () => {
    expect(costEstimate("london_pattern")).toBeGreaterThan(
      costEstimate("jeweler")
    );
  });
});

describe("anvilTypes", () => {
  it("returns 5 types", () => {
    expect(anvilTypes()).toHaveLength(5);
  });
});
