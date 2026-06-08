export function estimateTokens(text: string): number {
  if (!text) return 0;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const charCount = text.length;
  return Math.ceil(Math.max(wordCount * 1.3, charCount / 4));
}

export function estimateTokensCL100K(text: string): number {
  if (!text) return 0;
  let tokens = 0;
  const words = text.split(/(\s+|[^\w\s])/);
  for (const word of words) {
    if (!word) continue;
    if (/^\s+$/.test(word)) {
      tokens += 1;
    } else if (word.length <= 3) {
      tokens += 1;
    } else {
      tokens += Math.ceil(word.length / 3.5);
    }
  }
  return Math.max(1, tokens);
}

export function truncateToTokens(text: string, maxTokens: number): string {
  const words = text.split(/\s+/);
  let tokens = 0;
  const result: string[] = [];
  for (const word of words) {
    const wordTokens = Math.ceil(Math.max(1, word.length / 4));
    if (tokens + wordTokens > maxTokens) break;
    result.push(word);
    tokens += wordTokens;
  }
  return result.join(" ");
}

export function chunkByTokens(text: string, chunkSize: number, overlap = 0): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current: string[] = [];
  let currentTokens = 0;

  for (const sentence of sentences) {
    const sentenceTokens = estimateTokens(sentence);
    if (currentTokens + sentenceTokens > chunkSize && current.length > 0) {
      chunks.push(current.join(" "));
      if (overlap > 0) {
        let overlapTokens = 0;
        const overlapSentences: string[] = [];
        for (let i = current.length - 1; i >= 0; i--) {
          const st = estimateTokens(current[i]);
          if (overlapTokens + st > overlap) break;
          overlapSentences.unshift(current[i]);
          overlapTokens += st;
        }
        current = overlapSentences;
        currentTokens = overlapTokens;
      } else {
        current = [];
        currentTokens = 0;
      }
    }
    current.push(sentence);
    currentTokens += sentenceTokens;
  }
  if (current.length > 0) chunks.push(current.join(" "));
  return chunks;
}

export function countMessages(messages: Array<{ role: string; content: string }>): number {
  let total = 0;
  for (const msg of messages) {
    total += 4;
    total += estimateTokens(msg.role);
    total += estimateTokens(msg.content);
  }
  total += 2;
  return total;
}
