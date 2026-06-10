import { describe, it, expect } from "vitest";
import {
  starCountBillions, diameterKpc, starFormationRate,
  darkMatterFraction, rotationSpeed, hasSpiral,
  hasCentralBar, exampleGalaxy, abundancePercent, galaxyTypes,
} from "../galaxy-type-calc.js";

describe("starCountBillions", () => {
  it("elliptical has most stars", () => {
    expect(starCountBillions("elliptical")).toBeGreaterThan(
      starCountBillions("irregular")
    );
  });
});

describe("diameterKpc", () => {
  it("elliptical is largest", () => {
    expect(diameterKpc("elliptical")).toBeGreaterThan(
      diameterKpc("spiral")
    );
  });
});

describe("starFormationRate", () => {
  it("irregular forms stars fastest", () => {
    expect(starFormationRate("irregular")).toBeGreaterThan(
      starFormationRate("elliptical")
    );
  });
});

describe("darkMatterFraction", () => {
  it("elliptical has most dark matter", () => {
    expect(darkMatterFraction("elliptical")).toBeGreaterThan(
      darkMatterFraction("irregular")
    );
  });
});

describe("rotationSpeed", () => {
  it("spiral rotates fastest", () => {
    expect(rotationSpeed("spiral")).toBeGreaterThan(
      rotationSpeed("elliptical")
    );
  });
});

describe("hasSpiral", () => {
  it("spiral has spiral arms", () => {
    expect(hasSpiral("spiral")).toBe(true);
  });
  it("elliptical does not", () => {
    expect(hasSpiral("elliptical")).toBe(false);
  });
});

describe("hasCentralBar", () => {
  it("barred spiral has central bar", () => {
    expect(hasCentralBar("barred_spiral")).toBe(true);
  });
  it("spiral does not", () => {
    expect(hasCentralBar("spiral")).toBe(false);
  });
});

describe("exampleGalaxy", () => {
  it("spiral example is milky way", () => {
    expect(exampleGalaxy("spiral")).toBe("milky_way");
  });
});

describe("abundancePercent", () => {
  it("spiral is most abundant", () => {
    expect(abundancePercent("spiral")).toBeGreaterThan(
      abundancePercent("elliptical")
    );
  });
});

describe("galaxyTypes", () => {
  it("returns 5 types", () => {
    expect(galaxyTypes()).toHaveLength(5);
  });
});
