import { afterEach, describe, expect, it, vi } from "vitest";
import { gmailRead, gmailSearch, gmailSend } from "./gmail-tool.js";

describe("gmail connector (L2/L5)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("returns a clean 429 error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
      text: async () => "{}",
    })));
    await expect(gmailSearch({ access_token: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("returns a clean timeout error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("slow");
      err.name = "AbortError";
      throw err;
    }));
    await expect(gmailSearch({ access_token: "k" })).rejects.toThrow(/timed out/i);
  });

  it("returns setup guidance when not connected", async () => {
    vi.stubEnv("UNCLICK_API_KEY", "");
    const r = await gmailSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/credentials not configured/i);
    expect((r.setup as Record<string, unknown>).web).toBe("https://unclick.world/connect/gmail");
  });

  it("validates required read and send inputs", async () => {
    expect((await gmailRead({ access_token: "k" }) as Record<string, unknown>).error).toMatch(/message_id is required/i);
    expect((await gmailSend({ access_token: "k" }) as Record<string, unknown>).error).toMatch(/to is required/i);
  });

  it("stamps successful reads", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      text: async () => "{\"messages\":[]}",
    })));
    const r = await gmailSearch({ access_token: "k" }) as Record<string, any>;
    expect(r.unclick_meta.source).toMatch(/Gmail/);
  });
});
