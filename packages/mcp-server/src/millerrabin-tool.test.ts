import { describe, it, expect } from "vitest";
import { millerRabinTest } from "./millerrabin-tool.js";

describe("millerRabinTest", () => {
  it("detects small primes", async () => {
    const r = (await millerRabinTest({ number: 17 })) as any;
    expect(r.is_probably_prime).toBe(true);
  });

  it("detects composite numbers", async () => {
    const r = (await millerRabinTest({ number: 15 })) as any;
    expect(r.is_probably_prime).toBe(false);
  });

  it("handles 2 and 3 as special cases", async () => {
    const r2 = (await millerRabinTest({ number: 2 })) as any;
    expect(r2.is_probably_prime).toBe(true);
    const r3 = (await millerRabinTest({ number: 3 })) as any;
    expect(r3.is_probably_prime).toBe(true);
  });

  it("detects large prime", async () => {
    const r = (await millerRabinTest({ number: 104729 })) as any;
    expect(r.is_probably_prime).toBe(true);
    expect(r.witnesses_tested).toBeGreaterThan(0);
  });

  it("stamps meta", async () => {
    const r = (await millerRabinTest({ number: 7 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
