import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function dotProduct(args: Record<string, unknown>) {
  const a = Array.isArray(args.a) ? args.a.filter((v) => typeof v === "number") as number[] : [];
  const b = Array.isArray(args.b) ? args.b.filter((v) => typeof v === "number") as number[] : [];
  if (a.length === 0 || b.length === 0) return { error: "a and b are required (arrays of numbers)" };
  if (a.length !== b.length) return { error: "a and b must have the same length" };

  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  const cosAngle = magA > 0 && magB > 0 ? dot / (magA * magB) : 0;
  const angleDeg = Math.acos(Math.max(-1, Math.min(1, cosAngle))) * 180 / Math.PI;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Dot product = 0 means orthogonal vectors", "cos(angle) = dot / (|a| * |b|)"],
  };
  return stampMeta({
    a, b,
    dot_product: +dot.toFixed(8),
    magnitude_a: +magA.toFixed(8),
    magnitude_b: +magB.toFixed(8),
    cos_angle: +cosAngle.toFixed(8),
    angle_degrees: +angleDeg.toFixed(6),
    are_orthogonal: Math.abs(dot) < 1e-10,
    dimensions: a.length,
  }, meta);
}
