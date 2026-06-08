export type MembershipFn = (x: number) => number;

export function triangular(a: number, b: number, c: number): MembershipFn {
  return (x: number) => {
    if (x <= a || x >= c) return 0;
    if (x <= b) return (x - a) / (b - a);
    return (c - x) / (c - b);
  };
}

export function trapezoidal(a: number, b: number, c: number, d: number): MembershipFn {
  return (x: number) => {
    if (x <= a || x >= d) return 0;
    if (x >= b && x <= c) return 1;
    if (x < b) return (x - a) / (b - a);
    return (d - x) / (d - c);
  };
}

export function gaussian(center: number, sigma: number): MembershipFn {
  return (x: number) => Math.exp(-0.5 * Math.pow((x - center) / sigma, 2));
}

export function singleton(value: number): MembershipFn {
  return (x: number) => (x === value ? 1 : 0);
}

export function not(fn: MembershipFn): MembershipFn {
  return (x: number) => 1 - fn(x);
}

export function and(a: MembershipFn, b: MembershipFn): MembershipFn {
  return (x: number) => Math.min(a(x), b(x));
}

export function or(a: MembershipFn, b: MembershipFn): MembershipFn {
  return (x: number) => Math.max(a(x), b(x));
}

export interface FuzzySet {
  name: string;
  fn: MembershipFn;
}

export interface FuzzyVariable {
  name: string;
  sets: FuzzySet[];
  range: [number, number];
}

export interface FuzzyRule {
  conditions: { variable: string; set: string }[];
  output: { variable: string; set: string };
  weight?: number;
}

export function fuzzify(variable: FuzzyVariable, value: number): Map<string, number> {
  const result = new Map<string, number>();
  for (const set of variable.sets) {
    result.set(set.name, set.fn(value));
  }
  return result;
}

export function defuzzifyCentroid(
  outputVariable: FuzzyVariable,
  activations: Map<string, number>,
  resolution = 100,
): number {
  const [min, max] = outputVariable.range;
  const step = (max - min) / resolution;

  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i <= resolution; i++) {
    const x = min + i * step;
    let maxMembership = 0;
    for (const set of outputVariable.sets) {
      const activation = activations.get(set.name) ?? 0;
      const clipped = Math.min(set.fn(x), activation);
      maxMembership = Math.max(maxMembership, clipped);
    }
    numerator += x * maxMembership;
    denominator += maxMembership;
  }

  return denominator === 0 ? (min + max) / 2 : numerator / denominator;
}

export function evaluateRules(
  rules: FuzzyRule[],
  inputs: Map<string, Map<string, number>>,
): Map<string, number> {
  const outputActivations = new Map<string, number>();

  for (const rule of rules) {
    let strength = 1;
    for (const cond of rule.conditions) {
      const varMemberships = inputs.get(cond.variable);
      const membership = varMemberships?.get(cond.set) ?? 0;
      strength = Math.min(strength, membership);
    }
    strength *= rule.weight ?? 1;

    const key = rule.output.set;
    const current = outputActivations.get(key) ?? 0;
    outputActivations.set(key, Math.max(current, strength));
  }

  return outputActivations;
}
