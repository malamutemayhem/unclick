import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function numericalIntegrate(args: Record<string, unknown>) {
  const expr = String(args.expression ?? "");
  const a = Number(args.a);
  const b = Number(args.b);
  const n = Number(args.intervals ?? 1000);
  const method = String(args.method ?? "simpson").toLowerCase();

  if (!expr) throw new Error("expression is required (e.g. 'x^2 + 1').");
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error("a and b must be finite numbers.");
  if (a >= b) throw new Error("a must be less than b.");
  if (n < 2 || n > 1000000) throw new Error("intervals must be between 2 and 1000000.");
  if (!["trapezoid", "simpson", "midpoint"].includes(method)) {
    throw new Error("method must be trapezoid, simpson, or midpoint.");
  }

  const evaluate = (val: number): number => {
    const sanitized = expr
      .replace(/\bx\b/g, `(${val})`)
      .replace(/\^/g, "**");
    const allowed = /^[\d+\-*/().eE\s]*$/;
    if (!allowed.test(sanitized)) {
      throw new Error("Expression contains unsupported characters. Use x, numbers, +, -, *, /, ^, ().");
    }
    const result = Function(`"use strict"; return (${sanitized})`)();
    if (typeof result !== "number" || !Number.isFinite(result)) {
      throw new Error(`Expression evaluated to non-finite at x=${val}.`);
    }
    return result;
  };

  const h = (b - a) / n;
  let integral: number;

  if (method === "trapezoid") {
    let sum = (evaluate(a) + evaluate(b)) / 2;
    for (let i = 1; i < n; i++) {
      sum += evaluate(a + i * h);
    }
    integral = sum * h;
  } else if (method === "midpoint") {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += evaluate(a + (i + 0.5) * h);
    }
    integral = sum * h;
  } else {
    const steps = n % 2 === 0 ? n : n + 1;
    const hs = (b - a) / steps;
    let sum = evaluate(a) + evaluate(b);
    for (let i = 1; i < steps; i++) {
      sum += (i % 2 === 0 ? 2 : 4) * evaluate(a + i * hs);
    }
    integral = (sum * hs) / 3;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Increase intervals for better accuracy", "Use numerical_diff for differentiation"],
  };
  return stampMeta(
    {
      expression: expr,
      a,
      b,
      method,
      intervals: n,
      integral: Math.round(integral * 1e8) / 1e8,
    },
    meta,
  );
}
