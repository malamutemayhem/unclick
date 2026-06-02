import { afterEach, describe, expect, it, vi } from "vitest";
import { confluenceSearch, confluenceGetPage } from "./confluence-tool.js";

const CREDS = { site: "acme", email: "me@acme.com", api_token: "t" };
describe("confluence connector (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(confluenceSearch({ ...CREDS, query: "x" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(confluenceSearch({ ...CREDS, query: "x" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("CONFLUENCE_SITE", ""); vi.stubEnv("CONFLUENCE_EMAIL", ""); vi.stubEnv("CONFLUENCE_API_TOKEN", ""); vi.stubEnv("JIRA_SITE", ""); vi.stubEnv("JIRA_EMAIL", ""); const r = await confluenceSearch({ query: "x" }) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("validates page_id", async () => { const r = await confluenceGetPage({ ...CREDS }) as Record<string, unknown>; expect(r.error).toMatch(/page_id is required/i); });
  it("targets the wiki REST API + stamps", async () => { const f = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ results: [] }) })); vi.stubGlobal("fetch", f); const r = await confluenceSearch({ ...CREDS, query: "roadmap" }) as Record<string, any>; expect(String((f.mock.calls[0] as unknown as [string])[0])).toMatch(/^https:\/\/acme\.atlassian\.net\/wiki\/rest\/api\/content\/search/); expect(r.unclick_meta.source).toMatch(/Confluence/); });
});
