import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function bezierCurve(args: Record<string, unknown>) {
  const points = args.control_points as [number, number][];
  if (!Array.isArray(points) || points.length < 2) {
    throw new Error("control_points must have at least 2 [x, y] pairs.");
  }
  if (points.length > 20) {
    throw new Error("Maximum 20 control points supported.");
  }

  const steps = Math.min(Math.max(Number(args.steps ?? 50), 2), 1000);

  const pts = points.map((p) => {
    if (!Array.isArray(p) || p.length < 2) throw new Error("Each point must be [x, y].");
    return { x: Number(p[0]), y: Number(p[1]) };
  });

  const n = pts.length - 1;

  const binomials: number[] = new Array(n + 1);
  binomials[0] = 1;
  for (let i = 1; i <= n; i++) {
    binomials[i] = (binomials[i - 1] * (n - i + 1)) / i;
  }

  const curve: { x: number; y: number }[] = [];
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    let x = 0;
    let y = 0;
    for (let i = 0; i <= n; i++) {
      const basis = binomials[i] * Math.pow(1 - t, n - i) * Math.pow(t, i);
      x += basis * pts[i].x;
      y += basis * pts[i].y;
    }
    curve.push({
      x: Math.round(x * 1e6) / 1e6,
      y: Math.round(y * 1e6) / 1e6,
    });
  }

  let arcLength = 0;
  for (let i = 1; i < curve.length; i++) {
    arcLength += Math.hypot(curve[i].x - curve[i - 1].x, curve[i].y - curve[i - 1].y);
  }

  const evalT = args.eval_at;
  let evaluated: { t: number; x: number; y: number }[] | undefined;
  if (evalT !== undefined) {
    const ts = Array.isArray(evalT) ? (evalT as number[]) : [Number(evalT)];
    evaluated = ts.map((t) => {
      const tv = Math.max(0, Math.min(1, Number(t)));
      let x = 0;
      let y = 0;
      for (let i = 0; i <= n; i++) {
        const basis = binomials[i] * Math.pow(1 - tv, n - i) * Math.pow(tv, i);
        x += basis * pts[i].x;
        y += basis * pts[i].y;
      }
      return {
        t: tv,
        x: Math.round(x * 1e6) / 1e6,
        y: Math.round(y * 1e6) / 1e6,
      };
    });
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use eval_at to sample at specific t values", "Use spline_interpolate for data fitting"],
  };
  return stampMeta(
    {
      degree: n,
      control_points: pts.map((p) => [p.x, p.y]),
      steps,
      curve: curve.map((p) => [p.x, p.y]),
      arc_length: Math.round(arcLength * 1e6) / 1e6,
      ...(evaluated ? { evaluated } : {}),
    },
    meta,
  );
}
