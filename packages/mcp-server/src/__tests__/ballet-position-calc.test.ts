import { describe, it, expect } from "vitest";
import {
  difficultyLevel, turnoutRequired, stabilityScore,
  usageFrequency, baseWidth, feetTouching,
  usedInBarre, feetDescription, commonTransitionTo, balletPositions,
} from "../ballet-position-calc.js";

describe("difficultyLevel", () => {
  it("fifth most difficult", () => {
    expect(difficultyLevel("fifth")).toBeGreaterThan(
      difficultyLevel("first")
    );
  });
});

describe("turnoutRequired", () => {
  it("fifth most turnout required", () => {
    expect(turnoutRequired("fifth")).toBeGreaterThan(
      turnoutRequired("third")
    );
  });
});

describe("stabilityScore", () => {
  it("second most stable", () => {
    expect(stabilityScore("second")).toBeGreaterThan(
      stabilityScore("fifth")
    );
  });
});

describe("usageFrequency", () => {
  it("first most frequently used", () => {
    expect(usageFrequency("first")).toBeGreaterThan(
      usageFrequency("third")
    );
  });
});

describe("baseWidth", () => {
  it("second widest base", () => {
    expect(baseWidth("second")).toBeGreaterThan(
      baseWidth("fifth")
    );
  });
});

describe("feetTouching", () => {
  it("first has feet touching", () => {
    expect(feetTouching("first")).toBe(true);
  });
  it("second does not", () => {
    expect(feetTouching("second")).toBe(false);
  });
});

describe("usedInBarre", () => {
  it("all positions used in barre", () => {
    expect(usedInBarre("third")).toBe(true);
  });
});

describe("feetDescription", () => {
  it("fifth is fully crossed", () => {
    expect(feetDescription("fifth")).toBe("feet_together_fully_crossed");
  });
});

describe("commonTransitionTo", () => {
  it("fourth to pirouette prep", () => {
    expect(commonTransitionTo("fourth")).toBe("pirouette_prep");
  });
});

describe("balletPositions", () => {
  it("returns 5 positions", () => {
    expect(balletPositions()).toHaveLength(5);
  });
});
