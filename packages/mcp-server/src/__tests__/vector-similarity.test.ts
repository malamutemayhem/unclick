import { describe, it, expect } from "vitest";
import { cosineSimilarity, euclideanDistance, manhattanDistance, dotProduct, magnitude, normalize, findMostSimilar } from "../vector-similarity.js";

describe("cosineSimilarity", () => {
  it("identical vectors return 1", () => {
    expect(cosineSimilarity([1, 2, 3], [1, 2, 3])).toBeCloseTo(1);
  });

  it("orthogonal vectors return 0", () => {
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0);
  });

  it("opposite vectors return -1", () => {
    expect(cosineSimilarity([1, 0], [-1, 0])).toBeCloseTo(-1);
  });
});

describe("euclideanDistance", () => {
  it("same point is 0", () => {
    expect(euclideanDistance([1, 2], [1, 2])).toBe(0);
  });

  it("calculates correctly", () => {
    expect(euclideanDistance([0, 0], [3, 4])).toBe(5);
  });
});

describe("manhattanDistance", () => {
  it("calculates correctly", () => {
    expect(manhattanDistance([0, 0], [3, 4])).toBe(7);
  });
});

describe("dotProduct", () => {
  it("calculates correctly", () => {
    expect(dotProduct([1, 2, 3], [4, 5, 6])).toBe(32);
  });
});

describe("magnitude", () => {
  it("unit vector", () => {
    expect(magnitude([1, 0, 0])).toBe(1);
  });

  it("pythagorean", () => {
    expect(magnitude([3, 4])).toBe(5);
  });
});

describe("normalize", () => {
  it("creates unit vector", () => {
    const n = normalize([3, 4]);
    expect(magnitude(n)).toBeCloseTo(1);
  });

  it("handles zero vector", () => {
    expect(normalize([0, 0])).toEqual([0, 0]);
  });
});

describe("findMostSimilar", () => {
  it("finds closest match", () => {
    const candidates = [
      { item: "a", vector: [1, 0, 0] },
      { item: "b", vector: [0, 1, 0] },
      { item: "c", vector: [0.9, 0.1, 0] },
    ];
    const results = findMostSimilar([1, 0, 0], candidates, 1);
    expect(results[0].item).toBe("a");
    expect(results[0].similarity).toBeCloseTo(1);
  });

  it("returns top N", () => {
    const candidates = [
      { item: "a", vector: [1, 0] },
      { item: "b", vector: [0.9, 0.1] },
      { item: "c", vector: [0, 1] },
    ];
    const results = findMostSimilar([1, 0], candidates, 2);
    expect(results.length).toBe(2);
  });
});
