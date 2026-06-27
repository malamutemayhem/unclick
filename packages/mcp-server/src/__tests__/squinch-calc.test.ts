import { describe, it, expect } from "vitest";
import {
  spanCm, riseCm, depthCm, corbelCourses, stoneVolumeCm3,
  weightKg, muqarnasTiers, loadCapacityKn, carvingHours,
  transitionAngle, squinchTypes,
} from "../squinch-calc.js";

describe("spanCm", () => {
  it("positive span", () => {
    expect(spanCm(200)).toBeGreaterThan(0);
  });
});

describe("riseCm", () => {
  it("muqarnas tallest", () => {
    expect(riseCm(100, "muqarnas")).toBeGreaterThan(riseCm(100, "corbelled"));
  });
});

describe("depthCm", () => {
  it("80% of wall", () => {
    expect(depthCm(50)).toBe(40);
  });
});

describe("corbelCourses", () => {
  it("positive courses", () => {
    expect(corbelCourses(50, 8)).toBeGreaterThan(0);
  });
  it("zero course = 0", () => {
    expect(corbelCourses(50, 0)).toBe(0);
  });
});

describe("stoneVolumeCm3", () => {
  it("positive volume", () => {
    expect(stoneVolumeCm3(140, 70, 40)).toBeGreaterThan(0);
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(100000, 2.5)).toBeGreaterThan(0);
  });
});

describe("muqarnasTiers", () => {
  it("positive tiers", () => {
    expect(muqarnasTiers(70)).toBeGreaterThan(0);
  });
});

describe("loadCapacityKn", () => {
  it("positive kn", () => {
    expect(loadCapacityKn(140, 40)).toBeGreaterThan(0);
  });
});

describe("carvingHours", () => {
  it("muqarnas longest", () => {
    expect(carvingHours("muqarnas", 140)).toBeGreaterThan(carvingHours("arch", 140));
  });
});

describe("transitionAngle", () => {
  it("positive angle", () => {
    expect(transitionAngle(200, 250)).toBeGreaterThan(0);
  });
  it("zero diameter = 0", () => {
    expect(transitionAngle(200, 0)).toBe(0);
  });
});

describe("squinchTypes", () => {
  it("returns 5 types", () => {
    expect(squinchTypes()).toHaveLength(5);
  });
});
