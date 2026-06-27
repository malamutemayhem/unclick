export interface DecisionRule<T> {
  conditions: Record<string, unknown>;
  action: T;
  priority?: number;
}

export class DecisionTable<T> {
  private rules: DecisionRule<T>[] = [];

  addRule(rule: DecisionRule<T>): void {
    this.rules.push(rule);
  }

  addRules(rules: DecisionRule<T>[]): void {
    for (const rule of rules) {
      this.rules.push(rule);
    }
  }

  evaluate(facts: Record<string, unknown>): T | undefined {
    const matching = this.findMatching(facts);
    if (matching.length === 0) return undefined;
    const sorted = [...matching].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    return sorted[0].action;
  }

  evaluateAll(facts: Record<string, unknown>): T[] {
    return this.findMatching(facts).map((r) => r.action);
  }

  private findMatching(facts: Record<string, unknown>): DecisionRule<T>[] {
    return this.rules.filter((rule) => {
      for (const [key, expected] of Object.entries(rule.conditions)) {
        if (facts[key] !== expected) return false;
      }
      return true;
    });
  }

  removeRule(index: number): boolean {
    if (index < 0 || index >= this.rules.length) return false;
    this.rules.splice(index, 1);
    return true;
  }

  size(): number {
    return this.rules.length;
  }

  clear(): void {
    this.rules = [];
  }

  getRules(): DecisionRule<T>[] {
    return [...this.rules];
  }

  findConflicts(): [number, number][] {
    const conflicts: [number, number][] = [];
    for (let i = 0; i < this.rules.length; i++) {
      for (let j = i + 1; j < this.rules.length; j++) {
        if (this.conditionsMatch(this.rules[i], this.rules[j]) &&
            this.rules[i].action !== this.rules[j].action) {
          conflicts.push([i, j]);
        }
      }
    }
    return conflicts;
  }

  private conditionsMatch(a: DecisionRule<T>, b: DecisionRule<T>): boolean {
    const keysA = Object.keys(a.conditions);
    const keysB = Object.keys(b.conditions);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((k) => a.conditions[k] === b.conditions[k]);
  }

  validate(): { complete: boolean; conflictCount: number } {
    return {
      complete: this.rules.length > 0,
      conflictCount: this.findConflicts().length,
    };
  }
}
