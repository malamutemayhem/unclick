import { describe, it, expect } from "vitest";
import { tspSolve } from "./tsp-tool.js";

describe("tspSolve", () => {
  it("finds a tour for 3 cities", async () => {
    const r = await tspSolve({
      cities: [
        { name: "A", x: 0, y: 0 },
        { name: "B", x: 3, y: 0 },
        { name: "C", x: 0, y: 4 },
      ],
    }) as any;
    expect(r.city_count).toBe(3);
    expect(r.tour).toHaveLength(4);
    expect(r.tour[0]).toBe(r.tour[r.tour.length - 1]);
    expect(r.total_distance).toBeGreaterThan(0);
  });

  it("finds optimal for collinear cities", async () => {
    const r = await tspSolve({
      cities: [
        { name: "A", x: 0, y: 0 },
        { name: "B", x: 1, y: 0 },
        { name: "C", x: 2, y: 0 },
      ],
    }) as any;
    expect(r.total_distance).toBeCloseTo(4, 4);
  });

  it("handles 4 cities in a square", async () => {
    const r = await tspSolve({
      cities: [
        { name: "A", x: 0, y: 0 },
        { name: "B", x: 1, y: 0 },
        { name: "C", x: 1, y: 1 },
        { name: "D", x: 0, y: 1 },
      ],
    }) as any;
    expect(r.city_count).toBe(4);
    expect(r.total_distance).toBeCloseTo(4, 4);
  });

  it("rejects too few cities", async () => {
    await expect(tspSolve({
      cities: [{ name: "A", x: 0, y: 0 }],
    })).rejects.toThrow("at least 2");
  });

  it("stamps meta", async () => {
    const r = await tspSolve({
      cities: [
        { name: "A", x: 0, y: 0 },
        { name: "B", x: 1, y: 1 },
      ],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
