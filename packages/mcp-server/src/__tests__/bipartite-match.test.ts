import { describe, it, expect } from "vitest";
import { BipartiteMatch } from "../bipartite-match.js";

describe("BipartiteMatch", () => {
  it("maxMatching finds maximum matching", () => {
    const bm = new BipartiteMatch(3, 3);
    bm.addEdge(0, 0);
    bm.addEdge(0, 1);
    bm.addEdge(1, 0);
    bm.addEdge(2, 2);
    const { size } = bm.maxMatching();
    expect(size).toBe(3);
  });

  it("maxMatching returns partial match when not perfect", () => {
    const bm = new BipartiteMatch(3, 2);
    bm.addEdge(0, 0);
    bm.addEdge(1, 0);
    bm.addEdge(2, 1);
    const { size } = bm.maxMatching();
    expect(size).toBe(2);
  });

  it("isPerfect checks for full matching", () => {
    const bm = new BipartiteMatch(2, 2);
    bm.addEdge(0, 0);
    bm.addEdge(1, 1);
    expect(bm.isPerfect()).toBe(true);
  });

  it("isPerfect returns false when not all matched", () => {
    const bm = new BipartiteMatch(3, 2);
    bm.addEdge(0, 0);
    bm.addEdge(1, 0);
    bm.addEdge(2, 0);
    expect(bm.isPerfect()).toBe(false);
  });

  it("isBipartite detects bipartite graphs", () => {
    const bm = new BipartiteMatch(0, 0);
    expect(bm.isBipartite([[1], [0, 2], [1]])).toBe(true);
    expect(bm.isBipartite([[1, 2], [0, 2], [0, 1]])).toBe(false);
  });

  it("vertexCoverSize equals matching size (Konig)", () => {
    const bm = new BipartiteMatch(3, 3);
    bm.addEdge(0, 0);
    bm.addEdge(1, 1);
    bm.addEdge(2, 2);
    expect(bm.vertexCoverSize()).toBe(3);
  });

  it("independentSetSize is correct", () => {
    const bm = new BipartiteMatch(3, 3);
    bm.addEdge(0, 0);
    bm.addEdge(1, 1);
    bm.addEdge(2, 2);
    expect(bm.independentSetSize()).toBe(3);
  });

  it("matchLeft and matchRight arrays are correct", () => {
    const bm = new BipartiteMatch(2, 2);
    bm.addEdge(0, 1);
    bm.addEdge(1, 0);
    const { matchLeft, matchRight } = bm.maxMatching();
    expect(matchLeft[0]).toBe(1);
    expect(matchLeft[1]).toBe(0);
    expect(matchRight[0]).toBe(1);
    expect(matchRight[1]).toBe(0);
  });
});
