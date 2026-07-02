import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function odeSolve(args: Record<string, unknown>) {
  const expr = String(args.expression ?? "");
  if (!expr) throw new Error("expression is required (dy/dx as a function of x and y, e.g. 'x + y').");

  const x0 = Number(args.x0 ?? 0);
  const y0 = Number(args.y0 ?? 1);
  const xEnd = Number(args.x_end ?? 1);
  const steps = Math.min(Math.max(Math.floor(Number(args.steps ?? 100)), 2), 100000);
  const method = String(args.method ?? "rk4").toLowerCase();

  if (!Number.isFinite(x0) || !Number.isFinite(y0) || !Number.isFinite(xEnd)) {
    throw new Error("x0, y0, and x_end must be finite numbers.");
  }
  if (x0 >= xEnd) throw new Error("x_end must be greater than x0.");
  if (!["euler", "rk4"].includes(method)) throw new Error("method must be euler or rk4.");

  const evaluate = (xVal: number, yVal: number): number => {
    const sanitized = expr
      .replace(/\by\b/g, `(${yVal})`)
      .replace(/\bx\b/g, `(${xVal})`)
      .replace(/\^/g, "**");
    const allowed = /^[\d+\-*/().eE\s]*$/;
    if (!allowed.test(sanitized)) {
      throw new Error("Expression contains unsupported characters. Use x, y, numbers, +, -, *, /, ^, ().");
    }
    const result = Function(`"use strict"; return (${sanitized})`)();
    if (typeof result !== "number" || !Number.isFinite(result)) {
      throw new Error(`Expression evaluated to non-finite at x=${xVal}, y=${yVal}.`);
    }
    return result;
  };

  const h = (xEnd - x0) / steps;
  const trajectory: { x: number; y: number }[] = [];
  let x = x0;
  let y = y0;

  const sampleInterval = Math.max(1, Math.floor(steps / 200));

  for (let i = 0; i <= steps; i++) {
    if (i % sampleInterval === 0 || i === steps) {
      trajectory.push({
        x: Math.round(x * 1e8) / 1e8,
        y: Math.round(y * 1e8) / 1e8,
      });
    }

    if (i < steps) {
      if (method === "euler") {
        y = y + h * evaluate(x, y);
        x = x + h;
      } else {
        const k1 = evaluate(x, y);
        const k2 = evaluate(x + h / 2, y + (h / 2) * k1);
        const k3 = evaluate(x + h / 2, y + (h / 2) * k2);
        const k4 = evaluate(x + h, y + h * k3);
        y = y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
        x = x + h;
      }
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use rk4 for better accuracy than euler", "Increase steps for smoother trajectory"],
  };
  return stampMeta(
    {
      expression: expr,
      method,
      x0,
      y0,
      x_end: xEnd,
      steps,
      step_size: Math.round(h * 1e10) / 1e10,
      final_y: trajectory[trajectory.length - 1].y,
      sample_count: trajectory.length,
      trajectory,
    },
    meta,
  );
}
