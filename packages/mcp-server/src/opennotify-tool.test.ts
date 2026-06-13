import { afterEach, describe, expect, it, vi } from "vitest";
import { issLocation, issAstronauts } from "./opennotify-tool.js";

describe("opennotify connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await issLocation({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await issAstronauts({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("issLocation returns position with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ message: "success", iss_position: { latitude: "51.5", longitude: "-0.1" }, timestamp: 1234567890 }),
    })));
    const r = await issLocation({}) as Record<string, unknown>;
    expect(r.message).toBe("success");
    expect(r.unclick_meta).toBeDefined();
  });

  it("issAstronauts returns crew list", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ message: "success", number: 7, people: [{ name: "Test Astronaut", craft: "ISS" }] }),
    })));
    const r = await issAstronauts({}) as Record<string, unknown>;
    expect(r.number).toBe(7);
  });
});
