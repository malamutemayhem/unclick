import { describe, it, expect } from "vitest";
import { rmqSparse } from "./rmqsparse-tool.js";

describe("rmqSparse", () => {
  it("finds minimum in a range", async () => {
    const r = (await rmqSparse({
      values: [3, 1, 4, 1, 5, 9, 2, 6],
      queries: [[0, 3]],
    })) as any;
    expect(r.results[0].value).toBe(1);
    expect(r.results[0].index).toBe(1);
  });

  it("finds maximum in a range", async () => {
    const r = (await rmqSparse({
      values: [3, 1, 4, 1, 5, 9, 2, 6],
      queries: [[4, 7]],
      mode: "max",
    })) as any;
    expect(r.results[0].value).toBe(9);
    expect(r.results[0].index).toBe(5);
  });

  it("answers multiple queries", async () => {
    const r = (await rmqSparse({
      values: [5, 2, 8, 1, 7],
      queries: [[0, 1], [2, 4], [0, 4]],
    })) as any;
    expect(r.query_count).toBe(3);
    expect(r.results[0].value).toBe(2);
    expect(r.results[1].value).toBe(1);
    expect(r.results[2].value).toBe(1);
  });

  it("handles single-element query", async () => {
    const r = (await rmqSparse({
      values: [10, 20, 30],
      queries: [[1, 1]],
    })) as any;
    expect(r.results[0].value).toBe(20);
    expect(r.results[0].index).toBe(1);
  });

  it("stamps meta", async () => {
    const r = (await rmqSparse({
      values: [1, 2, 3],
      queries: [[0, 2]],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
