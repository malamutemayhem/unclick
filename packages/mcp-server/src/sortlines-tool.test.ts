import { describe, it, expect } from "vitest";
import { sortLines } from "./sortlines-tool.js";

describe("sortlines-tool", () => {
  it("sorts lines alphabetically", async () => {
    const r = await sortLines({ text: "banana\napple\ncherry" }) as Record<string, unknown>;
    expect(r.sorted).toBe("apple\nbanana\ncherry");
    expect(r.line_count).toBe(3);
    expect(r.unclick_meta).toBeDefined();
  });

  it("sorts in reverse", async () => {
    const r = await sortLines({ text: "a\nb\nc", reverse: true }) as Record<string, unknown>;
    expect(r.sorted).toBe("c\nb\na");
  });

  it("deduplicates lines", async () => {
    const r = await sortLines({ text: "a\nb\na\nc\nb", deduplicate: true }) as Record<string, unknown>;
    expect(r.line_count).toBe(3);
    expect(r.duplicates_removed).toBe(2);
  });

  it("sorts numerically", async () => {
    const r = await sortLines({ text: "10\n2\n1\n20", numeric: true }) as Record<string, unknown>;
    expect(r.sorted).toBe("1\n2\n10\n20");
  });

  it("rejects empty input", async () => {
    const r = await sortLines({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
