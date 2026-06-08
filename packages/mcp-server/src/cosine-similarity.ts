export function dotProduct(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

export function magnitude(v: number[]): number {
  return Math.sqrt(dotProduct(v, v));
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct(a, b) / (magA * magB);
}

export function euclideanDistance(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += (a[i] - b[i]) ** 2;
  return Math.sqrt(sum);
}

export function manhattanDistance(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += Math.abs(a[i] - b[i]);
  return sum;
}

export function normalize(v: number[]): number[] {
  const mag = magnitude(v);
  if (mag === 0) return v.map(() => 0);
  return v.map((x) => x / mag);
}

export function topK<T>(
  query: number[],
  items: Array<{ vector: number[]; data: T }>,
  k: number,
  metric: "cosine" | "euclidean" = "cosine"
): Array<{ data: T; score: number }> {
  const scored = items.map((item) => ({
    data: item.data,
    score: metric === "cosine"
      ? cosineSimilarity(query, item.vector)
      : -euclideanDistance(query, item.vector),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k);
}

export function termFrequency(text: string): Map<string, number> {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const tf = new Map<string, number>();
  for (const word of words) {
    tf.set(word, (tf.get(word) || 0) + 1);
  }
  for (const [word, count] of tf) {
    tf.set(word, count / words.length);
  }
  return tf;
}
