import { describe, it, expect } from "vitest";
import { extendedGcd } from "./extgcd-tool.js";

describe("extendedGcd", () => {
  it("computes extended GCD of 35 and 15", async () => {
    const r = (await extendedGcd({ a: 35, b: 15 })) as any;
    expect(r.gcd).toBe(5);
    expect(r.a * r.x + r.b * r.y).toBe(r.gcd);
  });

  it("finds modular inverse when coprime", async () => {
    const r = (await extendedGcd({ a: 3, b: 11 })) as any;
    expect(r.gcd).toBe(1);
    expect(r.modular_inverse_a_mod_b).toBeDefined();
    expect((3 * r.modular_inverse_a_mod_b) % 11).toBe(1);
  });

  it("handles negative inputs", async () => {
    const r = (await extendedGcd({ a: -12, b: 8 })) as any;
    expect(r.gcd).toBe(4);
  });

  it("handles one zero input", async () => {
    const r = (await extendedGcd({ a: 7, b: 0 })) as any;
    expect(r.gcd).toBe(7);
  });

  it("stamps meta", async () => {
    const r = (await extendedGcd({ a: 6, b: 4 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
