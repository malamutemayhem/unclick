export type Document = Record<string, unknown>;

export interface QueryResult {
  documents: Document[];
  total: number;
}

export class DocumentStore {
  private collections = new Map<string, Document[]>();
  private indexes = new Map<string, Map<string, Map<unknown, number[]>>>();
  private nextId = new Map<string, number>();

  createCollection(name: string): boolean {
    if (this.collections.has(name)) return false;
    this.collections.set(name, []);
    this.nextId.set(name, 1);
    return true;
  }

  dropCollection(name: string): boolean {
    this.indexes.delete(name);
    this.nextId.delete(name);
    return this.collections.delete(name);
  }

  insert(collection: string, doc: Document): number | null {
    const docs = this.collections.get(collection);
    if (!docs) return null;
    const id = this.nextId.get(collection)!;
    this.nextId.set(collection, id + 1);
    const stored = { ...doc, _id: id };
    docs.push(stored);
    this.updateIndexes(collection, stored, docs.length - 1);
    return id;
  }

  findById(collection: string, id: number): Document | null {
    const docs = this.collections.get(collection);
    if (!docs) return null;
    return docs.find((d) => d._id === id) ?? null;
  }

  find(collection: string, query: Document = {}): QueryResult {
    const docs = this.collections.get(collection);
    if (!docs) return { documents: [], total: 0 };
    const matched = docs.filter((doc) => this.matchesQuery(doc, query));
    return { documents: matched, total: matched.length };
  }

  update(collection: string, query: Document, updates: Document): number {
    const docs = this.collections.get(collection);
    if (!docs) return 0;
    let count = 0;
    for (const doc of docs) {
      if (this.matchesQuery(doc, query)) {
        Object.assign(doc, updates);
        count++;
      }
    }
    return count;
  }

  remove(collection: string, query: Document): number {
    const docs = this.collections.get(collection);
    if (!docs) return 0;
    const before = docs.length;
    const remaining = docs.filter((doc) => !this.matchesQuery(doc, query));
    this.collections.set(collection, remaining);
    return before - remaining.length;
  }

  count(collection: string, query: Document = {}): number {
    return this.find(collection, query).total;
  }

  createIndex(collection: string, field: string): boolean {
    const docs = this.collections.get(collection);
    if (!docs) return false;
    const idx = new Map<unknown, number[]>();
    for (let i = 0; i < docs.length; i++) {
      const val = docs[i][field];
      if (val !== undefined) {
        const list = idx.get(val) ?? [];
        list.push(i);
        idx.set(val, list);
      }
    }
    const colIndexes = this.indexes.get(collection) ?? new Map();
    colIndexes.set(field, idx);
    this.indexes.set(collection, colIndexes);
    return true;
  }

  aggregate(collection: string, field: string, op: "sum" | "avg" | "min" | "max" | "count"): number {
    const docs = this.collections.get(collection);
    if (!docs) return 0;
    const vals = docs.map((d) => d[field]).filter((v) => typeof v === "number") as number[];
    if (vals.length === 0) return 0;
    switch (op) {
      case "sum": return vals.reduce((a, b) => a + b, 0);
      case "avg": return vals.reduce((a, b) => a + b, 0) / vals.length;
      case "min": return Math.min(...vals);
      case "max": return Math.max(...vals);
      case "count": return vals.length;
    }
  }

  collectionNames(): string[] {
    return [...this.collections.keys()].sort();
  }

  collectionSize(name: string): number {
    return this.collections.get(name)?.length ?? 0;
  }

  private matchesQuery(doc: Document, query: Document): boolean {
    for (const [key, value] of Object.entries(query)) {
      if (doc[key] !== value) return false;
    }
    return true;
  }

  private updateIndexes(collection: string, doc: Document, position: number): void {
    const colIndexes = this.indexes.get(collection);
    if (!colIndexes) return;
    for (const [field, idx] of colIndexes) {
      const val = doc[field];
      if (val !== undefined) {
        const list = idx.get(val) ?? [];
        list.push(position);
        idx.set(val, list);
      }
    }
  }
}
