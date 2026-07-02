import { describe, it, expect } from "vitest";
import { ratioSimplify } from "./ratiosimplify-tool.js";

describe("ratioSimplify", () => {
  it("simplifies 4:8 to 1:2", async () => {
    const r = await ratioSimplify({ a: 4, b: 8 }) as any;
    expect(r.simplified.a).toBe(1);
    expect(r.simplified.b).toBe(2);
  });

  it("simplifies 15:25 to 3:5", async () => {
    const r = await ratioSimplify({ a: 15, b: 25 }) as any;
    expect(r.simplified.ratio).toBe("3:5");
  });

  it("returns error for zero denominator", async () => {
    const r = await ratioSimplify({ a: 5, b: 0 }) as any;
    expect(r.error).toBeTruthy();
  });
});
