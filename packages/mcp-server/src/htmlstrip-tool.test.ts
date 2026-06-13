import { describe, it, expect } from "vitest";
import { htmlStrip } from "./htmlstrip-tool.js";

describe("htmlstrip-tool", () => {
  it("strips HTML tags", async () => {
    const r = await htmlStrip({ html: "<p>Hello <b>world</b></p>" }) as Record<string, unknown>;
    expect(r.text).toBe("Hello world");
    expect(r.stripped_length).toBeLessThan(r.original_length as number);
    expect(r.unclick_meta).toBeDefined();
  });

  it("decodes HTML entities", async () => {
    const r = await htmlStrip({ html: "&amp; &lt; &gt; &quot;" }) as Record<string, unknown>;
    expect(r.text).toBe('& < > "');
  });

  it("preserves line breaks from block elements", async () => {
    const r = await htmlStrip({ html: "<p>One</p><p>Two</p>" }) as Record<string, unknown>;
    expect(r.text).toContain("\n");
  });

  it("rejects empty input", async () => {
    const r = await htmlStrip({}) as Record<string, unknown>;
    expect(r.error).toMatch(/html/i);
  });
});
