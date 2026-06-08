import { describe, it, expect } from "vitest";
import { crc32Calculate } from "./crc32-tool.js";

describe("crc32-tool", () => {
  it("computes CRC32 for known input", async () => {
    const r = await crc32Calculate({ text: "123456789" }) as Record<string, unknown>;
    expect(r.hex).toBe("CBF43926");
    expect(r.unclick_meta).toBeDefined();
  });

  it("computes CRC32 for simple string", async () => {
    const r = await crc32Calculate({ text: "hello" }) as Record<string, unknown>;
    expect(typeof r.crc32).toBe("number");
    expect(typeof r.hex).toBe("string");
    expect((r.hex as string).length).toBe(8);
  });

  it("returns different checksums for different inputs", async () => {
    const r1 = await crc32Calculate({ text: "abc" }) as Record<string, unknown>;
    const r2 = await crc32Calculate({ text: "def" }) as Record<string, unknown>;
    expect(r1.crc32).not.toBe(r2.crc32);
  });

  it("rejects empty input", async () => {
    const r = await crc32Calculate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
