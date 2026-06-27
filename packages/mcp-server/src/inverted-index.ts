export class InvertedIndex {
  private index = new Map<string, Set<string>>();
  private documents = new Map<string, string>();

  add(docId: string, text: string): void {
    this.documents.set(docId, text);
    const tokens = this.tokenize(text);
    for (const token of tokens) {
      if (!this.index.has(token)) this.index.set(token, new Set());
      this.index.get(token)!.add(docId);
    }
  }

  remove(docId: string): boolean {
    const text = this.documents.get(docId);
    if (!text) return false;
    const tokens = this.tokenize(text);
    for (const token of tokens) {
      this.index.get(token)?.delete(docId);
      if (this.index.get(token)?.size === 0) this.index.delete(token);
    }
    this.documents.delete(docId);
    return true;
  }

  search(query: string): string[] {
    const tokens = this.tokenize(query);
    if (tokens.length === 0) return [];
    let result: Set<string> | undefined;
    for (const token of tokens) {
      const docs = this.index.get(token);
      if (!docs) return [];
      if (!result) result = new Set(docs);
      else result = new Set([...result].filter((d) => docs.has(d)));
    }
    return [...(result ?? [])];
  }

  searchAny(query: string): string[] {
    const tokens = this.tokenize(query);
    const result = new Set<string>();
    for (const token of tokens) {
      const docs = this.index.get(token);
      if (docs) for (const d of docs) result.add(d);
    }
    return [...result];
  }

  searchRanked(query: string): Array<{ docId: string; score: number }> {
    const tokens = this.tokenize(query);
    const scores = new Map<string, number>();
    for (const token of tokens) {
      const docs = this.index.get(token);
      if (docs) {
        for (const d of docs) {
          scores.set(d, (scores.get(d) ?? 0) + 1);
        }
      }
    }
    return [...scores.entries()]
      .map(([docId, score]) => ({ docId, score: score / tokens.length }))
      .sort((a, b) => b.score - a.score);
  }

  get documentCount(): number {
    return this.documents.size;
  }

  get termCount(): number {
    return this.index.size;
  }

  getDocument(docId: string): string | undefined {
    return this.documents.get(docId);
  }

  clear(): void {
    this.index.clear();
    this.documents.clear();
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase().split(/\W+/).filter((t) => t.length > 0);
  }
}
