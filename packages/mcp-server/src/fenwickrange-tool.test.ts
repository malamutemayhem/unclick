import { describe, it, expect } from "vitest";
import { fenwickRange } from "./fenwickrange-tool.js";

describe("fenwickRange", () => {
  it("queries initial values without updates", async () => {
    const r = (await fenwickRange({
      values: [1, 2, 3, 4, 5],
      operations: [{ type: "query", left: 0, right: 4 }],
    })) as any;
    expect(r.results).toEqual([15]);
    expect(r.initial_size).toBe(5);
  });

  it("applies range update and queries", async () => {
    const r = (await fenwickRange({
      values: [0, 0, 0, 0, 0],
      operations: [
        { type: "update", left: 1, right: 3, value: 10 },
        { type: "query", left: 0, right: 4 },
        { type: "query", left: 1, right: 3 },
      ],
    })) as any;
    expect(r.results).toEqual([null, 30, 30]);
    expect(r.final_values).toEqual([0, 10, 10, 10, 0]);
  });

  it("handles single-element update and query", async () => {
    const r = (await fenwickRange({
      values: [5, 3, 7],
      operations: [
        { type: "update", left: 1, right: 1, value: 2 },
        { type: "query", left: 1, right: 1 },
      ],
    })) as any;
    expect(r.results).toEqual([null, 5]);
    expect(r.final_values).toEqual([5, 5, 7]);
  });

  it("rejects invalid range", async () => {
    await expect(
      fenwickRange({
        values: [1, 2, 3],
        operations: [{ type: "query", left: 2, right: 1 }],
      }),
    ).rejects.toThrow("Invalid range");
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await fenwickRange({
      values: [1],
      operations: [],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
    expect(r.operations_count).toBe(0);
  });
});
