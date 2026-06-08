import { describe, it, expect } from "vitest";
import { primeCheck } from "./primecheck-tool.js";

describe("primecheck-tool", () => {
  it("identifies a prime number", async () => {
    const r = await primeCheck({ number: 17 }) as Record<string, unknown>;
    expect(r.is_prime).toBe(true);
    expect(r.factors).toEqual([17]);
    expect(r.unclick_meta).toBeDefined();
  });

  it("identifies a composite number", async () => {
    const r = await primeCheck({ number: 12 }) as Record<string, unknown>;
    expect(r.is_prime).toBe(false);
    expect(r.factors).toEqual([2, 2, 3]);
  });

  it("finds next and previous primes", async () => {
    const r = await primeCheck({ number: 10 }) as Record<string, unknown>;
    expect(r.next_prime).toBe(11);
    expect(r.previous_prime).toBe(7);
  });

  it("handles 2", async () => {
    const r = await primeCheck({ number: 2 }) as Record<string, unknown>;
    expect(r.is_prime).toBe(true);
    expect(r.previous_prime).toBe(null);
  });

  it("rejects invalid input", async () => {
    const r = await primeCheck({}) as Record<string, unknown>;
    expect(r.error).toMatch(/number/i);
  });
});
