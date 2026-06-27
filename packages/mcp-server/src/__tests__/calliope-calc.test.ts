import { describe, it, expect } from "vitest";
import {
  pipeCount, pipeLength, steamPressureBar, whistleFrequency,
  airConsumptionLpm, keySpringForce, boilerCapacityLiters,
  soundLevelDb, tuningCents, maintenanceIntervalHours, calliKeyTypes,
} from "../calliope-calc.js";

describe("pipeCount", () => {
  it("12 per octave", () => {
    expect(pipeCount(3)).toBe(36);
  });
});

describe("pipeLength", () => {
  it("positive cm", () => {
    expect(pipeLength(440)).toBeGreaterThan(0);
  });
  it("zero freq = 0", () => {
    expect(pipeLength(0)).toBe(0);
  });
});

describe("steamPressureBar", () => {
  it("positive bar", () => {
    expect(steamPressureBar(2, 5)).toBeGreaterThan(0);
  });
});

describe("whistleFrequency", () => {
  it("positive Hz", () => {
    expect(whistleFrequency(39)).toBeGreaterThan(0);
  });
  it("zero length = 0", () => {
    expect(whistleFrequency(0)).toBe(0);
  });
});

describe("airConsumptionLpm", () => {
  it("positive liters per minute", () => {
    expect(airConsumptionLpm(10, 2)).toBeGreaterThan(0);
  });
});

describe("keySpringForce", () => {
  it("steel stiffer than reed", () => {
    expect(keySpringForce(3, "steel")).toBeGreaterThan(keySpringForce(3, "reed"));
  });
});

describe("boilerCapacityLiters", () => {
  it("positive liters", () => {
    expect(boilerCapacityLiters(20)).toBeGreaterThan(0);
  });
});

describe("soundLevelDb", () => {
  it("positive dB", () => {
    expect(soundLevelDb(2, 5)).toBeGreaterThan(70);
  });
});

describe("tuningCents", () => {
  it("zero for same freq", () => {
    expect(tuningCents(440, 440)).toBe(0);
  });
  it("positive for sharp", () => {
    expect(tuningCents(450, 440)).toBeGreaterThan(0);
  });
});

describe("maintenanceIntervalHours", () => {
  it("positive hours", () => {
    expect(maintenanceIntervalHours(4)).toBeGreaterThan(0);
  });
  it("zero usage = 0", () => {
    expect(maintenanceIntervalHours(0)).toBe(0);
  });
});

describe("calliKeyTypes", () => {
  it("returns 4 types", () => {
    expect(calliKeyTypes()).toHaveLength(4);
  });
});
