import { describe, it, expect, vi, afterEach } from "vitest";
import { mymemoryTranslate } from "./mymemory-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("mymemory-tool", () => {
  it("mymemoryTranslate returns translation", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ responseData: { translatedText: "Hola mundo", match: 1 } }),
    }));
    const r = await mymemoryTranslate({ text: "Hello world", source: "en", target: "es" }) as Record<string, unknown>;
    expect(r.responseData).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing text", async () => {
    const r = await mymemoryTranslate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
