import { describe, it, expect } from "vitest";
import {
  hourAngle, gnomonAngle, horizontalHourLine, verticalHourLine,
  gnomonHeight, equationOfTime, solarNoon, shadowLength,
  sunElevation, declination, daylightHours, dialSize, sundialTypes,
} from "../sundial-calc.js";

describe("hourAngle", () => {
  it("noon = 0 degrees", () => {
    expect(hourAngle(12)).toBe(0);
  });
  it("3pm = 45 degrees", () => {
    expect(hourAngle(15)).toBe(45);
  });
  it("9am = -45 degrees", () => {
    expect(hourAngle(9)).toBe(-45);
  });
});

describe("gnomonAngle", () => {
  it("equals latitude", () => {
    expect(gnomonAngle(45)).toBe(45);
  });
});

describe("horizontalHourLine", () => {
  it("noon line is 0", () => {
    expect(horizontalHourLine(0, 45)).toBe(0);
  });
  it("positive for positive hour angle", () => {
    expect(horizontalHourLine(45, 45)).toBeGreaterThan(0);
  });
});

describe("verticalHourLine", () => {
  it("noon line is 0", () => {
    expect(verticalHourLine(0, 45)).toBe(0);
  });
});

describe("gnomonHeight", () => {
  it("positive for 45 lat", () => {
    expect(gnomonHeight(10, 45)).toBeGreaterThan(0);
  });
});

describe("equationOfTime", () => {
  it("returns minutes", () => {
    const eot = equationOfTime(100);
    expect(eot).toBeGreaterThan(-20);
    expect(eot).toBeLessThan(20);
  });
});

describe("solarNoon", () => {
  it("returns time string", () => {
    expect(solarNoon(0, 0, 0)).toContain(":");
  });
  it("near 12:00 for zero corrections", () => {
    expect(solarNoon(0, 0, 0)).toBe("12:00");
  });
});

describe("shadowLength", () => {
  it("infinite at sunset", () => {
    expect(shadowLength(1, 0)).toBe(Infinity);
  });
  it("positive for positive elevation", () => {
    expect(shadowLength(1, 45)).toBeGreaterThan(0);
  });
});

describe("sunElevation", () => {
  it("returns degrees", () => {
    const elev = sunElevation(45, 23, 0);
    expect(elev).toBeGreaterThan(0);
    expect(elev).toBeLessThan(90);
  });
});

describe("declination", () => {
  it("summer solstice near +23.45", () => {
    const d = declination(172);
    expect(d).toBeGreaterThan(20);
  });
  it("winter solstice near -23.45", () => {
    const d = declination(355);
    expect(d).toBeLessThan(-20);
  });
});

describe("daylightHours", () => {
  it("equator equinox = 12 hours", () => {
    expect(daylightHours(0, 0)).toBe(12);
  });
  it("polar summer = 24 hours", () => {
    expect(daylightHours(80, 23)).toBe(24);
  });
  it("polar winter = 0 hours", () => {
    expect(daylightHours(80, -23)).toBe(0);
  });
});

describe("dialSize", () => {
  it("positive cm", () => {
    expect(dialSize(1)).toBeGreaterThan(0);
  });
});

describe("sundialTypes", () => {
  it("returns 5 types", () => {
    expect(sundialTypes()).toHaveLength(5);
  });
});
