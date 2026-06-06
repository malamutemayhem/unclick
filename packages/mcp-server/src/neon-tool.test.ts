import { afterEach, describe, expect, it, vi } from "vitest";
import { neonListProjects, neonGetProject } from "./neon-tool.js";

// L2 resilience contract for the Neon connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("neon connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "",
    })));
    const result = await neonListProjects({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await neonListProjects({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await neonGetProject({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/project_id/i);
  });

  it("passes through successful project listings", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      text: async () => JSON.stringify({ projects: [{ id: "p1", name: "proj" }] }),
    })));
    const result = await neonListProjects({ api_key: "k" }) as Record<string, unknown>;
    expect((result.projects as unknown[]).length).toBe(1);
  });
});
