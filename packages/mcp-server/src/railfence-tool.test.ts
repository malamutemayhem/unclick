import { describe, it, expect } from "vitest";
import { railfenceProcess } from "./railfence-tool.js";

describe("railfence-tool", () => {
  it("encrypts with rail fence cipher", async () => {
    const r = await railfenceProcess({ text: "WEAREDISCOVEREDRUNATONCE", rails: 3 }) as Record<string, unknown>;
    expect(r.output).toBe("WECRUOERDSOEERNTNEAIVDAC");
    expect(r.direction).toBe("encrypt");
    expect(r.unclick_meta).toBeDefined();
  });

  it("decrypts with rail fence cipher", async () => {
    const r = await railfenceProcess({ text: "WECRUOERDSOEERNTNEAIVDAC", rails: 3, decrypt: true }) as Record<string, unknown>;
    expect(r.output).toBe("WEAREDISCOVEREDRUNATONCE");
  });

  it("round-trips correctly", async () => {
    const enc = await railfenceProcess({ text: "Hello World", rails: 4 }) as Record<string, unknown>;
    const dec = await railfenceProcess({ text: enc.output as string, rails: 4, decrypt: true }) as Record<string, unknown>;
    expect(dec.output).toBe("Hello World");
  });

  it("rejects empty input", async () => {
    const r = await railfenceProcess({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
