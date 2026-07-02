import { describe, it, expect, vi, afterEach } from "vitest";
import { gutendexSearch, gutendexBook } from "./gutendex-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("gutendex-tool", () => {
  it("searches books", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ count: 1, results: [{ id: 84, title: "Frankenstein" }] }),
    }));
    const r = await gutendexSearch({ query: "frankenstein" }) as Record<string, unknown>;
    expect(r.count).toBe(1);
    expect(r.unclick_meta).toBeDefined();
  });

  it("gets book by id", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ id: 84, title: "Frankenstein", authors: [{ name: "Shelley, Mary" }] }),
    }));
    const r = await gutendexBook({ id: "84" }) as Record<string, unknown>;
    expect(r.title).toBe("Frankenstein");
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing query", async () => {
    const r = await gutendexSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
