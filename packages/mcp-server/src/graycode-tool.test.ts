import { describe, it, expect } from "vitest";
import { grayCode } from "./graycode-tool.js";

describe("grayCode", () => {
  it("generates a 3-bit Gray code sequence", async () => {
    const r = (await grayCode({ n: 3 })) as any;
    expect(r.length).toBe(8);
    expect(r.sequence_gray).toEqual([0, 1, 3, 2, 6, 7, 5, 4]);
    expect(r.sequence).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it("converts a single value binary to Gray", async () => {
    const r = (await grayCode({ n: 4, value: 5, to_gray: true })) as any;
    // 5 = 0101, Gray = 0101 XOR 0010 = 0111 = 7
    expect(r.output).toBe(7);
    expect(r.direction).toBe("binary_to_gray");
  });

  it("converts a single value Gray to binary", async () => {
    const r = (await grayCode({ n: 4, value: 7, to_gray: false })) as any;
    // Gray 7 = 0111 -> binary 5
    expect(r.output).toBe(5);
    expect(r.direction).toBe("gray_to_binary");
  });

  it("rejects n out of range", async () => {
    await expect(grayCode({ n: 0 })).rejects.toThrow("between 1 and 20");
    await expect(grayCode({ n: 21 })).rejects.toThrow("between 1 and 20");
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await grayCode({ n: 2 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
