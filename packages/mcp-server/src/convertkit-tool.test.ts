import { afterEach, describe, expect, it, vi } from "vitest";

import { ckListForms } from "./convertkit-tool.js";

describe("convertkit connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, json: async () => ({}) })));
    const r = await ckListForms({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit reached \(HTTP 429\)/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await ckListForms({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when api_key is missing", async () => {
    const r = await ckListForms({}) as Record<string, unknown>;
    expect(r.error).toMatch(/api_key is required/i);
  });

  it("maps the form list", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ forms: [{ id: 1, name: "Newsletter", type: "embed" }] }) })));
    const r = await ckListForms({ api_key: "k" }) as Record<string, any>;
    expect(r.count).toBe(1);
    expect(r.forms[0].name).toBe("Newsletter");
  });
});
