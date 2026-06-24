import { describe, expect, it } from "vitest";
import {
  BLOCK_KINDS,
  UNCLICK_DOC_VERSION,
  assertUnclickDoc,
  emptyDoc,
  isBlock,
  isUnclickDoc,
  type UnclickDoc,
} from "../format.js";

describe("UnClick Doc format", () => {
  it("exposes a closed, ~12 block vocabulary", () => {
    expect(BLOCK_KINDS.length).toBe(12);
    expect(BLOCK_KINDS).toContain("heading");
    expect(BLOCK_KINDS).toContain("paragraph");
    expect(BLOCK_KINDS).toContain("table");
    expect(BLOCK_KINDS).toContain("image");
  });

  it("emptyDoc is valid and versioned", () => {
    const doc = emptyDoc({ title: "Hi" });
    expect(doc.version).toBe(UNCLICK_DOC_VERSION);
    expect(isUnclickDoc(doc)).toBe(true);
    expect(doc.title).toBe("Hi");
  });

  it("accepts a well-formed document", () => {
    const doc: UnclickDoc = {
      version: UNCLICK_DOC_VERSION,
      title: "Doc",
      blocks: [
        { kind: "heading", level: 1, spans: [{ text: "Title" }] },
        { kind: "paragraph", spans: [{ text: "Body ", bold: true }, { text: "link", href: "https://x" }] },
        { kind: "list", ordered: false, items: [[{ text: "a" }], [{ text: "b" }]] },
        { kind: "table", head: ["A"], rows: [["1"]] },
        { kind: "image", src: "https://x/y.png", width: 320 },
        { kind: "divider" },
      ],
    };
    expect(isUnclickDoc(doc)).toBe(true);
    expect(assertUnclickDoc(doc)).toBe(doc);
  });

  it("rejects bad versions, bad heading levels, and unknown kinds", () => {
    expect(isUnclickDoc({ version: 99, blocks: [] })).toBe(false);
    expect(isBlock({ kind: "heading", level: 7, spans: [] })).toBe(false);
    expect(isBlock({ kind: "heading", level: 2, spans: [{ text: "ok" }] })).toBe(true);
    expect(isBlock({ kind: "marquee", spans: [] })).toBe(false);
    expect(isBlock({ kind: "image" })).toBe(false);
    expect(() => assertUnclickDoc({ version: 1 })).toThrow();
  });

  it("validates nested form blocks recursively", () => {
    expect(
      isBlock({ kind: "form", blocks: [{ kind: "input", inputType: "text" }] }),
    ).toBe(true);
    expect(isBlock({ kind: "form", blocks: [{ kind: "nope" }] })).toBe(false);
  });
});
