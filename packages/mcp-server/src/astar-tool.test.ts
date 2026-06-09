import { describe, it, expect } from "vitest";
import { astarPath } from "./astar-tool.js";

describe("astarPath", () => {
  it("finds path in open grid", async () => {
    const r = await astarPath({
      grid: [[0,0,0],[0,0,0],[0,0,0]],
      start: [0,0],
      end: [2,2],
    }) as any;
    expect(r.found).toBe(true);
    expect(r.path[0]).toEqual([0,0]);
    expect(r.path[r.path.length - 1]).toEqual([2,2]);
  });

  it("finds path around wall", async () => {
    const r = await astarPath({
      grid: [[0,0,0],[1,1,0],[0,0,0]],
      start: [0,0],
      end: [2,0],
    }) as any;
    expect(r.found).toBe(true);
    expect(r.path_length).toBeGreaterThan(2);
  });

  it("returns not found when blocked", async () => {
    const r = await astarPath({
      grid: [[0,1,0],[0,1,0],[0,1,0]],
      start: [0,0],
      end: [0,2],
      diagonal: false,
    }) as any;
    expect(r.found).toBe(false);
    expect(r.path).toBeNull();
  });

  it("uses 4-direction when diagonal is false", async () => {
    const r = await astarPath({
      grid: [[0,0],[0,0]],
      start: [0,0],
      end: [1,1],
      diagonal: false,
    }) as any;
    expect(r.found).toBe(true);
    expect(r.path_length).toBe(2);
    expect(r.diagonal).toBe(false);
  });

  it("rejects wall start", async () => {
    await expect(astarPath({
      grid: [[1,0],[0,0]],
      start: [0,0],
      end: [1,1],
    })).rejects.toThrow("wall");
  });

  it("stamps meta", async () => {
    const r = await astarPath({
      grid: [[0,0],[0,0]],
      start: [0,0],
      end: [1,1],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
