import { describe, it, expect } from "vitest";
import { TrieAutocomplete } from "../trie-autocomplete.js";

describe("TrieAutocomplete", () => {
  it("insert and search", () => {
    const trie = new TrieAutocomplete();
    trie.insert("hello");
    expect(trie.search("hello")).toBe(true);
    expect(trie.search("hell")).toBe(false);
  });

  it("startsWith checks prefix", () => {
    const trie = new TrieAutocomplete();
    trie.insert("hello");
    expect(trie.startsWith("hel")).toBe(true);
    expect(trie.startsWith("hey")).toBe(false);
  });

  it("autocomplete returns matching words", () => {
    const trie = new TrieAutocomplete();
    trie.insert("hello");
    trie.insert("help");
    trie.insert("hero");
    const results = trie.autocomplete("hel");
    expect(results).toContain("hello");
    expect(results).toContain("help");
    expect(results).not.toContain("hero");
  });

  it("autocomplete respects limit", () => {
    const trie = new TrieAutocomplete();
    for (let i = 0; i < 20; i++) trie.insert("word" + i);
    const results = trie.autocomplete("word", 5);
    expect(results.length).toBe(5);
  });

  it("delete removes word", () => {
    const trie = new TrieAutocomplete();
    trie.insert("hello");
    trie.insert("help");
    trie.delete("hello");
    expect(trie.search("hello")).toBe(false);
    expect(trie.search("help")).toBe(true);
  });

  it("wordCount tracks total", () => {
    const trie = new TrieAutocomplete();
    trie.insert("a");
    trie.insert("ab");
    trie.insert("abc");
    expect(trie.wordCount()).toBe(3);
  });

  it("allWords returns everything", () => {
    const trie = new TrieAutocomplete();
    trie.insert("cat");
    trie.insert("car");
    trie.insert("dog");
    const words = trie.allWords();
    expect(words.length).toBe(3);
    expect(words).toContain("cat");
  });

  it("empty prefix returns all", () => {
    const trie = new TrieAutocomplete();
    trie.insert("a");
    trie.insert("b");
    expect(trie.autocomplete("").length).toBe(2);
  });
});
