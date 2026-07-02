import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function proportionSolve(args: Record<string, unknown>) {
  const a = typeof args.a === "number" ? args.a : null;
  const b = typeof args.b === "number" ? args.b : null;
  const c = typeof args.c === "number" ? args.c : null;
  const d = typeof args.d === "number" ? args.d : null;

  const values = [a, b, c, d];
  const nullCount = values.filter((v) => v === null).length;

  if (nullCount !== 1) return { error: "Provide exactly 3 of the 4 values (a, b, c, d) for a/b = c/d" };

  let solved: number;
  let which: string;

  if (a === null) { solved = (b! * c!) / d!; which = "a"; }
  else if (b === null) { solved = (a * d!) / c!; which = "b"; }
  else if (c === null) { solved = (a * d!) / b; which = "c" as string; }
  else { solved = (b * c!) / a; which = "d"; }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["a/b = c/d - cross multiply to solve"],
  };
  return stampMeta({
    a: a ?? +solved.toFixed(6),
    b: b ?? +solved.toFixed(6),
    c: c ?? +solved.toFixed(6),
    d: d ?? +solved.toFixed(6),
    solved_for: which,
    solved_value: +solved.toFixed(6),
  }, meta);
}
