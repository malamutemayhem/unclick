import { describe, it, expect } from "vitest";
import { baseConvert } from "./baseconvert-tool.js";

describe("baseconvert-tool", () => {
  it("converts decimal to hex", async () => {
    const r = await baseConvert({ value: "255", from_base: 10, to_base: 16 }) as Record<string, unknown>;
    expect(r.result).toBe("FF");
    expect(r.unclick_meta).toBeDefined();
  });

  it("converts binary to decimal", async () => {
    const r = await baseConvert({ value: "1010", from_base: 2, to_base: 10 }) as Record<string, unknown>;
    expect(r.result).toBe("10");
  });

  it("converts hex to binary", async () => {
    const r = await baseConvert({ value: "FF", from_base: 16, to_base: 2 }) as Record<string, unknown>;
    expect(r.result).toBe("11111111");
  });

  it("defaults to base 10 -> 16", async () => {
    const r = await baseConvert({ value: "100" }) as Record<string, unknown>;
    expect(r.result).toBe("64");
  });

  it("rejects empty input", async () => {
    const r = await baseConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/value/i);
  });
});
