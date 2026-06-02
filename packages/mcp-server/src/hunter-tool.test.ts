import { afterEach, describe, expect, it, vi } from "vitest";

import { findEmail } from "./hunter-tool.js";

// Colocated Hunter.io connector tests. Functions catch and return { error }.

describe("hunter connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" })));
    const r = await findEmail({ api_key: "k", domain: "stripe.com" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit exceeded/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await findEmail({ api_key: "k", domain: "stripe.com" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when domain is missing", async () => {
    const r = await findEmail({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/domain is required/i);
  });

  it("maps a domain search", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ data: { domain: "stripe.com", organization: "Stripe", emails_count: 5, emails: [] } }) })));
    const r = await findEmail({ api_key: "k", domain: "stripe.com" }) as Record<string, any>;
    expect(r.domain).toBe("stripe.com");
    expect(r.organization).toBe("Stripe");
  });
});
