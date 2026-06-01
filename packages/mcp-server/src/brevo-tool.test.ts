import { afterEach, describe, expect, it, vi } from "vitest";
import { brevoListContacts } from "./brevo-tool.js";
describe("brevo (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(brevoListContacts({ api_key: "k" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(brevoListContacts({ api_key: "k" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("BREVO_API_KEY", ""); const r = await brevoListContacts({}) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("sends api-key header + stamps", async () => { const f = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ contacts: [] }) })); vi.stubGlobal("fetch", f); const r = await brevoListContacts({ api_key: "secret" }) as Record<string, any>; const init = (f.mock.calls[0] as unknown as [string, { headers: Record<string,string> }])[1]; expect(init.headers["api-key"]).toBe("secret"); expect(r.unclick_meta.source).toMatch(/Brevo/); });
});
