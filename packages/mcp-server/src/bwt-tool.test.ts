import { describe, it, expect } from "vitest";
import { burrowsWheeler } from "./bwt-tool.js";

describe("burrowsWheeler", () => {
  it("computes forward BWT of a simple string", async () => {
    const r = (await burrowsWheeler({ text: "abc" })) as any;
    // Rotations sorted: abc, bca, cab -> last chars: c, a, b
    expect(r.transformed).toBe("cab");
    expect(r.original_index).toBe(0);
    expect(r.text_length).toBe(3);
  });

  it("computes forward BWT of banana", async () => {
    const r = (await burrowsWheeler({ text: "banana" })) as any;
    expect(r.transformed).toBe("nnbaaa");
    expect(r.original_index).toBe(3);
  });

  it("inverts BWT back to original string", async () => {
    const r = (await burrowsWheeler({
      text: "nnbaaa",
      inverse: true,
      original_index: 3,
    })) as any;
    expect(r.restored).toBe("banana");
    expect(r.text_length).toBe(6);
  });

  it("round-trips a string through forward and inverse", async () => {
    const fwd = (await burrowsWheeler({ text: "abracadabra" })) as any;
    const inv = (await burrowsWheeler({
      text: fwd.transformed,
      inverse: true,
      original_index: fwd.original_index,
    })) as any;
    expect(inv.restored).toBe("abracadabra");
  });

  it("stamps meta", async () => {
    const r = (await burrowsWheeler({ text: "test" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
