import { describe, it, expect } from "vitest";
import { hashGenerate, hashCompare } from "./hashgen-tool.js";

describe("hashgen-tool", () => {
  it("generates a sha256 hash", async () => {
    const r = await hashGenerate({ text: "hello" }) as Record<string, unknown>;
    expect(r.algorithm).toBe("sha256");
    expect(r.hash).toBe("2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824");
    expect(r.unclick_meta).toBeDefined();
  });

  it("generates an md5 hash", async () => {
    const r = await hashGenerate({ text: "hello", algorithm: "md5" }) as Record<string, unknown>;
    expect(r.hash).toBe("5d41402abc4b2a76b9719d911017c592");
  });

  it("compares hashes", async () => {
    const r = await hashCompare({ text: "hello", hash: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824" }) as Record<string, unknown>;
    expect(r.match).toBe(true);
  });

  it("rejects unsupported algorithm", async () => {
    const r = await hashGenerate({ text: "hello", algorithm: "fake" }) as Record<string, unknown>;
    expect(r.error).toMatch(/unsupported/i);
  });

  it("rejects missing text", async () => {
    const r = await hashGenerate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
