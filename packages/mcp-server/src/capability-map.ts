export interface Capability {
  name: string;
  description: string;
  tags: string[];
  version?: string;
  confidence?: number;
}

export interface CapabilityQuery {
  tags?: string[];
  minConfidence?: number;
  nameContains?: string;
}

export class CapabilityMap {
  private capabilities = new Map<string, Capability>();

  register(capability: Capability): void {
    this.capabilities.set(capability.name, capability);
  }

  unregister(name: string): boolean {
    return this.capabilities.delete(name);
  }

  get(name: string): Capability | undefined {
    return this.capabilities.get(name);
  }

  has(name: string): boolean {
    return this.capabilities.has(name);
  }

  query(q: CapabilityQuery): Capability[] {
    let results = [...this.capabilities.values()];

    if (q.tags && q.tags.length > 0) {
      results = results.filter((c) => q.tags!.some((t) => c.tags.includes(t)));
    }
    if (q.minConfidence !== undefined) {
      results = results.filter((c) => (c.confidence ?? 1) >= q.minConfidence!);
    }
    if (q.nameContains) {
      const lower = q.nameContains.toLowerCase();
      results = results.filter((c) => c.name.toLowerCase().includes(lower) || c.description.toLowerCase().includes(lower));
    }

    return results;
  }

  match(requiredTags: string[]): Capability[] {
    return [...this.capabilities.values()].filter(
      (c) => requiredTags.every((t) => c.tags.includes(t)),
    );
  }

  bestMatch(requiredTags: string[]): Capability | undefined {
    const matches = this.match(requiredTags);
    if (matches.length === 0) return undefined;
    return matches.reduce((best, c) => {
      const bScore = (best.confidence ?? 1) * best.tags.length;
      const cScore = (c.confidence ?? 1) * c.tags.length;
      return cScore > bScore ? c : best;
    });
  }

  tags(): string[] {
    const tagSet = new Set<string>();
    for (const c of this.capabilities.values()) {
      for (const t of c.tags) tagSet.add(t);
    }
    return [...tagSet].sort();
  }

  get size(): number {
    return this.capabilities.size;
  }

  all(): Capability[] {
    return [...this.capabilities.values()];
  }

  clear(): void {
    this.capabilities.clear();
  }
}

export function mergeCapabilities(a: CapabilityMap, b: CapabilityMap): CapabilityMap {
  const merged = new CapabilityMap();
  for (const cap of a.all()) merged.register(cap);
  for (const cap of b.all()) {
    if (!merged.has(cap.name)) merged.register(cap);
  }
  return merged;
}
