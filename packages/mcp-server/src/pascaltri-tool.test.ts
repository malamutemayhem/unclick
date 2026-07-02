import { describe, it, expect } from "vitest";
import { pascaltriGenerate } from "./pascaltri-tool.js";

describe("pascaltri-tool", () => {
  it("generates Pascal triangle", async () => {
    const r = await pascaltriGenerate({ rows: 5 }) as Record<string, unknown>;
    const tri = r.triangle as number[][];
    expect(tri.length).toBe(5);
    expect(tri[0]).toEqual([1]);
    expect(tri[4]).toEqual([1, 4, 6, 4, 1]);
    expect(r.unclick_meta).toBeDefined();
  });

  it("extracts specific row", async () => {
    const r = await pascaltriGenerate({ rows: 6, nth_row: 3 }) as Record<string, unknown>;
    expect(r.nth_row_values).toEqual([1, 3, 3, 1]);
  });

  it("defaults to 10 rows", async () => {
    const r = await pascaltriGenerate({}) as Record<string, unknown>;
    expect(r.rows).toBe(10);
  });
});
