import { describe, it, expect } from "vitest";
import { markdowntableConvert } from "./markdowntable-tool.js";

describe("markdowntable-tool", () => {
  it("converts CSV to markdown table", async () => {
    const r = await markdowntableConvert({ input: "Name,Age\nAlice,30\nBob,25" }) as Record<string, unknown>;
    const md = r.markdown as string;
    expect(md).toContain("| Name | Age |");
    expect(md).toContain("| Alice | 30 |");
    expect(r.rows).toBe(2);
    expect(r.columns).toBe(2);
    expect(r.unclick_meta).toBeDefined();
  });

  it("handles TSV input", async () => {
    const r = await markdowntableConvert({ input: "A\tB\n1\t2", delimiter: "tab" }) as Record<string, unknown>;
    const md = r.markdown as string;
    expect(md).toContain("| A | B |");
    expect(md).toContain("| 1 | 2 |");
  });

  it("handles no header", async () => {
    const r = await markdowntableConvert({ input: "x,y\n1,2", has_header: false }) as Record<string, unknown>;
    const md = r.markdown as string;
    expect(md).toContain("| Col 1 | Col 2 |");
    expect(r.rows).toBe(2);
  });

  it("rejects empty input", async () => {
    const r = await markdowntableConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/input/i);
  });
});
