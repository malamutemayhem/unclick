export interface ContextEntry {
  id: string;
  content: string;
  tokens: number;
  priority: number;
  timestamp: number;
}

export class ContextWindow {
  private entries: ContextEntry[] = [];
  private maxTokens: number;
  private usedTokens = 0;

  constructor(maxTokens: number) {
    this.maxTokens = maxTokens;
  }

  add(entry: Omit<ContextEntry, "timestamp">): boolean {
    const full: ContextEntry = { ...entry, timestamp: Date.now() };
    if (full.tokens > this.maxTokens) return false;
    while (this.usedTokens + full.tokens > this.maxTokens) {
      if (!this.evictLowest()) return false;
    }
    this.entries.push(full);
    this.usedTokens += full.tokens;
    return true;
  }

  private evictLowest(): boolean {
    if (this.entries.length === 0) return false;
    let lowestIdx = 0;
    for (let i = 1; i < this.entries.length; i++) {
      if (this.entries[i].priority < this.entries[lowestIdx].priority) {
        lowestIdx = i;
      } else if (
        this.entries[i].priority === this.entries[lowestIdx].priority &&
        this.entries[i].timestamp < this.entries[lowestIdx].timestamp
      ) {
        lowestIdx = i;
      }
    }
    this.usedTokens -= this.entries[lowestIdx].tokens;
    this.entries.splice(lowestIdx, 1);
    return true;
  }

  remove(id: string): boolean {
    const idx = this.entries.findIndex((e) => e.id === id);
    if (idx === -1) return false;
    this.usedTokens -= this.entries[idx].tokens;
    this.entries.splice(idx, 1);
    return true;
  }

  getContents(): ContextEntry[] {
    return [...this.entries].sort((a, b) => b.priority - a.priority || a.timestamp - b.timestamp);
  }

  render(): string {
    return this.getContents().map((e) => e.content).join("\n\n");
  }

  get used(): number {
    return this.usedTokens;
  }

  get available(): number {
    return this.maxTokens - this.usedTokens;
  }

  get utilization(): number {
    return this.maxTokens > 0 ? this.usedTokens / this.maxTokens : 0;
  }

  get size(): number {
    return this.entries.length;
  }

  clear(): void {
    this.entries.length = 0;
    this.usedTokens = 0;
  }
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
