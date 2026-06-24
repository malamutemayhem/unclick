// UnClick Doc - the canonical document format the browser renders.
//
// One closed vocabulary of core blocks. The renderer only knows these, so every
// site looks identical, loads instantly, and is agent-readable by construction.
// New blocks are added here deliberately, one at a time. No arbitrary HTML/CSS/JS.

export const UNCLICK_DOC_VERSION = 1 as const;

/** Inline run of text inside a block. Links live here, not as their own block. */
export interface Span {
  text: string;
  href?: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingBlock {
  kind: "heading";
  level: HeadingLevel;
  spans: Span[];
}

export interface ParagraphBlock {
  kind: "paragraph";
  spans: Span[];
}

export interface ListBlock {
  kind: "list";
  ordered: boolean;
  items: Span[][];
}

export interface TableBlock {
  kind: "table";
  head?: string[];
  rows: string[][];
}

export interface ImageBlock {
  kind: "image";
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface QuoteBlock {
  kind: "quote";
  spans: Span[];
}

export interface CodeBlock {
  kind: "code";
  language?: string;
  text: string;
}

/** External media (video, audio embed). Kept external by design, not inlined. */
export interface MediaBlock {
  kind: "media";
  provider?: string;
  url: string;
  title?: string;
}

export interface DividerBlock {
  kind: "divider";
}

// Interactive vocabulary. Part of the format so apps are expressible, but the
// reader (B1) renders these as static, non-acting placeholders. Real
// interactivity arrives later, behind the consent boundary.
export interface ButtonBlock {
  kind: "button";
  label: string;
}

export interface InputBlock {
  kind: "input";
  inputType: string;
  name?: string;
  placeholder?: string;
}

export interface FormBlock {
  kind: "form";
  action?: string;
  blocks: Block[];
}

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | TableBlock
  | ImageBlock
  | QuoteBlock
  | CodeBlock
  | MediaBlock
  | DividerBlock
  | ButtonBlock
  | InputBlock
  | FormBlock;

export type BlockKind = Block["kind"];

export const BLOCK_KINDS: readonly BlockKind[] = [
  "heading",
  "paragraph",
  "list",
  "table",
  "image",
  "quote",
  "code",
  "media",
  "divider",
  "button",
  "input",
  "form",
] as const;

export type Theme = "light" | "dark";

export interface UnclickDoc {
  version: typeof UNCLICK_DOC_VERSION;
  url?: string;
  title?: string;
  lang?: string;
  blocks: Block[];
}

/** Build an empty, valid doc. */
export function emptyDoc(meta: Partial<Omit<UnclickDoc, "version" | "blocks">> = {}): UnclickDoc {
  return { version: UNCLICK_DOC_VERSION, blocks: [], ...meta };
}

// --- Validation (dependency-free, structural) -------------------------------

function isSpan(v: unknown): v is Span {
  if (typeof v !== "object" || v === null) return false;
  const s = v as Record<string, unknown>;
  if (typeof s.text !== "string") return false;
  if (s.href !== undefined && typeof s.href !== "string") return false;
  for (const flag of ["bold", "italic", "code"] as const) {
    if (s[flag] !== undefined && typeof s[flag] !== "boolean") return false;
  }
  return true;
}

function isSpanArray(v: unknown): v is Span[] {
  return Array.isArray(v) && v.every(isSpan);
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

/** True when `v` is a structurally valid Block. */
export function isBlock(v: unknown): v is Block {
  if (typeof v !== "object" || v === null) return false;
  const b = v as Record<string, unknown>;
  switch (b.kind) {
    case "heading":
      return (
        typeof b.level === "number" &&
        b.level >= 1 &&
        b.level <= 6 &&
        Number.isInteger(b.level) &&
        isSpanArray(b.spans)
      );
    case "paragraph":
    case "quote":
      return isSpanArray(b.spans);
    case "list":
      return (
        typeof b.ordered === "boolean" &&
        Array.isArray(b.items) &&
        b.items.every(isSpanArray)
      );
    case "table":
      return (
        (b.head === undefined || isStringArray(b.head)) &&
        Array.isArray(b.rows) &&
        b.rows.every(isStringArray)
      );
    case "image":
      return typeof b.src === "string";
    case "code":
      return typeof b.text === "string";
    case "media":
      return typeof b.url === "string";
    case "divider":
      return true;
    case "button":
      return typeof b.label === "string";
    case "input":
      return typeof b.inputType === "string";
    case "form":
      return Array.isArray(b.blocks) && b.blocks.every(isBlock);
    default:
      return false;
  }
}

/** True when `v` is a structurally valid UnclickDoc. */
export function isUnclickDoc(v: unknown): v is UnclickDoc {
  if (typeof v !== "object" || v === null) return false;
  const d = v as Record<string, unknown>;
  if (d.version !== UNCLICK_DOC_VERSION) return false;
  if (!Array.isArray(d.blocks) || !d.blocks.every(isBlock)) return false;
  for (const key of ["url", "title", "lang"] as const) {
    if (d[key] !== undefined && typeof d[key] !== "string") return false;
  }
  return true;
}

/** Throws if `v` is not a valid UnclickDoc; returns it typed otherwise. */
export function assertUnclickDoc(v: unknown): UnclickDoc {
  if (!isUnclickDoc(v)) {
    throw new Error("Invalid UnclickDoc: failed structural validation");
  }
  return v;
}
