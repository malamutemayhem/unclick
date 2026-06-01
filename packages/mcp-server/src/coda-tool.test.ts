import { afterEach, describe, expect, it, vi } from "vitest";
import { codaListDocs, codaListTables } from "./coda-tool.js";
describe("coda (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(codaListDocs({ api_token: "k" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(codaListDocs({ api_token: "k" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("CODA_API_TOKEN", ""); const r = await codaListDocs({}) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("validates doc_id", async () => { const r = await codaListTables({ api_token: "k" }) as Record<string, unknown>; expect(r.error).toMatch(/doc_id is required/i); });
  it("stamps", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ items: [] }) }))); const r = await codaListDocs({ api_token: "k" }) as Record<string, any>; expect(r.unclick_meta.source).toMatch(/Coda/); });
});
