import { afterEach, describe, expect, it, vi } from "vitest";

import { deeplTranslateText } from "./deepl-tool.js";

describe("deepl connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) }, json: async () => ({}) })));
    await expect(deeplTranslateText({ auth_key: "k:fx", target_lang: "DE", text: "hello" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    await expect(deeplTranslateText({ auth_key: "k:fx", target_lang: "DE", text: "hello" })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(deeplTranslateText({ auth_key: "k:fx", text: "hello" })).rejects.toThrow(/target_lang is required/i);
  });

  it("maps a translation", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ translations: [{ detected_source_language: "EN", text: "hallo" }] }) })));
    const r = await deeplTranslateText({ auth_key: "k:fx", target_lang: "DE", text: "hello" }) as Record<string, any>;
    expect(r.translations[0].text).toBe("hallo");
  });
});
