import { describe, it, expect } from "vitest";
import { parseCron, nextRun, matches, describe as describeCron } from "../cron-parser.js";

describe("cron-parser", () => {
  describe("parseCron", () => {
    it("parses every minute", () => {
      const f = parseCron("* * * * *");
      expect(f.minute).toHaveLength(60);
      expect(f.hour).toHaveLength(24);
    });

    it("parses specific values", () => {
      const f = parseCron("30 8 * * 1");
      expect(f.minute).toEqual([30]);
      expect(f.hour).toEqual([8]);
      expect(f.dayOfWeek).toEqual([1]);
    });

    it("parses ranges", () => {
      const f = parseCron("0 9-17 * * *");
      expect(f.hour).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
    });

    it("parses steps", () => {
      const f = parseCron("*/15 * * * *");
      expect(f.minute).toEqual([0, 15, 30, 45]);
    });

    it("parses comma-separated", () => {
      const f = parseCron("0 8,12,18 * * *");
      expect(f.hour).toEqual([8, 12, 18]);
    });

    it("throws for invalid expression", () => {
      expect(() => parseCron("* * *")).toThrow("5 fields");
    });
  });

  describe("matches", () => {
    it("returns true for matching date", () => {
      const date = new Date(2026, 0, 5, 8, 30); // Mon Jan 5 2026 08:30
      expect(matches("30 8 5 1 1", date)).toBe(true);
    });

    it("returns false for non-matching", () => {
      const date = new Date(2026, 0, 5, 9, 0);
      expect(matches("30 8 * * *", date)).toBe(false);
    });
  });

  describe("nextRun", () => {
    it("finds next matching time", () => {
      const after = new Date(2026, 0, 1, 0, 0);
      const next = nextRun("0 12 * * *", after);
      expect(next.getHours()).toBe(12);
      expect(next.getMinutes()).toBe(0);
    });
  });

  describe("describe", () => {
    it("describes every minute", () => {
      expect(describeCron("* * * * *")).toContain("every minute");
    });

    it("describes specific time", () => {
      expect(describeCron("30 8 * * *")).toContain("minute 30");
      expect(describeCron("30 8 * * *")).toContain("hour 8");
    });
  });
});
