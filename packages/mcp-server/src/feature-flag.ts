export interface Flag {
  key: string;
  enabled: boolean;
  percentage?: number;
  rules: FlagRule[];
  defaultValue: unknown;
  description: string;
}

export interface FlagRule {
  attribute: string;
  operator: "eq" | "ne" | "in" | "gt" | "lt" | "contains";
  value: unknown;
  result: unknown;
}

export interface EvalContext {
  userId?: string;
  attributes: Record<string, unknown>;
}

export class FeatureFlagService {
  private flags = new Map<string, Flag>();
  private overrides = new Map<string, Map<string, unknown>>();
  private evaluationLog: Array<{ flag: string; userId?: string; result: unknown }> = [];

  register(key: string, defaultValue: unknown, description = ""): void {
    this.flags.set(key, {
      key,
      enabled: false,
      rules: [],
      defaultValue,
      description,
    });
  }

  enable(key: string): boolean {
    const flag = this.flags.get(key);
    if (!flag) return false;
    flag.enabled = true;
    return true;
  }

  disable(key: string): boolean {
    const flag = this.flags.get(key);
    if (!flag) return false;
    flag.enabled = false;
    return true;
  }

  setPercentage(key: string, percentage: number): boolean {
    const flag = this.flags.get(key);
    if (!flag) return false;
    flag.percentage = Math.max(0, Math.min(100, percentage));
    flag.enabled = true;
    return true;
  }

  addRule(key: string, rule: FlagRule): boolean {
    const flag = this.flags.get(key);
    if (!flag) return false;
    flag.rules.push(rule);
    return true;
  }

  setOverride(key: string, userId: string, value: unknown): void {
    const userOverrides = this.overrides.get(userId) ?? new Map();
    userOverrides.set(key, value);
    this.overrides.set(userId, userOverrides);
  }

  evaluate(key: string, context: EvalContext = { attributes: {} }): unknown {
    const flag = this.flags.get(key);
    if (!flag) return undefined;

    if (context.userId) {
      const userOverrides = this.overrides.get(context.userId);
      if (userOverrides?.has(key)) {
        const result = userOverrides.get(key);
        this.logEval(key, context.userId, result);
        return result;
      }
    }

    if (!flag.enabled) {
      this.logEval(key, context.userId, flag.defaultValue);
      return flag.defaultValue;
    }

    if (flag.percentage !== undefined && context.userId) {
      const hash = simpleHash(context.userId + key);
      if ((hash % 100) >= flag.percentage) {
        this.logEval(key, context.userId, flag.defaultValue);
        return flag.defaultValue;
      }
    }

    for (const rule of flag.rules) {
      const attrVal = context.attributes[rule.attribute];
      if (this.evaluateRule(rule, attrVal)) {
        this.logEval(key, context.userId, rule.result);
        return rule.result;
      }
    }

    const result = flag.enabled ? true : flag.defaultValue;
    this.logEval(key, context.userId, result);
    return result;
  }

  private evaluateRule(rule: FlagRule, value: unknown): boolean {
    switch (rule.operator) {
      case "eq": return value === rule.value;
      case "ne": return value !== rule.value;
      case "in": return Array.isArray(rule.value) && (rule.value as unknown[]).includes(value);
      case "gt": return typeof value === "number" && typeof rule.value === "number" && value > rule.value;
      case "lt": return typeof value === "number" && typeof rule.value === "number" && value < rule.value;
      case "contains": return typeof value === "string" && typeof rule.value === "string" && value.includes(rule.value);
    }
  }

  isEnabled(key: string): boolean {
    return this.flags.get(key)?.enabled ?? false;
  }

  listFlags(): Flag[] {
    return [...this.flags.values()];
  }

  flagCount(): number {
    return this.flags.size;
  }

  getEvaluationLog(): Array<{ flag: string; userId?: string; result: unknown }> {
    return [...this.evaluationLog];
  }

  private logEval(flag: string, userId: string | undefined, result: unknown): void {
    this.evaluationLog.push({ flag, userId, result });
  }
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}
