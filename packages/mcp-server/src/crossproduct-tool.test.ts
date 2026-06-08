import { describe, it, expect } from "vitest";
import { crossProduct } from "./crossproduct-tool.js";

describe("crossProduct", () => {
  it("computes i x j = k", async () => {
    const r = await crossProduct({ a: [1, 0, 0], b: [0, 1, 0] }) as any;
    expect(r.cross_product).toEqual([0, 0, 1]);
  });
  it("detects parallel vectors", async () => {
    const r = await crossProduct({ a: [2, 4, 6], b: [1, 2, 3] }) as any;
    expect(r.are_parallel).toBe(true);
  });
  it("returns error for non-3D", async () => {
    const r = await crossProduct({ a: [1, 2], b: [3, 4] }) as any;
    expect(r.error).toBeTruthy();
  });
});
