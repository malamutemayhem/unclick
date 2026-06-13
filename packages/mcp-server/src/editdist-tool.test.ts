import { describe, it, expect } from "vitest";
import { editDistance } from "./editdist-tool.js";

describe("editDistance", () => {
  it("computes distance between kitten and sitting", async () => {
    const r = (await editDistance({ source: "kitten", target: "sitting" })) as any;
    expect(r.distance).toBe(3);
  });

  it("returns zero for identical strings", async () => {
    const r = (await editDistance({ source: "abc", target: "abc" })) as any;
    expect(r.distance).toBe(0);
    expect(r.operations).toHaveLength(0);
  });

  it("handles empty source (all inserts)", async () => {
    const r = (await editDistance({ source: "", target: "abc" })) as any;
    expect(r.distance).toBe(3);
    expect(r.operations.every((op: any) => op.type === "insert")).toBe(true);
  });

  it("handles empty target (all deletes)", async () => {
    const r = (await editDistance({ source: "xyz", target: "" })) as any;
    expect(r.distance).toBe(3);
    expect(r.operations.every((op: any) => op.type === "delete")).toBe(true);
  });

  it("stamps meta", async () => {
    const r = (await editDistance({ source: "a", target: "b" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
