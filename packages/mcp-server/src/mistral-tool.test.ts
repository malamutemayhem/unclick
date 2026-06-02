import { afterEach, describe, expect, it, vi } from "vitest";

import { mistralChatCompletion } from "./mistral-tool.js";

describe("mistral connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) }, json: async () => ({}) })));
    const r = await mistralChatCompletion({ api_key: "k", prompt: "hi" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit reached \(HTTP 429\)/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await mistralChatCompletion({ api_key: "k", prompt: "hi" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when input is missing", async () => {
    const r = await mistralChatCompletion({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/messages.*or prompt.*required/i);
  });

  it("maps a chat completion", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ id: "x", model: "mistral-small", created: 1700000000, choices: [{ message: { role: "assistant", content: "Bonjour" }, finish_reason: "stop" }], usage: {} }) })));
    const r = await mistralChatCompletion({ api_key: "k", prompt: "hi" }) as Record<string, any>;
    expect(r.message).toBe("Bonjour");
  });
});
