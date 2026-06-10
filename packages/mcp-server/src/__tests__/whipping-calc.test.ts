import { describe, it, expect } from "vitest";
import {
  turnsPerCm, whippingLengthDiameters, threadLengthMultiplier, durabilityRating,
  slipResistance, needleRequired, timeMinutesPerWhipping, decorativeRating,
  costPerWhipping, whippingTypes,
} from "../whipping-calc.js";

describe("turnsPerCm", () => {
  it("french has most turns", () => {
    expect(turnsPerCm("french")).toBeGreaterThan(turnsPerCm("common"));
  });
});

describe("whippingLengthDiameters", () => {
  it("french is longest", () => {
    expect(whippingLengthDiameters("french")).toBeGreaterThan(
      whippingLengthDiameters("common")
    );
  });
});

describe("threadLengthMultiplier", () => {
  it("french uses most thread", () => {
    expect(threadLengthMultiplier("french")).toBeGreaterThan(
      threadLengthMultiplier("common")
    );
  });
});

describe("durabilityRating", () => {
  it("sailmaker is most durable", () => {
    expect(durabilityRating("sailmaker")).toBeGreaterThan(
      durabilityRating("common")
    );
  });
});

describe("slipResistance", () => {
  it("sailmaker resists slipping best", () => {
    expect(slipResistance("sailmaker")).toBeGreaterThan(
      slipResistance("common")
    );
  });
});

describe("needleRequired", () => {
  it("sailmaker needs needle", () => {
    expect(needleRequired("sailmaker")).toBe(true);
  });
  it("common does not need needle", () => {
    expect(needleRequired("common")).toBe(false);
  });
});

describe("timeMinutesPerWhipping", () => {
  it("french takes longest", () => {
    expect(timeMinutesPerWhipping("french")).toBeGreaterThan(
      timeMinutesPerWhipping("common")
    );
  });
});

describe("decorativeRating", () => {
  it("french is most decorative", () => {
    expect(decorativeRating("french")).toBeGreaterThan(
      decorativeRating("common")
    );
  });
});

describe("costPerWhipping", () => {
  it("french is most expensive", () => {
    expect(costPerWhipping("french")).toBeGreaterThan(
      costPerWhipping("common")
    );
  });
});

describe("whippingTypes", () => {
  it("returns 5 types", () => {
    expect(whippingTypes()).toHaveLength(5);
  });
});
