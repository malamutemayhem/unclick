import { describe, it, expect } from "vitest";
import { Trie } from "../trie.js";

describe("Trie", () => {
  it("inserts and finds keys", () => {
    const t = new Trie();
    t.insert("hello");
    t.insert("world");
    expect(t.has("hello")).toBe(true);
    expect(t.has("world")).toBe(true);
    expect(t.has("hel")).toBe(false);
  });

  it("stores values", () => {
    const t = new Trie<number>();
    t.insert("timeout", 5000);
    expect(t.get("timeout")).toBe(5000);
    expect(t.get("missing")).toBeUndefined();
  });

  it("finds by prefix", () => {
    const t = new Trie();
    t.insert("github_action");
    t.insert("github_pr");
    t.insert("gitlab_merge");
    t.insert("slack_send");
    const results = t.startsWith("github_");
    expect(results).toContain("github_action");
    expect(results).toContain("github_pr");
    expect(results).not.toContain("gitlab_merge");
  });

  it("returns empty for no prefix match", () => {
    const t = new Trie();
    t.insert("hello");
    expect(t.startsWith("xyz")).toEqual([]);
  });

  it("deletes keys", () => {
    const t = new Trie();
    t.insert("hello");
    expect(t.delete("hello")).toBe(true);
    expect(t.has("hello")).toBe(false);
    expect(t.size).toBe(0);
  });

  it("delete returns false for missing key", () => {
    const t = new Trie();
    expect(t.delete("nope")).toBe(false);
  });

  it("tracks size", () => {
    const t = new Trie();
    t.insert("a");
    t.insert("b");
    t.insert("a");
    expect(t.size).toBe(2);
  });

  it("handles empty string", () => {
    const t = new Trie();
    t.insert("");
    expect(t.has("")).toBe(true);
    expect(t.size).toBe(1);
  });
});
