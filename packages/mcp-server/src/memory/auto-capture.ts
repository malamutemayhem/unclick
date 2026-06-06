/**
 * Auto-capture of code blocks and reference documents from conversation turns.
 *
 * Two memory layers were previously only writable by deliberate `store_code` /
 * `upsert_library_doc` calls, so they sat near-empty even though the product
 * intent was for them to fill automatically from what the user provides. This
 * module adds opt-in automatic capture from the conversation ingestion path:
 *
 *   - MEMORY_CODE_AUTOCAPTURE_ENABLED:    fenced code blocks in a user turn are
 *                                         stored as code dumps.
 *   - MEMORY_LIBRARY_AUTOCAPTURE_ENABLED: reference-style content (doc-fenced
 *                                         blocks, or long structured prose) is
 *                                         stored as a library doc with tags.
 *
 * Both flags default OFF. When off, callers skip capture entirely and the
 * conversation write path is byte-identical to before. The extractor functions
 * are pure and side-effect free, so they unit-test without a backend. Capture
 * is best-effort: a failure never propagates back into the turn write.
 *
 * v1 scope (intentional, tunable): only USER-authored turns are captured, since
 * the owner's model is "code a user pasted" / "info I wrote". Assistant output
 * is skipped to avoid hoarding generated text; that is a one-line change later.
 */

import { createHash } from "crypto";
import type { CodeInput, LibraryDocInput } from "./types.js";

function flagOn(raw: string | undefined): boolean {
  const v = (raw ?? "").trim().toLowerCase();
  return v === "1" || v === "true";
}

type EnvLike = Record<string, string | undefined>;

/** True when conversation code blocks should be auto-captured. Default off. */
export function codeAutoCaptureEnabled(env: EnvLike = process.env): boolean {
  return flagOn(env.MEMORY_CODE_AUTOCAPTURE_ENABLED);
}

/** True when reference content should be auto-captured to the library. Default off. */
export function libraryAutoCaptureEnabled(env: EnvLike = process.env): boolean {
  return flagOn(env.MEMORY_LIBRARY_AUTOCAPTURE_ENABLED);
}

// Tunable thresholds (v1). Conservative so the layers fill with signal, not noise.
export const CODE_MIN_CHARS = 40;
export const CODE_MIN_NEWLINES = 1; // at least two lines
export const CODE_MAX_CHARS = 20_000;
export const MAX_BLOCKS_PER_TURN = 12;
export const DOC_MIN_CHARS = 280;
export const DOC_MAX_CHARS = 20_000;
const DEDUP_KEY_CHARS = 2_000;

// Fence languages that mean "reference document" rather than runnable code.
const DOC_FENCE_LANGS = new Set([
  "md", "markdown", "mdx", "doc", "docs", "note", "notes",
  "reference", "ref", "rfc", "spec", "prd",
]);

// Matches a fenced block: ```lang\n ... ``` (lang optional, body non-greedy).
const FENCE_RE = /```([^\n`]*)\r?\n([\s\S]*?)```/g;

export interface ParsedFence {
  /** Normalized lower-case language tag, "" when none was given. */
  lang: string;
  /** Inner content with trailing whitespace trimmed. */
  body: string;
}

/** Parse every fenced block out of a message. Pure. */
export function parseFencedBlocks(content: string): ParsedFence[] {
  const out: ParsedFence[] = [];
  if (!content) return out;
  FENCE_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = FENCE_RE.exec(content)) !== null) {
    const lang = (match[1] ?? "").trim().toLowerCase();
    const body = (match[2] ?? "").replace(/\s+$/, "");
    out.push({ lang, body });
  }
  return out;
}

const CODE_SIGNAL_RE =
  /[{};]|=>|\b(function|const|let|var|import|export|def|class|return|public|private|async|await|select|insert|update|delete)\b/i;

/** Heuristic: does an untagged fenced block look like code rather than prose? */
export function looksLikeCode(text: string): boolean {
  return CODE_SIGNAL_RE.test(text);
}

export interface CodeCaptureCandidate {
  language: string;
  content: string;
}

/**
 * Extract fenced code blocks worth storing. Doc-fenced blocks (md/note/...) are
 * left for the library extractor. Untagged fences are kept only when they look
 * like code, so prose someone fenced for emphasis is not captured as code.
 */
export function extractCodeBlocks(content: string): CodeCaptureCandidate[] {
  const seen = new Set<string>();
  const out: CodeCaptureCandidate[] = [];
  for (const { lang, body } of parseFencedBlocks(content)) {
    if (DOC_FENCE_LANGS.has(lang)) continue;
    const code = body.trim();
    if (code.length < CODE_MIN_CHARS) continue;
    if ((code.match(/\n/g)?.length ?? 0) < CODE_MIN_NEWLINES) continue;
    if (lang === "" && !looksLikeCode(code)) continue;
    const key = code.slice(0, DEDUP_KEY_CHARS);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ language: lang || "text", content: code.slice(0, CODE_MAX_CHARS) });
    if (out.length >= MAX_BLOCKS_PER_TURN) break;
  }
  return out;
}

export interface LibraryCaptureCandidate {
  title: string;
  content: string;
  tags: string[];
}

const STRUCTURE_RE = /(^|\n)\s*(#{1,6}\s+\S|[-*]\s+\S|\d+[.)]\s+\S)/;

/** True when prose has headings or list structure (reads like reference material). */
export function hasStructure(text: string): boolean {
  return STRUCTURE_RE.test(text);
}

/** Remove fenced and inline code so prose-length checks ignore code. */
function stripCode(content: string): string {
  return content.replace(FENCE_RE, " ").replace(/`[^`]*`/g, " ");
}

