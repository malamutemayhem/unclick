import { describe, it, expect } from "vitest";
import { Duration } from "../duration.js";

describe("Duration", () => {
  it("creates from various units", () => {
    expect(Duration.milliseconds(500).toMilliseconds()).toBe(500);
    expect(Duration.seconds(2).toMilliseconds()).toBe(2000);
    expect(Duration.minutes(1).toSeconds()).toBe(60);
    expect(Duration.hours(1).toMinutes()).toBe(60);
    expect(Duration.days(1).toHours()).toBe(24);
  });

  it("parses strings", () => {
    expect(Duration.parse("500ms").toMilliseconds()).toBe(500);
    expect(Duration.parse("2s").toSeconds()).toBe(2);
    expect(Duration.parse("5m").toMinutes()).toBe(5);
    expect(Duration.parse("1h").toHours()).toBe(1);
    expect(Duration.parse("1d").toDays()).toBe(1);
  });

  it("throws on invalid parse", () => {
    expect(() => Duration.parse("abc")).toThrow("Invalid duration");
  });

  it("adds durations", () => {
    const d = Duration.seconds(10).add(Duration.seconds(5));
    expect(d.toSeconds()).toBe(15);
  });

  it("subtracts durations", () => {
    const d = Duration.minutes(5).subtract(Duration.minutes(2));
    expect(d.toMinutes()).toBe(3);
  });

  it("multiplies by factor", () => {
    const d = Duration.seconds(10).multiply(3);
    expect(d.toSeconds()).toBe(30);
  });

  it("checks zero and negative", () => {
    expect(Duration.milliseconds(0).isZero()).toBe(true);
    expect(Duration.seconds(-1).isNegative()).toBe(true);
    expect(Duration.seconds(1).isNegative()).toBe(false);
  });

  it("toString formats correctly", () => {
    expect(Duration.milliseconds(0).toString()).toBe("0ms");
    expect(Duration.milliseconds(500).toString()).toBe("500ms");
    expect(Duration.seconds(5).toString()).toBe("5s");
    expect(Duration.minutes(10).toString()).toBe("10m");
    expect(Duration.hours(2).toString()).toBe("2h");
    expect(Duration.days(1).toString()).toBe("1d");
  });

  it("compares durations", () => {
    expect(Duration.seconds(5).equals(Duration.milliseconds(5000))).toBe(true);
    expect(Duration.seconds(10).greaterThan(Duration.seconds(5))).toBe(true);
    expect(Duration.seconds(5).lessThan(Duration.seconds(10))).toBe(true);
  });
});
