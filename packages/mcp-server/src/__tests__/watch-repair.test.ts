import { describe, it, expect } from "vitest";
import {
  serviceInterval, accuracyPerDay, powerReserve, batteryLife,
  waterResistance, crystalType, beatsPerHour, frequencyFromBph,
  timegrapherReading, bandSizeMm, springBarSize, gasketLife,
  lubricantReapply, movementTypes,
} from "../watch-repair.js";

describe("serviceInterval", () => {
  it("quartz longest", () => {
    expect(serviceInterval("quartz")).toBeGreaterThan(serviceInterval("mechanical"));
  });
});

describe("accuracyPerDay", () => {
  it("quartz most accurate", () => {
    expect(accuracyPerDay("quartz")).toBeLessThan(accuracyPerDay("mechanical"));
  });
});

describe("powerReserve", () => {
  it("quartz longest", () => {
    expect(powerReserve("quartz")).toBeGreaterThan(powerReserve("automatic"));
  });
});

describe("batteryLife", () => {
  it("0 for mechanical", () => {
    expect(batteryLife("mechanical")).toBe(0);
  });

  it("2 years for quartz", () => {
    expect(batteryLife("quartz")).toBe(2);
  });
});

describe("waterResistance", () => {
  it("5 ATM = 50m", () => {
    expect(waterResistance(5)).toBe(50);
  });
});

describe("crystalType", () => {
  it("sapphire for luxury", () => {
    expect(crystalType("luxury")).toBe("sapphire");
  });
});

describe("beatsPerHour", () => {
  it("4Hz = 28800", () => {
    expect(beatsPerHour(4)).toBe(28800);
  });
});

describe("frequencyFromBph", () => {
  it("28800 bph = 4 Hz", () => {
    expect(frequencyFromBph(28800)).toBe(4);
  });
});

describe("timegrapherReading", () => {
  it("healthy for good values", () => {
    expect(timegrapherReading(5, 0.3, 280)).toBe("healthy");
  });

  it("needs service for low amplitude", () => {
    expect(timegrapherReading(5, 0.3, 200)).toContain("amplitude");
  });
});

describe("bandSizeMm", () => {
  it("slightly less than wrist", () => {
    expect(bandSizeMm(180)).toBe(170);
  });
});

describe("springBarSize", () => {
  it("matches lug width", () => {
    expect(springBarSize(20)).toBe(20);
  });
});

describe("gasketLife", () => {
  it("3 years", () => {
    expect(gasketLife()).toBe(3);
  });
});

describe("lubricantReapply", () => {
  it("matches service interval", () => {
    expect(lubricantReapply("automatic")).toBe(serviceInterval("automatic"));
  });
});

describe("movementTypes", () => {
  it("returns 5 types", () => {
    expect(movementTypes()).toHaveLength(5);
  });
});
