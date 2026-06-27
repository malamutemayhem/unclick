import { describe, it, expect } from "vitest";
import { parseDateParts, formatDate, toISO, toUnixTimestamp, fromUnixTimestamp, relativeTime } from "../date-format.js";

describe("parseDateParts", () => {
  it("parses ISO date", () => {
    const parts = parseDateParts("2024-06-15T10:30:00");
    expect(parts).not.toBeNull();
    expect(parts!.year).toBe(2024);
    expect(parts!.month).toBe(6);
    expect(parts!.day).toBe(15);
    expect(parts!.hour).toBe(10);
  });

  it("parses ISO date only", () => {
    const parts = parseDateParts("2024-01-01");
    expect(parts!.year).toBe(2024);
    expect(parts!.hour).toBe(0);
  });

  it("parses US date format", () => {
    const parts = parseDateParts("12/25/2024");
    expect(parts!.month).toBe(12);
    expect(parts!.day).toBe(25);
  });

  it("returns null for invalid", () => {
    expect(parseDateParts("not a date")).toBeNull();
  });
});

describe("formatDate", () => {
  const parts = { year: 2024, month: 6, day: 15, hour: 14, minute: 30, second: 45, millisecond: 123 };

  it("formats year and month", () => {
    expect(formatDate(parts, "YYYY-MM-DD")).toBe("2024-06-15");
  });

  it("formats time", () => {
    expect(formatDate(parts, "HH:mm:ss")).toBe("14:30:45");
  });

  it("formats 12-hour time", () => {
    expect(formatDate(parts, "hh:mm A")).toBe("02:30 PM");
  });

  it("formats month name", () => {
    expect(formatDate(parts, "MMMM DD, YYYY")).toBe("June 15, 2024");
  });

  it("formats short month", () => {
    expect(formatDate(parts, "MMM DD")).toBe("Jun 15");
  });

  it("formats milliseconds", () => {
    expect(formatDate(parts, "HH:mm:ss.SSS")).toBe("14:30:45.123");
  });
});

describe("toISO", () => {
  it("produces ISO string", () => {
    const parts = { year: 2024, month: 1, day: 5, hour: 8, minute: 5, second: 3, millisecond: 7 };
    expect(toISO(parts)).toBe("2024-01-05T08:05:03.007Z");
  });
});

describe("unix timestamp", () => {
  it("converts to unix timestamp", () => {
    const ts = toUnixTimestamp({ year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 });
    expect(ts).toBe(0);
  });

  it("roundtrips through unix timestamp", () => {
    const original = { year: 2024, month: 6, day: 15, hour: 12, minute: 30, second: 45, millisecond: 0 };
    const ts = toUnixTimestamp(original);
    const restored = fromUnixTimestamp(ts);
    expect(restored.year).toBe(2024);
    expect(restored.month).toBe(6);
    expect(restored.day).toBe(15);
    expect(restored.hour).toBe(12);
  });
});

describe("relativeTime", () => {
  it("formats seconds", () => {
    expect(relativeTime(-30)).toBe("30 seconds ago");
  });

  it("formats minutes", () => {
    expect(relativeTime(-120)).toBe("2 minutes ago");
  });

  it("formats hours", () => {
    expect(relativeTime(7200)).toBe("2 hours from now");
  });

  it("formats days", () => {
    expect(relativeTime(-172800)).toBe("2 days ago");
  });
});
