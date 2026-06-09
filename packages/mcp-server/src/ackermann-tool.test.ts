import { describe, it, expect } from "vitest";
import { ackermannFunction } from "./ackermann-tool.js";

describe("ackermannFunction", () => {
  it("computes A(0, n) = n + 1", async () => {
    const r = (await ackermannFunction({ m: 0, n: 5 })) as any;
    expect(r.result).toBe(6);
  });

  it("computes A(1, n) = n + 2", async () => {
    const r = (await ackermannFunction({ m: 1, n: 10 })) as any;
    expect(r.result).toBe(12);
  });

  it("computes A(2, n) = 2n + 3", async () => {
    const r = (await ackermannFunction({ m: 2, n: 7 })) as any;
    expect(r.result).toBe(17);
  });

  it("computes A(3, 4) = 2^7 - 3 = 125", async () => {
    const r = (await ackermannFunction({ m: 3, n: 4 })) as any;
    expect(r.result).toBe(125);
    expect(r.m).toBe(3);
    expect(r.n).toBe(4);
  });

  it("stamps meta", async () => {
    const r = (await ackermannFunction({ m: 4, n: 0 })) as any;
    expect(r.result).toBe(13);
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
