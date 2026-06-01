import { afterEach, describe, expect, it, vi } from "vitest";
import { pipedriveListDeals, pipedriveSearchDeals } from "./pipedrive-tool.js";

describe("pipedrive connector (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(pipedriveListDeals({ api_token: "k" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(pipedriveListDeals({ api_token: "k" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("PIPEDRIVE_API_TOKEN", ""); const r = await pipedriveListDeals({}) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("validates term", async () => { const r = await pipedriveSearchDeals({ api_token: "k" }) as Record<string, unknown>; expect(r.error).toMatch(/term is required/i); });
  it("passes api_token in query + stamps", async () => { const f = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ data: [] }) })); vi.stubGlobal("fetch", f); const r = await pipedriveListDeals({ api_token: "secret" }) as Record<string, any>; expect(String((f.mock.calls[0] as unknown as [string])[0])).toContain("api_token=secret"); expect(r.unclick_meta.source).toMatch(/Pipedrive/); });
});
