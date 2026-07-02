import { describe, it, expect } from "vitest";
import { trieOps } from "./trie-tool.js";

describe("trieOps", () => {
  it("searches for exact words", async () => {
    const r = (await trieOps({
      words: ["apple", "app", "banana"],
      queries: ["app", "apple", "ban"],
    })) as any;
    expect(r.search_results[0].exact_match).toBe(true);
    expect(r.search_results[1].exact_match).toBe(true);
    expect(r.search_results[2].exact_match).toBe(false);
  });

  it("counts prefix matches", async () => {
    const r = (await trieOps({
      words: ["apple", "app", "application"],
      queries: ["app"],
    })) as any;
    expect(r.search_results[0].prefix_count).toBe(3);
  });

  it("autocompletes from prefix", async () => {
    const r = (await trieOps({
      words: ["car", "card", "care", "careful", "bat"],
      prefix: "car",
    })) as any;
    expect(r.autocomplete).toContain("car");
    expect(r.autocomplete).toContain("card");
    expect(r.autocomplete).toContain("care");
    expect(r.autocomplete).toContain("careful");
    expect(r.autocomplete).not.toContain("bat");
  });

  it("rejects empty words", async () => {
    await expect(trieOps({ words: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await trieOps({ words: ["a"] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
