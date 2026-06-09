import { describe, it, expect } from "vitest";
import { runlengthProcess } from "./runlength-tool.js";

describe("runlength-tool", () => {
  it("encodes repeated characters", async () => {
    const r = await runlengthProcess({ text: "aaabbbcc" }) as Record<string, unknown>;
    expect(r.output).toBe("3a3b2c");
    expect(r.direction).toBe("encode");
    expect(r.unclick_meta).toBeDefined();
  });

  it("handles no repeats", async () => {
    const r = await runlengthProcess({ text: "abc" }) as Record<string, unknown>;
    expect(r.output).toBe("abc");
  });

  it("decodes run-length encoded text", async () => {
    const r = await runlengthProcess({ text: "3a3b2c", decode: true }) as Record<string, unknown>;
    expect(r.output).toBe("aaabbbcc");
    expect(r.direction).toBe("decode");
  });

  it("round-trips correctly", async () => {
    const enc = await runlengthProcess({ text: "AAAAABBBCDDD" }) as Record<string, unknown>;
    const dec = await runlengthProcess({ text: enc.output as string, decode: true }) as Record<string, unknown>;
    expect(dec.output).toBe("AAAAABBBCDDD");
  });

  it("rejects empty input", async () => {
    const r = await runlengthProcess({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
