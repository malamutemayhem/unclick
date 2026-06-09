import { describe, it, expect } from "vitest";
import { sieveOfEratosthenes } from "./sieve-tool.js";

describe("sieveOfEratosthenes", () => {
  it("finds primes up to 10", async () => {
    const r = (await sieveOfEratosthenes({ n: 10 })) as any;
    expect(r.primes).toEqual([2, 3, 5, 7]);
    expect(r.prime_count).toBe(4);
  });

  it("finds primes up to 30", async () => {
    const r = (await sieveOfEratosthenes({ n: 30 })) as any;
    expect(r.prime_count).toBe(10);
    expect(r.primes[0]).toBe(2);
    expect(r.primes[9]).toBe(29);
  });

  it("handles n=2", async () => {
    const r = (await sieveOfEratosthenes({ n: 2 })) as any;
    expect(r.primes).toEqual([2]);
    expect(r.prime_count).toBe(1);
  });

  it("rejects n < 2", async () => {
    await expect(sieveOfEratosthenes({ n: 1 })).rejects.toThrow(">= 2");
  });

  it("stamps meta", async () => {
    const r = (await sieveOfEratosthenes({ n: 5 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
