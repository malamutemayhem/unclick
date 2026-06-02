import { afterEach, describe, expect, it, vi } from "vitest";
import { bitbucketListRepos, bitbucketGetRepo } from "./bitbucket-tool.js";
const CREDS = { username: "u", app_password: "p" };
describe("bitbucket (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(bitbucketListRepos({ ...CREDS, workspace: "w" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(bitbucketListRepos({ ...CREDS, workspace: "w" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("BITBUCKET_USERNAME", ""); vi.stubEnv("BITBUCKET_APP_PASSWORD", ""); const r = await bitbucketListRepos({ workspace: "w" }) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("validates workspace", async () => { const r = await bitbucketListRepos({ ...CREDS }) as Record<string, unknown>; expect(r.error).toMatch(/workspace is required/i); });
  it("sends Basic auth + stamps", async () => { const f = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ values: [] }) })); vi.stubGlobal("fetch", f); const r = await bitbucketListRepos({ ...CREDS, workspace: "acme" }) as Record<string, any>; const init = (f.mock.calls[0] as unknown as [string, { headers: Record<string,string> }])[1]; expect(init.headers.Authorization).toMatch(/^Basic /); expect(r.unclick_meta.source).toMatch(/Bitbucket/); });
});
