export interface AttentionItem<T = unknown> {
  item: T;
  relevance: number;
  recency: number;
}

export function softmax(values: number[], temperature = 1): number[] {
  const scaled = values.map((v) => v / temperature);
  const maxVal = Math.max(...scaled);
  const exps = scaled.map((v) => Math.exp(v - maxVal));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

export function attentionWeights<T>(items: AttentionItem<T>[], temperature = 1): Array<{ item: T; weight: number }> {
  if (items.length === 0) return [];
  const scores = items.map((i) => i.relevance * 0.7 + i.recency * 0.3);
  const weights = softmax(scores, temperature);
  return items.map((item, i) => ({ item: item.item, weight: weights[i] }));
}

export function topAttention<T>(items: AttentionItem<T>[], k: number, temperature = 1): Array<{ item: T; weight: number }> {
  const weighted = attentionWeights(items, temperature);
  return weighted.sort((a, b) => b.weight - a.weight).slice(0, k);
}

export function contextSelect<T>(items: AttentionItem<T>[], budget: number, costFn: (item: T) => number, temperature = 1): T[] {
  const weighted = attentionWeights(items, temperature).sort((a, b) => b.weight - a.weight);
  const selected: T[] = [];
  let remaining = budget;
  for (const { item } of weighted) {
    const cost = costFn(item);
    if (cost <= remaining) {
      selected.push(item);
      remaining -= cost;
    }
  }
  return selected;
}

export function normalizeAttention(scores: number[]): number[] {
  if (scores.length === 0) return [];
  const sum = scores.reduce((a, b) => a + b, 0);
  if (sum === 0) return scores.map(() => 1 / scores.length);
  return scores.map((s) => s / sum);
}
