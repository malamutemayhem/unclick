import { describe, it, expect } from "vitest";
import {
  mainspringTurns, balanceFrequency, gearTeeth, jewelsCount,
  powerReserveHours, accuracySecPerDay, serviceCostUsd,
  serviceIntervalYears, waterResistanceAtm, movementTypes,
} from "../horology-calc.js";

describe("mainspringTurns", () => {
  it("positive turns", () => {
    expect(mainspringTurns(48, 10)).toBeGreaterThan(0);
  });
  it("zero ratio = 0", () => {
    expect(mainspringTurns(48, 0)).toBe(0);
  });
});

describe("balanceFrequency", () => {
  it("28800 bph = 8 Hz", () => {
    expect(balanceFrequency(28800)).toBe(8);
  });
});

describe("gearTeeth", () => {
  it("returns wheel and pinion", () => {
    const g = gearTeeth(60, 10, 2);
    expect(g.wheel).toBe(120);
    expect(g.pinion).toBe(10);
  });
});

describe("jewelsCount", () => {
  it("quartz = 0", () => {
    expect(jewelsCount("quartz")).toBe(0);
  });
  it("automatic = 25", () => {
    expect(jewelsCount("automatic")).toBe(25);
  });
});

describe("powerReserveHours", () => {
  it("quartz longest", () => {
    expect(powerReserveHours("quartz")).toBeGreaterThan(powerReserveHours("automatic"));
  });
});

describe("accuracySecPerDay", () => {
  it("quartz most accurate", () => {
    expect(accuracySecPerDay("quartz")).toBeLessThan(accuracySecPerDay("manual"));
  });
});

describe("serviceCostUsd", () => {
  it("tourbillon most expensive", () => {
    expect(serviceCostUsd("tourbillon")).toBeGreaterThan(serviceCostUsd("quartz"));
  });
});

describe("serviceIntervalYears", () => {
  it("quartz longest", () => {
    expect(serviceIntervalYears("quartz")).toBeGreaterThan(serviceIntervalYears("manual"));
  });
});

describe("waterResistanceAtm", () => {
  it("helium deepest", () => {
    expect(waterResistanceAtm("helium")).toBeGreaterThan(waterResistanceAtm("push"));
  });
});

describe("movementTypes", () => {
  it("returns 5 types", () => {
    expect(movementTypes()).toHaveLength(5);
  });
});
