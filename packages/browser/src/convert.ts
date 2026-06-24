// HTML -> UnClick Doc converter (dependency-free).
//
// Scope for B1: maps clean, reasonably well-formed article/document HTML onto
// the UnClick Doc block vocabulary. It strips scripts, styles, and head noise,
// keeps the semantic skeleton, and enforces image-size caps. Heavy extraction
// for messy real-world pages (the Tier-0 auto-convert path) can run a
// readability pass upstream and then feed this; the block mapping stays the same.

import {
  type Block,
  type HeadingLevel,
  type Span,
  type UnclickDoc,
  UNCLICK_DOC_VERSION,
} from "./format.js";

export interface ConvertOptions {
  /** Source URL, recorded on the doc. */
  url?: string;
  /** Hard cap on stored image width in px. Default 640. */
  maxImageWidth?: number;
}

const VOID_TAGS = new Set([
  "img",
  "br",
  "hr",
  "input",
  "meta",
  "link",
  "source",
  "area",
  "base",
  "col",
  "embed",
  "param",
  "track",
  "wbr",
]);

const CONTAINER_TAGS = new Set([
  "div",
  "section",
  "article",
  "main",
  "header",
  "footer",
  "aside",
  "nav",
  "figure",
  "details",
  "summary",
  "span", // block-level fallthrough when it wraps block content
]);

const INLINE_TAGS = new Set(["a", "b", "strong", "i", "em", "code", "span", "u", "mark", "small", "abbr", "cite", "s", "del", "ins", "sub", "sup"]);

interface ElementNode {
  type: "element";
  tag: string;
  attrs: Record<string, string>;
  children: Node[];
}
interface TextNode {
  type: "text";
  text: string;
}
type Node = ElementNode | TextNode;

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  "#39": "'",
  "#x27": "'",
  "#34": '"',
};

function decodeEntities(s: string): string {
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (whole, name: string) => {
    const lower = name.toLowerCase();
    if (lower in ENTITIES) return ENTITIES[lower];
    if (lower.startsWith("#x")) {
      const code = parseInt(lower.slice(2), 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
    }
    if (lower.startsWith("#")) {
      const code = parseInt(lower.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
    }
    return whole;
  });
}

function collapseWs(s: string): string {
  return s.replace(/\s+/g, " ");
}

/** Remove comments and the contents of noise elements before tokenizing. */
function preClean(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "")
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, "")
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, "");
}

function extractTitle(html: string): string | undefined {
  const m = /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  if (m) {
    const t = collapseWs(decodeEntities(m[1])).trim();
    if (t) return t;
  }
  const h1 = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  if (h1) {
    const t = collapseWs(decodeEntities(h1[1].replace(/<[^>]+>/g, ""))).trim();
    if (t) return t;
  }
  return undefined;
}

function bodyInner(html: string): string {
  const m = /<body\b[^>]*>([\s\S]*?)<\/body>/i.exec(html);
  return m ? m[1] : html;
}

function parseAttrs(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    const name = m[1].toLowerCase();
    const value = m[3] ?? m[4] ?? m[5] ?? "";
    attrs[name] = decodeEntities(value);
  }
  return attrs;
}

/** Build a lightweight DOM tree. Lenient: tolerates a few unclosed tags. */
function parseTree(html: string): Node[] {
  const root: ElementNode = { type: "element", tag: "#root", attrs: {}, children: [] };
  const stack: ElementNode[] = [root];
  const tagRe = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^<>"']|"[^"]*"|'[^']*')*?)(\/?)>/g;
  let last = 0;
  let m: RegExpExecArray | null;

  const top = () => stack[stack.length - 1];
  const pushText = (raw: string) => {
    if (!raw) return;
    const text = decodeEntities(raw);
    if (text.trim() === "" && !/\s/.test(text)) return;
    top().children.push({ type: "text", text });
  };

  while ((m = tagRe.exec(html))) {
    pushText(html.slice(last, m.index));
    last = tagRe.lastIndex;
    const closing = m[1] === "/";
    const tag = m[2].toLowerCase();
    const selfClose = m[4] === "/" || VOID_TAGS.has(tag);

    if (closing) {
      // pop to the matching open tag, if present
      for (let i = stack.length - 1; i >= 1; i--) {
        if (stack[i].tag === tag) {
          stack.length = i;
          break;
        }
      }
      continue;
    }

    // pragmatic implicit closes for common unclosed tags: a new <li> closes an
    // open <li>, and any block-level tag (or another <p>) closes an open <p>.
    const parentTag = top().tag;
    if (parentTag === "li" && tag === "li") {
      stack.pop();
    } else if (
      parentTag === "p" &&
      (tag === "p" || (!INLINE_TAGS.has(tag) && tag !== "br" && tag !== "wbr"))
    ) {
      stack.pop();
    }

    const el: ElementNode = { type: "element", tag, attrs: parseAttrs(m[3]), children: [] };
    top().children.push(el);
    if (!selfClose) stack.push(el);
  }
  pushText(html.slice(last));
  return root.children;
}

