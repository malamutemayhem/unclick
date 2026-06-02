import { afterEach, describe, expect, it, vi } from "vitest";

import { cohereChat } from "./cohere-tool.js";

describe("cohere connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) }, json: async () => ({}) })));
    const r = await cohereChat({ api_key: "k", message: "hi" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit reached \(HTTP 429\)/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await cohereChat({ api_key: "k", message: "hi" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when message is missing", async () => {
    const r = await cohereChat({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/message is required/i);
  });

  it("maps a chat response", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ text: "Hi there", generation_id: "g1", finish_reason: "COMPLETE" }) })));
    const r = await cohereChat({ api_key: "k", message: "hi" }) as Record<string, any>;
    expect(r.text).toBe("Hi there");
  });
});
