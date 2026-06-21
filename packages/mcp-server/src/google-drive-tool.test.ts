import { afterEach, describe, expect, it, vi } from "vitest";
import { driveRead, driveSearch } from "./google-drive-tool.js";

describe("google-drive connector (L2/L5)", () => {
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
    await expect(driveSearch({ access_token: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("explains how to fix missing Drive permission", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 403,
      statusText: "Forbidden",
      headers: new Headers({ "content-type": "application/json" }),
      text: async () => "{}",
    })));
    await expect(driveSearch({ access_token: "k" })).rejects.toThrow(/Reconnect Google Drive and grant file read access/i);
  });

  it("returns a clean timeout error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("slow");
      err.name = "AbortError";
      throw err;
    }));
    await expect(driveSearch({ access_token: "k" })).rejects.toThrow(/timed out/i);
  });

  it("returns setup guidance when not connected", async () => {
    vi.stubEnv("UNCLICK_API_KEY", "");
    const r = await driveSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/credentials not configured/i);
    expect((r.setup as Record<string, unknown>).web).toBe("https://unclick.world/connect/google-drive");
  });

  it("resolves stored credentials from underscore-safe env vars", async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Headers({ "content-type": "application/json" }),
      text: async () => "{\"files\":[]}",
    }));
    vi.stubEnv("UNCLICK_GOOGLE_DRIVE_ACCESS_TOKEN", "env-token");
    vi.stubGlobal("fetch", fetchMock);

    await driveSearch({});

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer env-token" }),
      }),
    );
  });

  it("validates required read inputs", async () => {
    const r = await driveRead({ access_token: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/file_id is required/i);
  });

  it("stamps successful searches", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Headers({ "content-type": "application/json" }),
      text: async () => "{\"files\":[]}",
    })));
    const r = await driveSearch({ access_token: "k" }) as Record<string, any>;
    expect(r.unclick_meta.source).toMatch(/Google Drive/);
  });
});
