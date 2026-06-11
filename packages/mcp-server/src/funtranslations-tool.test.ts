import { afterEach, describe, expect, it, vi } from "vitest";
import { funTranslate } from "./funtranslations-tool.js";

describe("funtranslations connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await funTranslate({ text: "hello world", dialect: "yoda" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await funTranslate({ text: "hello", dialect: "pirate" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns translated text with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ success: { total: 1 }, contents: { translated: "Hello world, you say.", text: "hello world", translation: "yoda" } }),
    })));
    const r = await funTranslate({ text: "hello world" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
