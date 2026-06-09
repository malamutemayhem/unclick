import { afterEach, describe, expect, it, vi } from "vitest";

import { numberFact, numberRandom } from "./numbers-tool.js";

// Colocated Numbers API connector tests. Exercise the L2 (resilience) behaviour.

describe("numbers connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
    })));
    await expect(numberFact({ number: "42" })).rejects.toThrow(/HTTP 429/);
  });

  it("surfaces a clean error on HTTP 500", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 500,
    })));
    await expect(numberFact({ number: "42" })).rejects.toThrow(/HTTP 500/);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(numberFact({ number: "42" })).rejects.toThrow(/timed out/i);
  });

  it("returns a structured error when number is missing", async () => {
    const r = await numberFact({}) as Record<string, unknown>;
    expect(r.error).toMatch(/number is required/i);
  });

  it("parses a successful JSON response for number_fact", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        text: "42 is the answer to life, the universe, and everything.",
        number: 42,
        found: true,
        type: "trivia",
      }),
    })));
    const r = await numberFact({ number: "42", type: "trivia" }) as Record<string, unknown>;
    expect(r.number).toBe(42);
    expect(r.type).toBe("trivia");
    expect(r.fact).toBe("42 is the answer to life, the universe, and everything.");
    expect(r.found).toBe(true);
  });

  it("defaults to trivia type when an invalid type is passed", async () => {
    let capturedUrl = "";
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      capturedUrl = url;
      return {
        ok: true,
        status: 200,
        json: async () => ({ text: "fact", number: 7, found: true, type: "trivia" }),
      };
    }));
    await numberFact({ number: "7", type: "invalid" });
    expect(capturedUrl).toContain("/7/trivia");
  });

  it("parses a successful JSON response for number_random", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        text: "73 is the best number.",
        number: 73,
        found: true,
        type: "math",
      }),
    })));
    const r = await numberRandom({ type: "math" }) as Record<string, unknown>;
    expect(r.number).toBe(73);
    expect(r.type).toBe("math");
    expect(r.fact).toBe("73 is the best number.");
    expect(r.found).toBe(true);
  });
});
