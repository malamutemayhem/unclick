import { afterEach, describe, expect, it, vi } from "vitest";
import { getCveDetail } from "./nvd-tool.js";

// L2 resilience contract for the NVD connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("nvd connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "", json: async () => ({}),
    })));
    const result = await getCveDetail({ cve_id: "CVE-2024-1234" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await getCveDetail({ cve_id: "CVE-2024-1234" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await getCveDetail({}) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/cve_id is required/i);
  });

  it("maps a CVE detail response into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({
        vulnerabilities: [{
          cve: {
            id: "CVE-2024-1234",
            vulnStatus: "Analyzed",
            descriptions: [{ lang: "en", value: "A test vulnerability." }],
            metrics: {},
          },
        }],
      }),
    })));
    const result = await getCveDetail({ cve_id: "CVE-2024-1234" }) as Record<string, unknown>;
    expect(result.id).toBe("CVE-2024-1234");
    expect(result.description).toBe("A test vulnerability.");
  });
});
