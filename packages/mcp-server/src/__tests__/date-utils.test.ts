import { describe, it, expect } from "vitest";
import { startOfDay, endOfDay, addDays, addMonths, addYears, diffDays, isLeapYear, daysInMonth, isSameDay, isWeekend, formatRelative, parseISODate } from "../date-utils.js";

describe("startOfDay", () => {
  it("sets time to midnight", () => {
    const d = startOfDay(new Date("2024-06-15T14:30:00"));
    expect(d.getHours()).toBe(0);
    expect(d.getMinutes()).toBe(0);
  });
});

describe("endOfDay", () => {
  it("sets time to 23:59:59.999", () => {
    const d = endOfDay(new Date("2024-06-15T14:30:00"));
    expect(d.getHours()).toBe(23);
    expect(d.getMinutes()).toBe(59);
  });
});

describe("addDays", () => {
  it("adds days", () => {
    const d = addDays(new Date("2024-01-01"), 5);
    expect(d.getDate()).toBe(6);
  });

  it("handles month boundary", () => {
    const d = addDays(new Date("2024-01-31"), 1);
    expect(d.getMonth()).toBe(1);
  });
});

describe("addMonths", () => {
  it("adds months", () => {
    const d = addMonths(new Date("2024-01-15"), 2);
    expect(d.getMonth()).toBe(2);
  });
});

describe("addYears", () => {
  it("adds years", () => {
    const d = addYears(new Date("2024-01-15"), 1);
    expect(d.getFullYear()).toBe(2025);
  });
});

describe("diffDays", () => {
  it("computes difference", () => {
    expect(diffDays(new Date("2024-01-01"), new Date("2024-01-11"))).toBe(10);
  });
});

describe("isLeapYear", () => {
  it("identifies leap years", () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2023)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(1900)).toBe(false);
  });
});

describe("daysInMonth", () => {
  it("returns correct days", () => {
    expect(daysInMonth(2024, 1)).toBe(29);
    expect(daysInMonth(2023, 1)).toBe(28);
    expect(daysInMonth(2024, 0)).toBe(31);
  });
});

describe("isSameDay", () => {
  it("checks same day", () => {
    expect(isSameDay(new Date("2024-01-01T10:00"), new Date("2024-01-01T20:00"))).toBe(true);
    expect(isSameDay(new Date("2024-01-01"), new Date("2024-01-02"))).toBe(false);
  });
});

describe("isWeekend", () => {
  it("detects weekends", () => {
    expect(isWeekend(new Date("2024-06-08"))).toBe(true);
    expect(isWeekend(new Date("2024-06-10"))).toBe(false);
  });
});

describe("formatRelative", () => {
  it("formats recent past", () => {
    const now = new Date("2024-06-15T12:00:00");
    const fiveMinAgo = new Date("2024-06-15T11:55:00");
    expect(formatRelative(fiveMinAgo, now)).toBe("5 minutes ago");
  });

  it("formats just now", () => {
    const now = new Date();
    expect(formatRelative(now)).toBe("just now");
  });
});

describe("parseISODate", () => {
  it("parses valid date", () => {
    expect(parseISODate("2024-01-01").getFullYear()).toBe(2024);
  });

  it("throws on invalid", () => {
    expect(() => parseISODate("not-a-date")).toThrow("Invalid");
  });
});
