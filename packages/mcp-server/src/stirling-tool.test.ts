import { describe, it, expect } from "vitest";
import { stirlingNumbers } from "./stirling-tool.js";

describe("stirlingNumbers", () => {
  it("computes S(4,2) = 7 (second kind)", async () => {
    const r = (await stirlingNumbers({ n: 4, k: 2 })) as any;
    expect(r.value).toBe(7);
    expect(r.kind).toBe(2);
  });

  it("computes |s(4,2)| = 11 (first kind unsigned)", async () => {
    const r = (await stirlingNumbers({ n: 4, k: 2, kind: 1 })) as any;
    expect(r.value).toBe(11);
  });

  it("returns 0 when k > n", async () => {
    const r = (await stirlingNumbers({ n: 3, k: 5 })) as any;
    expect(r.value).toBe(0);
  });

  it("rejects negative n", async () => {
    await expect(stirlingNumbers({ n: -1, k: 1 })).rejects.toThrow("non-negative");
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await stirlingNumbers({ n: 5, k: 3 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
