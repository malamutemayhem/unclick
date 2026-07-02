import { describe, it, expect, vi, afterEach } from "vitest";
import { stackexchangeSearch, stackexchangeQuestion } from "./stackexchange-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("stackexchange-tool", () => {
  it("searches questions", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ items: [{ question_id: 1, title: "How to parse JSON" }], has_more: false }),
    }));
    const r = await stackexchangeSearch({ query: "parse JSON" }) as Record<string, unknown>;
    expect(r.items).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("gets a question by id", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ items: [{ question_id: 123, title: "Sample Q" }] }),
    }));
    const r = await stackexchangeQuestion({ id: "123" }) as Record<string, unknown>;
    expect(r.items).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing query", async () => {
    const r = await stackexchangeSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
