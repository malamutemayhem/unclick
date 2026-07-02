import { describe, it, expect } from "vitest";
import { atbashProcess } from "./atbash-tool.js";

describe("atbash-tool", () => {
  it("encodes with Atbash cipher", async () => {
    const r = await atbashProcess({ text: "abc" }) as Record<string, unknown>;
    expect(r.output).toBe("zyx");
    expect(r.unclick_meta).toBeDefined();
  });

  it("is its own inverse", async () => {
    const enc = await atbashProcess({ text: "Hello World" }) as Record<string, unknown>;
    const dec = await atbashProcess({ text: enc.output as string }) as Record<string, unknown>;
    expect(dec.output).toBe("Hello World");
  });

  it("preserves non-alpha characters", async () => {
    const r = await atbashProcess({ text: "Hi! 123" }) as Record<string, unknown>;
    expect((r.output as string)).toContain("!");
    expect((r.output as string)).toContain("123");
  });

  it("rejects empty input", async () => {
    const r = await atbashProcess({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
