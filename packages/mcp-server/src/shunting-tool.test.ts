import { describe, it, expect } from "vitest";
import { shuntingYard } from "./shunting-tool.js";

describe("shuntingYard", () => {
  it("converts and evaluates simple addition", async () => {
    const r = (await shuntingYard({ expression: "3 + 4" })) as any;
    expect(r.postfix).toBe("3 4 +");
    expect(r.result).toBe(7);
  });

  it("handles operator precedence correctly", async () => {
    const r = (await shuntingYard({ expression: "3 + 4 * 2" })) as any;
    expect(r.postfix).toBe("3 4 2 * +");
    expect(r.result).toBe(11);
  });

  it("handles parentheses and exponentiation", async () => {
    const r = (await shuntingYard({ expression: "(2 + 3) ^ 2" })) as any;
    expect(r.result).toBe(25);
  });

  it("handles right-associativity of exponentiation", async () => {
    const r = (await shuntingYard({ expression: "2 ^ 3 ^ 2" })) as any;
    // 2^(3^2) = 2^9 = 512, not (2^3)^2 = 64
    expect(r.result).toBe(512);
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await shuntingYard({ expression: "1 + 1" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
    expect(r.expression).toBe("1 + 1");
  });
});
