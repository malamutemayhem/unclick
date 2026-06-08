import { describe, it, expect } from "vitest";
import {
  toMilliseconds, fromMilliseconds, addDurations, subtractDurations,
  multiplyDuration, formatDuration, formatDurationLong, parseDuration, compareDurations
} from "../duration.js";

describe("duration", () => {
  it("toMilliseconds converts all fields", () => {
    expect(toMilliseconds({ days: 1, hours: 2, minutes: 3, seconds: 4, milliseconds: 5 }))
      .toBe(86400000 + 7200000 + 180000 + 4000 + 5);
  });

  it("fromMilliseconds decomposes correctly", () => {
    const d = fromMilliseconds(90061001);
    expect(d.days).toBe(1);
    expect(d.hours).toBe(1);
    expect(d.minutes).toBe(1);
    expect(d.seconds).toBe(1);
    expect(d.milliseconds).toBe(1);
  });

  it("round-trips through milliseconds", () => {
    const original = { days: 2, hours: 5, minutes: 30, seconds: 15, milliseconds: 500 };
    const ms = toMilliseconds(original);
    const back = fromMilliseconds(ms);
    expect(toMilliseconds(back)).toBe(ms);
  });

  it("addDurations works", () => {
    const sum = addDurations({ hours: 1 }, { minutes: 30 });
    expect(toMilliseconds(sum)).toBe(toMilliseconds({ hours: 1, minutes: 30 }));
  });

  it("subtractDurations works", () => {
    const diff = subtractDurations({ hours: 2 }, { hours: 1 });
    expect(toMilliseconds(diff)).toBe(3600000);
  });

  it("multiplyDuration doubles", () => {
    const doubled = multiplyDuration({ hours: 1 }, 2);
    expect(toMilliseconds(doubled)).toBe(7200000);
  });

  it("formatDuration short form", () => {
    expect(formatDuration({ hours: 1, minutes: 30 })).toBe("1h 30m");
    expect(formatDuration({})).toBe("0ms");
  });

  it("formatDurationLong", () => {
    expect(formatDurationLong({ hours: 2, seconds: 5 })).toBe("2 hours, 5 seconds");
    expect(formatDurationLong({ days: 1 })).toBe("1 day");
  });

  it("parseDuration from string", () => {
    const d = parseDuration("2h 30m 15s");
    expect(d.hours).toBe(2);
    expect(d.minutes).toBe(30);
    expect(d.seconds).toBe(15);
  });

  it("parseDuration handles days and ms", () => {
    const d = parseDuration("1d 500ms");
    expect(d.days).toBe(1);
    expect(d.milliseconds).toBe(500);
  });

  it("compareDurations orders correctly", () => {
    expect(compareDurations({ hours: 1 }, { hours: 2 })).toBeLessThan(0);
    expect(compareDurations({ hours: 2 }, { hours: 1 })).toBeGreaterThan(0);
    expect(compareDurations({ minutes: 60 }, { hours: 1 })).toBe(0);
  });
});
