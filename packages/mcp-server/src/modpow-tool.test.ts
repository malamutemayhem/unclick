import { describe, it, expect } from "vitest";
import { modularArithmetic } from "./modpow-tool.js";

describe("modularArithmetic", () => {
  it("computes modular exponentiation", async () => {
    const r = await modularArithmetic({ operation: "modpow", a: 2, b: 10, m: 1000 }) as any;
    expect(r.result_numeric).toBe("24");
  });

  it("computes modular inverse", async () => {
    const r = await modularArithmetic({ operation: "modinverse", a: 3, m: 7 }) as any;
    expect(r.result_numeric).toBe("5");
  });

  it("computes simple mod", async () => {
    const r = await modularArithmetic({ operation: "mod", a: -7, m: 3 }) as any;
    expect(r.result_numeric).toBe("2");
  });

  it("returns error for no inverse", async () => {
    const r = await modularArithmetic({ operation: "modinverse", a: 4, m: 8 }) as any;
    expect(r.error).toBeTruthy();
  });
});
