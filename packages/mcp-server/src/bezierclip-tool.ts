import { stampMeta, ConnectorMeta } from "./connector-meta.js";

type Point2D = [number, number];

/**
 * De Casteljau subdivision to extract a sub-curve of a Bezier curve.
 *
 * Given control points and a parameter range [t_start, t_end], returns the
 * new control points for the clipped sub-curve plus the evaluated endpoints.
 */
export async function bezierClip(args: Record<string, unknown>) {
  const rawPts = args.control_points;
  if (!Array.isArray(rawPts) || rawPts.length < 2) {
    throw new Error("control_points must be an array of at least 2 [x, y] pairs.");
  }
  if (rawPts.length > 100) {
    throw new Error("Maximum 100 control points supported.");
  }

  const controlPoints: Point2D[] = rawPts.map((p, i) => {
    if (!Array.isArray(p) || p.length < 2) {
      throw new Error(`Control point at index ${i} must be [x, y].`);
    }
    const x = Number(p[0]);
    const y = Number(p[1]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      throw new Error(`Control point at index ${i} has non-finite coordinates.`);
    }
    return [x, y] as Point2D;
  });

  const tStart = Number(args.t_start);
  const tEnd = Number(args.t_end);
  if (!Number.isFinite(tStart) || !Number.isFinite(tEnd)) {
    throw new Error("t_start and t_end must be finite numbers.");
  }
  if (tStart < 0 || tStart > 1 || tEnd < 0 || tEnd > 1) {
    throw new Error("t_start and t_end must be in the range [0, 1].");
  }
  if (tStart >= tEnd) {
    throw new Error("t_start must be less than t_end.");
  }

  // De Casteljau evaluation at parameter t
  function deCasteljau(pts: Point2D[], t: number): Point2D[] {
    const n = pts.length;
    // Build the full triangular table
    const table: Point2D[][] = [pts.map((p) => [...p] as Point2D)];
    for (let r = 1; r < n; r++) {
      const prev = table[r - 1];
      const row: Point2D[] = [];
      for (let i = 0; i < prev.length - 1; i++) {
        row.push([
          (1 - t) * prev[i][0] + t * prev[i + 1][0],
          (1 - t) * prev[i][1] + t * prev[i + 1][1],
        ]);
      }
      table.push(row);
    }
    return table.map((row) => row[0]); // left edge gives the "split at t" left sub-curve
  }

  // Split at t: returns left sub-curve control points
  function splitLeft(pts: Point2D[], t: number): Point2D[] {
    const n = pts.length;
    const table: Point2D[][] = [pts.map((p) => [...p] as Point2D)];
    for (let r = 1; r < n; r++) {
      const prev = table[r - 1];
      const row: Point2D[] = [];
      for (let i = 0; i < prev.length - 1; i++) {
        row.push([
          (1 - t) * prev[i][0] + t * prev[i + 1][0],
          (1 - t) * prev[i][1] + t * prev[i + 1][1],
        ]);
      }
      table.push(row);
    }
    // Left sub-curve: first element of each row
    return table.map((row) => row[0]);
  }

  // Split at t: returns right sub-curve control points
  function splitRight(pts: Point2D[], t: number): Point2D[] {
    const n = pts.length;
    const table: Point2D[][] = [pts.map((p) => [...p] as Point2D)];
    for (let r = 1; r < n; r++) {
      const prev = table[r - 1];
      const row: Point2D[] = [];
      for (let i = 0; i < prev.length - 1; i++) {
        row.push([
          (1 - t) * prev[i][0] + t * prev[i + 1][0],
          (1 - t) * prev[i][1] + t * prev[i + 1][1],
        ]);
      }
      table.push(row);
    }
    // Right sub-curve: last element of each row
    return table.map((row) => row[row.length - 1]);
  }

  // Evaluate the curve at a single parameter
  function evaluate(pts: Point2D[], t: number): Point2D {
    let current = pts.map((p) => [...p] as Point2D);
    while (current.length > 1) {
      const next: Point2D[] = [];
      for (let i = 0; i < current.length - 1; i++) {
        next.push([
          (1 - t) * current[i][0] + t * current[i + 1][0],
          (1 - t) * current[i][1] + t * current[i + 1][1],
        ]);
      }
      current = next;
    }
    return current[0];
  }

  // To clip [t_start, t_end]:
  // 1. Split at t_end, take left part
  // 2. On that left part, split at t_start/t_end (rescaled), take right part
  const leftAtEnd = splitLeft(controlPoints, tEnd);
  const rescaledStart = tStart / tEnd;
  const subCurve = splitRight(leftAtEnd, rescaledStart);

  const round6 = (x: number) => Math.round(x * 1e6) / 1e6;

  const startPoint = evaluate(controlPoints, tStart);
  const endPoint = evaluate(controlPoints, tEnd);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Sub-curve control points define the same curve segment",
      "Chain multiple clips for adaptive subdivision",
      "Evaluate at t=0.5 for midpoint splitting",
    ],
  };

  return stampMeta(
    {
      sub_curve_control_points: subCurve.map((p) => [round6(p[0]), round6(p[1])]),
      degree: controlPoints.length - 1,
      t_start: tStart,
      t_end: tEnd,
      start_point: [round6(startPoint[0]), round6(startPoint[1])],
      end_point: [round6(endPoint[0]), round6(endPoint[1])],
      control_point_count: subCurve.length,
    },
    meta,
  );
}
