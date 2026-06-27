import { describe, it, expect } from "vitest";
import {
  optimalAngle, energyJoules, rangeM, rateOfFire,
  crewSize, wallBreachShots, constructionDays, timberLogs,
  ropeLengthM, ammunitionTypes,
} from "../trebuchet-siege.js";

describe("optimalAngle", () => {
  it("45 degrees", () => {
    expect(optimalAngle()).toBe(45);
  });
});

describe("energyJoules", () => {
  it("positive joules", () => {
    expect(energyJoules(5000, 10)).toBeGreaterThan(0);
  });
});

describe("rangeM", () => {
  it("positive meters", () => {
    expect(rangeM(50000, 50, 45)).toBeGreaterThan(0);
  });
  it("zero projectile = 0", () => {
    expect(rangeM(50000, 0, 45)).toBe(0);
  });
});

describe("rateOfFire", () => {
  it("faster with more crew", () => {
    expect(rateOfFire(12)).toBeGreaterThan(rateOfFire(3));
  });
});

describe("crewSize", () => {
  it("positive crew", () => {
    expect(crewSize(5000)).toBeGreaterThan(5);
  });
});

describe("wallBreachShots", () => {
  it("positive shots", () => {
    expect(wallBreachShots(100, 50)).toBeGreaterThan(0);
  });
});

describe("constructionDays", () => {
  it("3 per meter", () => {
    expect(constructionDays(10)).toBe(30);
  });
});

describe("timberLogs", () => {
  it("8 per meter", () => {
    expect(timberLogs(10)).toBe(80);
  });
});

describe("ropeLengthM", () => {
  it("positive meters", () => {
    expect(ropeLengthM(10, 5)).toBeGreaterThan(0);
  });
});

describe("ammunitionTypes", () => {
  it("returns 5 types", () => {
    expect(ammunitionTypes()).toHaveLength(5);
  });
});
