import { afterEach, describe, expect, it, vi } from "vitest";

import { getWillyweatherForecast } from "./willyweather-tool.js";

// Colocated WillyWeather connector tests. Functions catch and return { error }.

describe("willyweather connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" })));
    const r = await getWillyweatherForecast({ api_key: "k", location: "Sydney" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit exceeded/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await getWillyweatherForecast({ api_key: "k", location: "Sydney" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when location is missing", async () => {
    const r = await getWillyweatherForecast({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/location is required/i);
  });

  it("reports when a location is not found", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ locations: [] }) })));
    const r = await getWillyweatherForecast({ api_key: "k", location: "Nowhereville" }) as Record<string, unknown>;
    expect(r.error).toMatch(/not found/i);
  });
});
