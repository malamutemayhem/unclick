import { afterEach, describe, expect, it, vi } from "vitest";

import { searchShodan } from "./shodan-tool.js";

describe("shodan connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" })));
    const r = await searchShodan({ api_key: "k", query: "port:22" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit exceeded/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await searchShodan({ api_key: "k", query: "port:22" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when query is missing", async () => {
    const r = await searchShodan({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("maps search matches", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ total: 1, matches: [{ ip_str: "1.2.3.4", port: 22 }] }) })));
    const r = await searchShodan({ api_key: "k", query: "port:22" }) as Record<string, any>;
    expect(r.total).toBe(1);
    expect(r.matches[0].ip_str).toBe("1.2.3.4");
  });
});
