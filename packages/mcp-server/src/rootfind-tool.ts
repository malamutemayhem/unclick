import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function rootFind(args: Record<string, unknown>) {
  const expr = String(args.expression ?? "");
  if (!expr) throw new Error("expression is required (e.g. 'x^3 - 2*x - 5').");

  const method = String(args.method ?? "newton").toLowerCase();
  const tol = Number(args.tolerance ?? 1e-10);
  const maxIter = Math.min(Number(args.max_iterations ?? 100), 10000);

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

  const deriv = (val: number): number => {
    const h = 1e-8;
    return (evaluate(val + h) - evaluate(val - h)) / (2 * h);
  };

  if (method === "newton") {
    let x = Number(args.x0 ?? 1);
    if (!Number.isFinite(x)) throw new Error("x0 must be a finite number.");

    const iterations: { i: number; x: number; fx: number }[] = [];
    let converged = false;

    for (let i = 0; i < maxIter; i++) {
      const fx = evaluate(x);
      iterations.push({ i, x: Math.round(x * 1e10) / 1e10, fx: Math.round(fx * 1e10) / 1e10 });
      if (Math.abs(fx) < tol) {
        converged = true;
        break;
      }
      const dx = deriv(x);
      if (Math.abs(dx) < 1e-15) throw new Error("Derivative near zero; Newton's method stuck.");
      x = x - fx / dx;
    }

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: converged
        ? ["Verify by evaluating expression at the root"]
        : ["Try a different x0 or increase max_iterations"],
    };
    return stampMeta(
      {
        expression: expr,
        method: "newton",
        root: Math.round(x * 1e10) / 1e10,
        f_at_root: Math.round(evaluate(x) * 1e12) / 1e12,
        converged,
        iterations_used: iterations.length,
        history: iterations.slice(0, 20),
      },
      meta,
    );
  }

  if (method === "bisection") {
    let a = Number(args.a ?? -10);
    let b = Number(args.b ?? 10);
    if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error("a and b must be finite numbers.");
    if (a >= b) throw new Error("a must be less than b.");

    let fa = evaluate(a);
    let fb = evaluate(b);
    if (fa * fb > 0) throw new Error("f(a) and f(b) must have opposite signs.");

    let converged = false;
    let mid = (a + b) / 2;
    let iter = 0;

    for (iter = 0; iter < maxIter; iter++) {
      mid = (a + b) / 2;
      const fmid = evaluate(mid);
      if (Math.abs(fmid) < tol || (b - a) / 2 < tol) {
        converged = true;
        break;
      }
      if (fa * fmid < 0) {
        b = mid;
        fb = fmid;
      } else {
        a = mid;
        fa = fmid;
      }
    }

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: converged
        ? ["Use newton method for faster convergence near the root"]
        : ["Widen the interval or increase max_iterations"],
    };
    return stampMeta(
      {
        expression: expr,
        method: "bisection",
        root: Math.round(mid * 1e10) / 1e10,
        f_at_root: Math.round(evaluate(mid) * 1e12) / 1e12,
        converged,
        iterations_used: iter + 1,
      },
      meta,
    );
  }

  throw new Error("method must be newton or bisection.");
}
