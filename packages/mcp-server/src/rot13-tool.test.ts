import { describe, it, expect } from "vitest";
import { rot13Convert } from "./rot13-tool.js";

describe("rot13-tool", () => {
  it("applies ROT13", async () => {
    const r = await rot13Convert({ text: "Hello" }) as Record<string, unknown>;
    expect(r.output).toBe("Uryyb");
    expect(r.is_rot13).toBe(true);
    expect(r.unclick_meta).toBeDefined();
  });

  it("ROT13 is its own inverse", async () => {
    const r1 = await rot13Convert({ text: "Secret Message" }) as Record<string, unknown>;
    const r2 = await rot13Convert({ text: r1.output as string }) as Record<string, unknown>;
    expect(r2.output).toBe("Secret Message");
  });

  it("supports custom shift", async () => {
    const r = await rot13Convert({ text: "abc", shift: 1 }) as Record<string, unknown>;
    expect(r.output).toBe("bcd");
    expect(r.is_rot13).toBe(false);
  });

  it("preserves non-alpha characters", async () => {
    const r = await rot13Convert({ text: "Hello, World! 123" }) as Record<string, unknown>;
    expect((r.output as string)).toContain(",");
    expect((r.output as string)).toContain("123");
  });

  it("rejects empty input", async () => {
    const r = await rot13Convert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
