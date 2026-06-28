import { describe, it, expect, vi, afterEach } from "vitest";
import { waybackCheck } from "./wayback-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("wayback-tool", () => {
  it("finds a snapshot", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({
        url: "example.com",
        archived_snapshots: { closest: { status: "200", available: true, url: "https://web.archive.org/web/20210101/https://example.com", timestamp: "20210101000000" } },
      }),
    }));
    const r = await waybackCheck({ url: "example.com" }) as Record<string, unknown>;
    expect(r.archived_snapshots).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing url", async () => {
    const r = await waybackCheck({}) as Record<string, unknown>;
    expect(r.error).toMatch(/url/i);
  });
});
