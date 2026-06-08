export interface KnowledgeItem {
  id: string;
  category: string;
  content: string;
  tags: string[];
  confidence: number;
  createdAt: number;
  updatedAt: number;
  metadata?: Record<string, unknown>;
}

export class KnowledgeBase {
  private items = new Map<string, KnowledgeItem>();
  private counter = 0;

  add(content: string, category: string, options: { tags?: string[]; confidence?: number; metadata?: Record<string, unknown> } = {}): string {
    const id = `kb_${++this.counter}`;
    const now = Date.now();
    this.items.set(id, {
      id, category, content,
      tags: options.tags ?? [],
      confidence: options.confidence ?? 1,
      createdAt: now, updatedAt: now,
      metadata: options.metadata,
    });
    return id;
  }

  get(id: string): KnowledgeItem | undefined {
    return this.items.get(id);
  }

  update(id: string, updates: Partial<Pick<KnowledgeItem, "content" | "category" | "tags" | "confidence" | "metadata">>): boolean {
    const item = this.items.get(id);
    if (!item) return false;
    Object.assign(item, updates, { updatedAt: Date.now() });
    return true;
  }

  remove(id: string): boolean {
    return this.items.delete(id);
  }

  search(query: string, options: { category?: string; tags?: string[]; minConfidence?: number } = {}): KnowledgeItem[] {
    const lower = query.toLowerCase();
    let results = [...this.items.values()];

    if (options.category) results = results.filter((i) => i.category === options.category);
    if (options.tags?.length) results = results.filter((i) => options.tags!.some((t) => i.tags.includes(t)));
    if (options.minConfidence !== undefined) results = results.filter((i) => i.confidence >= options.minConfidence!);

    if (query) {
      results = results.filter((i) => i.content.toLowerCase().includes(lower) || i.tags.some((t) => t.toLowerCase().includes(lower)));
    }

    return results.sort((a, b) => b.confidence - a.confidence);
  }

  getByCategory(category: string): KnowledgeItem[] {
    return [...this.items.values()].filter((i) => i.category === category);
  }

  categories(): string[] {
    return [...new Set([...this.items.values()].map((i) => i.category))].sort();
  }

  get size(): number {
    return this.items.size;
  }

  clear(): void {
    this.items.clear();
  }
}
