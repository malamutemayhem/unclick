import { describe, it, expect } from "vitest";
import { parseDuration, toMs, formatDuration, parseTimeString, humanize } from "../duration.js";

describe("duration", () => {
  describe("parseDuration", () => {
    it("parses milliseconds", () => {
      const d = parseDuration(90061001);
      expect(d.days).toBe(1);
      expect(d.hours).toBe(1);
      expect(d.minutes).toBe(1);
      expect(d.seconds).toBe(1);
      expect(d.milliseconds).toBe(1);
    });
    it("handles zero", () => {
      const d = parseDuration(0);
      expect(d.days).toBe(0);
      expect(d.hours).toBe(0);
    });
  });

  describe("toMs", () => {
    it("converts full duration", () => {
      expect(toMs({ days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 })).toBe(90061001);
    });
    it("handles partial", () => {
      expect(toMs({ hours: 2 })).toBe(7200000);
    });
    it("handles empty", () => {
      expect(toMs({})).toBe(0);
    });
  });

  describe("formatDuration", () => {
    it("formats long", () => {
      expect(formatDuration(3661000)).toBe("1 hour, 1 minute, 1 second");
    });
    it("formats short", () => {
      expect(formatDuration(3661000, { short: true })).toBe("1h 1m 1s");
    });
    it("formats zero", () => {
      expect(formatDuration(0)).toBe("0 seconds");
    });
    it("pluralizes correctly", () => {
      expect(formatDuration(7200000)).toBe("2 hours");
    });
  });

  describe("parseTimeString", () => {
    it("parses hours and minutes", () => {
      expect(parseTimeString("2h 30m")).toBe(9000000);
    });
    it("parses days", () => {
      expect(parseTimeString("1d")).toBe(86400000);
    });
    it("parses seconds", () => {
      expect(parseTimeString("45s")).toBe(45000);
    });
    it("parses ms", () => {
      expect(parseTimeString("100ms")).toBe(100);
    });
    it("parses long form", () => {
      expect(parseTimeString("1 hour 30 minutes")).toBe(5400000);
    });
  });

  describe("humanize", () => {
    it("shows ms for small values", () => { expect(humanize(500)).toBe("500ms"); });
    it("shows seconds", () => { expect(humanize(5000)).toBe("5.0s"); });
    it("shows minutes", () => { expect(humanize(120000)).toBe("2.0m"); });
    it("shows hours", () => { expect(humanize(7200000)).toBe("2.0h"); });
    it("shows days", () => { expect(humanize(172800000)).toBe("2.0d"); });
  });
});
