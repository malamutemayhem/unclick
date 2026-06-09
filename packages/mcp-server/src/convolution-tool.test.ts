import { describe, it, expect } from "vitest";
import { convolution } from "./convolution-tool.js";

describe("convolution", () => {
  it("computes full convolution", async () => {
    const r = await convolution({ signal: [1, 2, 3], kernel: [1, 1] }) as any;
    expect(r.result).toEqual([1, 3, 5, 3]);
    expect(r.output_length).toBe(4);
    expect(r.mode).toBe("full");
  });

  it("computes same convolution", async () => {
    const r = await convolution({ signal: [1, 2, 3, 4], kernel: [1, 1, 1], mode: "same" }) as any;
    expect(r.result.length).toBe(4);
  });

  it("computes valid convolution", async () => {
    const r = await convolution({ signal: [1, 2, 3, 4, 5], kernel: [1, 1], mode: "valid" }) as any;
    expect(r.result).toEqual([3, 5, 7, 9]);
    expect(r.output_length).toBe(4);
  });

  it("identity convolution", async () => {
    const r = await convolution({ signal: [3, 5, 7], kernel: [1] }) as any;
    expect(r.result).toEqual([3, 5, 7]);
  });

  it("rejects empty arrays", async () => {
    await expect(convolution({ signal: [], kernel: [1] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await convolution({ signal: [1], kernel: [1] }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
