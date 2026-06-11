import { describe, it, expect } from "vitest";
import { hopcroftKarp } from "./hopcroftcarp-tool.js";

describe("hopcroftKarp", () => {
  it("finds maximum matching", async () => {
    const r = (await hopcroftKarp({
      left_size: 3,
      right_size: 3,
      edges: [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2]],
    })) as any;
    expect(r.maximum_matching).toBe(3);
    expect(r.is_perfect_matching).toBe(true);
  });

  it("handles incomplete matching", async () => {
    const r = (await hopcroftKarp({
      left_size: 3,
      right_size: 2,
      edges: [[0, 0], [1, 0], [2, 1]],
    })) as any;
    expect(r.maximum_matching).toBe(2);
    expect(r.unmatched_left.length).toBe(1);
  });

  it("handles no edges", async () => {
    const r = (await hopcroftKarp({
      left_size: 2,
      right_size: 2,
      edges: [],
    })) as any;
    expect(r.maximum_matching).toBe(0);
  });

  it("returns matched pairs", async () => {
    const r = (await hopcroftKarp({
      left_size: 2,
      right_size: 2,
      edges: [[0, 0], [1, 1]],
    })) as any;
    expect(r.matched_pairs.length).toBe(2);
  });

  it("stamps meta", async () => {
    const r = (await hopcroftKarp({
      left_size: 1,
      right_size: 1,
      edges: [[0, 0]],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
