import { describe, it, expect } from "vitest";
import {
  explosivityIndex, heightMeters, lavaViscosity,
  eruptionFrequency, destructionRadius, effusiveEruption,
  producesAshCloud, exampleVolcano, primaryLavaType, volcanicTypes,
} from "../volcanic-type-calc.js";

describe("explosivityIndex", () => {
  it("caldera most explosive", () => {
    expect(explosivityIndex("caldera")).toBeGreaterThan(
      explosivityIndex("shield")
    );
  });
});

describe("heightMeters", () => {
  it("stratovolcano is tallest", () => {
    expect(heightMeters("stratovolcano")).toBeGreaterThan(
      heightMeters("cinder_cone")
    );
  });
});

describe("lavaViscosity", () => {
  it("lava dome most viscous", () => {
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

describe("destructionRadius", () => {
  it("caldera has largest destruction radius", () => {
    expect(destructionRadius("caldera")).toBeGreaterThan(
      destructionRadius("cinder_cone")
    );
  });
});

describe("effusiveEruption", () => {
  it("shield is effusive", () => {
    expect(effusiveEruption("shield")).toBe(true);
  });
  it("stratovolcano is not", () => {
    expect(effusiveEruption("stratovolcano")).toBe(false);
  });
});

describe("producesAshCloud", () => {
  it("stratovolcano produces ash", () => {
    expect(producesAshCloud("stratovolcano")).toBe(true);
  });
  it("shield does not", () => {
    expect(producesAshCloud("shield")).toBe(false);
  });
});

describe("exampleVolcano", () => {
  it("caldera example is yellowstone", () => {
    expect(exampleVolcano("caldera")).toBe("yellowstone");
  });
});

describe("primaryLavaType", () => {
  it("shield has basaltic lava", () => {
    expect(primaryLavaType("shield")).toBe("basaltic");
  });
});

describe("volcanicTypes", () => {
  it("returns 5 types", () => {
    expect(volcanicTypes()).toHaveLength(5);
  });
});
