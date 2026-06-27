export class HashChain {
  private chain: string[] = [];

  private static simpleHash(input: string): string {
    let h = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16).padStart(8, "0");
  }

  static generate(seed: string, length: number): HashChain {
    const hc = new HashChain();
    let current = seed;
    hc.chain.push(current);
    for (let i = 1; i < length; i++) {
      current = this.simpleHash(current);
      hc.chain.push(current);
    }
    return hc;
  }

  get(index: number): string | undefined {
    return this.chain[index];
  }

  verify(index: number, value: string): boolean {
    if (index < 0 || index >= this.chain.length) return false;
    return this.chain[index] === value;
  }

  verifyLink(index: number): boolean {
    if (index <= 0 || index >= this.chain.length) return false;
    return this.chain[index] === HashChain.simpleHash(this.chain[index - 1]);
  }

  length(): number {
    return this.chain.length;
  }

  tip(): string {
    return this.chain[this.chain.length - 1];
  }

  root(): string {
    return this.chain[0];
  }

  verifyAll(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      if (!this.verifyLink(i)) return false;
    }
    return true;
  }

  slice(from: number, to?: number): string[] {
    return this.chain.slice(from, to);
  }
}
