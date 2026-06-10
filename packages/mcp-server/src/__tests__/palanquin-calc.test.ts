import { describe, it, expect } from "vitest";
import {
  poleLength, bearerCount, loadPerBearer, marchSpeedKmh,
  restStopInterval, cabinVolumeLiters, canopyWeightKg,
  journeyTimeHours, decorationCost, palanquinStyles,
} from "../palanquin-calc.js";

describe("poleLength", () => {
  it("2.5x cabin", () => {
    expect(poleLength(100)).toBe(250);
  });
});

describe("bearerCount", () => {
  it("2 for light", () => {
    expect(bearerCount(60)).toBe(2);
  });
  it("8 for heavy", () => {
    expect(bearerCount(300)).toBe(8);
  });
});

describe("loadPerBearer", () => {
  it("even split", () => {
    expect(loadPerBearer(200, 4)).toBe(50);
  });
  it("zero bearers = 0", () => {
    expect(loadPerBearer(200, 0)).toBe(0);
  });
});

describe("marchSpeedKmh", () => {
  it("positive speed", () => {
    expect(marchSpeedKmh(0, 80)).toBeGreaterThan(0);
  });
  it("slower uphill", () => {
    expect(marchSpeedKmh(10, 80)).toBeLessThan(marchSpeedKmh(0, 80));
  });
});

describe("restStopInterval", () => {
  it("shorter in heat", () => {
    expect(restStopInterval(40)).toBeLessThan(restStopInterval(20));
  });
});

describe("cabinVolumeLiters", () => {
  it("positive volume", () => {
    expect(cabinVolumeLiters(120, 80, 100)).toBeGreaterThan(0);
  });
});

describe("canopyWeightKg", () => {
  it("silk lightest", () => {
    expect(canopyWeightKg(10000, "silk")).toBeLessThan(canopyWeightKg(10000, "leather"));
  });
});

describe("journeyTimeHours", () => {
  it("positive hours", () => {
    expect(journeyTimeHours(20, 4, 10, 45)).toBeGreaterThan(0);
  });
  it("zero speed = 0", () => {
    expect(journeyTimeHours(20, 0, 10, 45)).toBe(0);
  });
});

describe("decorationCost", () => {
  it("jiao most expensive", () => {
    expect(decorationCost("jiao")).toBeGreaterThan(decorationCost("machila"));
  });
});

describe("palanquinStyles", () => {
  it("returns 5 styles", () => {
    expect(palanquinStyles()).toHaveLength(5);
  });
});
