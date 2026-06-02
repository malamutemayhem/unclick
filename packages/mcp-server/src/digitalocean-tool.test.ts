import { afterEach, describe, expect, it, vi } from "vitest";

import { doListDroplets, doAccount } from "./digitalocean-tool.js";

describe("digitalocean connector resilience (L2 / L4)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) })));
    await expect(doAccount({ access_token: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; }));
    await expect(doAccount({ access_token: "k" })).rejects.toThrow(/timed out/i);
  });

  it("returns a not-connected card when no token is supplied", async () => {
    vi.stubEnv("DIGITALOCEAN_ACCESS_TOKEN", "");
    const result = await doAccount({}) as Record<string, unknown>;
    expect(result.not_connected).toBe(true);
  });

  it("stamps source and stays a safe no-op when a droplet is off and no signal key is set", async () => {
    vi.stubEnv("UNCLICK_API_KEY", ""); vi.stubEnv("UNCLICK_API_KEY_HASH", "");
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, json: async () => ({ droplets: [{ name: "web", status: "off" }] }),
    })));
    const result = await doListDroplets({ access_token: "k" }) as Record<string, any>;
    expect(result.unclick_meta.source).toBe("DigitalOcean API v2");
  });
});
