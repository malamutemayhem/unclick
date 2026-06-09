import { describe, it, expect } from "vitest";
import { edmondsKarp } from "./edmondskarp-tool.js";

describe("edmondsKarp", () => {
  it("finds max flow in a simple network", async () => {
    const r = (await edmondsKarp({
      vertices: 4,
      edges: [[0, 1, 10], [0, 2, 10], [1, 3, 10], [2, 3, 10], [1, 2, 5]],
      source: 0,
      sink: 3,
    })) as any;
    expect(r.max_flow).toBe(20);
    expect(r.source).toBe(0);
    expect(r.sink).toBe(3);
  });

  it("handles bottleneck correctly", async () => {
    const r = (await edmondsKarp({
      vertices: 3,
      edges: [[0, 1, 100], [1, 2, 1]],
    })) as any;
    expect(r.max_flow).toBe(1);
    expect(r.augmenting_paths).toBe(1);
  });

  it("returns min-cut source side", async () => {
    const r = (await edmondsKarp({
      vertices: 4,
      edges: [[0, 1, 3], [0, 2, 3], [1, 3, 2], [2, 3, 2]],
    })) as any;
    expect(r.max_flow).toBe(4);
    expect(r.min_cut_source_side).toContain(0);
  });

  it("handles no path (disconnected)", async () => {
    const r = (await edmondsKarp({
      vertices: 3,
      edges: [[0, 1, 5]],
      source: 0,
      sink: 2,
    })) as any;
    expect(r.max_flow).toBe(0);
  });

  it("stamps meta", async () => {
    const r = (await edmondsKarp({
      vertices: 2,
      edges: [[0, 1, 5]],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
