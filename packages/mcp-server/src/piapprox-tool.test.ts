import { describe, it, expect } from "vitest";
import { piApprox } from "./piapprox-tool.js";

describe("piApprox", () => {
  it("approximates pi with default terms", async () => {
    const r = await piApprox({}) as any;
    expect(r.leibniz).toBeCloseTo(Math.PI, 2);
    expect(r.nilakantha).toBeCloseTo(Math.PI, 4);
  });
  it("returns actual pi", async () => {
    const r = await piApprox({ terms: 100 }) as any;
    expect(r.actual_pi).toBeCloseTo(Math.PI, 10);
  });
});
