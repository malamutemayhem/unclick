import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function polynomialOps(args: Record<string, unknown>) {
  const op = String(args.operation ?? "evaluate").toLowerCase();
  const coeffs = args.coefficients as number[];

  if (!Array.isArray(coeffs) || coeffs.length === 0) {
    throw new Error("coefficients must be a non-empty array [a_n, a_{n-1}, ..., a_1, a_0].");
  }
  if (coeffs.length > 100) throw new Error("Maximum degree 99 supported.");

  const c = coeffs.map(Number);

  if (op === "evaluate") {
    const x = Number(args.x ?? 0);
    if (!Number.isFinite(x)) throw new Error("x must be a finite number.");
    let result = 0;
    for (let i = 0; i < c.length; i++) {
      result = result * x + c[i];
    }
    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use root_find to find zeros", "Use numerical_diff for derivative at a point"],
    };
    return stampMeta({ operation: "evaluate", coefficients: c, x, result: Math.round(result * 1e8) / 1e8 }, meta);
  }

  if (op === "derivative") {
    const deg = c.length - 1;
    if (deg === 0) {
      const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Derivative of constant is zero"] };
      return stampMeta({ operation: "derivative", coefficients: c, derivative: [0] }, meta);
    }
    const d = c.slice(0, deg).map((coeff, i) => Math.round(coeff * (deg - i) * 1e8) / 1e8);
    const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Evaluate the derivative at a point with operation=evaluate"] };
    return stampMeta({ operation: "derivative", coefficients: c, derivative: d, degree: deg - 1 }, meta);
  }

  if (op === "integral") {
    const constant = Number(args.constant ?? 0);
    const deg = c.length - 1;
    const integ = c.map((coeff, i) => Math.round((coeff / (deg - i + 1)) * 1e8) / 1e8);
    integ.push(constant);
    const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Use numerical_integrate for definite integrals"] };
    return stampMeta({ operation: "integral", coefficients: c, integral: integ, degree: deg + 1, constant }, meta);
  }

  if (op === "add" || op === "multiply") {
    const coeffs2 = args.coefficients2 as number[];
    if (!Array.isArray(coeffs2) || coeffs2.length === 0) {
      throw new Error("coefficients2 is required for add/multiply operations.");
    }
    const c2 = coeffs2.map(Number);

    if (op === "add") {
      const maxLen = Math.max(c.length, c2.length);
      const padded1 = new Array(maxLen - c.length).fill(0).concat(c);
      const padded2 = new Array(maxLen - c2.length).fill(0).concat(c2);
      const sum = padded1.map((v, i) => Math.round((v + padded2[i]) * 1e8) / 1e8);
      const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Use operation=evaluate to test the result"] };
      return stampMeta({ operation: "add", coefficients: c, coefficients2: c2, result: sum }, meta);
    }

    const result = new Array(c.length + c2.length - 1).fill(0);
    for (let i = 0; i < c.length; i++) {
      for (let j = 0; j < c2.length; j++) {
        result[i + j] += c[i] * c2[j];
      }
    }
    const rounded = result.map((v) => Math.round(v * 1e8) / 1e8);
    const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Result degree is sum of input degrees"] };
    return stampMeta({ operation: "multiply", coefficients: c, coefficients2: c2, result: rounded, degree: rounded.length - 1 }, meta);
  }

  throw new Error("operation must be evaluate, derivative, integral, add, or multiply.");
}
