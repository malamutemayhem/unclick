import { describe, it, expect, vi, afterEach } from "vitest";
import { wikidataSearch, wikidataGetEntity } from "./wikidata-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("wikidata-tool", () => {
  it("wikidataSearch returns entities", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ search: [{ id: "Q42", label: "Douglas Adams", description: "English author" }] }),
    }));
    const r = await wikidataSearch({ query: "Douglas Adams" }) as Record<string, unknown>;
    expect(r.search).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("wikidataGetEntity returns entity data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ entities: { Q42: { labels: { en: { value: "Douglas Adams" } } } } }),
    }));
    const r = await wikidataGetEntity({ id: "Q42" }) as Record<string, unknown>;
    expect(r.entities).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing query", async () => {
    const r = await wikidataSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
