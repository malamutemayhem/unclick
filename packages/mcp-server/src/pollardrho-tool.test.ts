import { describe, it, expect } from "vitest";
import { pollardRho } from "./pollardrho-tool.js";

describe("pollardRho", () => {
  it("factors a small composite", async () => {
    const r = (await pollardRho({ value: 12 })) as any;
    expect(r.prime_factors).toEqual([2, 2, 3]);
    expect(r.is_prime).toBe(false);
    expect(r.divisor_count).toBe(6);
  });

  it("identifies a prime", async () => {
    const r = (await pollardRho({ value: 97 })) as any;
    expect(r.is_prime).toBe(true);
    expect(r.prime_factors).toEqual([97]);
  });

  it("factors a large semiprime", async () => {
    const r = (await pollardRho({ value: 1000003 * 1000033 })) as any;
    expect(r.unique_prime_factors).toEqual([1000003, 1000033]);
    expect(r.divisor_count).toBe(4);
  });

  it("handles powers of 2", async () => {
    const r = (await pollardRho({ value: 1024 })) as any;
    expect(r.prime_factors).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2, 2]);
    expect(r.factor_exponents["2"]).toBe(10);
  });

  it("stamps meta", async () => {
    const r = (await pollardRho({ value: 7 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
