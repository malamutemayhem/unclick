import { describe, it, expect } from "vitest";
import { ternarySearch } from "./ternarysearch-tool.js";

describe("ternarySearch", () => {
  it("finds target in sorted array", async () => {
    const r = (await ternarySearch({
      array: [1, 3, 5, 7, 9, 11, 13],
      target: 7,
    })) as any;
    expect(r.found).toBe(true);
    expect(r.index).toBe(3);
  });

  it("reports not found", async () => {
    const r = (await ternarySearch({
      array: [1, 3, 5, 7],
      target: 4,
    })) as any;
    expect(r.found).toBe(false);
    expect(r.comparisons).toBeGreaterThan(0);
  });

  it("finds maximum in unimodal array", async () => {
    const r = (await ternarySearch({
      array: [1, 3, 7, 10, 8, 5, 2],
      mode: "max",
    })) as any;
    expect(r.value).toBe(10);
    expect(r.index).toBe(3);
  });

  it("finds minimum in unimodal array", async () => {
    const r = (await ternarySearch({
      array: [9, 5, 2, 1, 3, 6, 8],
      mode: "min",
    })) as any;
    expect(r.value).toBe(1);
    expect(r.index).toBe(3);
  });

  it("stamps meta", async () => {
    const r = (await ternarySearch({
      array: [1, 2, 3],
      target: 2,
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
