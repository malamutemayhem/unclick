export class MarkovChainText {
  private chain = new Map<string, Map<string, number>>();
  private order: number;
  private seed: number;

  constructor(order: number = 2) {
    this.order = order;
    this.seed = 42;
  }

  private nextRandom(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  train(text: string): void {
    const words = text.split(/\s+/).filter(Boolean);
    for (let i = 0; i <= words.length - this.order; i++) {
      const key = words.slice(i, i + this.order).join(" ");
      const next = words[i + this.order] ?? "";
      if (!this.chain.has(key)) this.chain.set(key, new Map());
      const transitions = this.chain.get(key)!;
      transitions.set(next, (transitions.get(next) ?? 0) + 1);
    }
  }

  generate(length: number, start?: string): string {
    if (this.chain.size === 0) return "";
    let key = start ?? this.randomKey();
    const words = key.split(" ");
    for (let i = 0; i < length; i++) {
      const transitions = this.chain.get(key);
      if (!transitions || transitions.size === 0) {
        key = this.randomKey();
        words.push(...key.split(" "));
        continue;
      }
      const next = this.weightedPick(transitions);
      if (next === "") break;
      words.push(next);
      const keyWords = words.slice(-this.order);
      key = keyWords.join(" ");
    }
    return words.join(" ");
  }

  private weightedPick(transitions: Map<string, number>): string {
    const total = [...transitions.values()].reduce((a, b) => a + b, 0);
    let r = this.nextRandom() * total;
    for (const [word, count] of transitions) {
      r -= count;
      if (r <= 0) return word;
    }
    return [...transitions.keys()][0];
  }

  private randomKey(): string {
    const keys = [...this.chain.keys()];
    return keys[Math.floor(this.nextRandom() * keys.length)];
  }

  getTransitions(key: string): Map<string, number> | undefined {
    return this.chain.get(key);
  }

  get stateCount(): number {
    return this.chain.size;
  }

  probability(key: string, next: string): number {
    const transitions = this.chain.get(key);
    if (!transitions) return 0;
    const total = [...transitions.values()].reduce((a, b) => a + b, 0);
    return (transitions.get(next) ?? 0) / total;
  }

  mostLikely(key: string): string | null {
    const transitions = this.chain.get(key);
    if (!transitions) return null;
    let best = "";
    let bestCount = 0;
    for (const [word, count] of transitions) {
      if (count > bestCount) { best = word; bestCount = count; }
    }
    return best;
  }
}
