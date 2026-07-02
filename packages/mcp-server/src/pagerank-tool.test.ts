import { describe, it, expect } from "vitest";
import { pageRank } from "./pagerank-tool.js";

describe("pageRank", () => {
  it("ranks a simple triangle graph", async () => {
    const r = await pageRank({
      edges: [
        { from: "A", to: "B" },
        { from: "B", to: "C" },
        { from: "C", to: "A" },
      ],
    }) as any;
    expect(r.node_count).toBe(3);
    expect(r.rankings).toHaveLength(3);
    expect(r.top_node).toBeDefined();
  });

  it("identifies hub node", async () => {
    const r = await pageRank({
      edges: [
        { from: "A", to: "C" },
        { from: "B", to: "C" },
        { from: "D", to: "C" },
      ],
    }) as any;
    expect(r.top_node).toBe("C");
  });

  it("accepts custom damping", async () => {
    const r = await pageRank({
      edges: [{ from: "A", to: "B" }, { from: "B", to: "A" }],
      damping: 0.5,
    }) as any;
    expect(r.damping).toBe(0.5);
    expect(r.rankings).toHaveLength(2);
  });

  it("rejects empty edges", async () => {
    await expect(pageRank({ edges: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await pageRank({
      edges: [{ from: "A", to: "B" }],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
