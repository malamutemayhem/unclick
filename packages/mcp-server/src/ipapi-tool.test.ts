import { afterEach, describe, expect, it, vi } from "vitest";

import { ipLookup } from "./ipapi-tool.js";

// Colocated ip-api connector tests. Exercise the L2 (resilience) behaviour.

describe("ipapi connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429 })));
    await expect(ipLookup({ ip: "8.8.8.8" })).rejects.toThrow(/rate limit reached \(HTTP 429\)/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(ipLookup({ ip: "8.8.8.8" })).rejects.toThrow(/timed out/i);
  });

  it("normalizes a lookup", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ status: "success", query: "8.8.8.8", country: "United States", city: "Mountain View" }) })));
    const r = await ipLookup({ ip: "8.8.8.8" }) as Record<string, any>;
    expect(r.ip).toBe("8.8.8.8");
    expect(r.city).toBe("Mountain View");
  });
});
