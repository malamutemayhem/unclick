import { describe, it, expect } from "vitest";
import {
  armRatio, releaseAngle, counterweightKg, rangeM,
  releaseVelocity, impactEnergy, slingLength, cycleTimeS,
  crewRequired, dragCoefficient, ammunitionShapes,
} from "../trebuchet-trig.js";

describe("armRatio", () => {
  it("positive ratio", () => {
    expect(armRatio(4, 1)).toBe(4);
  });
  it("zero sling arm = 0", () => {
    expect(armRatio(4, 0)).toBe(0);
  });
});

describe("releaseAngle", () => {
  it("decreases with ratio", () => {
    expect(releaseAngle(2)).toBeLessThan(releaseAngle(1));
  });
});

describe("counterweightKg", () => {
  it("positive kg", () => {
    expect(counterweightKg(50, 4, 0.7)).toBeGreaterThan(0);
  });
  it("zero efficiency = 0", () => {
    expect(counterweightKg(50, 4, 0)).toBe(0);
  });
});

describe("rangeM", () => {
  it("positive meters", () => {
    expect(rangeM(30, 45)).toBeGreaterThan(0);
  });
});

describe("releaseVelocity", () => {
  it("positive m/s", () => {
    expect(releaseVelocity(1000, 5, 50)).toBeGreaterThan(0);
  });
  it("zero projectile = 0", () => {
    expect(releaseVelocity(1000, 5, 0)).toBe(0);
  });
});

describe("impactEnergy", () => {
  it("positive joules", () => {
    expect(impactEnergy(50, 30)).toBeGreaterThan(0);
  });
});

describe("slingLength", () => {
  it("80% of arm", () => {
    expect(slingLength(5)).toBe(4);
  });
});

describe("cycleTimeS", () => {
  it("positive seconds", () => {
    expect(cycleTimeS(5)).toBeGreaterThan(30);
  });
});

describe("crewRequired", () => {
  it("more for heavier counterweight", () => {
    expect(crewRequired(500)).toBeGreaterThan(crewRequired(100));
  });
});

describe("dragCoefficient", () => {
  it("sphere lowest", () => {
    expect(dragCoefficient("sphere")).toBeLessThan(dragCoefficient("irregular"));
  });
});

describe("ammunitionShapes", () => {
  it("returns 4 shapes", () => {
    expect(ammunitionShapes()).toHaveLength(4);
  });
});
