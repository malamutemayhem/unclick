import { afterEach, describe, expect, it, vi } from "vitest";
import { listAsanaWorkspaces, listAsanaProjects } from "./asana-tool.js";

// L2 resilience contract for the Asana connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("asana connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    const result = await listAsanaWorkspaces({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await listAsanaWorkspaces({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await listAsanaProjects({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/workspace_gid/i);
  });

  it("maps workspace listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ data: [{ gid: "1", name: "Workspace" }] }),
    })));
    const result = await listAsanaWorkspaces({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.workspaces as Array<Record<string, unknown>>)[0].name).toBe("Workspace");
  });
});
