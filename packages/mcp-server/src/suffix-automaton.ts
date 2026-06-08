interface SAState {
  len: number;
  link: number;
  next: Map<string, number>;
}

export class SuffixAutomaton {
  private states: SAState[] = [];
  private last = 0;

  constructor(text?: string) {
    this.states.push({ len: 0, link: -1, next: new Map() });
    if (text) {
      for (const ch of text) this.extend(ch);
    }
  }

  extend(ch: string): void {
    const cur = this.states.length;
    this.states.push({ len: this.states[this.last].len + 1, link: -1, next: new Map() });
    let p = this.last;
    while (p !== -1 && !this.states[p].next.has(ch)) {
      this.states[p].next.set(ch, cur);
      p = this.states[p].link;
    }
    if (p === -1) {
      this.states[cur].link = 0;
    } else {
      const q = this.states[p].next.get(ch)!;
      if (this.states[p].len + 1 === this.states[q].len) {
        this.states[cur].link = q;
      } else {
        const clone = this.states.length;
        this.states.push({
          len: this.states[p].len + 1,
          link: this.states[q].link,
          next: new Map(this.states[q].next),
        });
        while (p !== -1 && this.states[p].next.get(ch) === q) {
          this.states[p].next.set(ch, clone);
          p = this.states[p].link;
        }
        this.states[q].link = clone;
        this.states[cur].link = clone;
      }
    }
    this.last = cur;
  }

  contains(pattern: string): boolean {
    let cur = 0;
    for (const ch of pattern) {
      const next = this.states[cur].next.get(ch);
      if (next === undefined) return false;
      cur = next;
    }
    return true;
  }

  countDistinctSubstrings(): number {
    let count = 0;
    for (let i = 1; i < this.states.length; i++) {
      count += this.states[i].len - this.states[this.states[i].link].len;
    }
    return count;
  }

  stateCount(): number {
    return this.states.length;
  }

  longestCommonSubstring(other: string): string {
    let cur = 0;
    let len = 0;
    let bestLen = 0;
    let bestEnd = 0;
    for (let i = 0; i < other.length; i++) {
      const ch = other[i];
      while (cur !== 0 && !this.states[cur].next.has(ch)) {
        cur = this.states[cur].link;
        len = this.states[cur].len;
      }
      if (this.states[cur].next.has(ch)) {
        cur = this.states[cur].next.get(ch)!;
        len++;
      }
      if (len > bestLen) {
        bestLen = len;
        bestEnd = i;
      }
    }
    return other.slice(bestEnd - bestLen + 1, bestEnd + 1);
  }
}
