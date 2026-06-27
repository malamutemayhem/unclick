import { describe, it, expect } from "vitest";
import {
  julianDay, julianCentury, solarDeclination,
  equationOfTime, solarNoon, sunrise, sunset, dayLength,
  moonPhase, moonPhaseName, siderealTime,
  formatHoursMinutes, angularDistance,
} from "../astro-calc.js";

describe("julianDay", () => {
  it("J2000 epoch", () => {
    expect(julianDay(2000, 1, 1.5)).toBeCloseTo(2451545.0, 0);
  });

  it("known date", () => {
    expect(julianDay(2024, 6, 21)).toBeCloseTo(2460482.5, 0);
  });
});

describe("julianCentury", () => {
  it("0 at J2000", () => {
    expect(julianCentury(2451545.0)).toBeCloseTo(0);
  });
});

describe("solarDeclination", () => {
  it("positive in northern summer", () => {
    const T = julianCentury(julianDay(2024, 6, 21));
    expect(solarDeclination(T)).toBeGreaterThan(20);
  });

  it("negative in northern winter", () => {
    const T = julianCentury(julianDay(2024, 12, 21));
    expect(solarDeclination(T)).toBeLessThan(-20);
  });
});

describe("equationOfTime", () => {
  it("returns minutes", () => {
    const T = julianCentury(julianDay(2024, 2, 12));
    const eot = equationOfTime(T);
    expect(Math.abs(eot)).toBeLessThan(20);
  });
});

describe("solarNoon", () => {
  it("near 12:00 at prime meridian", () => {
    const jd = julianDay(2024, 6, 21);
    const noon = solarNoon(0, jd);
    expect(noon).toBeCloseTo(12, 0);
  });
});

describe("sunrise / sunset", () => {
  it("sunrise before noon", () => {
    const sr = sunrise(51.5, -0.1, 2024, 6, 21);
    expect(sr).not.toBeNull();
    expect(sr!).toBeLessThan(12);
  });

  it("sunset after noon", () => {
    const ss = sunset(51.5, -0.1, 2024, 6, 21);
    expect(ss).not.toBeNull();
    expect(ss!).toBeGreaterThan(12);
  });

  it("sunrise is before sunset", () => {
    const sr = sunrise(40, -74, 2024, 3, 20);
    const ss = sunset(40, -74, 2024, 3, 20);
    expect(sr).not.toBeNull();
    expect(ss).not.toBeNull();
    expect(sr!).toBeLessThan(ss!);
  });
});

describe("dayLength", () => {
  it("longer days in summer", () => {
    const summer = dayLength(51.5, -0.1, 2024, 6, 21);
    const winter = dayLength(51.5, -0.1, 2024, 12, 21);
    expect(summer).not.toBeNull();
    expect(winter).not.toBeNull();
    expect(summer!).toBeGreaterThan(winter!);
  });
});

describe("moonPhase", () => {
  it("returns value between 0 and 1", () => {
    const phase = moonPhase(2024, 6, 22);
    expect(phase).toBeGreaterThanOrEqual(0);
    expect(phase).toBeLessThan(1);
  });
});

describe("moonPhaseName", () => {
  it("names phases correctly", () => {
    expect(moonPhaseName(0)).toBe("New Moon");
    expect(moonPhaseName(0.5)).toBe("Full Moon");
    expect(moonPhaseName(0.25)).toBe("First Quarter");
  });
});

describe("siderealTime", () => {
  it("returns 0-360 range", () => {
    const st = siderealTime(julianDay(2024, 6, 21), 0);
    expect(st).toBeGreaterThanOrEqual(0);
    expect(st).toBeLessThan(360);
  });
});

describe("formatHoursMinutes", () => {
  it("formats hours", () => {
    expect(formatHoursMinutes(14.5)).toBe("14:30");
  });

  it("pads with zeros", () => {
    expect(formatHoursMinutes(6.25)).toBe("06:15");
  });
});

describe("angularDistance", () => {
  it("same point is 0", () => {
    expect(angularDistance(10, 20, 10, 20)).toBeCloseTo(0);
  });

  it("opposite poles", () => {
    expect(angularDistance(0, 90, 0, -90)).toBeCloseTo(180);
  });
});
