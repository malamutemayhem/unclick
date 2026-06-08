import { describe, it, expect, vi, afterEach } from "vitest";
import { arxivSearch } from "./arxiv-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("arxiv-tool", () => {
  it("arxivSearch returns parsed papers", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      text: async () => `<feed><entry><id>http://arxiv.org/abs/2301.00001v1</id><title>Test Paper</title><summary>A summary.</summary><author><name>Jane Doe</name></author><published>2023-01-01</published><updated>2023-01-02</updated></entry></feed>`,
    }));
    const r = await arxivSearch({ query: "machine learning" }) as Record<string, unknown>;
    expect(r.papers).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing query", async () => {
    const r = await arxivSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
