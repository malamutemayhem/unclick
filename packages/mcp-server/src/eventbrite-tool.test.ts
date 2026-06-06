import { afterEach, describe, expect, it, vi } from "vitest";

import { eventbriteSearchEvents, eventbriteGetEvent } from "./eventbrite-tool.js";

// Colocated Eventbrite connector tests. ebFetch returns { error } objects.

describe("eventbrite connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) } })));
    const r = await eventbriteSearchEvents({ token: "t", q: "music" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await eventbriteSearchEvents({ token: "t", q: "music" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when id is missing", async () => {
    const r = await eventbriteGetEvent({ token: "t" }) as Record<string, unknown>;
    expect(r.error).toMatch(/id is required/i);
  });

  it("passes through search data", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ events: [{ name: { text: "Live Gig" } }] }) })));
    const r = await eventbriteSearchEvents({ token: "t", q: "music" }) as Record<string, any>;
    expect(r.events[0].name.text).toBe("Live Gig");
  });
});
