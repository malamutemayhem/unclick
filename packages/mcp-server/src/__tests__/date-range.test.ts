import { describe, it, expect } from "vitest";
import { DateRange } from "../date-range.js";

describe("DateRange", () => {
  const jan = DateRange.fromISO("2024-01-01", "2024-01-31");
  const mid = DateRange.fromISO("2024-01-15", "2024-02-15");

  it("creates valid range", () => {
    expect(jan.days()).toBe(30);
  });

  it("throws for invalid range", () => {
    expect(() => new DateRange(new Date("2024-02-01"), new Date("2024-01-01"))).toThrow();
  });

  it("checks containment", () => {
    expect(jan.contains(new Date("2024-01-15"))).toBe(true);
    expect(jan.contains(new Date("2024-02-15"))).toBe(false);
  });

  it("detects overlap", () => {
    expect(jan.overlaps(mid)).toBe(true);
    expect(jan.overlaps(DateRange.fromISO("2024-03-01", "2024-03-31"))).toBe(false);
  });

  it("calculates intersection", () => {
    const inter = jan.intersection(mid);
    expect(inter).not.toBeNull();
    expect(inter!.start.toISOString().split("T")[0]).toBe("2024-01-15");
    expect(inter!.end.toISOString().split("T")[0]).toBe("2024-01-31");
  });

  it("returns null for non-overlapping intersection", () => {
    expect(jan.intersection(DateRange.fromISO("2024-06-01", "2024-06-30"))).toBeNull();
  });

  it("calculates union", () => {
    const u = jan.union(mid);
    expect(u).not.toBeNull();
    expect(u!.start.toISOString().split("T")[0]).toBe("2024-01-01");
    expect(u!.end.toISOString().split("T")[0]).toBe("2024-02-15");
  });

  it("calculates hours", () => {
    const oneDay = DateRange.fromISO("2024-01-01", "2024-01-02");
    expect(oneDay.hours()).toBe(24);
  });

  it("counts weekdays", () => {
    const week = DateRange.fromISO("2024-01-01", "2024-01-07");
    expect(week.weekdays()).toBeGreaterThan(0);
    expect(week.weekdays()).toBeLessThanOrEqual(7);
  });

  it("splits into chunks", () => {
    const chunks = jan.split(7);
    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks[0].days()).toBeLessThanOrEqual(7);
  });

  it("formats range", () => {
    expect(jan.format()).toBe("2024-01-01 to 2024-01-31");
  });

  it("creates lastNDays", () => {
    const range = DateRange.lastNDays(7);
    expect(range.days()).toBe(7);
  });

  it("creates thisMonth", () => {
    const range = DateRange.thisMonth();
    expect(range.days()).toBeGreaterThan(27);
  });

  it("iterates each day", () => {
    const short = DateRange.fromISO("2024-01-01", "2024-01-03");
    expect(short.eachDay().length).toBe(3);
  });
});
