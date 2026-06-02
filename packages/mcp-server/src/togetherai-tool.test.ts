import { afterEach, describe, expect, it, vi } from "vitest";

import { togetherai_chat_completion } from "./togetherai-tool.js";

const msgs = { messages: [{ role: "user", content: "hi" }] };

describe("togetherai connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) }, json: async () => ({}) })));
    await expect(togetherai_chat_completion({ api_key: "k", ...msgs })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    await expect(togetherai_chat_completion({ api_key: "k", ...msgs })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(togetherai_chat_completion({ api_key: "k" })).rejects.toThrow(/messages must be a non-empty array/i);
  });

  it("maps a chat completion", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ model: "llama", choices: [{ message: { content: "Hi" }, finish_reason: "stop" }], usage: {} }) })));
    const r = await togetherai_chat_completion({ api_key: "k", ...msgs }) as Record<string, any>;
    expect(r.content).toBe("Hi");
  });
});