// --- inline spans -----------------------------------------------------------

function collectSpans(nodes: Node[], inherited: Partial<Span> = {}): Span[] {
  const out: Span[] = [];
  for (const node of nodes) {
    if (node.type === "text") {
      out.push({ ...inherited, text: node.text });
      continue;
    }
    const tag = node.tag;
    if (tag === "br") {
      out.push({ ...inherited, text: " " });
      continue;
    }
    const next: Partial<Span> = { ...inherited };
    if (tag === "a" && node.attrs.href) next.href = node.attrs.href;
    if (tag === "b" || tag === "strong") next.bold = true;
    if (tag === "i" || tag === "em" || tag === "cite") next.italic = true;
    if (tag === "code") next.code = true;
    out.push(...collectSpans(node.children, next));
  }
  return out;
}

/** Merge adjacent compatible spans and collapse whitespace; drop empties. */
function normalizeSpans(spans: Span[]): Span[] {
  const collapsed = spans
    .map((s) => ({ ...s, text: collapseWs(s.text) }))
    .filter((s) => s.text !== "");
  const merged: Span[] = [];
  for (const s of collapsed) {
    const prev = merged[merged.length - 1];
    if (
      prev &&
      prev.href === s.href &&
      !!prev.bold === !!s.bold &&
      !!prev.italic === !!s.italic &&
      !!prev.code === !!s.code
    ) {
      prev.text += s.text;
    } else {
      merged.push({ ...s });
    }
  }
  if (merged.length) {
    merged[0].text = merged[0].text.replace(/^\s+/, "");
    merged[merged.length - 1].text = merged[merged.length - 1].text.replace(/\s+$/, "");
  }
  return merged.filter((s) => s.text !== "");
}

function inlineSpans(nodes: Node[]): Span[] {
  return normalizeSpans(collectSpans(nodes));
}

function textContent(nodes: Node[]): string {
  let out = "";
  for (const node of nodes) {
    if (node.type === "text") out += node.text;
    else out += textContent(node.children);
  }
  return out;
}

function findFirst(nodes: Node[], tag: string): ElementNode | undefined {
  for (const node of nodes) {
    if (node.type !== "element") continue;
    if (node.tag === tag) return node;
    const nested = findFirst(node.children, tag);
    if (nested) return nested;
  }
  return undefined;
}

function findAll(nodes: Node[], tag: string): ElementNode[] {
  const out: ElementNode[] = [];
  for (const node of nodes) {
    if (node.type !== "element") continue;
    if (node.tag === tag) out.push(node);
    else out.push(...findAll(node.children, tag));
  }
  return out;
}

function parseIntOrUndef(v: string | undefined): number | undefined {
  if (!v) return undefined;
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : undefined;
}

function providerFromUrl(url: string): string | undefined {
  const m = /^https?:\/\/([^/]+)/i.exec(url);
  if (!m) return undefined;
  return m[1].replace(/^www\./, "");
}

// --- block walk -------------------------------------------------------------

