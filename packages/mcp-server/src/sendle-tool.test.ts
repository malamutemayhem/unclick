import { afterEach, describe, expect, it, vi } from "vitest";

import { getSendleQuote } from "./sendle-tool.js";

// Colocated Sendle connector tests. Functions catch and return { error }.

const creds = { sendle_id: "a", api_key: "b" };

describe("sendle connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" })));
    const r = await getSendleQuote({ ...creds, pickup_postcode: "2000", delivery_postcode: "3000" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit exceeded/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await getSendleQuote({ ...creds, pickup_postcode: "2000", delivery_postcode: "3000" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when a postcode is missing", async () => {
    const r = await getSendleQuote({ ...creds }) as Record<string, unknown>;
    expect(r.error).toMatch(/pickup_postcode is required/i);
  });

  it("maps quotes", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ([{ plan_name: "Pro", product: { code: "STANDARD-PICKUP" }, eta: { days_range: [1, 3] }, quote: { gross: "10.00", tax: "1.00" } }]),
    })));
    const r = await getSendleQuote({ ...creds, pickup_postcode: "2000", delivery_postcode: "3000" }) as Record<string, any>;
    expect(r.quotes[0].plan).toBe("Pro");
    expect(r.quotes[0].price_aud).toBe("10.00");
  });
});
