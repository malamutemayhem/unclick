// flow-composer.ts
// UnClick "building layer" primitive: compose several real connector endpoints
// into one validated, runnable multi-step flow.
//
// This is the piece vibe-coding app builders fake: instead of mocking an
// integration, an agent describes an ordered sequence of real UnClick tool
// calls, threads each step's output into the next, and gets back a checked,
// ready-to-run plan. It is pure and deterministic (no network, no auth, no
// catalog mutation): it validates against the generated tool index and returns
// a plan the agent then executes with unclick_call.

import { TOOL_INDEX } from "./memory/tool-index.generated.js";

export interface FlowStepInput {
  /** Stable handle for this step, referenced by later steps. Auto-assigned if omitted. */
  id?: string;
  /** Callable UnClick tool name, e.g. "stripe_invoices". Validated against the tool index. */
  tool?: string;
  /** Parameters for the tool. String values may embed {{ref}} placeholders. */
  params?: Record<string, unknown>;
  /** Alias for this step's output, usable in later {{refs}} (in addition to id). */
  save_as?: string;
}

export interface FlowComposeInput {
  /** Optional plain-language description of what the flow is for. */
  goal?: string;
  steps?: FlowStepInput[];
}

interface PlannedStep {
  order: number;
  id: string;
  tool: string;
  app: string | null;
  params: Record<string, unknown>;
  depends_on: string[];
}

interface AppTouch {
  app: string;
  tools: string[];
}

export interface FlowPlan {
  ok: boolean;
  goal: string | null;
  step_count: number;
  steps: PlannedStep[];
  apps_touched: AppTouch[];
  execution: {
    runner: "unclick_call";
    instructions: string;
    calls: Array<{ order: number; step: string; endpoint_id: string; params: Record<string, unknown> }>;
  } | null;
  warnings: string[];
  errors: string[];
  unclick_meta: {
    source: string;
    generated_at: string;
    next_steps: string[];
  };
}

// Build lookup maps once: tool name -> app slug, plus the set of valid names.
const TOOL_TO_APP = new Map<string, string>();
const KNOWN_TOOLS: string[] = [];
for (const entry of TOOL_INDEX) {
  for (const tool of entry.tools) {
    TOOL_TO_APP.set(tool.name, entry.app);
    KNOWN_TOOLS.push(tool.name);
  }
}

const REF_RE = /\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g;

/** Suggest up to `limit` known tool names close to an unknown one. */
function suggestTools(unknown: string, limit = 5): string[] {
  const q = unknown.toLowerCase();
  const scored = KNOWN_TOOLS.map((name) => {
    const n = name.toLowerCase();
    let score = 0;
    if (n === q) score = 100;
    else if (n.startsWith(q) || q.startsWith(n)) score = 60;
    else if (n.includes(q) || q.includes(n)) score = 40;
    else {
      // shared prefix length as a weak tiebreak
      let i = 0;
      while (i < n.length && i < q.length && n[i] === q[i]) i++;
      score = i;
    }
    return { name, score };
  });
  return scored
    .filter((s) => s.score > 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.name);
}

/** Collect every {{ref}} stepRef (segment before the first dot) found in a value. */
function collectRefStepKeys(value: unknown, out: Set<string>): void {
  if (typeof value === "string") {
    let m: RegExpExecArray | null;
    REF_RE.lastIndex = 0;
    while ((m = REF_RE.exec(value)) !== null) {
      const stepKey = m[1].split(".")[0];
      if (stepKey) out.add(stepKey);
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const v of value) collectRefStepKeys(v, out);
    return;
  }
  if (value && typeof value === "object") {
    for (const v of Object.values(value as Record<string, unknown>)) collectRefStepKeys(v, out);
  }
}

/**
 * Compose a validated, runnable flow from an ordered list of real UnClick tool
 * calls. Returns a FlowPlan with errors/warnings rather than throwing, so an
 * agent can repair the flow before executing it.
 */