function walkBlocks(nodes: Node[], opts: Required<ConvertOptions>): Block[] {
  const blocks: Block[] = [];
  let pendingInline: Span[] = [];

  const flushInline = () => {
    const spans = normalizeSpans(pendingInline);
    pendingInline = [];
    if (spans.length) blocks.push({ kind: "paragraph", spans });
  };

  for (const node of nodes) {
    if (node.type === "text") {
      pendingInline.push({ text: node.text });
      continue;
    }
    const tag = node.tag;

    if (INLINE_TAGS.has(tag) && tag !== "span") {
      pendingInline.push(...collectSpans([node]));
      continue;
    }

    flushInline();

    if (/^h[1-6]$/.test(tag)) {
      const level = Number(tag[1]) as HeadingLevel;
      const spans = inlineSpans(node.children);
      if (spans.length) blocks.push({ kind: "heading", level, spans });
      continue;
    }
    if (tag === "p") {
      const spans = inlineSpans(node.children);
      if (spans.length) blocks.push({ kind: "paragraph", spans });
      continue;
    }
    if (tag === "ul" || tag === "ol") {
      const items = findAll(node.children, "li").map((li) => inlineSpans(li.children));
      const nonEmpty = items.filter((i) => i.length > 0);
      if (nonEmpty.length) blocks.push({ kind: "list", ordered: tag === "ol", items: nonEmpty });
      continue;
    }
    if (tag === "blockquote") {
      const spans = inlineSpans(node.children);
      if (spans.length) blocks.push({ kind: "quote", spans });
      continue;
    }
    if (tag === "pre") {
      const codeEl = findFirst(node.children, "code");
      const langClass = codeEl?.attrs.class ?? node.attrs.class ?? "";
      const langMatch = /language-([\w+-]+)/.exec(langClass);
      const text = textContent(codeEl ? codeEl.children : node.children).replace(/\n$/, "");
      blocks.push({ kind: "code", text, ...(langMatch ? { language: langMatch[1] } : {}) });
      continue;
    }
    if (tag === "table") {
      const rowsEls = findAll(node.children, "tr");
      let head: string[] | undefined;
      const rows: string[][] = [];
      rowsEls.forEach((tr, idx) => {
        const ths = findAll(tr.children, "th");
        const tds = findAll(tr.children, "td");
        const cells = (ths.length ? ths : tds).map((c) => collapseWs(textContent(c.children)).trim());
        if (idx === 0 && ths.length) head = cells;
        else rows.push(cells);
      });
      if (head || rows.length) blocks.push({ kind: "table", rows, ...(head ? { head } : {}) });
      continue;
    }
    if (tag === "img") {
      const src = node.attrs.src ?? node.attrs["data-src"] ?? "";
      if (!src) continue;
      let width = parseIntOrUndef(node.attrs.width);
      let height = parseIntOrUndef(node.attrs.height);
      if (width !== undefined && width > opts.maxImageWidth) {
        if (height !== undefined) height = Math.round((height * opts.maxImageWidth) / width);
        width = opts.maxImageWidth;
      }
      blocks.push({
        kind: "image",
        src,
        ...(node.attrs.alt ? { alt: node.attrs.alt } : {}),
        ...(width !== undefined ? { width } : {}),
        ...(height !== undefined ? { height } : {}),
      });
      continue;
    }
    if (tag === "hr") {
      blocks.push({ kind: "divider" });
      continue;
    }
    if (tag === "video" || tag === "audio" || tag === "iframe") {
      const url = node.attrs.src ?? findFirst(node.children, "source")?.attrs.src ?? "";
      if (url) {
        blocks.push({
          kind: "media",
          url,
          ...(providerFromUrl(url) ? { provider: providerFromUrl(url) } : {}),
          ...(node.attrs.title ? { title: node.attrs.title } : {}),
        });
      }
      continue;
    }
    if (tag === "button") {
      const label = collapseWs(textContent(node.children)).trim();
      if (label) blocks.push({ kind: "button", label });
      continue;
    }
    if (tag === "input") {
      blocks.push({
        kind: "input",
        inputType: node.attrs.type ?? "text",
        ...(node.attrs.name ? { name: node.attrs.name } : {}),
        ...(node.attrs.placeholder ? { placeholder: node.attrs.placeholder } : {}),
      });
      continue;
    }
    if (tag === "form") {
      const inner = walkBlocks(node.children, opts);
      blocks.push({ kind: "form", blocks: inner, ...(node.attrs.action ? { action: node.attrs.action } : {}) });
      continue;
    }
    if (tag === "figcaption") {
      const spans = inlineSpans(node.children);
      if (spans.length) blocks.push({ kind: "paragraph", spans });
      continue;
    }
    if (CONTAINER_TAGS.has(tag)) {
      blocks.push(...walkBlocks(node.children, opts));
      continue;
    }
    // unknown element: keep its inline text
    pendingInline.push(...collectSpans([node]));
  }
  flushInline();
  return blocks;
}

/** Convert HTML into an UnClick Doc. */
export function htmlToUnclickDoc(html: string, options: ConvertOptions = {}): UnclickDoc {
  const opts: Required<ConvertOptions> = {
    url: options.url ?? "",
    maxImageWidth: options.maxImageWidth ?? 640,
  };
  const cleaned = preClean(html);
  // Title comes from the raw HTML: preClean strips <head>, which is where
  // <title> usually lives.
  const title = extractTitle(html);
  const langMatch = /<html\b[^>]*\blang\s*=\s*("([^"]*)"|'([^']*)'|([^\s">]+))/i.exec(html);
  const lang = langMatch ? (langMatch[2] ?? langMatch[3] ?? langMatch[4]) : undefined;
  const tree = parseTree(bodyInner(cleaned));
  const blocks = walkBlocks(tree, opts);
  return {
    version: UNCLICK_DOC_VERSION,
    ...(options.url ? { url: options.url } : {}),
    ...(title ? { title } : {}),
    ...(lang ? { lang } : {}),
    blocks,
  };
}
