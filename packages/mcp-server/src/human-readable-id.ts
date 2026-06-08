const ADJECTIVES = [
  "brave", "calm", "dark", "eager", "fair", "glad", "happy", "keen",
  "light", "mild", "neat", "odd", "proud", "quick", "rare", "safe",
  "tall", "vast", "warm", "young", "bold", "cool", "deep", "fast",
  "gold", "high", "iron", "jade", "kind", "lean", "mute", "nice",
];

const NOUNS = [
  "bear", "bird", "cat", "deer", "eagle", "fox", "goat", "hawk",
  "ibis", "jay", "kite", "lion", "mole", "newt", "owl", "puma",
  "quail", "raven", "seal", "tiger", "urchin", "viper", "wolf", "yak",
  "ant", "bee", "cod", "dove", "elk", "frog", "gull", "hare",
];

const COLORS = [
  "red", "blue", "green", "amber", "coral", "ivory", "olive", "plum",
  "ruby", "sage", "teal", "azure", "blush", "cedar", "dusk", "fawn",
];

export class HumanReadableId {
  private seed: number;

  constructor(seed?: number) {
    this.seed = seed ?? Date.now();
  }

  private nextRandom(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  private pick<T>(arr: T[]): T {
    return arr[Math.floor(this.nextRandom() * arr.length)];
  }

  generate(options?: { separator?: string; words?: number; addNumber?: boolean }): string {
    const sep = options?.separator ?? "-";
    const words = options?.words ?? 2;
    const addNumber = options?.addNumber ?? false;
    const parts: string[] = [];
    for (let i = 0; i < words - 1; i++) {
      parts.push(this.pick(ADJECTIVES));
    }
    parts.push(this.pick(NOUNS));
    if (addNumber) {
      parts.push(String(Math.floor(this.nextRandom() * 1000)));
    }
    return parts.join(sep);
  }

  generateWithColor(separator: string = "-"): string {
    return [this.pick(COLORS), this.pick(ADJECTIVES), this.pick(NOUNS)].join(separator);
  }

  batch(count: number, options?: { separator?: string; words?: number; addNumber?: boolean }): string[] {
    const ids = new Set<string>();
    let attempts = 0;
    while (ids.size < count && attempts < count * 10) {
      ids.add(this.generate(options));
      attempts++;
    }
    return [...ids];
  }

  static fromTimestamp(timestamp: number): string {
    const adjIdx = timestamp % ADJECTIVES.length;
    const nounIdx = Math.floor(timestamp / ADJECTIVES.length) % NOUNS.length;
    const num = Math.floor(timestamp / (ADJECTIVES.length * NOUNS.length)) % 1000;
    return `${ADJECTIVES[adjIdx]}-${NOUNS[nounIdx]}-${num}`;
  }

  static slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  static getAdjectives(): string[] {
    return [...ADJECTIVES];
  }

  static getNouns(): string[] {
    return [...NOUNS];
  }
}
