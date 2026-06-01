import { afterEach, describe, expect, it, vi } from "vitest";

import { triviaQuestions } from "./trivia-tool.js";

// Colocated Open Trivia DB connector tests. Exercise the L2 (resilience) behaviour.

describe("open trivia db connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "5" : null) },
      text: async () => "rate limited",
    })));
    await expect(triviaQuestions({})).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 5s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(triviaQuestions({})).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    await expect(triviaQuestions({})).rejects.toThrow(/network error: ENOTFOUND/i);
  });

  it("returns a structured error on a non-zero API response code", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ response_code: 5, results: [] }),
    })));
    const result = await triviaQuestions({}) as Record<string, unknown>;
    expect(result.response_code).toBe(5);
    expect(result.error).toBeTruthy();
  });

  it("normalizes returned questions", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        response_code: 0,
        results: [{ category: "Science", type: "multiple", difficulty: "easy", question: "What is H2O?", correct_answer: "Water", incorrect_answers: ["Air", "Fire", "Earth"] }],
      }),
    })));
    const result = await triviaQuestions({}) as Record<string, any>;
    expect(result.count).toBe(1);
    expect(result.questions[0].question).toBe("What is H2O?");
  });
});
