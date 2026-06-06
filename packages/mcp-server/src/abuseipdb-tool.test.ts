import { afterEach, describe, expect, it, vi } from "vitest";
import { checkIpAbuse } from "./abuseipdb-tool.js";

// L2 resilience contract for the AbuseIPDB connector: request timeout, clean
// 429 handling, input validation, and stable response mapping.
describe("abuseipdb connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    const result = await checkIpAbuse({ api_key: "k", ip: "1.2.3.4" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await checkIpAbuse({ api_key: "k", ip: "1.2.3.4" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await checkIpAbuse({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/ip is required/i);
  });

  it("maps the check response into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ data: { ipAddress: "1.2.3.4", abuseConfidenceScore: 42, isPublic: true } }),
    })));
    const result = await checkIpAbuse({ api_key: "k", ip: "1.2.3.4" }) as Record<string, unknown>;
    expect(result.ip_address).toBe("1.2.3.4");
    expect(result.abuse_confidence_score).toBe(42);
  });
});
