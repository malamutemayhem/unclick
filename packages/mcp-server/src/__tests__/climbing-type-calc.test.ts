import { describe, it, expect } from "vitest";
import {
  heightMeters, gearRequired, strengthDemand,
  enduranceDemand, riskLevel, indoor,
  ropeRequired, bestSeason, learningMonths, climbingTypes,
} from "../climbing-type-calc.js";

describe("heightMeters", () => {
  it("alpine is tallest", () => {
    expect(heightMeters("alpine")).toBeGreaterThan(
      heightMeters("bouldering")
    );
  });
});

describe("gearRequired", () => {
  it("ice needs most gear", () => {
    expect(gearRequired("ice")).toBeGreaterThan(
      gearRequired("bouldering")
    );
  });
});

describe("strengthDemand", () => {
  it("bouldering needs most strength", () => {
    expect(strengthDemand("bouldering")).toBeGreaterThan(
      strengthDemand("trad")
    );
  });
});

describe("enduranceDemand", () => {
  it("alpine needs most endurance", () => {
    expect(enduranceDemand("alpine")).toBeGreaterThan(
      enduranceDemand("bouldering")
    );
  });
});

describe("riskLevel", () => {
  it("alpine is highest risk", () => {
    expect(riskLevel("alpine")).toBeGreaterThan(
      riskLevel("bouldering")
    );
  });
});

describe("indoor", () => {
  it("bouldering can be indoor", () => {
    expect(indoor("bouldering")).toBe(true);
  });
  it("alpine cannot", () => {
    expect(indoor("alpine")).toBe(false);
  });
});

describe("ropeRequired", () => {
  it("sport requires rope", () => {
    expect(ropeRequired("sport")).toBe(true);
  });
  it("bouldering does not", () => {
    expect(ropeRequired("bouldering")).toBe(false);
  });
});

describe("bestSeason", () => {
  it("ice climbing in winter", () => {
    expect(bestSeason("ice")).toBe("winter");
  });
});

describe("learningMonths", () => {
  it("alpine takes longest to learn", () => {
    expect(learningMonths("alpine")).toBeGreaterThan(
      learningMonths("bouldering")
    );
  });
});

describe("climbingTypes", () => {
  it("returns 5 types", () => {
    expect(climbingTypes()).toHaveLength(5);
  });
});