export function composeFlow(input: FlowComposeInput): FlowPlan {
  const errors: string[] = [];
  const warnings: string[] = [];
  const goal = typeof input?.goal === "string" && input.goal.trim() ? input.goal.trim() : null;
  const rawSteps = Array.isArray(input?.steps) ? input!.steps! : [];

  if (rawSteps.length === 0) {
    errors.push("No steps provided. Pass steps: [{ tool, params }, ...] in run order.");
  }

  // First pass: assign ids, validate tools, register step keys (id + save_as).
  const keyToOrder = new Map<string, number>();
  const planned: PlannedStep[] = [];

  rawSteps.forEach((step, index) => {
    const order = index + 1;
    const id = (typeof step?.id === "string" && step.id.trim()) ? step.id.trim() : `step_${order}`;
    const tool = typeof step?.tool === "string" ? step.tool.trim() : "";
    const params = (step?.params && typeof step.params === "object" && !Array.isArray(step.params))
      ? (step.params as Record<string, unknown>)
      : {};

    if (!tool) {
      errors.push(`Step ${order} (${id}) is missing a "tool" name.`);
    } else if (!TOOL_TO_APP.has(tool)) {
      const hints = suggestTools(tool);
      const hintText = hints.length ? ` Did you mean: ${hints.join(", ")}?` : "";
      errors.push(`Step ${order} (${id}) uses unknown tool "${tool}".${hintText}`);
    }

    for (const key of [id, typeof step?.save_as === "string" ? step.save_as.trim() : ""]) {
      if (!key) continue;
      if (keyToOrder.has(key)) {
        errors.push(`Duplicate step handle "${key}" (steps ${keyToOrder.get(key)} and ${order}). Handles must be unique.`);
      } else {
        keyToOrder.set(key, order);
      }
    }

    planned.push({
      order,
      id,
      tool,
      app: tool ? (TOOL_TO_APP.get(tool) ?? null) : null,
      params,
      depends_on: [],
    });
  });

  // Second pass: resolve references and enforce that they point to earlier steps.
  planned.forEach((step) => {
    const refKeys = new Set<string>();
    collectRefStepKeys(step.params, refKeys);
    const deps = new Set<string>();
    for (const refKey of refKeys) {
      const refOrder = keyToOrder.get(refKey);
      if (refOrder === undefined) {
        errors.push(`Step ${step.order} (${step.id}) references "{{${refKey}}}", which is not a known step handle.`);
        continue;
      }
      if (refOrder === step.order) {
        errors.push(`Step ${step.order} (${step.id}) references its own output "{{${refKey}}}". A step cannot depend on itself.`);
        continue;
      }
      if (refOrder > step.order) {
        errors.push(`Step ${step.order} (${step.id}) references "{{${refKey}}}" from a later step (${refOrder}). References must point to earlier steps.`);
        continue;
      }
      deps.add(refKey);
    }
    step.depends_on = [...deps];
  });

  // Group touched apps for the "connect these first" surface.
  const appMap = new Map<string, Set<string>>();
  for (const step of planned) {
    if (!step.app) continue;
    if (!appMap.has(step.app)) appMap.set(step.app, new Set());
    appMap.get(step.app)!.add(step.tool);
  }
  const apps_touched: AppTouch[] = [...appMap.entries()]
    .map(([app, tools]) => ({ app, tools: [...tools].sort() }))
    .sort((a, b) => a.app.localeCompare(b.app));

  if (planned.length === 1) {
    warnings.push("Single-step flow: you can call this tool directly without composing a flow.");
  }

  const ok = errors.length === 0;

  const execution = ok
    ? {
        runner: "unclick_call" as const,
        instructions:
          "Run each call in order. Before a call, substitute every {{handle.path}} placeholder with the matching field from the referenced step's earlier output, then invoke unclick_call with the given endpoint_id and resolved params.",
        calls: planned.map((s) => ({
          order: s.order,
          step: s.id,
          endpoint_id: s.tool,
          params: s.params,
        })),
      }
    : null;

  const next_steps = ok
    ? [
        apps_touched.length
          ? `Connect required apps before running: ${apps_touched.map((a) => a.app).join(", ")} (use keychain_connect).`
          : "No third-party apps to connect.",
        "Execute each step in execution.calls via unclick_call, threading outputs through the {{refs}}.",
      ]
    : ["Fix the listed errors, then call flow.compose again to re-validate."];

  return {
    ok,
    goal,
    step_count: planned.length,
    steps: planned,
    apps_touched,
    execution,
    warnings,
    errors,
    unclick_meta: {
      source: "flow-composer",
      generated_at: new Date().toISOString(),
      next_steps,
    },
  };
}
