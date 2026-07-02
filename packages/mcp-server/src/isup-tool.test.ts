import { describe, it, expect, vi, afterEach } from "vitest";
import { isupCheck } from "./isup-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("isup-tool", () => {
  it("checks if a domain is up", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ domain: "google.com", port: 80, status_code: 1, response_ip: "142.250.70.46", response_code: 200, response_time: 0.042 }),
    }));
    const r = await isupCheck({ domain: "google.com" }) as Record<string, unknown>;
    expect(r.status_code).toBe(1);
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing domain", async () => {
    const r = await isupCheck({}) as Record<string, unknown>;
    expect(r.error).toMatch(/domain/i);
  });
});
