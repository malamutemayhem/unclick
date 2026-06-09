import { describe, it, expect } from "vitest";
import { goertzel } from "./goertzel-tool.js";

describe("goertzel", () => {
  it("detects DC component (bin 0) of constant signal", async () => {
    // DFT bin 0 of [1,1,1,1] = sum = 4
    const r = (await goertzel({ samples: [1, 1, 1, 1], bin: 0 })) as any;
    expect(r.magnitude).toBeCloseTo(4, 10);
    expect(r.sample_count).toBe(4);
  });

  it("detects a pure cosine at the matching bin", async () => {
    // cos(2*pi*1*n/4) for n=0..3 = [1, 0, -1, 0], DFT bin 1 magnitude = N/2 = 2
    const r = (await goertzel({ samples: [1, 0, -1, 0], bin: 1 })) as any;
    expect(r.magnitude).toBeCloseTo(2, 10);
  });

  it("returns near-zero for an unmatched bin", async () => {
    // cosine at bin 1 queried at bin 0 should give ~0
    const r = (await goertzel({ samples: [1, 0, -1, 0], bin: 0 })) as any;
    expect(r.magnitude).toBeCloseTo(0, 10);
  });

  it("returns zero magnitude for all-zero input", async () => {
    const r = (await goertzel({ samples: [0, 0, 0, 0, 0], bin: 2 })) as any;
    expect(r.magnitude).toBeCloseTo(0, 10);
  });

  it("stamps meta", async () => {
    const r = (await goertzel({ samples: [1, 2, 3], bin: 0 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
