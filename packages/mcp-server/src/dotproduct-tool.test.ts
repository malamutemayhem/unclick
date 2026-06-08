import { describe, it, expect } from "vitest";
import { dotProduct } from "./dotproduct-tool.js";

describe("dotProduct", () => {
  it("computes dot product", async () => {
    const r = await dotProduct({ a: [1, 2, 3], b: [4, 5, 6] }) as any;
    expect(r.dot_product).toBe(32);
  });
  it("detects orthogonal vectors", async () => {
    const r = await dotProduct({ a: [1, 0], b: [0, 1] }) as any;
    expect(r.are_orthogonal).toBe(true);
    expect(r.angle_degrees).toBeCloseTo(90, 4);
  });
  it("returns error for length mismatch", async () => {
    const r = await dotProduct({ a: [1, 2], b: [3] }) as any;
    expect(r.error).toBeTruthy();
  });
});
