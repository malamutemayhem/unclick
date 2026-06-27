import { describe, it, expect } from "vitest";
import {
  heightMeters, explosivityIndex, lavaViscosity,
  eruptionFrequency, hazardRadius, effusiveEruption,
  pyroclasticFlowRisk, exampleVolcano, slopeAngleDegrees, volcanoTypes,
} from "../volcano-type-calc.js";

describe("heightMeters", () => {
  it("stratovolcano is tallest", () => {
    expect(heightMeters("stratovolcano")).toBeGreaterThan(
      heightMeters("cinder_cone")
    );
  });
});

describe("explosivityIndex", () => {
  it("caldera is most explosive", () => {
    expect(explosivityIndex("caldera")).toBeGreaterThan(
      explosivityIndex("shield")
    );
  });
});

describe("lavaViscosity", () => {
  it("lava dome has most viscous lava", () => {
    expect(lavaViscosity("lava_dome")).toBeGreaterThan(
      lavaViscosity("shield")
    );
  });
});

describe("eruptionFrequency", () => {
  it("shield erupts most frequently", () => {
    expect(eruptionFrequency("shield")).toBeGreaterThan(
      eruptionFrequency("caldera")
    );
  });
});

describe("hazardRadius", () => {
  it("caldera has largest hazard radius", () => {
    expect(hazardRadius("caldera")).toBeGreaterThan(
      hazardRadius("cinder_cone")
    );
  });
});

describe("effusiveEruption", () => {
  it("shield has effusive eruptions", () => {
    expect(effusiveEruption("shield")).toBe(true);
  });
  it("stratovolcano does not", () => {
    expect(effusiveEruption("stratovolcano")).toBe(false);
  });
});

describe("pyroclasticFlowRisk", () => {
  it("stratovolcano has pyroclastic flow risk", () => {
    expect(pyroclasticFlowRisk("stratovolcano")).toBe(true);
  });
  it("shield does not", () => {
    expect(pyroclasticFlowRisk("shield")).toBe(false);
  });
});

describe("exampleVolcano", () => {
  it("shield example is mauna loa", () => {
    expect(exampleVolcano("shield")).toBe("mauna_loa");
  });
});

describe("slopeAngleDegrees", () => {
  it("cinder cone has steepest slope", () => {
    expect(slopeAngleDegrees("cinder_cone")).toBeGreaterThan(
      slopeAngleDegrees("shield")
    );
  });
});

describe("volcanoTypes", () => {
  it("returns 5 types", () => {
    expect(volcanoTypes()).toHaveLength(5);
  });
});
