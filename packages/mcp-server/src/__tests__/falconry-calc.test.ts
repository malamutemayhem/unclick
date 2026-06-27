import { describe, it, expect } from "vitest";
import {
  flyingWeight, dailyFoodG, jessLength, leashLength,
  creanceLength, moultDuration, weatheringTime, strikingSpeed,
  huntingRange, telemetryRange, raptorSpecies,
} from "../falconry-calc.js";

describe("flyingWeight", () => {
  it("92% of captive weight", () => {
    expect(flyingWeight(1000)).toBe(920);
  });
});

describe("dailyFoodG", () => {
  it("6% of body weight", () => {
    expect(dailyFoodG(1000)).toBe(60);
  });
});

describe("jessLength", () => {
  it("2.5x tarsus", () => {
    expect(jessLength(40)).toBe(100);
  });
});

describe("leashLength", () => {
  it("3x jess", () => {
    expect(leashLength(100)).toBe(300);
  });
});

describe("creanceLength", () => {
  it("gyrfalcon longest", () => {
    expect(creanceLength("gyrfalcon")).toBeGreaterThan(creanceLength("kestrel"));
  });
});

describe("moultDuration", () => {
  it("gyrfalcon longest", () => {
    expect(moultDuration("gyrfalcon")).toBeGreaterThan(moultDuration("kestrel"));
  });
});

describe("weatheringTime", () => {
  it("longer in heat", () => {
    expect(weatheringTime(35)).toBeGreaterThan(weatheringTime(10));
  });
});

describe("strikingSpeed", () => {
  it("peregrine fastest", () => {
    expect(strikingSpeed("peregrine")).toBeGreaterThan(strikingSpeed("kestrel"));
  });
});

describe("huntingRange", () => {
  it("gyrfalcon widest", () => {
    expect(huntingRange("gyrfalcon")).toBeGreaterThan(huntingRange("kestrel"));
  });
});

describe("telemetryRange", () => {
  it("positive km", () => {
    expect(telemetryRange(100)).toBeGreaterThan(0);
  });
});

describe("raptorSpecies", () => {
  it("returns 6 species", () => {
    expect(raptorSpecies()).toHaveLength(6);
  });
});
