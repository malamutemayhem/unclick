import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function monteCarloEstimate(args: Record<string, unknown>) {
  const method = String(args.method ?? "pi").toLowerCase();
  const samples = Math.min(Math.max(Math.floor(Number(args.samples ?? 10000)), 100), 10000000);

  if (method === "pi") {
    let inside = 0;
    let seed = (args.seed !== undefined ? Number(args.seed) : 12345) >>> 0;
    const lcg = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };

    for (let i = 0; i < samples; i++) {
      const x = lcg();
      const y = lcg();
      if (x * x + y * y <= 1) inside++;
    }
    const estimate = 4 * inside / samples;
    const error = Math.abs(estimate - Math.PI);

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Increase samples for better accuracy", "Error decreases as 1/sqrt(n)"],
    };
    return stampMeta({
      method: "pi",
      samples,
      estimate: Math.round(estimate * 1e10) / 1e10,
      actual: Math.round(Math.PI * 1e10) / 1e10,
      absolute_error: Math.round(error * 1e10) / 1e10,
      relative_error_pct: Math.round((error / Math.PI) * 1e8) / 1e6,
      points_inside: inside,
    }, meta);
  }

  if (method === "integral") {
    const expr = String(args.expression ?? "");
    if (!expr) throw new Error("expression is required for integral method.");
    const a = Number(args.a ?? 0);
    const b = Number(args.b ?? 1);
    if (!Number.isFinite(a) || !Number.isFinite(b) || a >= b) {
      throw new Error("a and b must be finite with a < b.");
    }

    const evaluate = (xVal: number): number => {
      const sanitized = expr.replace(/\bx\b/g, `(${xVal})`).replace(/\^/g, "**");
      const allowed = /^[\d+\-*/().eE\s]*$/;
      if (!allowed.test(sanitized)) throw new Error("Expression contains unsupported characters.");
      const result = Function(`"use strict"; return (${sanitized})`)();
      if (typeof result !== "number" || !Number.isFinite(result)) return 0;
      return result;
    };

    let seed = (args.seed !== undefined ? Number(args.seed) : 54321) >>> 0;
    const lcg = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };

    let sum = 0;
    let sumSq = 0;
    for (let i = 0; i < samples; i++) {
      const x = a + (b - a) * lcg();
      const val = evaluate(x);
      sum += val;
      sumSq += val * val;
    }
    const mean = sum / samples;
    const estimate = (b - a) * mean;
    const variance = (sumSq / samples - mean * mean) * (b - a) * (b - a) / samples;
    const stdError = Math.sqrt(Math.max(0, variance));

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Increase samples for tighter confidence interval", "Standard error decreases as 1/sqrt(n)"],
    };
    return stampMeta({
      method: "integral",
      expression: expr,
      a,
      b,
      samples,
      estimate: Math.round(estimate * 1e8) / 1e8,
      std_error: Math.round(stdError * 1e8) / 1e8,
    }, meta);
  }

  throw new Error("method must be pi or integral.");
}
