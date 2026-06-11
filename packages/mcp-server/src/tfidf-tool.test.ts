import { describe, it, expect } from "vitest";
import { tfidfCalculate } from "./tfidf-tool.js";

describe("tfidf-tool", () => {
  it("ranks documents by relevance", async () => {
    const r = await tfidfCalculate({
      documents: ["the cat sat on the mat", "the dog ran in the park", "the cat chased the dog"],
      query: "cat",
    }) as Record<string, unknown>;
    const rankings = r.rankings as Array<{ document_index: number; score: number }>;
    expect(rankings[0].score).toBeGreaterThan(0);
    expect([0, 2]).toContain(rankings[0].document_index);
    expect(r.document_count).toBe(3);
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns zero for absent terms", async () => {
    const r = await tfidfCalculate({
      documents: ["hello world", "goodbye world"],
      query: "banana",
    }) as Record<string, unknown>;
    const rankings = r.rankings as Array<{ document_index: number; score: number }>;
    expect(rankings[0].score).toBe(0);
  });

  it("rejects missing documents", async () => {
    const r = await tfidfCalculate({ query: "test" }) as Record<string, unknown>;
    expect(r.error).toMatch(/documents/i);
  });

  it("rejects missing query", async () => {
    const r = await tfidfCalculate({ documents: ["hello"] }) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
