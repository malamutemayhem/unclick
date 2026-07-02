import { describe, it, expect } from "vitest";
import { statisticsCalc } from "./statistics-tool.js";

describe("statistics-tool", () => {
  it("calculates basic statistics", async () => {
    const r = await statisticsCalc({ numbers: [1, 2, 3, 4, 5] }) as Record<string, unknown>;
    expect(r.mean).toBe(3);
    expect(r.median).toBe(3);
    expect(r.min).toBe(1);
    expect(r.max).toBe(5);
    expect(r.count).toBe(5);
    expect(r.unclick_meta).toBeDefined();
  });

  it("handles comma-separated string", async () => {
    const r = await statisticsCalc({ numbers: "10,20,30" }) as Record<string, unknown>;
    expect(r.mean).toBe(20);
    expect(r.sum).toBe(60);
  });

  it("finds mode", async () => {
    const r = await statisticsCalc({ numbers: [1, 2, 2, 3] }) as Record<string, unknown>;
    const mode = r.mode as number[];
    expect(mode).toContain(2);
  });

  it("calculates standard deviation", async () => {
    const r = await statisticsCalc({ numbers: [2, 4, 4, 4, 5, 5, 7, 9] }) as Record<string, unknown>;
    expect(r.standard_deviation).toBeGreaterThan(0);
  });

  it("rejects missing input", async () => {
    const r = await statisticsCalc({}) as Record<string, unknown>;
    expect(r.error).toMatch(/numbers/i);
  });
});
