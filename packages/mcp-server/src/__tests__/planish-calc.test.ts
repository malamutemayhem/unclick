import { describe, it, expect } from "vitest";
import {
  hammerWeightG, faceDiameterMm, blowsPerCm2, totalBlows,
  annealingCyclesNeeded, stakeType, surfaceRoughnessRa,
  timePerM2Minutes, costPerHour, planishingHammers,
} from "../planish-calc.js";

describe("hammerWeightG", () => {
  it("raising is heaviest", () => {
    expect(hammerWeightG("raising")).toBeGreaterThan(hammerWeightG("mirror"));
  });
});

describe("faceDiameterMm", () => {
  it("raising has largest face", () => {
    expect(faceDiameterMm("raising")).toBeGreaterThan(faceDiameterMm("collet"));
  });
});

describe("blowsPerCm2", () => {
  it("fine finish needs most blows", () => {
    expect(blowsPerCm2("fine")).toBeGreaterThan(blowsPerCm2("rough"));
  });
});

describe("totalBlows", () => {
  it("larger area = more blows", () => {
    expect(totalBlows(100, 8)).toBeGreaterThan(totalBlows(50, 8));
  });
});

describe("annealingCyclesNeeded", () => {
  it("thicker metal needs more cycles", () => {
    expect(annealingCyclesNeeded(3)).toBeGreaterThan(annealingCyclesNeeded(0.5));
  });
});

describe("stakeType", () => {
  it("flat uses mushroom stake", () => {
    expect(stakeType("flat")).toBe("mushroom");
  });
});

describe("surfaceRoughnessRa", () => {
  it("mirror has lowest roughness", () => {
    expect(surfaceRoughnessRa("mirror")).toBeLessThan(surfaceRoughnessRa("raising"));
  });
});

describe("timePerM2Minutes", () => {
  it("fine takes longest", () => {
    expect(timePerM2Minutes("fine")).toBeGreaterThan(timePerM2Minutes("rough"));
  });
});

describe("costPerHour", () => {
  it("returns 45", () => {
    expect(costPerHour()).toBe(45);
  });
});

describe("planishingHammers", () => {
  it("returns 5 hammers", () => {
    expect(planishingHammers()).toHaveLength(5);
  });
});
