import { describe, it, expect } from "vitest";
import {
  burnTimeHours, lightRadiusM, glassPanelArea, wickLengthCm,
  heatOutputBtu, windResistanceKph, chimneyDraftCfm, fuelCostPerHour,
  reflectorGain, maintenanceIntervalDays, lanternFuels,
} from "../lantern-calc.js";

describe("burnTimeHours", () => {
  it("positive hours", () => {
    expect(burnTimeHours(500, 25)).toBe(20);
  });
  it("zero consumption = 0", () => {
    expect(burnTimeHours(500, 0)).toBe(0);
  });
});

describe("lightRadiusM", () => {
  it("positive radius", () => {
    expect(lightRadiusM(100)).toBeGreaterThan(0);
  });
});

describe("glassPanelArea", () => {
  it("positive area", () => {
    expect(glassPanelArea(20, 10, 4)).toBeGreaterThan(0);
  });
});

describe("wickLengthCm", () => {
  it("positive length", () => {
    expect(wickLengthCm(10, 0.5)).toBe(5);
  });
});

describe("heatOutputBtu", () => {
  it("kerosene hottest", () => {
    expect(heatOutputBtu("kerosene")).toBeGreaterThan(heatOutputBtu("oil"));
  });
  it("electric is 0", () => {
    expect(heatOutputBtu("electric")).toBe(0);
  });
});

describe("windResistanceKph", () => {
  it("positive kph", () => {
    expect(windResistanceKph(3, 4)).toBeGreaterThan(0);
  });
});

describe("chimneyDraftCfm", () => {
  it("positive cfm", () => {
    expect(chimneyDraftCfm(30, 5)).toBeGreaterThan(0);
  });
});

describe("fuelCostPerHour", () => {
  it("positive cost", () => {
    expect(fuelCostPerHour(2.5, 30)).toBeGreaterThan(0);
  });
});

describe("reflectorGain", () => {
  it("above 1", () => {
    expect(reflectorGain(80)).toBeGreaterThan(1);
  });
});

describe("maintenanceIntervalDays", () => {
  it("positive days", () => {
    expect(maintenanceIntervalDays(4, 100)).toBe(25);
  });
  it("zero hours = 0", () => {
    expect(maintenanceIntervalDays(0, 100)).toBe(0);
  });
});

describe("lanternFuels", () => {
  it("returns 5 fuels", () => {
    expect(lanternFuels()).toHaveLength(5);
  });
});
