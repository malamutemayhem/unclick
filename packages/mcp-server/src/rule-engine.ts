export interface Rule<T> {
  name: string;
  priority?: number;
  condition: (input: T) => boolean;
  action: (input: T) => unknown;
}

export interface RuleResult<T> {
  rule: string;
  matched: boolean;
  result?: unknown;
  input: T;
}

export class RuleEngine<T> {
  private rules: Rule<T>[] = [];

  addRule(rule: Rule<T>): void {
    this.rules.push(rule);
    this.rules.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  }

  removeRule(name: string): boolean {
    const idx = this.rules.findIndex((r) => r.name === name);
    if (idx === -1) return false;
    this.rules.splice(idx, 1);
    return true;
  }

  evaluateFirst(input: T): RuleResult<T> | null {
    for (const rule of this.rules) {
      if (rule.condition(input)) {
        return { rule: rule.name, matched: true, result: rule.action(input), input };
      }
    }
    return null;
  }

  evaluateAll(input: T): RuleResult<T>[] {
    const results: RuleResult<T>[] = [];
    for (const rule of this.rules) {
      if (rule.condition(input)) {
        results.push({ rule: rule.name, matched: true, result: rule.action(input), input });
      }
    }
    return results;
  }

  get ruleCount(): number {
    return this.rules.length;
  }

  listRules(): string[] {
    return this.rules.map((r) => r.name);
  }

  clear(): void {
    this.rules.length = 0;
  }
}

export function allOf<T>(...conditions: ((input: T) => boolean)[]): (input: T) => boolean {
  return (input) => conditions.every((c) => c(input));
}

export function anyOf<T>(...conditions: ((input: T) => boolean)[]): (input: T) => boolean {
  return (input) => conditions.some((c) => c(input));
}

export function not<T>(condition: (input: T) => boolean): (input: T) => boolean {
  return (input) => !condition(input);
}
