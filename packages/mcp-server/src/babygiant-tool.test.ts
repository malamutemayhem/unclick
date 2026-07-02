import { describe, it, expect } from "vitest";
import { babyGiantStep } from "./babygiant-tool.js";

describe("babyGiantStep", () => {
  it("solves 2^x = 8 mod 13", async () => {
    const r = (await babyGiantStep({ base: 2, target: 8, modulus: 13 })) as any;
    expect(r.found).toBe(true);
    expect(r.result).toBe(3);
  });

  it("solves 3^x = 1 mod 7", async () => {
    const r = (await babyGiantStep({ base: 3, target: 1, modulus: 7 })) as any;
    expect(r.found).toBe(true);
    expect(r.result).toBe(0);
  });

  it("solves 5^x = 3 mod 23", async () => {
    const r = (await babyGiantStep({ base: 5, target: 3, modulus: 23 })) as any;
    expect(r.found).toBe(true);
    const check = BigInt(5) ** BigInt(r.result) % BigInt(23);
    expect(Number(check)).toBe(3);
  });

  it("reports not found when no solution exists", async () => {
    const r = (await babyGiantStep({ base: 2, target: 3, modulus: 4 })) as any;
    expect(r.found).toBe(false);
    expect(r.result).toBeNull();
  });

  it("stamps meta", async () => {
    const r = (await babyGiantStep({ base: 2, target: 1, modulus: 5 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
