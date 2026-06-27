export class MarkovChain<T = string> {
  private transitions: Map<string, Map<T, number>> = new Map();
  private order: number;
  private keyFn: (states: T[]) => string;

  constructor(order = 1, keyFn?: (states: T[]) => string) {
    this.order = order;
    this.keyFn = keyFn ?? ((states: T[]) => JSON.stringify(states));
  }

  train(sequence: T[]): void {
    if (sequence.length <= this.order) return;
    for (let i = 0; i <= sequence.length - this.order - 1; i++) {
      const state = sequence.slice(i, i + this.order);
      const next = sequence[i + this.order];
      const key = this.keyFn(state);
      if (!this.transitions.has(key)) {
        this.transitions.set(key, new Map());
      }
      const counts = this.transitions.get(key)!;
      counts.set(next, (counts.get(next) ?? 0) + 1);
    }
  }

  next(state: T[]): T | undefined {
    const key = this.keyFn(state.slice(-this.order));
    const counts = this.transitions.get(key);
    if (!counts || counts.size === 0) return undefined;

    let total = 0;
    for (const count of counts.values()) total += count;

    let r = Math.random() * total;
    for (const [value, count] of counts) {
      r -= count;
      if (r <= 0) return value;
    }

    return counts.keys().next().value;
  }

  generate(start: T[], length: number): T[] {
    const result = [...start];
    for (let i = 0; i < length; i++) {
      const n = this.next(result);
      if (n === undefined) break;
      result.push(n);
    }
    return result;
  }

  probabilities(state: T[]): Map<T, number> {
    const key = this.keyFn(state.slice(-this.order));
    const counts = this.transitions.get(key);
    const probs = new Map<T, number>();
    if (!counts) return probs;

    let total = 0;
    for (const count of counts.values()) total += count;
    for (const [value, count] of counts) {
      probs.set(value, count / total);
    }
    return probs;
  }

  stateCount(): number {
    return this.transitions.size;
  }

  hasState(state: T[]): boolean {
    return this.transitions.has(this.keyFn(state.slice(-this.order)));
  }
}

export function trainText(text: string, order = 1): MarkovChain<string> {
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const chain = new MarkovChain<string>(order);
  chain.train(words);
  return chain;
}

export function trainCharacters(text: string, order = 2): MarkovChain<string> {
  const chars = text.split("");
  const chain = new MarkovChain<string>(order);
  chain.train(chars);
  return chain;
}
