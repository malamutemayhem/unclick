import { describe, it, expect } from "vitest";
import { epochConvert, epochNow } from "./epoch-tool.js";

describe("epoch-tool", () => {
  it("converts Unix seconds", async () => {
    const r = await epochConvert({ timestamp: 1700000000 }) as Record<string, unknown>;
    expect(r.iso8601).toBe("2023-11-14T22:13:20.000Z");
    expect(r.detected_format).toBe("seconds");
    expect(r.unclick_meta).toBeDefined();
  });

  it("detects milliseconds", async () => {
    const r = await epochConvert({ timestamp: 1700000000000 }) as Record<string, unknown>;
    expect(r.detected_format).toBe("milliseconds");
    expect(r.unix_seconds).toBe(1700000000);
  });

  it("returns current epoch", async () => {
    const r = await epochNow({}) as Record<string, unknown>;
    expect(r.unix_seconds).toBeDefined();
    expect(r.iso8601).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing timestamp", async () => {
    const r = await epochConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timestamp/i);
  });
});
