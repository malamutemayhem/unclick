import { describe, it, expect } from "vitest";
import { Duration } from "../duration.js";

describe("Duration", () => {
  it("creates from various units", () => {
    expect(Duration.milliseconds(500).ms).toBe(500);
    expect(Duration.seconds(2).ms).toBe(2000);
    expect(Duration.minutes(1).ms).toBe(60000);
    expect(Duration.hours(1).ms).toBe(3600000);
    expect(Duration.days(1).ms).toBe(86400000);
  });

  it("converts to units", () => {
    const d = Duration.minutes(2);
    expect(d.seconds).toBe(120);
    expect(d.minutes).toBe(2);
  });

  it("add and subtract", () => {
    const a = Duration.seconds(30);
    const b = Duration.seconds(10);
    expect(a.add(b).ms).toBe(40000);
    expect(a.subtract(b).ms).toBe(20000);
  });

  it("multiply", () => {
    expect(Duration.seconds(5).multiply(3).ms).toBe(15000);
  });

  it("isZero and isNegative", () => {
    expect(Duration.milliseconds(0).isZero()).toBe(true);
    expect(Duration.milliseconds(-1).isNegative()).toBe(true);
    expect(Duration.milliseconds(1).isNegative()).toBe(false);
  });

  it("format", () => {
    expect(Duration.milliseconds(500).format()).toBe("500ms");
    expect(Duration.seconds(5).format()).toBe("5.0s");
    expect(Duration.minutes(2).format()).toBe("2.0m");
    expect(Duration.hours(3).format()).toBe("3.0h");
    expect(Duration.days(1).format()).toBe("1.0d");
  });

  it("between dates", () => {
    const a = new Date("2024-01-01");
    const b = new Date("2024-01-02");
    expect(Duration.between(a, b).days).toBe(1);
  });

  it("parse", () => {
    expect(Duration.parse("500ms").ms).toBe(500);
    expect(Duration.parse("2s").ms).toBe(2000);
    expect(Duration.parse("5m").ms).toBe(300000);
    expect(Duration.parse("1h").ms).toBe(3600000);
    expect(Duration.parse("1d").ms).toBe(86400000);
  });

  it("parse throws for invalid", () => {
    expect(() => Duration.parse("abc")).toThrow("Invalid duration");
  });
});
