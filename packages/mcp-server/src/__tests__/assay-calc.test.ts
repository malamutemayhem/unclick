import { describe, it, expect } from "vitest";
import {
  sampleWeightG, accuracyPercent, turnaroundHours, detectionLimitPpm,
  costPerSample, replicatesNeeded, fluxCompositionG,
  cupellationTemperatureCelsius, samplePrepTimeMinutes, assayMethods,
} from "../assay-calc.js";

describe("sampleWeightG", () => {
  it("gravimetric needs most sample", () => {
    expect(sampleWeightG("gravimetric")).toBeGreaterThan(sampleWeightG("icp"));
  });
});

describe("accuracyPercent", () => {
  it("gravimetric most accurate", () => {
    expect(accuracyPercent("gravimetric")).toBeGreaterThan(accuracyPercent("xrf"));
  });
});

describe("turnaroundHours", () => {
  it("xrf fastest", () => {
    expect(turnaroundHours("xrf")).toBeLessThan(turnaroundHours("gravimetric"));
  });
});

describe("detectionLimitPpm", () => {
  it("icp lowest detection limit", () => {
    expect(detectionLimitPpm("icp")).toBeLessThan(detectionLimitPpm("xrf"));
  });
});

describe("costPerSample", () => {
  it("icp most expensive", () => {
    expect(costPerSample("icp", 50)).toBeGreaterThan(costPerSample("xrf", 50));
  });
});

describe("replicatesNeeded", () => {
  it("higher confidence = more replicates", () => {
    expect(replicatesNeeded(99)).toBeGreaterThan(replicatesNeeded(90));
  });
});

describe("fluxCompositionG", () => {
  it("fire assay has flux", () => {
    const flux = fluxCompositionG("fire");
    expect(flux.litharge).toBeGreaterThan(0);
  });
  it("non-fire has no flux", () => {
    const flux = fluxCompositionG("xrf");
    expect(flux.litharge).toBe(0);
  });
});

describe("cupellationTemperatureCelsius", () => {
  it("returns 960", () => {
    expect(cupellationTemperatureCelsius()).toBe(960);
  });
});

describe("samplePrepTimeMinutes", () => {
  it("gravimetric takes longest", () => {
    expect(samplePrepTimeMinutes("gravimetric")).toBeGreaterThan(
      samplePrepTimeMinutes("xrf")
    );
  });
});

describe("assayMethods", () => {
  it("returns 5 methods", () => {
    expect(assayMethods()).toHaveLength(5);
  });
});
