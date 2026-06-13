import { describe, it, expect } from "vitest";
import { tarjanScc } from "./tarjan-tool.js";

describe("tarjanScc", () => {
  it("finds strongly connected components", async () => {
    const r = await tarjanScc({
      edges: [
        { from: "A", to: "B" },
        { from: "B", to: "C" },
        { from: "C", to: "A" },
        { from: "D", to: "E" },
      ],
    }) as any;
    expect(r.non_trivial_sccs).toBe(1);
    expect(r.largest_scc_size).toBe(3);
  });

  it("detects DAG", async () => {
    const r = await tarjanScc({
      edges: [
        { from: "A", to: "B" },
        { from: "B", to: "C" },
      ],
    }) as any;
    expect(r.is_dag).toBe(true);
    expect(r.scc_count).toBe(3);
  });

  it("finds multiple SCCs", async () => {
    const r = await tarjanScc({
      edges: [
        { from: "A", to: "B" },
        { from: "B", to: "A" },
        { from: "C", to: "D" },
        { from: "D", to: "C" },
      ],
    }) as any;
    expect(r.non_trivial_sccs).toBe(2);
  });

  it("rejects empty edges", async () => {
    await expect(tarjanScc({ edges: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await tarjanScc({
      edges: [{ from: "A", to: "B" }],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
