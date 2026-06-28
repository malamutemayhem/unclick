import { describe, expect, it } from "vitest";
import { dicewarePassphrase } from "./diceware-tool.js";

describe("diceware connector (L2)", () => {
  it("returns a passphrase with unclick_meta", async () => {
    const r = await dicewarePassphrase({}) as Record<string, unknown>;
    expect(r.passphrase).toBeDefined();
    expect(typeof r.passphrase).toBe("string");
    expect(r.word_count).toBe(6);
    expect(r.unclick_meta).toBeDefined();
  });

  it("respects custom word count", async () => {
    const r = await dicewarePassphrase({ words: 4, separator: "." }) as Record<string, unknown>;
    expect(r.word_count).toBe(4);
    expect((r.passphrase as string).split(".")).toHaveLength(4);
  });

  it("clamps word count to valid range", async () => {
    const r = await dicewarePassphrase({ words: 50 }) as Record<string, unknown>;
    expect(r.word_count).toBe(12);
  });
});
