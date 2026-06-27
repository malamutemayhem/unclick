import { describe, it, expect } from "vitest";
import {
  orbitalPeriodDays, gearRatio, gearTeeth, armLength,
  orbitRadiusAu, rotationRpm, planetDiameterMm, totalGears,
  crankSpeed, planets,
} from "../orrery-calc.js";

describe("orbitalPeriodDays", () => {
  it("earth = 365", () => {
    expect(orbitalPeriodDays("earth")).toBe(365);
  });
  it("mercury fastest", () => {
    expect(orbitalPeriodDays("mercury")).toBeLessThan(orbitalPeriodDays("earth"));
  });
});

describe("gearRatio", () => {
  it("earth = 1", () => {
    expect(gearRatio("earth")).toBe(1);
  });
  it("mercury < 1", () => {
    expect(gearRatio("mercury")).toBeLessThan(1);
  });
});

describe("gearTeeth", () => {
  it("correct teeth", () => {
    expect(gearTeeth(2, 30)).toBe(60);
  });
});

describe("armLength", () => {
  it("positive cm", () => {
    expect(armLength(1.52, 10)).toBeGreaterThan(0);
  });
});

describe("orbitRadiusAu", () => {
  it("earth = 1", () => {
    expect(orbitRadiusAu("earth")).toBe(1);
  });
});

describe("rotationRpm", () => {
  it("positive rpm", () => {
    expect(rotationRpm(365, 60)).toBeGreaterThan(0);
  });
  it("zero period = 0", () => {
    expect(rotationRpm(0, 60)).toBe(0);
  });
});

describe("planetDiameterMm", () => {
  it("jupiter largest", () => {
    expect(planetDiameterMm("jupiter", 0.001)).toBeGreaterThan(planetDiameterMm("earth", 0.001));
  });
});

describe("totalGears", () => {
  it("8 planets = 17 gears", () => {
    expect(totalGears(8)).toBe(17);
  });
});

describe("crankSpeed", () => {
  it("is 1 rpm", () => {
    expect(crankSpeed()).toBe(1);
  });
});

describe("planets", () => {
  it("returns 8 planets", () => {
    expect(planets()).toHaveLength(8);
  });
});
