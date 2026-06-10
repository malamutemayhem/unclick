import { describe, it, expect } from "vitest";
import {
  dayOfYear, season, moonPhase, sunriseApprox, sunsetApprox,
  daylightMinutes, frostRisk, growingDegreeDays, moonPhases,
} from "../almanac-calc.js";

describe("dayOfYear", () => {
  it("Jan 1 = 1", () => {
    expect(dayOfYear(1, 1)).toBe(1);
  });
  it("Feb 1 = 32", () => {
    expect(dayOfYear(2, 1)).toBe(32);
  });
});

describe("season", () => {
  it("summer in northern hemisphere", () => {
    expect(season(200, "northern")).toBe("summer");
  });
  it("winter in southern hemisphere at same day", () => {
    expect(season(200, "southern")).toBe("winter");
  });
});

describe("moonPhase", () => {
  it("0 days = new", () => {
    expect(moonPhase(0)).toBe("new");
  });
  it("15 days = full", () => {
    expect(moonPhase(15)).toBe("full");
  });
});

describe("sunriseApprox", () => {
  it("positive hour", () => {
    const sr = sunriseApprox(45, 172);
    expect(sr).toBeGreaterThan(3);
    expect(sr).toBeLessThan(8);
  });
});

describe("sunsetApprox", () => {
  it("after sunrise", () => {
    expect(sunsetApprox(45, 172)).toBeGreaterThan(sunriseApprox(45, 172));
  });
});

describe("daylightMinutes", () => {
  it("positive minutes", () => {
    expect(daylightMinutes(45, 172)).toBeGreaterThan(0);
  });
});

describe("frostRisk", () => {
  it("freezing = high", () => {
    expect(frostRisk(-2, 50)).toBe("high");
  });
  it("warm = low", () => {
    expect(frostRisk(20, 50)).toBe("low");
  });
});

describe("growingDegreeDays", () => {
  it("positive GDD", () => {
    expect(growingDegreeDays(25, 15, 10)).toBeGreaterThan(0);
  });
  it("cold = 0", () => {
    expect(growingDegreeDays(5, 0, 10)).toBe(0);
  });
});

describe("moonPhases", () => {
  it("returns 8 phases", () => {
    expect(moonPhases()).toHaveLength(8);
  });
});
