import { describe, it, expect } from "vitest";
import { isLeapYear, daysInMonth, daysInYear, dayOfWeek, dayOfWeekName, dayOfYear, weekNumber, daysBetween, julianDay, fromJulianDay, addDays, easterDate, isWeekend, businessDaysBetween, monthName } from "../calendar-calc.js";

describe("isLeapYear", () => {
  it("identifies leap years", () => {
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(1900)).toBe(false);
    expect(isLeapYear(2023)).toBe(false);
  });
});

describe("daysInMonth", () => {
  it("returns correct days", () => {
    expect(daysInMonth(2024, 2)).toBe(29);
    expect(daysInMonth(2023, 2)).toBe(28);
    expect(daysInMonth(2024, 1)).toBe(31);
    expect(daysInMonth(2024, 4)).toBe(30);
  });
});

describe("daysInYear", () => {
  it("returns 365 or 366", () => {
    expect(daysInYear(2024)).toBe(366);
    expect(daysInYear(2023)).toBe(365);
  });
});

describe("dayOfWeek", () => {
  it("computes correct day", () => {
    expect(dayOfWeek(2024, 1, 1)).toBe(1);
    expect(dayOfWeekName(1)).toBe("Monday");
  });
});

describe("dayOfYear", () => {
  it("January 1 is day 1", () => {
    expect(dayOfYear(2024, 1, 1)).toBe(1);
  });

  it("December 31 of leap year is 366", () => {
    expect(dayOfYear(2024, 12, 31)).toBe(366);
  });
});

describe("daysBetween", () => {
  it("computes distance", () => {
    expect(daysBetween(2024, 1, 1, 2024, 1, 31)).toBe(30);
    expect(daysBetween(2024, 1, 1, 2025, 1, 1)).toBe(366);
  });
});

describe("julianDay roundtrip", () => {
  it("converts and back", () => {
    const jd = julianDay(2024, 6, 15);
    const date = fromJulianDay(jd);
    expect(date).toEqual({ year: 2024, month: 6, day: 15 });
  });
});

describe("addDays", () => {
  it("adds days correctly", () => {
    expect(addDays(2024, 1, 30, 5)).toEqual({ year: 2024, month: 2, day: 4 });
  });

  it("crosses year boundary", () => {
    expect(addDays(2024, 12, 30, 5)).toEqual({ year: 2025, month: 1, day: 4 });
  });
});

describe("easterDate", () => {
  it("computes Easter for known years", () => {
    expect(easterDate(2024)).toEqual({ month: 3, day: 31 });
    expect(easterDate(2023)).toEqual({ month: 4, day: 9 });
  });
});

describe("isWeekend", () => {
  it("identifies weekends", () => {
    expect(isWeekend(2024, 6, 15)).toBe(true);
    expect(isWeekend(2024, 6, 17)).toBe(false);
  });
});

describe("businessDaysBetween", () => {
  it("counts business days", () => {
    const bd = businessDaysBetween(2024, 6, 10, 2024, 6, 14);
    expect(bd).toBe(4);
  });
});

describe("monthName", () => {
  it("returns month names", () => {
    expect(monthName(1)).toBe("January");
    expect(monthName(12)).toBe("December");
  });
});

describe("weekNumber", () => {
  it("returns week number", () => {
    const wn = weekNumber(2024, 1, 7);
    expect(wn).toBeGreaterThan(0);
    expect(wn).toBeLessThanOrEqual(53);
  });
});
