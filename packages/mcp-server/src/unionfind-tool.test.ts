import { describe, it, expect } from "vitest";
import { unionFindOps } from "./unionfind-tool.js";

describe("unionFindOps", () => {
  it("merges nodes into components", async () => {
    const r = await unionFindOps({
      unions: [{ a: "A", b: "B" }, { a: "B", b: "C" }, { a: "D", b: "E" }],
    }) as any;
    expect(r.total_nodes).toBe(5);
    expect(r.component_count).toBe(2);
    expect(r.merges_performed).toBe(3);
  });

  it("detects redundant unions", async () => {
    const r = await unionFindOps({
      unions: [{ a: "A", b: "B" }, { a: "B", b: "A" }],
    }) as any;
    expect(r.redundant_unions).toBe(1);
  });

  it("answers connectivity queries", async () => {
    const r = await unionFindOps({
      unions: [{ a: "A", b: "B" }, { a: "C", b: "D" }],
      queries: [{ a: "A", b: "B" }, { a: "A", b: "C" }],
    }) as any;
    expect(r.query_results[0].connected).toBe(true);
    expect(r.query_results[1].connected).toBe(false);
  });

  it("rejects empty unions", async () => {
    await expect(unionFindOps({ unions: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await unionFindOps({
      unions: [{ a: "A", b: "B" }],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
