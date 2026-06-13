import { describe, expect, it } from "vitest";
import { parseDueAtInput } from "./todo-due.js";

describe("parseDueAtInput", () => {
  it("treats undefined as no change", () => {
    expect(parseDueAtInput(undefined)).toEqual({ ok: true, value: undefined });
  });

  it("treats null and empty string as clear", () => {
    expect(parseDueAtInput(null)).toEqual({ ok: true, value: null });
    expect(parseDueAtInput("")).toEqual({ ok: true, value: null });
    expect(parseDueAtInput("   ")).toEqual({ ok: true, value: null });
  });

  it("normalizes a date-only string to end of that day UTC", () => {
    const result = parseDueAtInput("2026-06-15");
    expect(result).toEqual({ ok: true, value: "2026-06-15T23:59:59.999Z" });
  });

  it("keeps a full ISO timestamp, normalized to UTC", () => {
    const result = parseDueAtInput("2026-06-15T09:00:00+10:00");
    expect(result).toEqual({ ok: true, value: "2026-06-14T23:00:00.000Z" });
  });

  it("rejects non-string non-null values", () => {
    const result = parseDueAtInput(12345);
    expect(result.ok).toBe(false);
  });

  it("rejects unparseable strings", () => {
    const result = parseDueAtInput("next tuesday-ish");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("valid date");
  });

  it("rejects years outside the sane window", () => {
    expect(parseDueAtInput("1999-12-31").ok).toBe(false);
    expect(parseDueAtInput("2101-01-01").ok).toBe(false);
  });
});