const STOPWORDS = new Set([
  "the", "and", "for", "that", "this", "with", "you", "your", "are", "was",
  "but", "not", "have", "has", "had", "from", "they", "their", "what", "when",
  "will", "would", "should", "could", "into", "than", "then", "them", "there",
  "here", "also", "just", "like", "able", "about", "which", "while", "some",
]);

/** First meaningful line, stripped of markdown markers, capped to 120 chars. */
export function deriveTitle(content: string): string {
  const firstLine = (content.split(/\r?\n/).find((line) => line.trim().length > 0) ?? "").trim();
  const cleaned = firstLine.replace(/^#{1,6}\s*/, "").replace(/^[-*]\s*/, "").replace(/^\d+[.)]\s*/, "").trim();
  const title = cleaned.length > 0 ? cleaned : "Captured note";
  return title.length > 120 ? `${title.slice(0, 117)}...` : title;
}

/** Lightweight keyword tags plus provenance tags. Deterministic. */
export function deriveTags(content: string): string[] {
  const counts = new Map<string, number>();
  for (const raw of content.toLowerCase().match(/[a-z][a-z0-9_-]{2,}/g) ?? []) {
    if (STOPWORDS.has(raw)) continue;
    counts.set(raw, (counts.get(raw) ?? 0) + 1);
  }
  const top = [...counts.entries()]
    .sort((a, b) => (b[1] - a[1]) || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([word]) => word);
  return ["auto-captured", "conversation", ...top].slice(0, 12);
}

/** Stable slug from content so re-capture upserts the same library row. */
export function captureSlug(prefix: string, content: string): string {
  const hash = createHash("sha256").update(content).digest("hex").slice(0, 12);
  return `${prefix}-${hash}`;
}

/**
 * Extract reference-style content from a turn:
 *   1. Doc-fenced blocks (```md, ```note, ```reference, ...).
 *   2. Otherwise, the whole turn when it is long, structured prose (headings or
 *      lists) once code fences are removed.
 * Conservative: short or chit-chat turns yield nothing.
 */
export function extractLibraryDocs(content: string): LibraryCaptureCandidate[] {
  const out: LibraryCaptureCandidate[] = [];
  const seen = new Set<string>();
  const push = (text: string): void => {
    const doc = text.slice(0, DOC_MAX_CHARS);
    const key = doc.slice(0, DEDUP_KEY_CHARS);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ title: deriveTitle(doc), content: doc, tags: deriveTags(doc) });
  };

  for (const { lang, body } of parseFencedBlocks(content)) {
    if (!DOC_FENCE_LANGS.has(lang)) continue;
    const doc = body.trim();
    if (doc.length >= DOC_MIN_CHARS) push(doc);
  }

  if (out.length === 0) {
    const prose = stripCode(content).trim();
    if (prose.length >= DOC_MIN_CHARS && hasStructure(prose)) push(content.trim());
  }

  return out;
}

/** Minimal backend surface this module needs. */
export interface AutoCaptureBackend {
  storeCode(data: CodeInput): Promise<{ id: string }>;
  upsertLibraryDoc(data: LibraryDocInput): Promise<string>;
}

export interface AutoCaptureTurn {
  session_id: string;
  role: string;
  content: string;
}

export interface AutoCaptureResult {
  code_captured: number;
  docs_captured: number;
}

/**
 * Capture code blocks and/or reference docs from a single conversation turn.
 * Flag-gated and best-effort: any backend error is swallowed so capture never
 * breaks the turn write. Returns counts for observability/tests.
 */
export async function autoCaptureFromTurn(
  backend: AutoCaptureBackend,
  turn: AutoCaptureTurn,
  env: EnvLike = process.env,
): Promise<AutoCaptureResult> {
  const result: AutoCaptureResult = { code_captured: 0, docs_captured: 0 };
  // Only user-authored content is captured in v1 (see module header).
  if ((turn.role ?? "").trim().toLowerCase() !== "user") return result;
  if (!turn.content) return result;

  if (codeAutoCaptureEnabled(env)) {
    for (const block of extractCodeBlocks(turn.content)) {
      try {
        await backend.storeCode({
          session_id: turn.session_id,
          language: block.language,
          content: block.content,
          description: "Auto-captured from conversation",
        });
        result.code_captured += 1;
      } catch {
        // best-effort; keep going
      }
    }
  }

  if (libraryAutoCaptureEnabled(env)) {
    for (const doc of extractLibraryDocs(turn.content)) {
      try {
        await backend.upsertLibraryDoc({
          slug: captureSlug("auto-doc", doc.content),
          title: doc.title,
          category: "captured",
          content: doc.content,
          tags: doc.tags,
        });
        result.docs_captured += 1;
      } catch {
        // best-effort; keep going
      }
    }
  }

  return result;
}
