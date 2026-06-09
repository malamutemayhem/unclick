import { describe, it, expect } from "vitest";
import {
  sailArea, hullSpeed, displacement, stabilityRatio,
  heelAngle, vmg, apparentWind, reefPoint, anchorScope,
  chainWeight, fuelConsumption, watermaker, etaHours,
  sailTypes,
} from "../sailing-calc.js";

describe("sailArea", () => {
  it("triangle area", () => {
    expect(sailArea(10, 4)).toBe(20);
  });
});

describe("hullSpeed", () => {
  it("positive knots", () => {
    expect(hullSpeed(30)).toBeGreaterThan(0);
  });

  it("longer waterline = faster", () => {
    expect(hullSpeed(40)).toBeGreaterThan(hullSpeed(30));
  });
});

describe("displacement", () => {
  it("positive kg", () => {
    expect(displacement(10, 3, 1.5)).toBeGreaterThan(0);
  });
});

describe("stabilityRatio", () => {
  it("percent of displacement", () => {
    expect(stabilityRatio(2000, 5000)).toBe(40);
  });
});

describe("heelAngle", () => {
  it("more wind = more heel", () => {
    expect(heelAngle(25, 30, 5000)).toBeGreaterThan(heelAngle(10, 30, 5000));
  });

  it("capped at 45", () => {
    expect(heelAngle(60, 100, 1000)).toBeLessThanOrEqual(45);
  });
});

describe("vmg", () => {
  it("positive upwind", () => {
    expect(vmg(6, 45)).toBeGreaterThan(0);
  });

  it("less than boat speed", () => {
    expect(vmg(6, 45)).toBeLessThan(6);
  });
});

describe("apparentWind", () => {
  it("positive value", () => {
    expect(apparentWind(15, 6, 45)).toBeGreaterThan(0);
  });
});

describe("reefPoint", () => {
  it("0 in light wind", () => {
    expect(reefPoint(10)).toBe(0);
  });

  it("2 in strong wind", () => {
    expect(reefPoint(30)).toBe(2);
  });
});

describe("anchorScope", () => {
  it("more in storm", () => {
    expect(anchorScope(5, "storm")).toBeGreaterThan(anchorScope(5, "calm"));
  });
});

describe("chainWeight", () => {
  it("positive kg", () => {
    expect(chainWeight(50, 10)).toBeGreaterThan(0);
  });
});

describe("fuelConsumption", () => {
  it("positive liters/hr", () => {
    expect(fuelConsumption(30)).toBeGreaterThan(0);
  });
});

describe("watermaker", () => {
  it("3L per person per day", () => {
    expect(watermaker(4, 7)).toBe(84);
  });
});

describe("etaHours", () => {
  it("distance / speed", () => {
    expect(etaHours(60, 6)).toBe(10);
  });
});

describe("sailTypes", () => {
  it("returns 5 types", () => {
    expect(sailTypes()).toHaveLength(5);
  });
});
