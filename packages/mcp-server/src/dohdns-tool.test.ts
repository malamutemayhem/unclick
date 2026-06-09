import { describe, it, expect, vi, afterEach } from "vitest";
import { dohdnsResolve } from "./dohdns-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("dohdns-tool", () => {
  it("resolves a domain", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ Status: 0, Answer: [{ name: "example.com", type: 1, data: "93.184.216.34" }] }),
    }));
    const r = await dohdnsResolve({ name: "example.com" }) as Record<string, unknown>;
    expect(r.Answer).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("accepts type parameter", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ Status: 0, Answer: [{ name: "example.com", type: 15, data: "mail.example.com" }] }),
    }));
    const r = await dohdnsResolve({ name: "example.com", type: "MX" }) as Record<string, unknown>;
    expect(r.Answer).toBeDefined();
  });

  it("rejects missing name", async () => {
    const r = await dohdnsResolve({}) as Record<string, unknown>;
    expect(r.error).toMatch(/name/i);
  });
});
