import { describe, it, expect } from "vitest";
import {
  calciningTemp, burnTimeHours, yieldPercent, quicklimeKg,
  waterForSlaking, slakingTemp, mortarRatio, settingTimeHours,
  fuelKg, co2EmissionsKg, limeSources,
} from "../quicklime-calc.js";

describe("calciningTemp", () => {
  it("marble hottest", () => {
    expect(calciningTemp("marble")).toBeGreaterThan(calciningTemp("shell"));
  });
});

describe("burnTimeHours", () => {
  it("positive hours", () => {
    expect(burnTimeHours(100, 2)).toBeGreaterThan(0);
  });
  it("zero kiln = 0", () => {
    expect(burnTimeHours(100, 0)).toBe(0);
  });
});

describe("yieldPercent", () => {
  it("limestone highest yield", () => {
    expect(yieldPercent("limestone")).toBeGreaterThan(yieldPercent("coral"));
  });
});

describe("quicklimeKg", () => {
  it("less than raw", () => {
    expect(quicklimeKg(100, "limestone")).toBeLessThan(100);
  });
});

describe("waterForSlaking", () => {
  it("positive liters", () => {
    expect(waterForSlaking(50)).toBeGreaterThan(0);
  });
});

describe("slakingTemp", () => {
  it("300 degrees", () => {
    expect(slakingTemp()).toBe(300);
  });
});

describe("mortarRatio", () => {
  it("pointing is 1:2", () => {
    expect(mortarRatio("pointing")).toBe("1:2");
  });
});

describe("settingTimeHours", () => {
  it("positive hours", () => {
    expect(settingTimeHours(10, 50)).toBeGreaterThan(0);
  });
});

describe("fuelKg", () => {
  it("coke least fuel", () => {
    expect(fuelKg(100, "coke")).toBeLessThan(fuelKg(100, "wood"));
  });
});

describe("co2EmissionsKg", () => {
  it("positive kg", () => {
    expect(co2EmissionsKg(100)).toBeGreaterThan(0);
  });
});

describe("limeSources", () => {
  it("returns 5 sources", () => {
    expect(limeSources()).toHaveLength(5);
  });
});
