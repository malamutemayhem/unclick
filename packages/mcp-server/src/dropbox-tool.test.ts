import { afterEach, describe, expect, it, vi } from "vitest";
import { dropboxGetAccount, dropboxListFolder, dropboxSearch } from "./dropbox-tool.js";
describe("dropbox (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" }))); await expect(dropboxListFolder({ access_token: "k" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(dropboxListFolder({ access_token: "k" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("UNCLICK_API_KEY", ""); const r = await dropboxListFolder({}) as Record<string, unknown>; expect(r.error).toMatch(/credentials not configured/i); expect((r.setup as Record<string, unknown>).web).toBe("https://unclick.world/connect/dropbox"); });
  it("validates query", async () => { const r = await dropboxSearch({ access_token: "k" }) as Record<string, unknown>; expect(r.error).toMatch(/query is required/i); });
  it("stamps", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, text: async () => '{"entries":[]}' }))); const r = await dropboxListFolder({ access_token: "k" }) as Record<string, any>; expect(r.unclick_meta.source).toMatch(/Dropbox/); });
  it("writes live proof after a stored UnClick credential succeeds", async () => {
    vi.stubEnv("UNCLICK_API_KEY", "uc_test");
    vi.stubEnv("UNCLICK_API_URL", "https://unclick.test");
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "https://unclick.test/api/credentials?platform=dropbox") {
        return { ok: true, status: 200, json: async () => ({ access_token: "stored_dropbox" }) };
      }
      if (url === "https://api.dropboxapi.com/2/users/get_current_account") {
        expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer stored_dropbox");
        return { ok: true, status: 200, text: async () => "{\"account_id\":\"dbid:1\"}" };
      }
      if (url === "https://unclick.test/api/credentials") {
        expect(init?.method).toBe("PATCH");
        expect(String(init?.body)).toContain("\"platform\":\"dropbox\"");
        return { ok: true, status: 200, json: async () => ({ success: true }) };
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await dropboxGetAccount({}) as Record<string, unknown>;

    expect(result.unclick_meta).toMatchObject({ source: "Dropbox API v2" });
    expect(fetchMock.mock.calls.map(([input]) => String(input))).toContain("https://unclick.test/api/credentials");
  });
});
