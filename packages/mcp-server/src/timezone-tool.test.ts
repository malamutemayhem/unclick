import { describe, it, expect } from "vitest";
import { timezoneInfo } from "./timezone-tool.js";

describe("timezone-tool", () => {
  it("looks up a timezone", async () => {
    const r = await timezoneInfo({ timezone: "EST" }) as Record<string, unknown>;
    expect(r.offset_hours).toBe(-5);
    expect(r.name).toContain("Eastern");
    expect(r.utc_offset).toBe("UTC-5");
    expect(r.unclick_meta).toBeDefined();
  });

  it("lists all timezones when empty", async () => {
    const r = await timezoneInfo({}) as Record<string, unknown>;
    expect(r.count).toBeGreaterThan(20);
    const tzs = r.timezones as unknown[];
    expect(tzs.length).toBeGreaterThan(20);
  });

  it("handles AEST", async () => {
    const r = await timezoneInfo({ timezone: "AEST" }) as Record<string, unknown>;
    expect(r.offset_hours).toBe(10);
  });

  it("returns error for unknown timezone", async () => {
    const r = await timezoneInfo({ timezone: "ZZZZZ" }) as Record<string, unknown>;
    expect(r.error).toMatch(/unknown/i);
  });
});
