import { describe, expect, it } from "vitest";
import { renderUnclickDoc, renderBody, stylesheet } from "../render.js";
import { renderHtml } from "../index.js";
import { UNCLICK_DOC_VERSION, type UnclickDoc } from "../format.js";

const docA: UnclickDoc = {
  version: UNCLICK_DOC_VERSION,
  title: "A",
  blocks: [
    { kind: "heading", level: 1, spans: [{ text: "Heading" }] },
    { kind: "paragraph", spans: [{ text: "Hello ", bold: true }, { text: "world" }] },
  ],
};

const docB: UnclickDoc = {
  version: UNCLICK_DOC_VERSION,
  title: "B",
  blocks: [
    { kind: "table", head: ["x"], rows: [["1"]] },
    { kind: "image", src: "https://i/x.png", alt: "p", width: 2000 },
  ],
};

describe("renderUnclickDoc", () => {
  it("emits a self-contained themed document", () => {
    const html = renderUnclickDoc(docA, { theme: "dark" });
    expect(html.startsWith("<!doctype html>")).toBe(true);
    expect(html).toContain('data-theme="dark"');
    expect(html).toContain("<style>");
    expect(html).toContain("<h1>Heading</h1>");
    expect(html).toContain("<strong>Hello </strong>");
  });

  it("renders an identical stylesheet regardless of content (consistent look)", () => {
    const a = renderUnclickDoc(docA);
    const b = renderUnclickDoc(docB);
    const styleA = a.slice(a.indexOf("<style>"), a.indexOf("</style>"));
    const styleB = b.slice(b.indexOf("<style>"), b.indexOf("</style>"));
    expect(styleA).toBe(styleB);
    expect(styleA).toContain(stylesheet());
  });

  it("CANARY: page-supplied text and hrefs cannot inject markup", () => {
    const evil: UnclickDoc = {
      version: UNCLICK_DOC_VERSION,
      blocks: [
        { kind: "paragraph", spans: [{ text: `<script>alert('xss')</script>` }] },
        { kind: "paragraph", spans: [{ text: "click", href: "javascript:alert(1)" }] },
      ],
    };
    const html = renderUnclickDoc(evil);
    expect(html).not.toContain("<script>alert");
    expect(html).toContain("&lt;script&gt;");
    // javascript: href is dropped, so no anchor is produced for it
    expect(html).not.toContain("javascript:");
    expect(html).not.toContain('href="javascript');
  });

  it("hard-caps image width", () => {
    const html = renderUnclickDoc(docB);
    expect(html).toContain("max-width:640px");
  });

  it("renderBody returns a fragment with no doctype", () => {
    const frag = renderBody(docA);
    expect(frag.startsWith("<main>")).toBe(true);
    expect(frag).not.toContain("<!doctype");
  });

  it("renderHtml goes HTML -> clean HTML in one call", () => {
    const out = renderHtml(`<h1>Hi</h1><p>there</p>`, { theme: "light" });
    expect(out).toContain("<h1>Hi</h1>");
    expect(out).toContain("<p>there</p>");
    expect(out).toContain("<style>");
  });
});
