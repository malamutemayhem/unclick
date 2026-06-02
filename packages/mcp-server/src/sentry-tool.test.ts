import { afterEach, describe, expect, it, vi } from "vitest";
import { sentryAction } from "./sentry-tool.js";

// L2 resilience contract for the Sentry connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("sentry connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, text: async () => "",
    })));
    const result = await sentryAction("list_projects", { auth_token: "t", organization_slug: "o" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await sentryAction("list_projects", { auth_token: "t", organization_slug: "o" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await sentryAction("list_issues", { auth_token: "t", organization_slug: "o" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/project_slug/i);
  });

  it("passes through successful project listings", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      text: async () => JSON.stringify([{ id: "p1", slug: "proj" }]),
    })));
    const result = await sentryAction("list_projects", { auth_token: "t", organization_slug: "o" });
    expect(Array.isArray(result)).toBe(true);
    expect((result as unknown[]).length).toBe(1);
  });
});
