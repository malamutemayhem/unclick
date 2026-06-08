export type Effect = "allow" | "deny";

export interface PolicyStatement {
  effect: Effect;
  actions: string[];
  resources: string[];
  conditions?: Record<string, unknown>;
}

export interface Policy {
  name: string;
  statements: PolicyStatement[];
}

export interface EvalContext {
  action: string;
  resource: string;
  environment?: Record<string, unknown>;
}

export function evaluate(policies: Policy[], ctx: EvalContext): Effect {
  let allowed = false;

  for (const policy of policies) {
    for (const stmt of policy.statements) {
      if (!matchesAction(stmt.actions, ctx.action)) continue;
      if (!matchesResource(stmt.resources, ctx.resource)) continue;
      if (stmt.conditions && !matchesConditions(stmt.conditions, ctx.environment ?? {})) continue;

      if (stmt.effect === "deny") return "deny";
      allowed = true;
    }
  }

  return allowed ? "allow" : "deny";
}

function matchesAction(patterns: string[], action: string): boolean {
  return patterns.some((p) => wildcardMatch(p, action));
}

function matchesResource(patterns: string[], resource: string): boolean {
  return patterns.some((p) => wildcardMatch(p, resource));
}

function wildcardMatch(pattern: string, value: string): boolean {
  if (pattern === "*") return true;
  const parts = pattern.split("*");
  if (parts.length === 1) return pattern === value;
  let pos = 0;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part === "") continue;
    const idx = value.indexOf(part, pos);
    if (idx === -1) return false;
    if (i === 0 && idx !== 0) return false;
    pos = idx + part.length;
  }
  if (parts[parts.length - 1] !== "" && pos !== value.length) return false;
  return true;
}

function matchesConditions(conditions: Record<string, unknown>, env: Record<string, unknown>): boolean {
  for (const [key, expected] of Object.entries(conditions)) {
    const actual = env[key];
    if (typeof expected === "object" && expected !== null && !Array.isArray(expected)) {
      const op = expected as Record<string, unknown>;
      if ("equals" in op && actual !== op.equals) return false;
      if ("notEquals" in op && actual === op.notEquals) return false;
      if ("in" in op && Array.isArray(op.in) && !op.in.includes(actual)) return false;
      if ("gt" in op && (typeof actual !== "number" || actual <= (op.gt as number))) return false;
      if ("lt" in op && (typeof actual !== "number" || actual >= (op.lt as number))) return false;
    } else {
      if (actual !== expected) return false;
    }
  }
  return true;
}

export function mergeStatements(policies: Policy[]): PolicyStatement[] {
  const all: PolicyStatement[] = [];
  for (const p of policies) {
    all.push(...p.statements);
  }
  return all;
}

export function allowedActions(policies: Policy[], resource: string): string[] {
  const actions = new Set<string>();
  const denied = new Set<string>();
  for (const policy of policies) {
    for (const stmt of policy.statements) {
      if (!matchesResource(stmt.resources, resource)) continue;
      for (const action of stmt.actions) {
        if (action === "*") continue;
        if (stmt.effect === "deny") denied.add(action);
        else actions.add(action);
      }
    }
  }
  return [...actions].filter((a) => !denied.has(a));
}
