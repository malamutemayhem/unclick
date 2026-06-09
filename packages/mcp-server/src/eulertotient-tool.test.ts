import { describe, it, expect } from "vitest";
import { eulerTotient } from "./eulertotient-tool.js";

describe("eulerTotient", () => {
  it("computes totient of 12", async () => {
    const r = (await eulerTotient({ number: 12 })) as any;
    expect(r.totient).toBe(4);
    expect(r.prime_factors).toEqual([2, 3]);
  });

  it("detects prime (totient = n-1)", async () => {
    const r = (await eulerTotient({ number: 13 })) as any;
    expect(r.totient).toBe(12);
    expect(r.is_prime).toBe(true);
  });

  it("handles 1", async () => {
    const r = (await eulerTotient({ number: 1 })) as any;
    expect(r.totient).toBe(1);
  });

  it("handles power of 2", async () => {
    const r = (await eulerTotient({ number: 16 })) as any;
    expect(r.totient).toBe(8);
    expect(r.prime_factors).toEqual([2]);
  });

  it("stamps meta", async () => {
    const r = (await eulerTotient({ number: 7 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
