import { afterEach, describe, expect, it, vi } from "vitest";
import { cloudinaryListResources } from "./cloudinary-tool.js";
const CREDS = { cloud_name: "c", api_key: "k", api_secret: "s" };
describe("cloudinary (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(cloudinaryListResources({ ...CREDS })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(cloudinaryListResources({ ...CREDS })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("CLOUDINARY_CLOUD_NAME", ""); vi.stubEnv("CLOUDINARY_API_KEY", ""); vi.stubEnv("CLOUDINARY_API_SECRET", ""); const r = await cloudinaryListResources({}) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("targets the cloud + stamps", async () => { const f = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ resources: [] }) })); vi.stubGlobal("fetch", f); const r = await cloudinaryListResources({ ...CREDS }) as Record<string, any>; expect(String((f.mock.calls[0] as unknown as [string])[0])).toContain("/v1_1/c/resources/image"); expect(r.unclick_meta.source).toMatch(/Cloudinary/); });
});
