import { afterEach, describe, expect, it, vi } from "vitest";
import { onedriveList, onedriveRead, onedriveSearch } from "./onedrive-tool.js";

describe("onedrive connector (L2/L5)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("returns a clean 429 error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
      headers: new Headers({ "content-type": "application/json" }),
      text: async () => "{}",
    })));
    await expect(onedriveList({ access_token: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("returns a clean timeout error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("slow");
      err.name = "AbortError";
      throw err;
    }));
    await expect(onedriveList({ access_token: "k" })).rejects.toThrow(/timed out/i);
  });

  it("returns setup guidance when not connected", async () => {
    vi.stubEnv("UNCLICK_API_KEY", "");
    const r = await onedriveList({}) as Record<string, unknown>;
    expect(r.error).toMatch(/credentials not configured/i);
    expect((r.setup as Record<string, unknown>).web).toBe("https://unclick.world/connect/onedrive");
  });

  it("validates required inputs", async () => {
    expect((await onedriveSearch({ access_token: "k" }) as Record<string, unknown>).error).toMatch(/query is required/i);
    expect((await onedriveRead({ access_token: "k" }) as Record<string, unknown>).error).toMatch(/item_id is required/i);
  });

  it("stamps successful lists", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Headers({ "content-type": "application/json" }),
      text: async () => "{\"value\":[]}",
    })));
    const r = await onedriveList({ access_token: "k" }) as Record<string, any>;
    expect(r.unclick_meta.source).toMatch(/OneDrive/);
  });
});
