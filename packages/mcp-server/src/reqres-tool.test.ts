import { afterEach, describe, expect, it, vi } from "vitest";
import { reqresListUsers, reqresGetUser, reqresListResources } from "./reqres-tool.js";

describe("reqres connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await reqresListUsers({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await reqresGetUser({ id: 1 }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required id for reqresGetUser", async () => {
    const r = await reqresGetUser({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id is required/i);
  });

  it("reqresListUsers returns users with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ page: 1, per_page: 6, total: 12, data: [{ id: 1, email: "george.bluth@reqres.in", first_name: "George" }] }),
    })));
    const r = await reqresListUsers({}) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });
});
