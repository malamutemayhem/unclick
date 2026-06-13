import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function splineInterpolate(args: Record<string, unknown>) {
  const rawPoints = args.points as [number, number][];
  if (!Array.isArray(rawPoints) || rawPoints.length < 3) {
    throw new Error("points must be an array of at least 3 [x, y] pairs.");
  }
  if (rawPoints.length > 10000) {
    throw new Error("Maximum 10000 points supported.");
  }

  const pts = rawPoints
    .map((p) => ({ x: Number(p[0]), y: Number(p[1]) }))
    .sort((a, b) => a.x - b.x);

  for (let i = 1; i < pts.length; i++) {
    if (pts[i].x === pts[i - 1].x) {
      throw new Error("All x values must be distinct.");
    }
  }

  const n = pts.length - 1;
  const h: number[] = [];
  for (let i = 0; i < n; i++) {
    h.push(pts[i + 1].x - pts[i].x);
  }

  const alpha: number[] = [0];
  for (let i = 1; i < n; i++) {
    alpha.push(
      (3 / h[i]) * (pts[i + 1].y - pts[i].y) -
      (3 / h[i - 1]) * (pts[i].y - pts[i - 1].y),
    );
  }

  const l = new Array(n + 1).fill(0);
  const mu = new Array(n + 1).fill(0);
  const z = new Array(n + 1).fill(0);
  l[0] = 1;

  for (let i = 1; i < n; i++) {
    l[i] = 2 * (pts[i + 1].x - pts[i - 1].x) - h[i - 1] * mu[i - 1];
    mu[i] = h[i] / l[i];
    z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
  }

  l[n] = 1;
  const c = new Array(n + 1).fill(0);
  const b = new Array(n).fill(0);
  const d = new Array(n).fill(0);

  for (let j = n - 1; j >= 0; j--) {
    c[j] = z[j] - mu[j] * c[j + 1];
    b[j] =
      (pts[j + 1].y - pts[j].y) / h[j] -
      (h[j] * (c[j + 1] + 2 * c[j])) / 3;
    d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
  }

  const evalX = args.eval_at;
  let evaluated: { x: number; y: number }[] | undefined;

  if (evalX !== undefined) {
    const xs = Array.isArray(evalX) ? (evalX as number[]) : [Number(evalX)];
    evaluated = xs.map((x) => {
      const xn = Number(x);
      let seg = n - 1;
      for (let i = 0; i < n; i++) {
        if (xn <= pts[i + 1].x) {
          seg = i;
          break;
        }
      }
      const dx = xn - pts[seg].x;
      const y =
        pts[seg].y + b[seg] * dx + c[seg] * dx * dx + d[seg] * dx * dx * dx;
      return { x: xn, y: Math.round(y * 1e8) / 1e8 };
    });
  }

  const segments = [];
  for (let i = 0; i < n; i++) {
    segments.push({
      interval: [pts[i].x, pts[i + 1].x],
      a: pts[i].y,
      b: Math.round(b[i] * 1e8) / 1e8,
      c: Math.round(c[i] * 1e8) / 1e8,
      d: Math.round(d[i] * 1e8) / 1e8,
    });
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use eval_at to evaluate the spline at specific x values", "Use interpolate_calc for simple linear interpolation"],
  };
  return stampMeta(
    {
      point_count: pts.length,
      segment_count: n,
      segments,
      ...(evaluated ? { evaluated } : {}),
    },
    meta,
  );
}
