import { describe, it, expect } from "vitest";
import { rlEncode } from "./rlencode-tool.js";

describe("rlEncode", () => {
  it("encodes a simple repeated string", async () => {
    const r = (await rlEncode({ text: "aaabbc" })) as any;
    expect(r.encoded).toBe("3a2b1c");
    expect(r.run_count).toBe(3);
  });

  it("decodes an RLE string back", async () => {
    const r = (await rlEncode({ text: "3a2b1c", decode: true })) as any;
    expect(r.decoded).toBe("aaabbc");
    expect(r.length).toBe(6);
  });

  it("reports compression_ratio correctly", async () => {
    const r = (await rlEncode({ text: "aaaaaa" })) as any;
    // encoded = "6a" (length 2), original length 6 -> ratio 2/6
    expect(r.encoded).toBe("6a");
    expect(r.compression_ratio).toBeCloseTo(2 / 6, 4);
  });

  it("handles empty string", async () => {
    const r = (await rlEncode({ text: "" })) as any;
    expect(r.encoded).toBe("");
    expect(r.run_count).toBe(0);
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await rlEncode({ text: "abc" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
