import { afterEach, describe, expect, it, vi } from "vitest";
import { triviaDbQuestions, triviaDbCategories } from "./opentriviadb-tool.js";

describe("opentriviadb connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await triviaDbQuestions({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await triviaDbCategories({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns questions with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ response_code: 0, results: [{ question: "What is 2+2?", correct_answer: "4" }] }),
    })));
    const r = await triviaDbQuestions({ amount: 1 }) as Record<string, unknown>;
    expect(r.trivia).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
