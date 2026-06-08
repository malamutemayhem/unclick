import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function crossProduct(args: Record<string, unknown>) {
  const a = Array.isArray(args.a) ? args.a.filter((v) => typeof v === "number") as number[] : [];
  const b = Array.isArray(args.b) ? args.b.filter((v) => typeof v === "number") as number[] : [];
  if (a.length !== 3 || b.length !== 3) return { error: "a and b must each be 3-element arrays (3D vectors)" };

  const result = [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
  const magnitude = Math.sqrt(result[0] ** 2 + result[1] ** 2 + result[2] ** 2);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Cross product magnitude = area of parallelogram", "Result is perpendicular to both input vectors"],
  };
  return stampMeta({
    a, b,
    cross_product: result.map((v) => +v.toFixed(8)),
    magnitude: +magnitude.toFixed(8),
    are_parallel: magnitude < 1e-10,
  }, meta);
}
