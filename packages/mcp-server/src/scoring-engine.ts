export interface ScoringRule {
  name: string;
  weight: number;
  evaluate: (value: unknown) => number;
}

export interface ScoreResult {
  total: number;
  normalized: number;
  breakdown: Array<{ rule: string; raw: number; weighted: number }>;
}

export class ScoringEngine {
  private rules: ScoringRule[] = [];

  addRule(name: string, weight: number, evaluate: (value: unknown) => number): this {
    this.rules.push({ name, weight, evaluate });
    return this;
  }

  score(values: Record<string, unknown>): ScoreResult {
    const breakdown: Array<{ rule: string; raw: number; weighted: number }> = [];
    let total = 0;
    let maxPossible = 0;

    for (const rule of this.rules) {
      const raw = rule.evaluate(values[rule.name] ?? values);
      const clamped = Math.max(0, Math.min(1, raw));
      const weighted = clamped * rule.weight;
      total += weighted;
      maxPossible += rule.weight;
      breakdown.push({ rule: rule.name, raw: clamped, weighted });
    }

    return {
      total: Math.round(total * 100) / 100,
      normalized: maxPossible === 0 ? 0 : Math.round((total / maxPossible) * 1000) / 1000,
      breakdown,
    };
  }

  scoreMany(items: Record<string, unknown>[]): Array<ScoreResult & { index: number }> {
    return items
      .map((item, index) => ({ ...this.score(item), index }))
      .sort((a, b) => b.total - a.total);
  }

  static threshold(value: number, min: number, max: number): number {
    if (value <= min) return 0;
    if (value >= max) return 1;
    return (value - min) / (max - min);
  }

  static boolean(value: unknown): number {
    return value ? 1 : 0;
  }

  static range(value: number, ranges: Array<{ min: number; max: number; score: number }>): number {
    for (const r of ranges) {
      if (value >= r.min && value < r.max) return r.score;
    }
    return 0;
  }

  static penalty(value: number, limit: number, factor: number = 0.1): number {
    if (value <= limit) return 1;
    return Math.max(0, 1 - (value - limit) * factor);
  }

  static bonus(conditions: boolean[]): number {
    const met = conditions.filter(Boolean).length;
    return conditions.length === 0 ? 0 : met / conditions.length;
  }

  static weighted(scores: Array<{ value: number; weight: number }>): number {
    const totalWeight = scores.reduce((s, e) => s + e.weight, 0);
    if (totalWeight === 0) return 0;
    const sum = scores.reduce((s, e) => s + e.value * e.weight, 0);
    return Math.round((sum / totalWeight) * 1000) / 1000;
  }

  static letterGrade(normalized: number): string {
    if (normalized >= 0.93) return "A";
    if (normalized >= 0.9) return "A-";
    if (normalized >= 0.87) return "B+";
    if (normalized >= 0.83) return "B";
    if (normalized >= 0.8) return "B-";
    if (normalized >= 0.77) return "C+";
    if (normalized >= 0.73) return "C";
    if (normalized >= 0.7) return "C-";
    if (normalized >= 0.67) return "D+";
    if (normalized >= 0.6) return "D";
    return "F";
  }

  static stars(normalized: number, maxStars: number = 5): number {
    return Math.round(normalized * maxStars * 2) / 2;
  }
}
