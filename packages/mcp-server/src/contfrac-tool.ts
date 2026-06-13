import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function continuedFraction(args: Record<string, unknown>) {
  const numerator = typeof args.numerator === "number" ? args.numerator : null;
  const denominator = typeof args.denominator === "number" ? args.denominator : null;

  if (numerator === null || !Number.isInteger(numerator)) {
    throw new Error("numerator must be an integer.");
  }
  if (denominator === null || !Number.isInteger(denominator) || denominator === 0) {
    throw new Error("denominator must be a non-zero integer.");
  }
  if (Math.abs(numerator) > 1e15 || Math.abs(denominator) > 1e15) {
    throw new Error("numerator and denominator must be at most 1e15 in absolute value.");
  }

  const maxTerms =
    typeof args.max_terms === "number" && Number.isInteger(args.max_terms) && args.max_terms > 0
      ? args.max_terms
      : 50;

  // Compute continued fraction terms using the Euclidean algorithm
  const terms: number[] = [];
  let a = numerator;
  let b = denominator;

  // Handle negative fractions: the first term absorbs the sign via floor division
  while (b !== 0 && terms.length < maxTerms) {
    const q = Math.floor(a / b);
    terms.push(q);
    const r = a - q * b;
    a = b;
    b = r;
  }

  // Compute convergents from terms
  const convergents: Array<{ p: number; q: number }> = [];
  let p_prev2 = 0;
  let q_prev2 = 1;
  let p_prev1 = 1;
  let q_prev1 = 0;

  for (let i = 0; i < terms.length; i++) {
    const t = terms[i];
    const p = t * p_prev1 + p_prev2;
    const q = t * q_prev1 + q_prev2;
    convergents.push({ p, q });
    p_prev2 = p_prev1;
    q_prev2 = q_prev1;
    p_prev1 = p;
    q_prev1 = q;
  }

  const decimalValue = numerator / denominator;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Convergents give best rational approximations for a given denominator bound",
      "Use polynomial or rootfind tools for numerical approximations",
    ],
  };

  return stampMeta(
    {
      numerator,
      denominator,
      terms,
      convergents,
      decimal_value: Math.round(decimalValue * 1e12) / 1e12,
    },
    meta,
  );
}
