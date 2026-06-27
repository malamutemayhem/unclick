export type MembershipFn = (x: number) => number;

export class FuzzySet {
  private name: string;
  private fn: MembershipFn;

  constructor(name: string, fn: MembershipFn) {
    this.name = name;
    this.fn = fn;
  }

  membership(x: number): number {
    return Math.max(0, Math.min(1, this.fn(x)));
  }

  getName(): string {
    return this.name;
  }

  static triangular(name: string, a: number, b: number, c: number): FuzzySet {
    return new FuzzySet(name, (x) => {
      if (x <= a || x >= c) return 0;
      if (x <= b) return (x - a) / (b - a);
      return (c - x) / (c - b);
    });
  }

  static trapezoidal(name: string, a: number, b: number, c: number, d: number): FuzzySet {
    return new FuzzySet(name, (x) => {
      if (x <= a || x >= d) return 0;
      if (x >= b && x <= c) return 1;
      if (x < b) return (x - a) / (b - a);
      return (d - x) / (d - c);
    });
  }

  static gaussian(name: string, mean: number, sigma: number): FuzzySet {
    return new FuzzySet(name, (x) => Math.exp(-0.5 * ((x - mean) / sigma) ** 2));
  }

  static union(a: FuzzySet, b: FuzzySet): FuzzySet {
    return new FuzzySet(`${a.name}|${b.name}`, (x) => Math.max(a.membership(x), b.membership(x)));
  }

  static intersection(a: FuzzySet, b: FuzzySet): FuzzySet {
    return new FuzzySet(`${a.name}&${b.name}`, (x) => Math.min(a.membership(x), b.membership(x)));
  }

  static complement(a: FuzzySet): FuzzySet {
    return new FuzzySet(`!${a.name}`, (x) => 1 - a.membership(x));
  }

  static defuzzify(sets: { set: FuzzySet; weight: number }[], min: number, max: number, steps = 100): number {
    let numerator = 0;
    let denominator = 0;
    const dx = (max - min) / steps;

    for (let i = 0; i <= steps; i++) {
      const x = min + i * dx;
      let maxMembership = 0;
      for (const { set, weight } of sets) {
        maxMembership = Math.max(maxMembership, Math.min(set.membership(x), weight));
      }
      numerator += x * maxMembership;
      denominator += maxMembership;
    }

    if (denominator === 0) return (min + max) / 2;
    return Math.round((numerator / denominator) * 10000) / 10000;
  }

  static fuzzify(value: number, sets: FuzzySet[]): Record<string, number> {
    const result: Record<string, number> = {};
    for (const s of sets) {
      result[s.getName()] = Math.round(s.membership(value) * 10000) / 10000;
    }
    return result;
  }
}
