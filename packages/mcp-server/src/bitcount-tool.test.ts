import { describe, it, expect } from "vitest";
import { bitCount } from "./bitcount-tool.js";

describe("bitCount", () => {
  it("counts bits in a small number", async () => {
    const r = await bitCount({ value: 42 }) as any;
    expect(r.binary).toBe("101010");
    expect(r.ones_count).toBe(3);
    expect(r.zeros_count).toBe(3);
    expect(r.total_bits).toBe(6);
  });

  it("detects power of two", async () => {
    const r = await bitCount({ value: 64 }) as any;
    expect(r.is_power_of_two).toBe(true);
    expect(r.ones_count).toBe(1);
  });

  it("non-power of two", async () => {
    const r = await bitCount({ value: 7 }) as any;
    expect(r.is_power_of_two).toBe(false);
  });

  it("handles hex input", async () => {
    const r = await bitCount({ value: "0xFF" }) as any;
    expect(r.ones_count).toBe(8);
    expect(r.decimal).toBe("255");
  });

  it("handles binary input", async () => {
    const r = await bitCount({ value: "0b1010" }) as any;
    expect(r.ones_count).toBe(2);
    expect(r.decimal).toBe("10");
  });

  it("handles zero", async () => {
    const r = await bitCount({ value: 0 }) as any;
    expect(r.ones_count).toBe(0);
    expect(r.binary).toBe("0");
    expect(r.is_power_of_two).toBe(false);
  });

  it("rejects empty input", async () => {
    await expect(bitCount({ value: "" })).rejects.toThrow("required");
  });

  it("stamps meta", async () => {
    const r = await bitCount({ value: 1 }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
