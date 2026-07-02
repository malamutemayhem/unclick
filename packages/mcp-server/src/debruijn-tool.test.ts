import { describe, it, expect } from "vitest";
import { deBruijn } from "./debruijn-tool.js";

describe("deBruijn", () => {
  it("generates B(2,3) with length 8", async () => {
    const r = (await deBruijn({ k: 2, n: 3 })) as any;
    expect(r.length).toBe(8);
    expect(r.sequence.length).toBe(8);
    // Verify all 8 binary triples appear in the cyclic sequence
    const seq = r.sequence + r.sequence.slice(0, 2); // wrap around
    const found = new Set<string>();
    for (let i = 0; i < r.length; i++) {
      found.add(seq.slice(i, i + 3));
    }
    expect(found.size).toBe(8);
  });

  it("generates B(2,2) with length 4", async () => {
    const r = (await deBruijn({ k: 2, n: 2 })) as any;
    expect(r.length).toBe(4);
    const seq = r.sequence + r.sequence.slice(0, 1);
    const found = new Set<string>();
    for (let i = 0; i < r.length; i++) {
      found.add(seq.slice(i, i + 2));
    }
    expect(found.size).toBe(4);
  });

  it("generates B(3,2) with length 9", async () => {
    const r = (await deBruijn({ k: 3, n: 2 })) as any;
    expect(r.length).toBe(9);
    expect(r.k).toBe(3);
    expect(r.n).toBe(2);
    expect(r.alphabet).toBe("012");
  });

  it("rejects k^n exceeding 1,000,000", async () => {
    await expect(deBruijn({ k: 10, n: 7 })).rejects.toThrow("1,000,000");
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await deBruijn({ k: 2, n: 1 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
