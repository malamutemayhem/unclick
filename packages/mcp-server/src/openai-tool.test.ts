import { afterEach, describe, expect, it, vi } from "vitest";

import { openaiChatCompletion } from "./openai-tool.js";

describe("openai connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) }, json: async () => ({}) })));
    await expect(openaiChatCompletion({ api_key: "k", prompt: "hi" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    await expect(openaiChatCompletion({ api_key: "k", prompt: "hi" })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(openaiChatCompletion({ api_key: "k" })).rejects.toThrow(/messages.*or prompt.*required/i);
  });

  it("maps a chat completion", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ id: "x", model: "gpt-4o-mini", created: 1700000000, choices: [{ message: { role: "assistant", content: "Hi" }, finish_reason: "stop" }], usage: {} }) })));
    const r = await openaiChatCompletion({ api_key: "k", prompt: "hi" }) as Record<string, any>;
    expect(r.message).toBe("Hi");
  });
});
