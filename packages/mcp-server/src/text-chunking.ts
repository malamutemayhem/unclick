// Text chunking for memory storage and context management.
// Inspired by OpenClaw's text-chunking.ts. When we need to store long
// text in memory or split it for embedding, we need smart splitting
// that breaks at sentence/paragraph boundaries instead of mid-word.

type BreakResolver = (window: string) => number;

// Core chunker: splits text into pieces of at most `limit` characters,
// using the resolver to find good break points (sentence ends, newlines).
export function chunkText(
  text: string,
  limit: number,
  resolveBreak: BreakResolver,
): string[] {
  if (!text) return [];
  if (limit <= 0 || text.length <= limit) return [text];

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > limit) {
    const window = remaining.slice(0, limit);
    const candidate = resolveBreak(window);

    const breakIdx =
      Number.isFinite(candidate) && candidate > 0 && candidate <= limit
        ? candidate
        : limit;

    const chunk = remaining.slice(0, breakIdx).trimEnd();
    if (chunk.length > 0) chunks.push(chunk);

    const isWhitespace = breakIdx < remaining.length && /\s/.test(remaining[breakIdx]);
    const nextStart = Math.min(remaining.length, breakIdx + (isWhitespace ? 1 : 0));
    remaining = remaining.slice(nextStart).trimStart();
  }

  if (remaining.length > 0) chunks.push(remaining);
  return chunks;
}

// Break at the last paragraph boundary (double newline).
function paragraphBreak(window: string): number {
  const idx = window.lastIndexOf("\n\n");
  return idx > 0 ? idx : 0;
}

// Break at the last sentence end (period/question/exclamation followed by space).
function sentenceBreak(window: string): number {
  const match = window.match(/[.!?]\s(?=[A-Z])/g);
  if (!match) return 0;
  const lastSentenceEnd = window.lastIndexOf(match[match.length - 1]);
  return lastSentenceEnd > 0 ? lastSentenceEnd + 2 : 0;
}

// Break at the last newline.
function lineBreak(window: string): number {
  const idx = window.lastIndexOf("\n");
  return idx > 0 ? idx : 0;
}

// Break at the last space.
function wordBreak(window: string): number {
  const idx = window.lastIndexOf(" ");
  return idx > 0 ? idx : 0;
}

// Smart break resolver: tries paragraph -> sentence -> line -> word.
function smartBreak(window: string): number {
  return paragraphBreak(window)
    || sentenceBreak(window)
    || lineBreak(window)
    || wordBreak(window)
    || 0;
}

// Ready-to-use chunker with smart break detection.
export function chunkTextSmart(text: string, maxChars: number): string[] {
  return chunkText(text, maxChars, smartBreak);
}

// Chunk with overlap for embedding (keeps context between chunks).
export function chunkTextWithOverlap(
  text: string,
  maxChars: number,
  overlapChars: number,
): string[] {
  const raw = chunkTextSmart(text, maxChars);
  if (raw.length <= 1 || overlapChars <= 0) return raw;

  const result: string[] = [raw[0]];
  for (let i = 1; i < raw.length; i++) {
    const prev = raw[i - 1];
    const overlap = prev.slice(-overlapChars).trimStart();
    result.push(overlap + " " + raw[i]);
  }
  return result;
}

// Rough token estimate (good enough for budget checks, not billing).
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
