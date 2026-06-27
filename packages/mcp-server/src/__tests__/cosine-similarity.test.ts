import { describe, it, expect } from "vitest";
import { cosineSimilarity, euclideanDistance, manhattanDistance, normalize, dotProduct, topK, termFrequency } from "../cosine-similarity.js";

describe("cosineSimilarity", () => {
  it("identical vectors have similarity 1", () => {
    expect(cosineSimilarity([1, 2, 3], [1, 2, 3])).toBeCloseTo(1);
  });

  it("orthogonal vectors have similarity 0", () => {
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0);
  });

  it("opposite vectors have similarity -1", () => {
    expect(cosineSimilarity([1, 0], [-1, 0])).toBeCloseTo(-1);
  });

  it("zero vector returns 0", () => {
    expect(cosineSimilarity([0, 0], [1, 2])).toBe(0);
  });
});

describe("distances", () => {
  it("euclidean distance", () => {
    expect(euclideanDistance([0, 0], [3, 4])).toBe(5);
  });

  it("manhattan distance", () => {
    expect(manhattanDistance([0, 0], [3, 4])).toBe(7);
  });
});

describe("normalize", () => {
  it("creates unit vector", () => {
    const n = normalize([3, 4]);
    expect(n[0]).toBeCloseTo(0.6);
    expect(n[1]).toBeCloseTo(0.8);
    expect(dotProduct(n, n)).toBeCloseTo(1);
  });
});

describe("topK", () => {
  it("returns closest items", () => {
    const items = [
      { vector: [1, 0, 0], data: "a" },
      { vector: [0, 1, 0], data: "b" },
      { vector: [0.9, 0.1, 0], data: "c" },
    ];
    const results = topK([1, 0, 0], items, 2);
    expect(results[0].data).toBe("a");
    expect(results[1].data).toBe("c");
  });
});

describe("termFrequency", () => {
  it("computes word frequencies", () => {
    const tf = termFrequency("the cat sat on the mat");
    expect(tf.get("the")).toBeCloseTo(2 / 6);
    expect(tf.get("cat")).toBeCloseTo(1 / 6);
  });
});
