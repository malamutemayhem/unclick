import { describe, expect, it } from "vitest";
import { htmlToUnclickDoc } from "../convert.js";
import { BLOCK_KINDS, isUnclickDoc, type Block } from "../format.js";

function kinds(blocks: Block[]): string[] {
  return blocks.map((b) => b.kind);
}

describe("htmlToUnclickDoc", () => {
  it("maps the semantic skeleton onto blocks", () => {
    const html = `
      <html lang="en"><head><title>Sample</title></head><body>
        <article>
          <h1>Hello</h1>
          <p>A <strong>bold</strong> intro with a <a href="https://example.com">link</a>.</p>
          <ul><li>one</li><li>two</li></ul>
          <blockquote>quoted</blockquote>
          <pre><code class="language-js">const x = 1;</code></pre>
          <table><tr><th>H1</th><th>H2</th></tr><tr><td>a</td><td>b</td></tr></table>
          <img src="https://img/x.png" alt="pic" width="2000" height="1000">
          <hr>
        </article>
      </body></html>`;
    const doc = htmlToUnclickDoc(html, { url: "https://example.com", maxImageWidth: 640 });

    expect(isUnclickDoc(doc)).toBe(true);
    expect(doc.title).toBe("Sample");
    expect(doc.lang).toBe("en");
    expect(doc.url).toBe("https://example.com");
    expect(kinds(doc.blocks)).toEqual([
      "heading",
      "paragraph",
      "list",
      "quote",
      "code",
      "table",
      "image",
      "divider",
    ]);

    const para = doc.blocks[1];
    expect(para.kind).toBe("paragraph");
    if (para.kind === "paragraph") {
      expect(para.spans.find((s) => s.bold)?.text).toBe("bold");
      expect(para.spans.find((s) => s.href)?.href).toBe("https://example.com");
    }

    const code = doc.blocks.find((b) => b.kind === "code");
    expect(code?.kind === "code" && code.language).toBe("js");
    expect(code?.kind === "code" && code.text).toBe("const x = 1;");

    const table = doc.blocks.find((b) => b.kind === "table");
    expect(table?.kind === "table" && table.head).toEqual(["H1", "H2"]);
    expect(table?.kind === "table" && table.rows).toEqual([["a", "b"]]);
  });

  it("caps oversized images and scales height proportionally", () => {
    const doc = htmlToUnclickDoc(`<img src="x.png" width="2000" height="1000">`, {
      maxImageWidth: 640,
    });
    const img = doc.blocks[0];
    expect(img.kind).toBe("image");
    if (img.kind === "image") {
      expect(img.width).toBe(640);
      expect(img.height).toBe(320);
    }
  });

  it("CANARY: scripts and styles never reach the blocks", () => {
    const html = `<body>
      <script>const secret = "PASSWORD123"; alert(secret);</script>
      <style>.x{color:red}</style>
      <p>visible text</p>
    </body>`;
    const doc = htmlToUnclickDoc(html);
    const serialized = JSON.stringify(doc);
    expect(serialized).not.toContain("PASSWORD123");
    expect(serialized).not.toContain("alert");
    expect(serialized).not.toContain("color:red");
    expect(kinds(doc.blocks)).toEqual(["paragraph"]);
  });

  it("only ever emits known block kinds, across very different inputs", () => {
    const inputs = [
      `<h2>News</h2><p>line</p><ol><li>x</li></ol>`,
      `<div><section><figure><img src="a.jpg"><figcaption>cap</figcaption></figure></section></div>`,
      `<form action="/go"><input type="email" name="e" placeholder="you@x"><button>Send</button></form>`,
      `<video src="https://cdn/v.mp4" title="clip"></video>`,
    ];
    for (const html of inputs) {
      const doc = htmlToUnclickDoc(html);
      expect(isUnclickDoc(doc)).toBe(true);
      for (const k of kinds(doc.blocks)) {
        expect(BLOCK_KINDS).toContain(k);
      }
    }
  });

  it("tolerates unclosed p and li tags", () => {
    const doc = htmlToUnclickDoc(`<p>first<p>second<ul><li>a<li>b</ul>`);
    expect(kinds(doc.blocks)).toEqual(["paragraph", "paragraph", "list"]);
    const list = doc.blocks[2];
    expect(list.kind === "list" && list.items.length).toBe(2);
  });

  it("decodes entities and collapses whitespace", () => {
    const doc = htmlToUnclickDoc(`<p>Tom &amp;   Jerry &lt;3</p>`);
    const p = doc.blocks[0];
    expect(p.kind === "paragraph" && p.spans[0].text).toBe("Tom & Jerry <3");
  });

  it("treats video/iframe as external media with a provider", () => {
    const doc = htmlToUnclickDoc(`<iframe src="https://www.youtube.com/embed/abc"></iframe>`);
    const media = doc.blocks[0];
    expect(media.kind).toBe("media");
    expect(media.kind === "media" && media.provider).toBe("youtube.com");
  });
});
