import { describe, it, expect } from "vitest";
import {
  enclosureVolumeLiters, minSize, substrateDepthCm, substrateLiters,
  humidityTarget, temperatureRange, lightingWatts, mistingFrequency,
  drainageLayerCm, waterChangePct, feedingSchedule, vivariumTypes,
} from "../vivarium-calc.js";

describe("enclosureVolumeLiters", () => {
  it("positive liters", () => {
    expect(enclosureVolumeLiters(60, 45, 45)).toBeGreaterThan(0);
  });
});

describe("minSize", () => {
  it("frog needs height", () => {
    expect(minSize("frog").heightCm).toBeGreaterThan(minSize("isopod").heightCm);
  });
  it("snake needs length", () => {
    expect(minSize("snake").lengthCm).toBeGreaterThan(minSize("mantis").lengthCm);
  });
});

describe("substrateDepthCm", () => {
  it("orchidarium deepest", () => {
    expect(substrateDepthCm("orchidarium")).toBeGreaterThan(substrateDepthCm("insectarium"));
  });
});

describe("substrateLiters", () => {
  it("positive liters", () => {
    expect(substrateLiters(2700, 10)).toBeGreaterThan(0);
  });
});

describe("humidityTarget", () => {
  it("isopod needs highest humidity", () => {
    expect(humidityTarget("isopod")).toBeGreaterThan(humidityTarget("gecko"));
  });
});

describe("temperatureRange", () => {
  it("valid range", () => {
    const range = temperatureRange("gecko");
    expect(range.max).toBeGreaterThan(range.min);
  });
});

describe("lightingWatts", () => {
  it("high density needs more watts", () => {
    expect(lightingWatts(2700, "high")).toBeGreaterThan(lightingWatts(2700, "low"));
  });
});

describe("mistingFrequency", () => {
  it("more misting when drier", () => {
    expect(mistingFrequency(40, 80)).toBeGreaterThan(mistingFrequency(70, 80));
  });
  it("zero when at target", () => {
    expect(mistingFrequency(80, 80)).toBe(0);
  });
});

describe("drainageLayerCm", () => {
  it("25% of total depth", () => {
    expect(drainageLayerCm(10)).toBe(2.5);
  });
});

describe("waterChangePct", () => {
  it("aquarium = 25%", () => {
    expect(waterChangePct("aquarium")).toBe(25);
  });
  it("insectarium = 0%", () => {
    expect(waterChangePct("insectarium")).toBe(0);
  });
});

describe("feedingSchedule", () => {
  it("returns string", () => {
    expect(typeof feedingSchedule("frog")).toBe("string");
  });
});

describe("vivariumTypes", () => {
  it("returns 5 types", () => {
    expect(vivariumTypes()).toHaveLength(5);
  });
});
