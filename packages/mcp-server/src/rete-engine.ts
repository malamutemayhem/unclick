type Fact = Record<string, unknown>;
type Condition = (fact: Fact) => boolean;
type Action = (facts: Fact[]) => void;

interface Rule {
  name: string;
  conditions: Condition[];
  action: Action;
  priority: number;
}

export class ReteEngine {
  private rules: Rule[] = [];
  private facts: Fact[] = [];
  private firedRules: Set<string> = new Set();

  addRule(name: string, conditions: Condition[], action: Action, priority = 0): void {
    this.rules.push({ name, conditions, action, priority });
  }

  addFact(fact: Fact): void {
    this.facts.push(fact);
  }

  removeFact(fact: Fact): boolean {
    const idx = this.facts.indexOf(fact);
    if (idx === -1) return false;
    this.facts.splice(idx, 1);
    return true;
  }

  fire(): string[] {
    const fired: string[] = [];
    const sorted = [...this.rules].sort((a, b) => b.priority - a.priority);

    for (const rule of sorted) {
      const matching = this.facts.filter((fact) =>
        rule.conditions.every((cond) => cond(fact))
      );
      if (matching.length > 0) {
        const key = `${rule.name}:${JSON.stringify(matching.map((f) => f))}`;
        if (!this.firedRules.has(key)) {
          rule.action(matching);
          this.firedRules.add(key);
          fired.push(rule.name);
        }
      }
    }
    return fired;
  }

  fireAll(maxIterations = 100): string[] {
    const allFired: string[] = [];
    for (let i = 0; i < maxIterations; i++) {
      const fired = this.fire();
      if (fired.length === 0) break;
      allFired.push(...fired);
    }
    return allFired;
  }

  reset(): void {
    this.firedRules.clear();
  }

  factCount(): number {
    return this.facts.length;
  }

  ruleCount(): number {
    return this.rules.length;
  }

  getFacts(): Fact[] {
    return [...this.facts];
  }
}
