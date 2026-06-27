import { describe, it, expect } from "vitest";
import {
  gearRatio, outputRpm, torqueMultiplier, gearDiameterMm,
  pipeFlowLpm, steamPressurePsi, boilerVolumeLiters, rivetCount,
  patinaDays, materialDensity, aestheticScore, gearMaterials,
} from "../steampunk-calc.js";

describe("gearRatio", () => {
  it("2:1 ratio", () => {
    expect(gearRatio(20, 40)).toBe(2);
  });
  it("zero driver = 0", () => {
    expect(gearRatio(0, 40)).toBe(0);
  });
});

describe("outputRpm", () => {
  it("halved at 2:1", () => {
    expect(outputRpm(100, 2)).toBe(50);
  });
});

describe("torqueMultiplier", () => {
  it("equals ratio", () => {
    expect(torqueMultiplier(2)).toBe(2);
  });
});

describe("gearDiameterMm", () => {
  it("teeth x module", () => {
    expect(gearDiameterMm(20, 2)).toBe(40);
  });
});

describe("pipeFlowLpm", () => {
  it("positive flow", () => {
    expect(pipeFlowLpm(25, 100)).toBeGreaterThan(0);
  });
  it("zero diameter = 0", () => {
    expect(pipeFlowLpm(0, 100)).toBe(0);
  });
});

describe("steamPressurePsi", () => {
  it("zero below 100C", () => {
    expect(steamPressurePsi(90)).toBe(0);
  });
  it("positive above 100C", () => {
    expect(steamPressurePsi(120)).toBeGreaterThan(0);
  });
});

describe("boilerVolumeLiters", () => {
  it("positive volume", () => {
    expect(boilerVolumeLiters(1000)).toBe(2);
  });
});

describe("rivetCount", () => {
  it("positive count", () => {
    expect(rivetCount(100, 5)).toBeGreaterThan(0);
  });
});

describe("patinaDays", () => {
  it("copper fastest", () => {
    expect(patinaDays("copper")).toBeLessThan(patinaDays("bronze"));
  });
});

describe("materialDensity", () => {
  it("copper densest", () => {
    expect(materialDensity("copper")).toBeGreaterThan(materialDensity("cast_iron"));
  });
});

describe("aestheticScore", () => {
  it("capped at 10", () => {
    expect(aestheticScore(20, 20, 20)).toBeLessThanOrEqual(10);
  });
});

describe("gearMaterials", () => {
  it("returns 5 materials", () => {
    expect(gearMaterials()).toHaveLength(5);
  });
});
