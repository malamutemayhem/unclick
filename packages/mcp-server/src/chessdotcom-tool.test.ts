import { afterEach, describe, expect, it, vi } from "vitest";

import { chessPlayer } from "./chessdotcom-tool.js";

// Colocated Chess.com connector tests. Exercise the L2 (resilience) behaviour.

describe("chessdotcom connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) } })));
    await expect(chessPlayer({ username: "hikaru" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(chessPlayer({ username: "hikaru" })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(chessPlayer({})).rejects.toThrow(/username is required/i);
  });

  it("maps a player profile", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ username: "hikaru", name: "Hikaru Nakamura", followers: 1000 }) })));
    const r = await chessPlayer({ username: "hikaru" }) as Record<string, any>;
    expect(r.username).toBe("hikaru");
    expect(r.name).toBe("Hikaru Nakamura");
  });
});
