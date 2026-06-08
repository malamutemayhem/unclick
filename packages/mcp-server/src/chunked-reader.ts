export interface Chunk {
  text: string;
  index: number;
  metadata?: Record<string, unknown>;
}

export function fixedChunk(text: string, size: number, overlap = 0): Chunk[] {
  if (size <= 0) return [];
  const chunks: Chunk[] = [];
  let idx = 0;
  let start = 0;
  while (start < text.length) {
    chunks.push({ text: text.slice(start, start + size), index: idx++ });
    start += size - overlap;
  }
  return chunks;
}

export function sentenceChunk(text: string, maxSentences = 3): Chunk[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  const chunks: Chunk[] = [];
  let idx = 0;
  for (let i = 0; i < sentences.length; i += maxSentences) {
    chunks.push({ text: sentences.slice(i, i + maxSentences).join("").trim(), index: idx++ });
  }
  return chunks;
}

export function paragraphChunk(text: string): Chunk[] {
  return text.split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .map((p, i) => ({ text: p, index: i }));
}

export function wordChunk(text: string, maxWords: number, overlap = 0): Chunk[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (maxWords <= 0) return [];
  const chunks: Chunk[] = [];
  let idx = 0;
  let start = 0;
  while (start < words.length) {
    chunks.push({ text: words.slice(start, start + maxWords).join(" "), index: idx++ });
    start += maxWords - overlap;
  }
  return chunks;
}

export function recursiveChunk(text: string, maxSize: number, separators = ["\n\n", "\n", ". ", " "]): Chunk[] {
  if (text.length <= maxSize) return [{ text, index: 0 }];
  const chunks: Chunk[] = [];
  let idx = 0;

  function split(t: string, sepIdx: number): void {
    if (t.length <= maxSize || sepIdx >= separators.length) {
      chunks.push({ text: t, index: idx++ });
      return;
    }
    const parts = t.split(separators[sepIdx]);
    let buffer = "";
    for (const part of parts) {
      const candidate = buffer ? buffer + separators[sepIdx] + part : part;
      if (candidate.length > maxSize && buffer) {
        chunks.push({ text: buffer, index: idx++ });
        buffer = part;
      } else {
        buffer = candidate;
      }
    }
    if (buffer) {
      if (buffer.length > maxSize) split(buffer, sepIdx + 1);
      else chunks.push({ text: buffer, index: idx++ });
    }
  }

  split(text, 0);
  return chunks;
}
