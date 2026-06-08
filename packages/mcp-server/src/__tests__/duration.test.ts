import { describe, it, expect } from "vitest";
import { toMs, fromMs, format, parse, humanize, add, subtract } from "../duration.js";

describe("duration", () => {
  it("toMs converts to milliseconds", () => {
    expect(toMs({ hours: 1, minutes: 30 })).toBe(5400000);
    expect(toMs({ days: 1 })).toBe(86400000);
    expect(toMs({ seconds: 5, milliseconds: 500 })).toBe(5500);
  });

  it("fromMs decomposes milliseconds", () => {
    const d = fromMs(90061001);
    expect(d.days).toBe(1);
    expect(d.hours).toBe(1);
    expect(d.minutes).toBe(1);
    expect(d.seconds).toBe(1);
    expect(d.milliseconds).toBe(1);
  });

  it("format produces readable string", () => {
    expect(format({ hours: 2, minutes: 30 })).toBe("2h 30m");
    expect(format({})).toBe("0ms");
  });

  it("parse reads duration strings", () => {
    expect(toMs(parse("1h 30m"))).toBe(5400000);
    expect(toMs(parse("2d 5s"))).toBe(172805000);
    expect(toMs(parse("500ms"))).toBe(500);
  });

  it("humanize picks best unit", () => {
    expect(humanize(500)).toBe("500ms");
    expect(humanize(5000)).toBe("5.0s");
    expect(humanize(120000)).toBe("2.0m");
    expect(humanize(7200000)).toBe("2.0h");
    expect(humanize(172800000)).toBe("2.0d");
  });

  it("add combines durations", () => {
    const result = add({ hours: 1 }, { minutes: 30 });
    expect(toMs(result)).toBe(5400000);
  });

  it("subtract durations", () => {
    const result = subtract({ hours: 2 }, { hours: 1, minutes: 30 });
    expect(toMs(result)).toBe(1800000);
  });
});
