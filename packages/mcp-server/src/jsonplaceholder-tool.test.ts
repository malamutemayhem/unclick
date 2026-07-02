import { afterEach, describe, expect, it, vi } from "vitest";
import { jpListPosts, jpGetPost, jpListComments, jpListUsers } from "./jsonplaceholder-tool.js";

describe("jsonplaceholder connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await jpListPosts({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await jpListUsers({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required id for jpGetPost", async () => {
    const r = await jpGetPost({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id is required/i);
  });

  it("validates required postId for jpListComments", async () => {
    const r = await jpListComments({}) as Record<string, unknown>;
    expect(r.error).toMatch(/postId is required/i);
  });

  it("jpListPosts returns posts with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ id: 1, title: "Test post", body: "Body text", userId: 1 }]),
    })));
    const r = await jpListPosts({}) as Record<string, unknown>;
    expect(r.count).toBe(1);
    expect(r.unclick_meta).toBeDefined();
  });
});
