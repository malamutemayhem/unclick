import { afterEach, describe, expect, it, vi } from "vitest";
import { yesNoRandom } from "./yesno-tool.js";

describe("yesno connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await yesNoRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await yesNoRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("yesNoRandom returns answer with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ answer: "yes", forced: false, image: "https://yesno.wtf/assets/yes/1.gif" }),
    })));
    const r = await yesNoRandom({}) as Record<string, unknown>;
    expect(r.answer).toBe("yes");
    expect(r.unclick_meta).toBeDefined();
  });
});
