import { describe, it, expect } from "vitest";
import { slopeIntercept } from "./slopeintercept-tool.js";

describe("slopeIntercept", () => {
  it("finds line through (0,0) and (1,1)", async () => {
    const r = await slopeIntercept({ x1: 0, y1: 0, x2: 1, y2: 1 }) as any;
    expect(r.slope).toBe(1);
    expect(r.y_intercept).toBe(0);
  });

  it("handles vertical line", async () => {
    const r = await slopeIntercept({ x1: 5, y1: 0, x2: 5, y2: 10 }) as any;
    expect(r.is_vertical).toBe(true);
  });

  it("returns error for identical points", async () => {
    const r = await slopeIntercept({ x1: 3, y1: 3, x2: 3, y2: 3 }) as any;
    expect(r.error).toBeTruthy();
  });
});
