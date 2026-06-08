import { describe, it, expect } from "vitest";
import { fromMs, toMs, format, formatCompact, parse, add, subtract } from "../duration.js";

describe("fromMs", () => {
  it("breaks down milliseconds", () => {
    const d = fromMs(90061001);
    expect(d.days).toBe(1);
    expect(d.hours).toBe(1);
    expect(d.minutes).toBe(1);
    expect(d.seconds).toBe(1);
    expect(d.milliseconds).toBe(1);
  });

  it("handles zero", () => {
    const d = fromMs(0);
    expect(d.days).toBe(0);
    expect(d.hours).toBe(0);
  });
});

describe("toMs", () => {
  it("converts duration to ms", () => {
    expect(toMs({ hours: 1, minutes: 30 })).toBe(5400000);
  });

  it("handles partial input", () => {
    expect(toMs({ seconds: 5 })).toBe(5000);
  });
});

describe("format", () => {
  it("formats hours and minutes", () => {
    expect(format(3661000)).toBe("1h 1m 1s");
  });

  it("shows only seconds for small values", () => {
    expect(format(500)).toBe("0s");
  });

  it("shows days", () => {
    expect(format(86400000)).toBe("1d");
  });
});

describe("formatCompact", () => {
  it("formats ms", () => {
    expect(formatCompact(500)).toBe("500ms");
  });

  it("formats seconds", () => {
    expect(formatCompact(2500)).toBe("2.5s");
  });

  it("formats minutes", () => {
    expect(formatCompact(120000)).toBe("2.0m");
  });

  it("formats hours", () => {
    expect(formatCompact(7200000)).toBe("2.0h");
  });

  it("formats days", () => {
    expect(formatCompact(172800000)).toBe("2.0d");
  });
});

describe("parse", () => {
  it("parses single unit", () => {
    expect(parse("5s")).toBe(5000);
  });

  it("parses multiple units", () => {
    expect(parse("1h 30m")).toBe(5400000);
  });

  it("parses long form", () => {
    expect(parse("2 hours 15 minutes")).toBe(8100000);
  });

  it("parses milliseconds", () => {
    expect(parse("500ms")).toBe(500);
  });

  it("parses days", () => {
    expect(parse("1d")).toBe(86400000);
  });
});

describe("add and subtract", () => {
  it("adds durations", () => {
    expect(add(1000, 2000)).toBe(3000);
  });

  it("subtracts durations", () => {
    expect(subtract(3000, 1000)).toBe(2000);
  });
});
