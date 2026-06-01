import { afterEach, describe, expect, it, vi } from "vitest";

import { abnLookup } from "./abn-tool.js";

// Colocated ABN (ABR Lookup) connector tests. Exercise the L2 (resilience) behaviour.

describe("abn connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "20" : null) },
    })));
    await expect(abnLookup({ abn: "51824753556" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 20s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(abnLookup({ abn: "51824753556" })).rejects.toThrow(/timed out/i);
  });

  it("returns a structured error when abn is missing", async () => {
    const r = await abnLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/abn is required/i);
  });

  it("parses the JSONP payload", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      text: async () => 'callback({"Abn":"51824753556","EntityName":"Test Co Pty Ltd","AbnStatus":"Active"})',
    })));
    const r = await abnLookup({ abn: "51 824 753 556" }) as Record<string, any>;
    expect(r.abn).toBe("51824753556");
    expect(r.entity_name).toBe("Test Co Pty Ltd");
  });
});
