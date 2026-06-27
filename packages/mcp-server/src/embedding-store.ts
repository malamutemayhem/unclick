export interface EmbeddingEntry {
  id: string;
  vector: number[];
  metadata: Record<string, unknown>;
}

export interface SearchResult {
  entry: EmbeddingEntry;
  similarity: number;
}

function dotProduct(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

function magnitude(v: number[]): number {
  return Math.sqrt(dotProduct(v, v));
}

function cosineSim(a: number[], b: number[]): number {
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct(a, b) / (magA * magB);
}

export class EmbeddingStore {
  private entries = new Map<string, EmbeddingEntry>();
  private dimensions: number;

  constructor(dimensions: number) {
    this.dimensions = dimensions;
  }

  add(id: string, vector: number[], metadata: Record<string, unknown> = {}): void {
    if (vector.length !== this.dimensions) {
      throw new Error(`Expected ${this.dimensions} dimensions, got ${vector.length}`);
    }
    this.entries.set(id, { id, vector, metadata });
  }

  remove(id: string): boolean {
    return this.entries.delete(id);
  }

  get(id: string): EmbeddingEntry | undefined {
    return this.entries.get(id);
  }

  has(id: string): boolean {
    return this.entries.has(id);
  }

  search(query: number[], topK = 10, minSimilarity = 0): SearchResult[] {
    if (query.length !== this.dimensions) {
      throw new Error(`Expected ${this.dimensions} dimensions, got ${query.length}`);
    }

    const results: SearchResult[] = [];
    for (const entry of this.entries.values()) {
      const similarity = cosineSim(query, entry.vector);
      if (similarity >= minSimilarity) {
        results.push({ entry, similarity });
      }
    }

    return results.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
  }

  searchByMetadata(filter: Record<string, unknown>): EmbeddingEntry[] {
    return [...this.entries.values()].filter((e) =>
      Object.entries(filter).every(([k, v]) => e.metadata[k] === v),
    );
  }

  get size(): number {
    return this.entries.size;
  }

  get dims(): number {
    return this.dimensions;
  }

  clear(): void {
    this.entries.clear();
  }

  all(): EmbeddingEntry[] {
    return [...this.entries.values()];
  }
}
