import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function numericalDiff(args: Record<string, unknown>) {
  const expr = String(args.expression ?? "");
  const x = Number(args.x);
  const h = Number(args.h ?? 1e-7);
  const order = Number(args.order ?? 1);

  if (!expr) throw new Error("expression is required (e.g. 'x^2 + 3*x').");
  if (!Number.isFinite(x)) throw new Error("x must be a finite number.");
  if (h <= 0 || h > 1) throw new Error("h must be between 0 (exclusive) and 1.");
  if (order < 1 || order > 4) throw new Error("order must be 1, 2, 3, or 4.");

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

  const fx = evaluate(x);
  let derivative: number;

  if (order === 1) {
    derivative = (-evaluate(x + 2 * h) + 8 * evaluate(x + h) - 8 * evaluate(x - h) + evaluate(x - 2 * h)) / (12 * h);
  } else if (order === 2) {
    derivative = (-evaluate(x + 2 * h) + 16 * evaluate(x + h) - 30 * fx + 16 * evaluate(x - h) - evaluate(x - 2 * h)) / (12 * h * h);
  } else if (order === 3) {
    derivative = (evaluate(x + 2 * h) - 2 * evaluate(x + h) + 2 * evaluate(x - h) - evaluate(x - 2 * h)) / (2 * h * h * h);
  } else {
    derivative = (evaluate(x + 2 * h) - 4 * evaluate(x + h) + 6 * fx - 4 * evaluate(x - h) + evaluate(x - 2 * h)) / (h * h * h * h);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use smaller h for better accuracy", "Use taylor_expand for series expansion"],
  };
  return stampMeta(
    {
      expression: expr,
      x,
      h,
      order,
      f_of_x: Math.round(fx * 1e10) / 1e10,
      derivative: Math.round(derivative * 1e8) / 1e8,
      method: "five-point stencil",
    },
    meta,
  );
}
