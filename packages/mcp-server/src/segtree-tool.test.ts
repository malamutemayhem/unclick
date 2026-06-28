import { describe, it, expect } from "vitest";
import { segTree } from "./segtree-tool.js";

describe("segTree", () => {
  it("computes full sum", async () => {
    const r = (await segTree({ values: [1, 2, 3, 4, 5] })) as any;
    expect(r.full_result).toBe(15);
    expect(r.size).toBe(5);
    expect(r.operation).toBe("sum");
  });

  it("handles range sum queries", async () => {
    const r = (await segTree({
      values: [1, 3, 5, 7, 9],
      operations: [
        { type: "query", left: 1, right: 3 },
        { type: "query", left: 0, right: 4 },
      ],
    })) as any;
    expect(r.operation_results[0].result).toBe(15);
    expect(r.operation_results[1].result).toBe(25);
  });

  it("handles min operation", async () => {
    const r = (await segTree({
      values: [5, 2, 8, 1, 4],
      operation: "min",
      operations: [{ type: "query", left: 0, right: 4 }],
    })) as any;
    expect(r.operation_results[0].result).toBe(1);
  });

  it("handles update then query", async () => {
    const r = (await segTree({
      values: [1, 2, 3],
      operation: "max",
      operations: [
        { type: "update", index: 1, value: 10 },
        { type: "query", left: 0, right: 2 },
      ],
    })) as any;
    expect(r.operation_results[1].result).toBe(10);
  });

  it("rejects empty values", async () => {
    await expect(segTree({ values: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await segTree({ values: [1] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
