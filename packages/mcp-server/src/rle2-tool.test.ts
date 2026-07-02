import { describe, it, expect } from "vitest";
import { rleEncodeDecode } from "./rle2-tool.js";

describe("rleEncodeDecode", () => {
  it("encodes a sequence with repeats", async () => {
    const r = await rleEncodeDecode({ operation: "encode", data: [1, 1, 1, 2, 2, 3] }) as any;
    expect(r.runs).toEqual([
      { value: 1, count: 3 },
      { value: 2, count: 2 },
      { value: 3, count: 1 },
    ]);
    expect(r.run_count).toBe(3);
  });

  it("encodes with no repeats", async () => {
    const r = await rleEncodeDecode({ operation: "encode", data: [1, 2, 3] }) as any;
    expect(r.run_count).toBe(3);
    expect(r.compression_ratio).toBeGreaterThan(1);
  });

  it("decodes runs back to data", async () => {
    const r = await rleEncodeDecode({
      operation: "decode",
      runs: [{ value: 5, count: 3 }, { value: 7, count: 2 }],
    }) as any;
    expect(r.data).toEqual([5, 5, 5, 7, 7]);
    expect(r.output_length).toBe(5);
  });

  it("round-trips encode then decode", async () => {
    const original = [4, 4, 4, 9, 9, 1];
    const encoded = await rleEncodeDecode({ operation: "encode", data: original }) as any;
    const decoded = await rleEncodeDecode({ operation: "decode", runs: encoded.runs }) as any;
    expect(decoded.data).toEqual(original);
  });

  it("rejects empty data", async () => {
    await expect(rleEncodeDecode({ operation: "encode", data: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await rleEncodeDecode({ operation: "encode", data: [1, 1] }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
