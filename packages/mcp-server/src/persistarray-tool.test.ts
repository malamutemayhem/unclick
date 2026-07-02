import { describe, it, expect } from "vitest";
import { persistentArray } from "./persistarray-tool.js";

describe("persistentArray", () => {
  it("queries initial values", async () => {
    const r = (await persistentArray({
      initial: [10, 20, 30],
      operations: [
        { type: "get", version: 0, index: 1 },
      ],
    })) as any;
    expect(r.results[0].result).toBe(20);
  });

  it("creates new versions on set", async () => {
    const r = (await persistentArray({
      initial: [1, 2, 3],
      operations: [
        { type: "set", version: 0, index: 1, value: 99 },
        { type: "get", version: 1, index: 1 },
        { type: "get", version: 0, index: 1 },
      ],
    })) as any;
    expect(r.results[0].new_version).toBe(1);
    expect(r.results[1].result).toBe(99);
    expect(r.results[2].result).toBe(2);
  });

  it("supports multiple versions", async () => {
    const r = (await persistentArray({
      initial: [5, 10],
      operations: [
        { type: "set", version: 0, index: 0, value: 50 },
        { type: "set", version: 0, index: 0, value: 100 },
        { type: "get", version: 1, index: 0 },
        { type: "get", version: 2, index: 0 },
      ],
    })) as any;
    expect(r.results[2].result).toBe(50);
    expect(r.results[3].result).toBe(100);
    expect(r.version_count).toBe(3);
  });

  it("handles no operations", async () => {
    const r = (await persistentArray({
      initial: [1, 2, 3],
      operations: [],
    })) as any;
    expect(r.version_count).toBe(1);
    expect(r.results).toEqual([]);
  });

  it("stamps meta", async () => {
    const r = (await persistentArray({
      initial: [1],
      operations: [],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
