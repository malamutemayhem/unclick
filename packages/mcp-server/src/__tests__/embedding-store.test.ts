import { describe, it, expect } from "vitest";
import { EmbeddingStore } from "../embedding-store.js";

describe("EmbeddingStore", () => {
  it("add and get", () => {
    const store = new EmbeddingStore(3);
    store.add("a", [1, 0, 0], { label: "x" });
    expect(store.get("a")?.metadata.label).toBe("x");
    expect(store.has("a")).toBe(true);
    expect(store.size).toBe(1);
  });

  it("rejects wrong dimensions", () => {
    const store = new EmbeddingStore(3);
    expect(() => store.add("a", [1, 0])).toThrow("Expected 3 dimensions");
  });

  it("search finds similar vectors", () => {
    const store = new EmbeddingStore(3);
    store.add("a", [1, 0, 0]);
    store.add("b", [0, 1, 0]);
    store.add("c", [0.9, 0.1, 0]);
    const results = store.search([1, 0, 0], 2);
    expect(results.length).toBe(2);
    expect(results[0].entry.id).toBe("a");
    expect(results[0].similarity).toBeCloseTo(1);
  });

  it("search respects minSimilarity", () => {
    const store = new EmbeddingStore(3);
    store.add("a", [1, 0, 0]);
    store.add("b", [0, 1, 0]);
    const results = store.search([1, 0, 0], 10, 0.9);
    expect(results.length).toBe(1);
  });

  it("search rejects wrong query dimensions", () => {
    const store = new EmbeddingStore(3);
    expect(() => store.search([1, 0])).toThrow("Expected 3 dimensions");
  });

  it("searchByMetadata filters", () => {
    const store = new EmbeddingStore(2);
    store.add("a", [1, 0], { type: "dog" });
    store.add("b", [0, 1], { type: "cat" });
    store.add("c", [1, 1], { type: "dog" });
    expect(store.searchByMetadata({ type: "dog" }).length).toBe(2);
  });

  it("remove and clear", () => {
    const store = new EmbeddingStore(2);
    store.add("a", [1, 0]);
    store.add("b", [0, 1]);
    expect(store.remove("a")).toBe(true);
    expect(store.size).toBe(1);
    store.clear();
    expect(store.size).toBe(0);
  });

  it("reports dimensions", () => {
    expect(new EmbeddingStore(128).dims).toBe(128);
  });
});
