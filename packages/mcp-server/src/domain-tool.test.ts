import { afterEach, describe, expect, it, vi } from "vitest";

import { getDomainProperty } from "./domain-tool.js";

// Colocated Domain connector tests. Functions catch and return { error }.

describe("domain connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" })));
    const r = await getDomainProperty({ api_key: "k", property_id: "123" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit exceeded/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await getDomainProperty({ api_key: "k", property_id: "123" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when property_id is missing", async () => {
    const r = await getDomainProperty({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/property_id is required/i);
  });

  it("maps a property listing", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ id: 123, status: "live", type: "Sale", bedrooms: 3 }),
    })));
    const r = await getDomainProperty({ api_key: "k", property_id: "123" }) as Record<string, any>;
    expect(r.id).toBe(123);
    expect(r.bedrooms).toBe(3);
  });
});
