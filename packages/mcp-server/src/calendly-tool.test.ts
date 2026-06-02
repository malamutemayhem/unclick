import { afterEach, describe, expect, it, vi } from "vitest";

import { getCalendlyUser, getCalendlyEvent } from "./calendly-tool.js";

// Colocated Calendly connector tests. Functions catch and return { error }.

describe("calendly connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" })));
    const r = await getCalendlyUser({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit exceeded/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await getCalendlyUser({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when event_uuid is missing", async () => {
    const r = await getCalendlyEvent({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/event_uuid is required/i);
  });

  it("maps the current user", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ resource: { uri: "u", name: "Alice", email: "a@b.com" } }) })));
    const r = await getCalendlyUser({ api_key: "k" }) as Record<string, any>;
    expect(r.name).toBe("Alice");
    expect(r.email).toBe("a@b.com");
  });
});
