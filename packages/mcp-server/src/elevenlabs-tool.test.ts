import { afterEach, describe, expect, it, vi } from "vitest";

import { elevenlabsListVoices, elevenlabsGetVoice } from "./elevenlabs-tool.js";

describe("elevenlabs connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) }, json: async () => ({}) })));
    await expect(elevenlabsListVoices({ api_key: "k" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    await expect(elevenlabsListVoices({ api_key: "k" })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(elevenlabsGetVoice({ api_key: "k" })).rejects.toThrow(/voice_id is required/i);
  });

  it("maps the voice list", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ voices: [{ voice_id: "v1", name: "Rachel", category: "premade" }] }) })));
    const r = await elevenlabsListVoices({ api_key: "k" }) as Record<string, any>;
    expect(r.count).toBe(1);
    expect(r.voices[0].name).toBe("Rachel");
  });
});
