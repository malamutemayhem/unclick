export function countTokens(text: string): number {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

export function countTokensBatch(texts: string[]): number[] {
  return texts.map(countTokens);
}

export function totalTokens(texts: string[]): number {
  return texts.reduce((sum, t) => sum + countTokens(t), 0);
}

export function truncateToTokens(text: string, maxTokens: number): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= maxTokens) return text;
  return words.slice(0, maxTokens).join(" ");
}

export function fitsInBudget(text: string, budget: number): boolean {
  return countTokens(text) <= budget;
}

export function remainingBudget(texts: string[], totalBudget: number): number {
  return Math.max(0, totalBudget - totalTokens(texts));
}

export function splitByTokenLimit(text: string, chunkSize: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }
  return chunks;
}
