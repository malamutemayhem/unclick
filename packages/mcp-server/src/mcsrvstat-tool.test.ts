import { afterEach, describe, expect, it, vi } from "vitest";
import { mcServerStatus } from "./mcsrvstat-tool.js";

describe("mcsrvstat connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await mcServerStatus({ address: "mc.hypixel.net" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await mcServerStatus({ address: "mc.hypixel.net" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates address is required", async () => {
    const r = await mcServerStatus({}) as Record<string, unknown>;
    expect(r.error).toMatch(/address is required/i);
  });

  it("returns server data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ online: true, players: { online: 50, max: 100 }, motd: { clean: ["Welcome!"] } }),
    })));
    const r = await mcServerStatus({ address: "mc.hypixel.net" }) as Record<string, unknown>;
    expect(r.online).toBe(true);
    expect(r.unclick_meta).toBeDefined();
  });
});
