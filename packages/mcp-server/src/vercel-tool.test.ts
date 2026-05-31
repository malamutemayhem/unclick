import { afterEach, describe, expect, it, vi } from "vitest";
import { vercelProjectIdArg, listVercelDeployments, getVercelDeployment } from "./vercel-tool.js";

describe("vercelProjectIdArg", () => {
  it("uses project_id as the canonical key", () => {
    expect(vercelProjectIdArg({ project_id: " prj_canonical " })).toBe("prj_canonical");
  });

  it("accepts projectId as a legacy alias", () => {
    expect(vercelProjectIdArg({ projectId: " prj_legacy " })).toBe("prj_legacy");
  });
});

// L2 resilience contract for the Vercel connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("vercel connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}), text: async () => "",
    })));
    const result = await listVercelDeployments({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await listVercelDeployments({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await getVercelDeployment({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/id is required/i);
  });

  it("maps deployment listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ deployments: [{ uid: "d1", name: "app", state: "READY" }], pagination: {} }),
    })));
    const result = await listVercelDeployments({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.deployments as Array<Record<string, unknown>>)[0].uid).toBe("d1");
  });
});
