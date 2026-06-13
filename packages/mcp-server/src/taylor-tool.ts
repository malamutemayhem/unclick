import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function taylorExpand(args: Record<string, unknown>) {
  const fn = typeof args.function === "string" ? args.function.toLowerCase() : "";
  const x = typeof args.x === "number" ? args.x : NaN;
  const terms = typeof args.terms === "number" ? Math.floor(args.terms) : 10;
  if (isNaN(x)) return { error: "x is required (number)" };

  const validFns = ["exp", "sin", "cos", "ln1p", "atan"];
  if (!validFns.includes(fn)) return { error: `function is required (one of: ${validFns.join(", ")})` };
  if (terms < 1 || terms > 50) return { error: "terms must be between 1 and 50" };

  let approx = 0;
  let factorial = 1;
  const coefficients: number[] = [];

  switch (fn) {
    case "exp":
      for (let n = 0; n < terms; n++) {
        if (n > 0) factorial *= n;
        const term = Math.pow(x, n) / factorial;
        coefficients.push(+term.toFixed(12));
        approx += term;
      }
      break;
    case "sin":
      for (let n = 0; n < terms; n++) {
        const k = 2 * n + 1;
        factorial = 1;
        for (let i = 2; i <= k; i++) factorial *= i;
        const term = (n % 2 === 0 ? 1 : -1) * Math.pow(x, k) / factorial;
        coefficients.push(+term.toFixed(12));
        approx += term;
      }
      break;
    case "cos":
      for (let n = 0; n < terms; n++) {
        const k = 2 * n;
        factorial = 1;
        for (let i = 2; i <= k; i++) factorial *= i;
        const term = (n % 2 === 0 ? 1 : -1) * Math.pow(x, k) / factorial;
        coefficients.push(+term.toFixed(12));
        approx += term;
      }
      break;
    case "ln1p":
      if (x <= -1 || x > 1) return { error: "For ln(1+x), x must be in (-1, 1]" };
      for (let n = 1; n <= terms; n++) {
        const term = (n % 2 === 1 ? 1 : -1) * Math.pow(x, n) / n;
        coefficients.push(+term.toFixed(12));
        approx += term;
      }
      break;
    case "atan":
      if (Math.abs(x) > 1) return { error: "For atan(x), |x| must be <= 1" };
      for (let n = 0; n < terms; n++) {
        const k = 2 * n + 1;
        const term = (n % 2 === 0 ? 1 : -1) * Math.pow(x, k) / k;
        coefficients.push(+term.toFixed(12));
        approx += term;
      }
      break;
  }

  const exactMap: Record<string, (v: number) => number> = {
    exp: Math.exp, sin: Math.sin, cos: Math.cos,
    ln1p: Math.log1p, atan: Math.atan,
  };
  const exact = exactMap[fn](x);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["More terms = better approximation near center", "Convergence radius varies by function"],
  };
  return stampMeta({
    function: fn, x, terms,
    approximation: +approx.toFixed(12),
    exact: +exact.toFixed(12),
    error: +Math.abs(approx - exact).toExponential(6),
    first_terms: coefficients.slice(0, 8),
  }, meta);
}
