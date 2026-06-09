import { describe, it, expect } from "vitest";
import { mosAlgorithm } from "./mosalgo-tool.js";

describe("mosAlgorithm", () => {
  it("computes range sums", async () => {
    const r = (await mosAlgorithm({
      array: [1, 2, 3, 4, 5],
      queries: [[0, 2], [1, 4], [0, 4]],
    })) as any;
    expect(r.results[0].sum).toBe(6);
    expect(r.results[1].sum).toBe(14);
    expect(r.results[2].sum).toBe(15);
  });

  it("counts distinct elements", async () => {
    const r = (await mosAlgorithm({
      array: [1, 2, 1, 3, 2],
      queries: [[0, 2], [0, 4]],
    })) as any;
    expect(r.results[0].distinct).toBe(2);
    expect(r.results[1].distinct).toBe(3);
  });

  it("handles single element ranges", async () => {
    const r = (await mosAlgorithm({
      array: [10, 20, 30],
      queries: [[0, 0], [1, 1], [2, 2]],
    })) as any;
    expect(r.results[0].sum).toBe(10);
    expect(r.results[1].sum).toBe(20);
    expect(r.results[2].sum).toBe(30);
    expect(r.results[0].distinct).toBe(1);
  });

  it("reports block size", async () => {
    const r = (await mosAlgorithm({
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      queries: [[0, 8]],
    })) as any;
    expect(r.block_size).toBe(3);
    expect(r.query_count).toBe(1);
  });

  it("stamps meta", async () => {
    const r = (await mosAlgorithm({
      array: [1],
      queries: [[0, 0]],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
