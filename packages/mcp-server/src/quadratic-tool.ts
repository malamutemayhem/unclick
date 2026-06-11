import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function quadraticSolve(args: Record<string, unknown>) {
  const a = typeof args.a === "number" ? args.a : NaN;
  const b = typeof args.b === "number" ? args.b : NaN;
  const c = typeof args.c === "number" ? args.c : NaN;
  if (isNaN(a) || isNaN(b) || isNaN(c)) return { error: "a, b, and c are required (numbers)" };
  if (a === 0) return { error: "a must not be zero (not a quadratic equation)" };

  const discriminant = b * b - 4 * a * c;
  let roots: { x1: string | number; x2: string | number; type: string };

  if (discriminant > 0) {
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    roots = { x1: +x1.toFixed(8), x2: +x2.toFixed(8), type: "two_real" };
  } else if (discriminant === 0) {
    const x1 = -b / (2 * a);
    roots = { x1: +x1.toFixed(8), x2: +x1.toFixed(8), type: "one_repeated" };
  } else {
    const realPart = (-b / (2 * a)).toFixed(8);
    const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(8);
    roots = { x1: `${realPart} + ${imagPart}i`, x2: `${realPart} - ${imagPart}i`, type: "two_complex" };
  }

  const vertex_x = -b / (2 * a);
  const vertex_y = a * vertex_x * vertex_x + b * vertex_x + c;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Discriminant > 0 means two real roots", "Vertex form: a(x - h)^2 + k"],
  };
  return stampMeta({
    equation: `${a}x^2 + ${b}x + ${c} = 0`,
    discriminant: +discriminant.toFixed(8),
    roots,
    vertex: { x: +vertex_x.toFixed(8), y: +vertex_y.toFixed(8) },
  }, meta);
}
