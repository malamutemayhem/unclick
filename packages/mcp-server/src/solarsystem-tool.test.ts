import { afterEach, describe, expect, it, vi } from "vitest";
import { solarsystemBodies, solarsystemBody } from "./solarsystem-tool.js";

describe("solarsystem connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await solarsystemBodies({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await solarsystemBody({ id: "mars" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns bodies with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ bodies: [{ id: "terre", name: "Earth", bodyType: "Planet" }] }),
    })));
    const r = await solarsystemBodies({}) as Record<string, unknown>;
    expect(r.bodies).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
