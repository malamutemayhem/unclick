import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function catmullRom(args: Record<string, unknown>) {
  const points = args.points as number[][] | undefined;
  if (!Array.isArray(points) || points.length < 4) {
    throw new Error("points must be an array of at least 4 [x, y] pairs.");
  }
  if (points.length > 10000) {
    throw new Error("points must have 10000 entries or fewer.");
  }
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    if (!Array.isArray(p) || p.length !== 2 || typeof p[0] !== "number" || typeof p[1] !== "number") {
      throw new Error(`points[${i}] must be [x, y] with numeric values.`);
    }
  }

  const tValues = args.t_values as number[] | undefined;
  if (!Array.isArray(tValues) || tValues.length === 0) {
    throw new Error("t_values must be a non-empty array of numbers between 0 and 1.");
  }
  if (tValues.length > 10000) {
    throw new Error("t_values must have 10000 entries or fewer.");
  }
  for (let i = 0; i < tValues.length; i++) {
    if (typeof tValues[i] !== "number" || tValues[i] < 0 || tValues[i] > 1) {
      throw new Error(`t_values[${i}] must be a number between 0 and 1.`);
    }
  }

  const alpha = typeof args.alpha === "number" ? args.alpha : 0.5;
  if (alpha < 0 || alpha > 1) {
    throw new Error("alpha must be between 0 and 1.");
  }

  // Number of spline segments is (numPoints - 3) since we need 4 control
  // points per segment: P[i-1], P[i], P[i+1], P[i+2].
  const numSegments = points.length - 3;

  const evaluated: { t: number; x: number; y: number }[] = [];

  for (const tGlobal of tValues) {
    // Map global t in [0,1] to a segment and local parameter
    const scaled = tGlobal * numSegments;
    let seg = Math.floor(scaled);
    if (seg >= numSegments) seg = numSegments - 1;
    const tLocal = scaled - seg;

    // Four control points for this segment
    const p0 = points[seg];
    const p1 = points[seg + 1];
    const p2 = points[seg + 2];
    const p3 = points[seg + 3];

    const result = evalCatmullRomSegment(p0, p1, p2, p3, tLocal, alpha);
    evaluated.push({
      t: round6(tGlobal),
      x: round6(result[0]),
      y: round6(result[1]),
    });
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use more t_values for a smoother curve approximation",
      "Alpha 0 gives uniform, 0.5 centripetal, 1.0 chordal parameterization",
    ],
  };

  return stampMeta(
    { control_point_count: points.length, evaluated, alpha: round6(alpha) },
    meta,
  );
}

function dist(a: number[], b: number[]): number {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Evaluate a single Catmull-Rom segment defined by four control points
 * at local parameter t in [0,1] using the Barry-Goldman formulation
 * with the given alpha for knot parameterization.
 */
function evalCatmullRomSegment(
  p0: number[],
  p1: number[],
  p2: number[],
  p3: number[],
  t: number,
  alpha: number,
): [number, number] {
  // Compute knot values
  const d01 = Math.pow(dist(p0, p1), alpha);
  const d12 = Math.pow(dist(p1, p2), alpha);
  const d23 = Math.pow(dist(p2, p3), alpha);

  const t0 = 0;
  const t1 = t0 + (d01 || 1e-10);
  const t2 = t1 + (d12 || 1e-10);
  const t3 = t2 + (d23 || 1e-10);

  // Remap t from [0,1] to [t1, t2]
  const tActual = t1 + t * (t2 - t1);

  // Barry-Goldman pyramidal evaluation
  const a1x = ((t1 - tActual) / (t1 - t0)) * p0[0] + ((tActual - t0) / (t1 - t0)) * p1[0];
  const a1y = ((t1 - tActual) / (t1 - t0)) * p0[1] + ((tActual - t0) / (t1 - t0)) * p1[1];

  const a2x = ((t2 - tActual) / (t2 - t1)) * p1[0] + ((tActual - t1) / (t2 - t1)) * p2[0];
  const a2y = ((t2 - tActual) / (t2 - t1)) * p1[1] + ((tActual - t1) / (t2 - t1)) * p2[1];

  const a3x = ((t3 - tActual) / (t3 - t2)) * p2[0] + ((tActual - t2) / (t3 - t2)) * p3[0];
  const a3y = ((t3 - tActual) / (t3 - t2)) * p2[1] + ((tActual - t2) / (t3 - t2)) * p3[1];

  const b1x = ((t2 - tActual) / (t2 - t0)) * a1x + ((tActual - t0) / (t2 - t0)) * a2x;
  const b1y = ((t2 - tActual) / (t2 - t0)) * a1y + ((tActual - t0) / (t2 - t0)) * a2y;

  const b2x = ((t3 - tActual) / (t3 - t1)) * a2x + ((tActual - t1) / (t3 - t1)) * a3x;
  const b2y = ((t3 - tActual) / (t3 - t1)) * a2y + ((tActual - t1) / (t3 - t1)) * a3y;

  const cx = ((t2 - tActual) / (t2 - t1)) * b1x + ((tActual - t1) / (t2 - t1)) * b2x;
  const cy = ((t2 - tActual) / (t2 - t1)) * b1y + ((tActual - t1) / (t2 - t1)) * b2y;

  return [cx, cy];
}

function round6(v: number): number {
  return Math.round(v * 1e6) / 1e6;
}
