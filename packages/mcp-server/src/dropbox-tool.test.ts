import { afterEach, describe, expect, it, vi } from "vitest";
import { dropboxListFolder, dropboxSearch } from "./dropbox-tool.js";
describe("dropbox (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" }))); await expect(dropboxListFolder({ access_token: "k" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(dropboxListFolder({ access_token: "k" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("DROPBOX_ACCESS_TOKEN", ""); const r = await dropboxListFolder({}) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("validates query", async () => { const r = await dropboxSearch({ access_token: "k" }) as Record<string, unknown>; expect(r.error).toMatch(/query is required/i); });
  it("stamps", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, text: async () => '{"entries":[]}' }))); const r = await dropboxListFolder({ access_token: "k" }) as Record<string, any>; expect(r.unclick_meta.source).toMatch(/Dropbox/); });
});
