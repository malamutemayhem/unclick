export interface PolicyRule<C = unknown> {
  name: string;
  description?: string;
  condition: (context: C) => boolean;
  effect: "allow" | "deny";
  priority?: number;
}

export interface PolicyDecision {
  allowed: boolean;
  matchedRule?: string;
  reason?: string;
}

export class PolicyEngine<C = unknown> {
  private rules: PolicyRule<C>[] = [];
  private defaultEffect: "allow" | "deny" = "deny";

  setDefault(effect: "allow" | "deny"): this {
    this.defaultEffect = effect;
    return this;
  }

  addRule(rule: PolicyRule<C>): this {
    this.rules.push(rule);
    this.rules.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    return this;
  }

  removeRule(name: string): boolean {
    const idx = this.rules.findIndex((r) => r.name === name);
    if (idx === -1) return false;
    this.rules.splice(idx, 1);
    return true;
  }

  evaluate(context: C): PolicyDecision {
    for (const rule of this.rules) {
      if (rule.condition(context)) {
        return {
          allowed: rule.effect === "allow",
          matchedRule: rule.name,
          reason: rule.description,
        };
      }
    }
    return {
      allowed: this.defaultEffect === "allow",
      reason: `Default policy: ${this.defaultEffect}`,
    };
  }

  evaluateAll(context: C): Array<{ rule: string; matched: boolean; effect: "allow" | "deny" }> {
    return this.rules.map((rule) => ({
      rule: rule.name,
      matched: rule.condition(context),
      effect: rule.effect,
    }));
  }

  get ruleCount(): number {
    return this.rules.length;
  }

  ruleNames(): string[] {
    return this.rules.map((r) => r.name);
  }

  clear(): void {
    this.rules = [];
  }
}

export function createPolicy<C>(
  rules: PolicyRule<C>[],
  defaultEffect: "allow" | "deny" = "deny",
): PolicyEngine<C> {
  const engine = new PolicyEngine<C>();
  engine.setDefault(defaultEffect);
  for (const rule of rules) engine.addRule(rule);
  return engine;
}
