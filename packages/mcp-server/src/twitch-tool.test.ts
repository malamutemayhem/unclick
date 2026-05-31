import { afterEach, describe, expect, it, vi } from "vitest";

import { twitchGetStream } from "./twitch-tool.js";

const creds = { client_id: "id", client_secret: "secret" };
const authOk = { ok: true, status: 200, json: async () => ({ access_token: "t", expires_in: 3600 }) };

describe("twitch connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("oauth2/token")) return authOk;
      return { ok: false, status: 429, headers: { get: () => null }, text: async () => "" };
    }));
    const r = await twitchGetStream({ ...creds, channel: "ninja" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit reached \(HTTP 429\)/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("oauth2/token")) return authOk;
      const e = new Error("aborted"); e.name = "AbortError"; throw e;
    }));
    const r = await twitchGetStream({ ...creds, channel: "ninja" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when channel is missing", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => authOk));
    const r = await twitchGetStream({ ...creds }) as Record<string, unknown>;
    expect(r.error).toMatch(/channel.*required/i);
  });

  it("reports a live stream", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("oauth2/token")) return authOk;
      return { ok: true, status: 200, text: async () => "", json: async () => ({ data: [{ id: "1", user_name: "Ninja", viewer_count: 5000 }] }) };
    }));
    const r = await twitchGetStream({ ...creds, channel: "ninja" }) as Record<string, any>;
    expect(r.live).toBe(true);
  });
});
