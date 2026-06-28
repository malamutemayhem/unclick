import { describe, it, expect } from "vitest";
import { partitionCount } from "./partition-tool.js";

describe("partitionCount", () => {
  it("computes p(5) = 7", async () => {
    const r = (await partitionCount({ n: 5 })) as any;
    expect(r.count).toBe(7);
    expect(r.n).toBe(5);
  });

  it("computes p(0) = 1", async () => {
    const r = (await partitionCount({ n: 0 })) as any;
    expect(r.count).toBe(1);
  });

  it("restricts by max_part", async () => {
    // p(5, max_part=2) = 3: {2+2+1, 2+1+1+1, 1+1+1+1+1}
    const r = (await partitionCount({ n: 5, max_part: 2 })) as any;
    expect(r.count).toBe(3);
    expect(r.max_part).toBe(2);
  });

  it("restricts by num_parts", async () => {
    // Partitions of 6 into exactly 3 parts: {4+1+1, 3+2+1, 2+2+2} = 3
    const r = (await partitionCount({ n: 6, num_parts: 3 })) as any;
    expect(r.count).toBe(3);
  });

  it("stamps meta", async () => {
    const r = (await partitionCount({ n: 10 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
