import { describe, it, expect, vi, afterEach } from "vitest";
import { libretranslateTranslate, libretranslateLanguages, libretranslateDetect } from "./libretranslate-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("libretranslate-tool", () => {
  it("translates text", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ translatedText: "Hello world" }),
    }));
    const r = await libretranslateTranslate({ text: "Hola mundo", source: "es", target: "en" }) as Record<string, unknown>;
    expect(r.translatedText).toBe("Hello world");
    expect(r.unclick_meta).toBeDefined();
  });

  it("lists languages", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ code: "en", name: "English" }, { code: "es", name: "Spanish" }]),
    }));
    const r = await libretranslateLanguages({}) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("detects language", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ confidence: 99, language: "es" }]),
    }));
    const r = await libretranslateDetect({ text: "Hola mundo" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing text", async () => {
    const r = await libretranslateTranslate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
