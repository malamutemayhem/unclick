import { afterEach, describe, expect, it, vi } from "vitest";

import { checkAccountBreaches } from "./haveibeenpwned-tool.js";

describe("hibp connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await checkAccountBreaches({ api_key: "k", account: "test@example.com" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit exceeded/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await checkAccountBreaches({ api_key: "k", account: "test@example.com" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when account is missing", async () => {
    const r = await checkAccountBreaches({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/account.*required/i);
  });

  it("reports no breaches on a 404", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 404 })));
    const r = await checkAccountBreaches({ api_key: "k", account: "clean@example.com" }) as Record<string, any>;
    expect(r.pwned).toBe(false);
    expect(r.breach_count).toBe(0);
  });
});
