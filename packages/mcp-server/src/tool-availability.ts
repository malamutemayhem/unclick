// Tool availability expressions.
// Inspired by OpenClaw's composable availability system where each tool
// declares what it needs (auth, env vars, config) and the runtime
// evaluates those needs at plan time. Tools that can't run get hidden
// with a helpful reason instead of failing at call time.
//
// This is useful for UnClick because we have 200+ connectors, each
// needing different credentials. Right now tools fail at call time
// with "not connected" errors. With availability expressions, we can
// tell agents upfront which tools are ready to use.

export type AvailabilitySignal =
  | { kind: "always" }
  | { kind: "env"; variable: string }
  | { kind: "credential"; connector: string }
  | { kind: "feature_flag"; flag: string };

export type AvailabilityExpression =
  | AvailabilitySignal
  | { allOf: AvailabilityExpression[] }
  | { anyOf: AvailabilityExpression[] };

export interface AvailabilityContext {
  env: Record<string, string | undefined>;
  connectedCredentials: Set<string>;
  featureFlags: Set<string>;
}

export interface AvailabilityDiagnostic {
  signal: AvailabilitySignal;
  message: string;
}

export function evaluateSignal(
  signal: AvailabilitySignal,
  ctx: AvailabilityContext,
): AvailabilityDiagnostic | null {
  switch (signal.kind) {
    case "always":
      return null;
    case "env": {
      const val = ctx.env[signal.variable];
      if (val && val.trim().length > 0) return null;
      return { signal, message: `Missing env var: ${signal.variable}` };
    }
    case "credential": {
      if (ctx.connectedCredentials.has(signal.connector)) return null;
      return { signal, message: `Not connected: ${signal.connector}` };
    }
    case "feature_flag": {
      if (ctx.featureFlags.has(signal.flag)) return null;
      return { signal, message: `Feature flag disabled: ${signal.flag}` };
    }
  }
}

export function evaluateExpression(
  expr: AvailabilityExpression,
  ctx: AvailabilityContext,
): AvailabilityDiagnostic[] {
  if ("kind" in expr) {
    const diag = evaluateSignal(expr, ctx);
    return diag ? [diag] : [];
  }

  if ("allOf" in expr) {
    const diagnostics: AvailabilityDiagnostic[] = [];
    for (const sub of expr.allOf) {
      diagnostics.push(...evaluateExpression(sub, ctx));
    }
    return diagnostics;
  }

  if ("anyOf" in expr) {
    const allDiagnostics: AvailabilityDiagnostic[][] = [];
    for (const sub of expr.anyOf) {
      const diags = evaluateExpression(sub, ctx);
      if (diags.length === 0) return [];
      allDiagnostics.push(diags);
    }
    return allDiagnostics.flat();
  }

  return [];
}

// High-level helper: given a list of tools with availability requirements,
// split them into available and unavailable with reasons.
export interface ToolWithAvailability {
  name: string;
  availability?: AvailabilityExpression;
}

export interface AvailabilityPlan {
  available: string[];
  unavailable: Array<{ name: string; reasons: string[] }>;
}

export function planToolAvailability(
  tools: ToolWithAvailability[],
  ctx: AvailabilityContext,
): AvailabilityPlan {
  const available: string[] = [];
  const unavailable: Array<{ name: string; reasons: string[] }> = [];

  for (const tool of tools) {
    if (!tool.availability) {
      available.push(tool.name);
      continue;
    }
    const diagnostics = evaluateExpression(tool.availability, ctx);
    if (diagnostics.length === 0) {
      available.push(tool.name);
    } else {
      unavailable.push({
        name: tool.name,
        reasons: diagnostics.map((d) => d.message),
      });
    }
  }

  return { available, unavailable };
}
