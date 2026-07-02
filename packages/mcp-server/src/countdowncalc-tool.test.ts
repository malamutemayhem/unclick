import { describe, it, expect } from "vitest";
import { countdownCalc } from "./countdowncalc-tool.js";

describe("countdowncalc-tool", () => {
  it("calculates days to a future date", async () => {
    const r = await countdownCalc({ date: "2030-01-01" }) as Record<string, unknown>;
    expect(r.days).toBeGreaterThan(0);
    expect(r.direction).toBe("future");
    expect(r.day_of_week).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("calculates days to a past date", async () => {
    const r = await countdownCalc({ date: "2020-01-01" }) as Record<string, unknown>;
    expect(r.days).toBeLessThan(0);
    expect(r.direction).toBe("past");
  });

  it("shows weeks and remaining days", async () => {
    const r = await countdownCalc({ date: "2030-06-15" }) as Record<string, unknown>;
    expect(r.weeks).toBeGreaterThan(0);
    expect(r.weeks_and_days).toContain("weeks");
  });

  it("rejects invalid date", async () => {
    const r = await countdownCalc({ date: "not-a-date" }) as Record<string, unknown>;
    expect(r.error).toMatch(/invalid/i);
  });

  it("rejects missing date", async () => {
    const r = await countdownCalc({}) as Record<string, unknown>;
    expect(r.error).toMatch(/date/i);
  });
});
