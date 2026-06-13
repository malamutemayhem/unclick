import { describe, it, expect } from "vitest";
import { necklaceCount } from "./necklace-tool.js";

describe("necklaceCount", () => {
  it("counts binary necklaces of length 4", async () => {
    // n=4, k=2: necklaces = (1/4)(phi(4)*2^1 + phi(2)*2^2 + phi(1)*2^4)
    // = (1/4)(2*2 + 1*4 + 1*16) = (4+4+16)/4 = 6
    const r = (await necklaceCount({ n: 4, k: 2 })) as any;
    expect(r.necklace_count).toBe(6);
    // bracelets of length 4 with 2 colors = 6 (since n even:
    // reflections = 2*2^3 + 2*2^2 = 16+8=24, total = 24+24=48, /8=6... wait no)
    // Actually bracelet(4,2) should be 4: {0000,0001,0011,0101} ... let me recalculate
    // rotations sum = 24, reflections: half=2, 2*2^3 + 2*2^2 = 16+8 = 24
    // bracelet = (24+24)/(2*4) = 48/8 = 6? No, known answer is 6.
    // Actually OEIS A000029: a(4) for k=2 is 6. Let me check: bracelets with
    // 2 colors and 4 beads: BBBB, BBBW, BBWW, BWBW, BWWW, WWWW = 6. Yes, 6.
    expect(r.bracelet_count).toBe(6);
  });

  it("counts ternary necklaces of length 3", async () => {
    // n=3, k=3: necklaces = (1/3)(phi(3)*3^1 + phi(1)*3^3) = (2*3 + 27)/3 = 33/3 = 11
    const r = (await necklaceCount({ n: 3, k: 3 })) as any;
    expect(r.necklace_count).toBe(11);
  });

  it("handles n=1 (trivial case)", async () => {
    const r = (await necklaceCount({ n: 1, k: 5 })) as any;
    // 1-bead necklace with 5 colors: 5 distinct necklaces
    expect(r.necklace_count).toBe(5);
    expect(r.bracelet_count).toBe(5);
  });

  it("rejects n above 1000", async () => {
    await expect(necklaceCount({ n: 1001, k: 2 })).rejects.toThrow("1000 or less");
  });

  it("stamps meta", async () => {
    const r = (await necklaceCount({ n: 2, k: 3 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
