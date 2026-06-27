import { describe, it, expect } from "vitest";
import {
  barCount, drumDiameter, mechanicalAdvantage, liftCapacityKg,
  ropeSpeedMps, pawlCount, barLength, turnsToRaise,
  brakeTorque, capstanPowers,
} from "../capstan-calc.js";

describe("barCount", () => {
  it("half the crew", () => {
    expect(barCount(8)).toBe(4);
  });
});

describe("drumDiameter", () => {
  it("positive cm", () => {
    expect(drumDiameter(3, 5)).toBeGreaterThan(0);
  });
});

describe("mechanicalAdvantage", () => {
  it("positive ratio", () => {
    expect(mechanicalAdvantage(150, 20)).toBeGreaterThan(0);
  });
  it("zero radius = 0", () => {
    expect(mechanicalAdvantage(150, 0)).toBe(0);
  });
});

describe("liftCapacityKg", () => {
  it("positive kg", () => {
    expect(liftCapacityKg(8, 200, 5)).toBeGreaterThan(0);
  });
});

describe("ropeSpeedMps", () => {
  it("positive speed", () => {
    expect(ropeSpeedMps(30, 10)).toBeGreaterThan(0);
  });
});

describe("pawlCount", () => {
  it("at least 3", () => {
    expect(pawlCount(20)).toBeGreaterThanOrEqual(3);
  });
});

describe("barLength", () => {
  it("human 150cm", () => {
    expect(barLength("human")).toBe(150);
  });
  it("electric is 0", () => {
    expect(barLength("electric")).toBe(0);
  });
});

describe("turnsToRaise", () => {
  it("positive turns", () => {
    expect(turnsToRaise(10, 100)).toBeGreaterThan(0);
  });
  it("zero circumference = 0", () => {
    expect(turnsToRaise(10, 0)).toBe(0);
  });
});

describe("brakeTorque", () => {
  it("positive Nm", () => {
    expect(brakeTorque(500, 15)).toBeGreaterThan(0);
  });
});

describe("capstanPowers", () => {
  it("returns 5 powers", () => {
    expect(capstanPowers()).toHaveLength(5);
  });
});
