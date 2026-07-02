import { describe, it, expect } from "vitest";
import { linkCutTree } from "./linkcut-tool.js";

describe("linkCutTree", () => {
  it("links and checks connectivity", async () => {
    const r = (await linkCutTree({
      vertex_count: 4,
      operations: [
        { type: "link", u: 1, v: 2 },
        { type: "link", u: 2, v: 3 },
        { type: "connected", u: 1, v: 3 },
        { type: "connected", u: 1, v: 4 },
      ],
    })) as any;
    expect(r.results[0].success).toBe(true);
    expect(r.results[2].result).toBe(true);
    expect(r.results[3].result).toBe(false);
  });

  it("cuts edges", async () => {
    const r = (await linkCutTree({
      vertex_count: 3,
      operations: [
        { type: "link", u: 1, v: 2 },
        { type: "link", u: 2, v: 3 },
        { type: "cut", u: 1, v: 2 },
        { type: "connected", u: 1, v: 3 },
      ],
    })) as any;
    expect(r.results[2].success).toBe(true);
    expect(r.results[3].result).toBe(false);
  });

  it("prevents cycles on link", async () => {
    const r = (await linkCutTree({
      vertex_count: 3,
      operations: [
        { type: "link", u: 1, v: 2 },
        { type: "link", u: 2, v: 3 },
        { type: "link", u: 1, v: 3 },
      ],
    })) as any;
    expect(r.results[2].success).toBe(false);
  });

  it("computes path sum", async () => {
    const r = (await linkCutTree({
      vertex_count: 3,
      operations: [
        { type: "set_value", u: 1, value: 10 },
        { type: "set_value", u: 2, value: 20 },
        { type: "set_value", u: 3, value: 30 },
        { type: "link", u: 1, v: 2 },
        { type: "link", u: 2, v: 3 },
        { type: "path_sum", u: 1, v: 3 },
      ],
    })) as any;
    expect(r.results[5].result).toBe(60);
  });

  it("stamps meta", async () => {
    const r = (await linkCutTree({
      vertex_count: 2,
      operations: [],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
