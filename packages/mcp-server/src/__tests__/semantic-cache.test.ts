import { describe, it, expect } from "vitest";
import { SemanticCache } from "../semantic-cache.js";

describe("SemanticCache", () => {
  it("set and get", () => {
    const cache = new SemanticCache(60000);
    cache.set("key", "value");
    expect(cache.get("key")).toBe("value");
    expect(cache.has("key")).toBe(true);
  });

  it("returns undefined for missing", () => {
    const cache = new SemanticCache();
    expect(cache.get("nope")).toBeUndefined();
  });

  it("expires entries", () => {
    const cache = new SemanticCache(1);
    cache.set("key", "value", { ttlMs: 0 });
    expect(cache.get("key")).toBeUndefined();
  });

  it("tracks hit count", () => {
    const cache = new SemanticCache(60000);
    cache.set("key", "value");
    cache.get("key");
    cache.get("key");
    const stats = cache.stats();
    expect(stats.hitCount).toBe(2);
  });

  it("findSimilar uses Jaccard similarity", () => {
    const cache = new SemanticCache(60000);
    cache.set("what is the weather today", "sunny");
    cache.set("tell me a joke", "why did the chicken");
    const match = cache.findSimilar("weather today forecast", 0.2);
    expect(match?.value).toBe("sunny");
  });

  it("findSimilar returns undefined below threshold", () => {
    const cache = new SemanticCache(60000);
    cache.set("hello world", "greeting");
    expect(cache.findSimilar("completely different query", 0.8)).toBeUndefined();
  });

  it("tag operations", () => {
    const cache = new SemanticCache(60000);
    cache.set("a", 1, { tags: ["weather"] });
    cache.set("b", 2, { tags: ["weather"] });
    cache.set("c", 3, { tags: ["news"] });
    expect(cache.getByTag("weather").length).toBe(2);
    expect(cache.invalidateByTag("weather")).toBe(2);
    expect(cache.size).toBe(1);
  });

  it("prune removes expired", () => {
    const cache = new SemanticCache();
    cache.set("a", 1, { ttlMs: 0 });
    cache.set("b", 2, { ttlMs: 60000 });
    const pruned = cache.prune();
    expect(pruned).toBe(1);
    expect(cache.size).toBe(1);
  });

  it("delete and clear", () => {
    const cache = new SemanticCache();
    cache.set("a", 1);
    cache.set("b", 2);
    expect(cache.delete("a")).toBe(true);
    expect(cache.size).toBe(1);
    cache.clear();
    expect(cache.size).toBe(0);
  });
});
