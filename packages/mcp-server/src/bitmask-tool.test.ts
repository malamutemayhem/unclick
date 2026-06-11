import { describe, it, expect } from "vitest";
import { bitmaskOps } from "./bitmask-tool.js";

describe("bitmaskOps", () => {
  it("returns correct info for a mask", async () => {
    const r = (await bitmaskOps({ mask: 0b1101, operation: "info" })) as any;
    expect(r.popcount).toBe(3);
    expect(r.highest_bit).toBe(3);
    expect(r.lowest_bit).toBe(0);
    expect(r.binary).toBe("1101");
  });

  it("enumerates submasks of 0b1010", async () => {
    const r = (await bitmaskOps({ mask: 0b1010, operation: "submasks" })) as any;
    // submasks of 1010: 1010, 1000, 0010, 0000
    expect(r.submask_count).toBe(4);
    expect(r.submasks).toContain(0b1010);
    expect(r.submasks).toContain(0);
  });

  it("computes next permutation via Gosper hack", async () => {
    const r = (await bitmaskOps({ mask: 0b0011, operation: "next_permutation" })) as any;
    // next integer with 2 bits set after 0b0011 is 0b0101
    expect(r.next).toBe(0b0101);
    expect(r.popcount).toBe(2);
  });

  it("enumerates set bit positions", async () => {
    const r = (await bitmaskOps({ mask: 0b10101, operation: "enumerate" })) as any;
    expect(r.set_bit_positions).toEqual([0, 2, 4]);
    expect(r.popcount).toBe(3);
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await bitmaskOps({ mask: 1, operation: "info" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
