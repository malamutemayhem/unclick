import { describe, it, expect } from "vitest";
import {
  magnitude, predictability, freqDepend, filterability,
  jitCost, correlated, forEmi, source,
  bestUse, jitterTypes,
} from "../jitter-type-calc.js";

describe("magnitude", () => {
  it("spread spectrum largest magnitude", () => {
    expect(magnitude("spread_spectrum")).toBeGreaterThan(magnitude("duty_cycle_distortion"));
  });
});

describe("predictability", () => {
  it("deterministic periodic most predictable", () => {
    expect(predictability("deterministic_periodic")).toBeGreaterThan(predictability("random_gaussian"));
  });
});

describe("freqDepend", () => {
  it("deterministic periodic most frequency dependent", () => {
    expect(freqDepend("deterministic_periodic")).toBeGreaterThan(freqDepend("random_gaussian"));
  });
});

describe("filterability", () => {
  it("deterministic periodic most filterable", () => {
    expect(filterability("deterministic_periodic")).toBeGreaterThan(filterability("random_gaussian"));
  });
});

describe("jitCost", () => {
  it("random gaussian highest jitter cost", () => {
    expect(jitCost("random_gaussian")).toBeGreaterThan(jitCost("spread_spectrum"));
  });
});

describe("correlated", () => {
  it("deterministic periodic is correlated", () => {
    expect(correlated("deterministic_periodic")).toBe(true);
  });
  it("random gaussian not correlated", () => {
    expect(correlated("random_gaussian")).toBe(false);
  });
});

describe("forEmi", () => {
  it("spread spectrum for emi", () => {
    expect(forEmi("spread_spectrum")).toBe(true);
  });
  it("random gaussian not for emi", () => {
    expect(forEmi("random_gaussian")).toBe(false);
  });
});

describe("source", () => {
  it("spread spectrum uses intentional freq modulation", () => {
    expect(source("spread_spectrum")).toBe("intentional_freq_modulation");
  });
});

describe("bestUse", () => {
  it("duty cycle distortion best for clock duty cycle correct", () => {
    expect(bestUse("duty_cycle_distortion")).toBe("clock_duty_cycle_correct");
  });
});

describe("jitterTypes", () => {
  it("returns 5 types", () => {
    expect(jitterTypes()).toHaveLength(5);
  });
});
