import { describe, it, expect } from "vitest";
import { fenwickTree } from "./fenwick-tool.js";

describe("fenwickTree", () => {
  it("computes initial total", async () => {
    const r = (await fenwickTree({ values: [1, 2, 3, 4, 5] })) as any;
    expect(r.initial_total).toBe(15);
    expect(r.size).toBe(5);
  });

  it("handles range queries", async () => {
    const r = (await fenwickTree({
      values: [1, 3, 5, 7, 9],
      operations: [
        { type: "query", left: 0, right: 4 },
        { type: "query", left: 1, right: 3 },
      ],
    })) as any;
    expect(r.operation_results[0].sum).toBe(25);
    expect(r.operation_results[1].sum).toBe(15);
  });

  it("handles point update then query", async () => {
    const r = (await fenwickTree({
      values: [1, 2, 3],
      operations: [
        { type: "update", index: 1, delta: 5 },
        { type: "query", left: 0, right: 2 },
        { type: "point_query", index: 1 },
      ],
    })) as any;
    expect(r.operation_results[0].new_value).toBe(7);
    expect(r.operation_results[1].sum).toBe(11);
    expect(r.operation_results[2].value).toBe(7);
  });

  it("rejects empty values", async () => {
    await expect(fenwickTree({ values: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await fenwickTree({ values: [1] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
