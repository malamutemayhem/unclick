import { describe, it, expect } from "vitest";
import { numberBaseConvert } from "./binaryconv-tool.js";

describe("binaryconv-tool", () => {
  it("converts decimal to binary/hex/octal", async () => {
    const r = await numberBaseConvert({ value: "255" }) as Record<string, unknown>;
    const conv = r.conversions as Record<string, string>;
    expect(conv.binary).toBe("11111111");
    expect(conv.hexadecimal).toBe("FF");
    expect(conv.octal).toBe("377");
    expect(r.unclick_meta).toBeDefined();
  });

  it("converts binary to decimal", async () => {
    const r = await numberBaseConvert({ value: "1010", from_base: 2 }) as Record<string, unknown>;
    expect(r.decimal_value).toBe(10);
  });

  it("converts hex to decimal", async () => {
    const r = await numberBaseConvert({ value: "FF", from_base: 16 }) as Record<string, unknown>;
    expect(r.decimal_value).toBe(255);
  });

  it("supports custom to_base", async () => {
    const r = await numberBaseConvert({ value: "100", to_base: 7 }) as Record<string, unknown>;
    const conv = r.conversions as Record<string, string>;
    expect(conv.custom).toBeDefined();
  });

  it("rejects missing input", async () => {
    const r = await numberBaseConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/value/i);
  });
});
