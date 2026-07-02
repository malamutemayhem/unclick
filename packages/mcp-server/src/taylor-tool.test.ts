import { describe, it, expect } from "vitest";
import { taylorExpand } from "./taylor-tool.js";

describe("taylorExpand", () => {
  it("approximates e^1", async () => {
    const r = await taylorExpand({ function: "exp", x: 1, terms: 15 }) as any;
    expect(r.approximation).toBeCloseTo(Math.E, 8);
  });
  it("approximates sin(0)", async () => {
    const r = await taylorExpand({ function: "sin", x: 0, terms: 5 }) as any;
    expect(r.approximation).toBe(0);
  });
  it("returns error for invalid function", async () => {
    const r = await taylorExpand({ function: "sqrt", x: 1 }) as any;
    expect(r.error).toBeTruthy();
  });
});
