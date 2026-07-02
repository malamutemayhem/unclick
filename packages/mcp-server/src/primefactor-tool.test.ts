import { describe, it, expect } from "vitest";
import { primeFactor } from "./primefactor-tool.js";

describe("primeFactor", () => {
  it("factors a composite number", async () => {
    const r = await primeFactor({ n: 60 }) as any;
    expect(r.factors).toEqual([2, 2, 3, 5]);
    expect(r.is_prime).toBe(false);
    expect(r.expression).toBe("2^2 x 3 x 5");
  });

  it("identifies a prime", async () => {
    const r = await primeFactor({ n: 17 }) as any;
    expect(r.factors).toEqual([17]);
    expect(r.is_prime).toBe(true);
  });

  it("factors a power of 2", async () => {
    const r = await primeFactor({ n: 64 }) as any;
    expect(r.factors).toEqual([2, 2, 2, 2, 2, 2]);
    expect(r.unique_primes).toEqual([2]);
  });

  it("returns error for n < 2", async () => {
    const r = await primeFactor({ n: 1 }) as any;
    expect(r.error).toBeTruthy();
  });
});
