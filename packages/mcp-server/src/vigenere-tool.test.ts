import { describe, it, expect } from "vitest";
import { vigenereProcess } from "./vigenere-tool.js";

describe("vigenere-tool", () => {
  it("encrypts with Vigenere cipher", async () => {
    const r = await vigenereProcess({ text: "HELLO", key: "KEY" }) as Record<string, unknown>;
    expect(r.output).toBe("RIJVS");
    expect(r.direction).toBe("encrypt");
    expect(r.unclick_meta).toBeDefined();
  });

  it("decrypts with Vigenere cipher", async () => {
    const r = await vigenereProcess({ text: "RIJVS", key: "KEY", decrypt: true }) as Record<string, unknown>;
    expect(r.output).toBe("HELLO");
    expect(r.direction).toBe("decrypt");
  });

  it("preserves non-alpha characters", async () => {
    const r = await vigenereProcess({ text: "Hello, World!", key: "abc" }) as Record<string, unknown>;
    expect((r.output as string)).toContain(",");
    expect((r.output as string)).toContain("!");
  });

  it("round-trips correctly", async () => {
    const enc = await vigenereProcess({ text: "Attack at dawn", key: "lemon" }) as Record<string, unknown>;
    const dec = await vigenereProcess({ text: enc.output as string, key: "lemon", decrypt: true }) as Record<string, unknown>;
    expect(dec.output).toBe("Attack at dawn");
  });

  it("rejects missing key", async () => {
    const r = await vigenereProcess({ text: "hello" }) as Record<string, unknown>;
    expect(r.error).toMatch(/key/i);
  });
});
